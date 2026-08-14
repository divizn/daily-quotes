<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	export let quote;
</script>

<Card class="-mt-2 h-max border-0 sm:mx-auto sm:mt-10 sm:w-4/5">
	<CardContent class="space-y-4">
		<blockquote
			class="bg-gradient-to-t from-purple-500 to-blue-600 bg-clip-text p-3 text-3xl font-semibold italic text-transparent dark:from-blue-400 dark:to-purple-600 sm:text-6xl"
		>
			"{quote.text}"
		</blockquote>
		<p class="text-right font-mono text-lg text-zinc-700 dark:text-white sm:text-xl">
			- {quote.author}
		</p>
	</CardContent>
</Card>
