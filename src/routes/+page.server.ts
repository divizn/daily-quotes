import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';

export interface Quote {
	id: string;
	text: string;
	author: string;
}

const api = env.QUOTE_API || 'http://api.quotable.io/random?tags=wisdom';

const ttl = 60 * 60 * 48;
const maxCdnSeconds = 60 * 60 * 12;

const fallback: Quote = {
	id: 'fallback',
	text: 'The only limit to our realization of tomorrow is our doubts of today.',
	author: 'Franklin D. Roosevelt'
};

const redis =
	env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
		? new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN })
		: null;

const london = (options: Intl.DateTimeFormatOptions) =>
	new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', ...options });

const today = () =>
	new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());

const displayDate = () =>
	london({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

function secondsUntilMidnight() {
	const parts = london({
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	}).formatToParts(new Date());
	const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
	const elapsed = part('hour') * 3600 + part('minute') * 60 + part('second');

	// clamped so a dst transition can't hold a stale quote past midnight
	return Math.min(86400 - elapsed, maxCdnSeconds);
}

async function fetchQuote(fetch: typeof globalThis.fetch): Promise<Quote | null> {
	try {
		const res = await fetch(api);
		if (!res.ok) throw new Error(`quote api responded ${res.status}`);
		const data = await res.json();
		return { id: data._id, text: data.content, author: data.author };
	} catch (err) {
		console.error('failed to fetch quote', err);
		return null;
	}
}

export async function load({ fetch, setHeaders }) {
	const key = `quote:${today()}`;
	const date = displayDate();

	const cache = () =>
		setHeaders({
			'cache-control': `public, s-maxage=${secondsUntilMidnight()}, stale-while-revalidate=60`
		});

	if (redis) {
		try {
			const cached = await redis.get<Quote>(key);
			if (cached) {
				cache();
				return { ...cached, date };
			}
		} catch (err) {
			console.error('failed to read quote from redis', err);
		}
	}

	const quote = await fetchQuote(fetch);
	if (!quote) return { ...fallback, date };

	if (redis) {
		try {
			const written = await redis.set(key, quote, { nx: true, ex: ttl });
			if (!written) {
				const winner = await redis.get<Quote>(key);
				if (winner) {
					cache();
					return { ...winner, date };
				}
			}
		} catch (err) {
			console.error('failed to write quote to redis', err);
		}
	}

	cache();
	return { ...quote, date };
}
