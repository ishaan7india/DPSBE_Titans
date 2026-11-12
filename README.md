# DPSBE Titans #174

Official website for DPSBE Titans Team #174 and the 2026 NRL season.

The site is built with TanStack Start, React, TypeScript and Tailwind CSS. It is a
standalone Vite application with no external editor or hosting platform required
to run it.

## Development

You need Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The dev server prints the local URL (by default <http://localhost:5173>).

Using Bun instead of npm also works:

```sh
bun install
bun run dev
```

## Build

```sh
npm run build
npm run preview
```

## Scripts

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR |
| `npm run build`   | Production build                   |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |
| `npm run format`  | Format the codebase with Prettier  |

## Project structure

- `src/routes/` — TanStack Router routes (one per top-level page)
- `src/components/titans/` — shared Titans page shell and sections
- `src/data/` — season, team and robot content
- `src/lib/` — error handling and shared utilities
- `src/server.ts` — custom SSR entry with error-page handling
- `docs/plans/` — product and build plans

## Built with

- TanStack Start / TanStack Router
- TypeScript
- React 19
- Tailwind CSS 4
