import { writeFileSync, mkdirSync } from 'node:fs';
import { renderRadarSVG } from '../lib/render-radar-svg.mjs';

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
let streak = 0;
for (let i = allDays.length - 1; i >= 0; i--) {
  if (allDays[i].count > 0) streak++;
  else break;
}

const svg = renderRadarSVG(weeks, {
  title: 'CONTRIB://RADAR_SCAN',
  subtitle: `TOTAL ${calendar.totalContributions.toLocaleString()} · STREAK ${streak}D`,
  duration: 22,
});

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/radar-grid.svg', import.meta.url), svg, 'utf8');
console.log(`Wrote dist/radar-grid.svg — ${calendar.totalContributions} contributions, streak ${streak}d`);
