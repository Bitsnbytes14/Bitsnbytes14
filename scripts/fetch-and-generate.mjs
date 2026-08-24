import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { renderRadarSVG } from '../lib/render-radar-svg.mjs';
import { renderIdentitySVG } from '../lib/render-identity-svg.mjs';
import { renderStatsSVG } from '../lib/render-stats-svg.mjs';

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

const radarSvg = renderRadarSVG(weeks, {
  title: 'CONTRIB://RADAR_SCAN',
  subtitle: `TOTAL ${total.toLocaleString()} · STREAK ${currentStreak}D`,
  duration: 22,
});
const widthMatch = radarSvg.match(/width="(\d+)"/);
const sharedWidth = widthMatch ? parseInt(widthMatch[1], 10) : 1160;

const profile = JSON.parse(readFileSync(new URL('../profile.json', import.meta.url)));
const identitySvg = renderIdentitySVG(profile, { width: sharedWidth });

const roleTitle = (profile.roleShort || profile.role).toUpperCase();
const statsSvg = renderStatsSVG(
  { xp: total, level, roleTitle, combo: currentStreak, shieldDays: longestStreak, consistencyPct },
  { width: sharedWidth },
);

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/radar-grid.svg', import.meta.url), radarSvg, 'utf8');
writeFileSync(new URL('../dist/identity-card.svg', import.meta.url), identitySvg, 'utf8');
writeFileSync(new URL('../dist/stats-bar.svg', import.meta.url), statsSvg, 'utf8');

console.log(`Wrote all 3 cards @ width ${sharedWidth} — ${total} contributions, streak ${currentStreak}d, best ${longestStreak}d, consistency ${consistencyPct}%`);
