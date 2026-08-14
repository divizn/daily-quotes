# Daily quote cache and phon restyle

Date: 2026-08-14
Status: approved, not yet implemented

Clears both README TODO items in one pass: cache the quote so every visitor sees the same one
for a whole day, and restyle the site to match the phon portal and portfolio.

## Context

`quotes.phons.dev` currently fetches a fresh random quote from `api.quotable.io` on every page
load. The portal's `links.ts` already describes it as "Displays a new random quote each day",
with a comment noting the description is aspirational. This work makes the description true.

The portal (`phon/phon`) and portfolio (`phon/portfolio-site`) share a design system: Astro,
Tailwind 4, dark palette at `:root` with a `[data-theme="light"]` override, Inter Variable for
body and CalSans for display, borders rather than fills, and a particles canvas. There is no
shared package, the two keep their `global.css` in sync by hand. This project becomes a third
hand-synced copy.

Deployment stays on Vercel. Moving to Cloudflare Workers is deferred to separate future work.

### Local constraint

`quotable.io` does not resolve from the development machine (SERVFAIL from both 1.1.1.1 and
8.8.8.8), while the Vercel deployment fetches it without trouble. The Redis logic, the fallback
paths and the whole UI can be verified locally. A real quotable response cannot be, so that is
confirmed on deploy.

## Part 1: quote of the day

### Store

Upstash Redis via `@upstash/redis`, which speaks HTTP rather than opening a TCP connection, so
it survives serverless cold starts without connection pooling. An Upstash instance for this
project already exists.

Cloudflare has no Redis product. Workers KV is the nearest free equivalent but is only ergonomic
from inside a Worker via a binding, so it is not an option while the app is on Vercel.

### Key design

```
key    quote:2026-08-14
value  {"id": "...", "text": "...", "author": "..."}
ttl    172800 (48h)
```

The date is computed in `Europe/London` via
`Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' })`, which yields `YYYY-MM-DD`
directly. Keys carry their own date, so a 48h TTL expires them without any cleanup pass.

### Load flow

`src/routes/+page.server.ts` remains the only backend. Its `load`:

1. `GET quote:<today>`. On a hit, return the parsed quote.
2. On a miss, fetch the quote API.
3. `SET quote:<today> <json> NX EX 172800`.
4. If the `NX` write returns null, another request won the race. `GET` the key again and return
   that value, so a burst of traffic just after midnight still converges on one quote.

Two independent failure paths, both preserving current behaviour:

- Quote API fails: fall back to the hardcoded Roosevelt quote, as today.
- Redis unreachable or unconfigured: skip the cache and serve a fresh fetch per request, which is
  exactly how the site behaves now.

The site never shows an error page. Worst case it degrades to its present behaviour.

The `Quote` interface declares `id: number` while the mapping assigns quotable's `_id`, which is
a string. Since the value now round-trips through Redis, the type is corrected to `string` as
part of this work.

### CDN layer

`setHeaders` on the load sets `cache-control: public, s-maxage=<seconds until midnight>,
stale-while-revalidate=60`. Content only changes at midnight, so the rendered page is safe to
hold at Vercel's edge. This reduces Redis to roughly one read per edge region per day instead of
one per visitor.

### Environment

`QUOTE_API`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, all read through
`$env/dynamic/private`.

Moving off `$env/static/private` is what makes graceful degradation possible: static env is
inlined at build time, so a missing variable is a build concern rather than a runtime one. It
also removes the need to restart the dev server after editing `.env`.

A `.env.example` is added listing all three, since the repo currently has none.

## Part 2: stack migration

| Package                      | From  | To   |
| ---------------------------- | ----- | ---- |
| svelte                       | 4.2   | 5.56 |
| @sveltejs/kit                | 2.0   | 2.70 |
| @sveltejs/adapter-auto       | 3.0   | 7.0  |
| @sveltejs/vite-plugin-svelte | 3.0   | 7.3  |
| vite                         | 5.0   | 8.2  |
| tailwindcss                  | 3.4   | 4.3  |
| lucide-svelte                | 0.451 | 1.0  |
| svelte-check                 | 4.0   | 4.7  |

Svelte 5 means runes throughout: `$props()` in place of `export let`, `onclick` in place of
`on:click`, `{@render children()}` in place of `<slot>`.

Tailwind 4 arrives through `@tailwindcss/vite`, which replaces the PostCSS pipeline.

Removed files: `tailwind.config.ts`, `postcss.config.js`, `components.json`,
`src/lib/images/main-component.svg`, `src/lib/components/ui/button/`,
`src/lib/components/ui/card/`, `src/lib/utils.ts`.

`utils.ts` holds the shadcn `cn()` helper and an unused `flyAndScale` transition. Nothing needs
`cn()` once components stop taking merged class props, and `flyAndScale` was already dead code,
so the file goes rather than being carried forward empty. `clsx` and `tailwind-merge` go with it.

Removed dependencies: `bits-ui`, `tailwind-variants`, `mode-watcher`, `autoprefixer`,
`@tailwindcss/typography`.

Added dependencies: `@upstash/redis`, `@tailwindcss/vite`, `@fontsource-variable/inter`.

The `eslint.config.js` override relaxing `no-unused-vars` for `$$Props` / `$$Events` / `$$Slots`
is deleted along with it. It existed only to keep generated shadcn-svelte output passing lint,
and both the generated components and Svelte 4's `$$` aliases are gone.

## Part 3: design system port

### Tokens

`src/app.css` is replaced by phon's `global.css`, adjusted only for paths: the `@import
"tailwindcss"` line, the `:root` dark palette, the `[data-theme="light"]` override, and the
`@theme inline` block mapping tokens to Tailwind colour names along with the `fade-in`, `glow`,
`title` and `text-glow` keyframes and the `--animate-title-glow` combination.

The existing shadcn HSL triplet tokens and `darkMode: ["class"]` go away entirely. Dark is the
root palette, light is the override, matching the other two sites.

### Fonts and icons

Inter Variable from `@fontsource-variable/inter`. CalSans copied from phon's
`public/fonts/CalSans-SemiBold.ttf` into `static/fonts/` with the same `@font-face`.

Icons come from `lucide-svelte`, already a dependency but pinned at a Svelte 4 release, so it
moves to 1.0 with the rest. Lucide is Feather-derived, so `Sun`, `Moon`, `Terminal` and `Github`
match the `solid-icons/fi` set the portal uses.

### Components

All Svelte 5. Hand written in the shape of phon's components rather than generated, matching how
`ui/card.tsx` and `ui/button.tsx` are written in the portal.

- `Nav.svelte`: bottom-bordered bar, `max-w-4xl` centred, a circular icon button on the left
  linking back to `phons.dev`, theme toggle and GitHub link on the right as matching circular
  bordered buttons.
- `Footer.svelte`: top-bordered, copyright on the left, GitHub and LinkedIn on the right, reusing
  the portal's socials list.
- `ThemeToggle.svelte`: sets `document.documentElement.dataset.theme`, persists to
  `localStorage`, dispatches a `themechange` window event.
- `Particles.svelte`: port of the portal's Solid canvas component. Reads `--particle-rgb` from
  computed styles and re-reads it on `themechange`.
- `Quote.svelte`: date line in muted small caps above, the quote itself in `font-display
animate-title-glow text-3xl sm:text-5xl` at full foreground colour, attribution muted and right
  aligned below.

The purple to blue gradient blockquote is removed. Its `bg-clip-text` treatment is the one piece
of the current design that cannot survive the move to a monochrome palette.

The quote is not wrapped in a card. It is the entire page, so it gets the hero treatment the
portal gives its `h1`, with the particles canvas behind it. No `Card` or `Button` component is
needed: the only interactive elements are the circular icon buttons in the nav, which the portal
also writes inline rather than through its `Button`.

### Layout

`src/app.html` gains the inline no-flash theme script, reading `localStorage.theme` and setting
`data-theme` before first paint. Existing og and twitter meta tags stay.

`+layout.svelte` becomes `flex min-h-screen flex-col bg-background text-foreground antialiased`
wrapping Nav, content and Footer. `ModeWatcher` is removed.

A `+error.svelte` is added, matching the portal's 404 page: display-face heading, muted
explanation, a back link.

## Part 4: documentation

- `README.md`: both TODO items removed. The "experiment with Shadcn" framing in the intro and
  "Why I Made This" no longer describes the project and is corrected. The clone instructions gain
  the Upstash variables.
- `CLAUDE.md`: the Architecture section describes shadcn components, `mode-watcher`,
  `darkMode: ["class"]`, static env inlining and the missing `.env.example`, all of which this
  work invalidates. Rewritten to match.
- `portfolio-site/src/content/projects/daily-quotes.mdx`: `shadcn-svelte` tag replaced, and the
  Status paragraph claiming the quote refreshes on every visit is now false.
- `phon/src/constants/links.ts`: the comment marking the daily-quote description as aspirational
  can be deleted.

The last two live in a different repository and are separate commits there.

## Verification

There is no test framework in this project and this work does not add one. Verification is:

- `pnpm check` and `pnpm lint` pass on a clean tree.
- `pnpm build` succeeds.
- Dev server: both themes render correctly, no flash of the wrong theme on load, particles pick
  up the theme change, layout holds at mobile and desktop widths.
- Cache behaviour: with Upstash configured, repeated loads return the same quote and the Redis
  key exists with a sane TTL. With the Upstash variables removed, the page still renders.
- Quotable's live response is confirmed after deploy, not locally.
