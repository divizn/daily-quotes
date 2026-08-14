# Daily Quotes

[![Vercel](https://img.shields.io/github/deployments/divizn/daily-quotes/Production?label=vercel&logo=vercel&logoColor=white)](https://quotes.phons.dev)
[![SvelteKit](https://img.shields.io/badge/built%20with-SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)

A SvelteKit project that displays a random quote. This app was built to learn data fetching in SvelteKit, and UI styling with Shadcn.

## Why I Made This

Daily Quotes is a practice project to explore SvelteKit's data fetching using a server side load function, as well as to experiment with Shadcn for custom UI design. It started out with a store as an in memory db, which was swapped for an API later on.

## TODO

- [ ] Cache quote to display only one a day
- [ ] Nicer UI

## Running Locally

```bash
git clone https://github.com/divizn/daily-quotes.git # clones the repository
cd daily-quotes # change directory
echo 'QUOTE_API = "http://api.quotable.io/random?tags=wisdom"' > .env # sets the quote api
pnpm install # installs dependencies
pnpm dev # run development server
```

Then go to `localhost:5173` to see the application

Without a `.env` the page still works, it just falls back to one hardcoded quote every time.
