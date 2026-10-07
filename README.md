# Book Club

A small fully static site for a four-person book club. It tracks
what the club has read, what everyone scored each book, and what the numbers say about the people
doing the scoring.

The content is in Ukrainian.

## What's on it

| Route | What it shows |
| --- | --- |
| `/` | The book currently being read, a scrollable archive, and the four members |
| `/books` | Full catalogue with per-book averages |
| `/books/[slug]` | One book: every member's score, the club average, a disagreement score, and any club records it holds |
| `/members/[slug]` | One member: their average, highs and lows, and their full score sheet |
| `/stats` | The score matrix, the most divisive books, member leaderboards, score distribution, and a publication-year timeline |
| `/stats/loyal`, `/stats/critic` | Who most often gives a book its highest — or lowest — score in the club, with a cumulative race chart |

### The two metrics

- **Average** — the mean of the member scores for a book. Scores run 1–5 and may be fractional
  (`3.72`), with an optional free-text label shown instead of the number (`"4+"`, `"2-3, ну 3"`).
- **Controversy** — the population standard deviation of a book's scores. High means the club split;
  near zero means it agreed. It drives the "apple of discord" ranking and a six-step colour scale.

## Stack

- **Next.js 16** (App Router) and **React 19**
- **TypeScript**, strict
- **Tailwind CSS v4** — configured in CSS, no `tailwind.config`
- **Chart.js** via `react-chartjs-2` for the line and doughnut charts

No database, no API, no client-side data fetching. Every route is prerendered at build time.

## Running it

Requires Node 20+.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build — prerenders every route |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph image URLs resolve against the real domain
instead of `localhost`.

## Layout

```
src/
  app/            Routes. Dynamic segments use generateStaticParams + dynamicParams = false
  components/
    books/        Book cards, covers, the "next read" block
    members/      Member cards and their detail pieces
    stats/        The score table, charts and plots
    ui/           Panel, PillButton, StatBadge, icons
  data/
    home.ts       The entire dataset — books and members
    selectors.ts  The only module that reads home.ts
  types/          Book, Member, Rating
  utils/          Scoring maths, era boundaries, date formatting
```