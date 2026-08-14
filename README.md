# Daily Quotes

[![Vercel](https://img.shields.io/github/deployments/divizn/daily-quotes/Production?label=vercel&logo=vercel&logoColor=white)](https://quotes.phons.dev)
[![SvelteKit](https://img.shields.io/badge/built%20with-SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)

A SvelteKit project that displays one quote a day. This app was built to learn data fetching in SvelteKit.

## Why I Made This

Daily Quotes is a practice project to explore SvelteKit's data fetching using a server side load function. It started out with a store as an in memory db, which was swapped for an API later on. The quote is now cached in Redis so everyone gets the same one until midnight, and the UI was rebuilt to match the rest of phons.dev.

## How The Quote Is Picked

The first visit of the day fetches a quote and writes it to Redis under `quote:YYYY-MM-DD`, keyed on the London date. Every visit after that reads the same key, so the quote only changes at midnight. Concurrent first visits all write with `NX` and settle on whichever one won.

Redis is optional. Without it the quote is fetched fresh on every request, which is how the app behaved before. If the quote API itself is unreachable there is a hardcoded fallback quote, and that one is never cached.

## TODO

- [ ] Move to Cloudflare Workers to match the other phons.dev sites

## Running Locally

```bash
git clone https://github.com/divizn/daily-quotes.git # clones the repository
cd daily-quotes # change directory
cp .env.example .env # sets the quote api, and optionally upstash
pnpm install # installs dependencies
pnpm dev # run development server
```

Then go to `localhost:5173` to see the application

Without a `.env` the page still works, it just falls back to one hardcoded quote every time.
