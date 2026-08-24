import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { renderConsoleSVG } from '../lib/render-console-svg.mjs';

const USERNAME = process.env.GH_USERNAME;
const TOKEN = process.env.GH_TOKEN;

if (!USERNAME || !TOKEN) {
  console.error('Missing GH_USERNAME or GH_TOKEN environment variables.');
  process.exit(1);
}

const query = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': `${USERNAME}-radar-readme`,
  },
  body: JSON.stringify({ query, variables: { userName: USERNAME } }),
});

if (!res.ok) {
  console.error('GitHub API request failed:', res.status, await res.text());
  process.exit(1);
}

const json = await res.json();
if (json.errors) {
  console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
  process.exit(1);
}

const calendar = json.data.user.contributionsCollection.contributionCalendar;
const weeks = calendar.weeks.map((w) =>
  w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
);
const allDays = weeks.flat();

let currentStreak = 0;
for (let i = allDays.length - 1; i >= 0; i--) {
  if (allDays[i].count > 0) currentStreak++;
  else break;
}

let longestStreak = 0;
let running = 0;
let activeDays = 0;
for (const day of allDays) {
  if (day.count > 0) {
    running++;
    activeDays++;
    longestStreak = Math.max(longestStreak, running);
  } else {
    running = 0;
  }
}
const consistencyPct = Math.round((activeDays / allDays.length) * 100);

const total = calendar.totalContributions;
const level = Math.max(1, Math.floor(total / 100) + 1);

const profile = JSON.parse(readFileSync(new URL('../profile.json', import.meta.url)));
const roleTitle = (profile.roleShort || profile.role).toUpperCase();

const svg = renderConsoleSVG({
  weeks,
  radarOpts: {
    title: 'CONTRIB://RADAR_SCAN',
    subtitle: `TOTAL ${total.toLocaleString()} · STREAK ${currentStreak}D`,
    duration: 22,
  },
  profile,
  statsMetrics: { xp: total, level, roleTitle, combo: currentStreak, shieldDays: longestStreak, consistencyPct },
});

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/console-card.svg', import.meta.url), svg, 'utf8');

for (const f of ['radar-grid.svg', 'identity-card.svg', 'stats-bar.svg']) {
  const p = new URL(`../dist/${f}`, import.meta.url);
  if (existsSync(p)) unlinkSync(p);
}

console.log(`Wrote dist/console-card.svg — ${total} contributions, streak ${currentStreak}d, best ${longestStreak}d, consistency ${consistencyPct}%`);
