<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
</script>

<svelte:head>
	<title>{page.status} | Daily Quotes</title>
</svelte:head>

<main class="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
	<h1 class="font-display text-foreground text-4xl">{page.status}</h1>
	<p class="text-muted-foreground mt-4">{page.error?.message ?? "This page doesn't exist."}</p>
	<a
		href={resolve('/')}
		class="text-muted-foreground hover:text-foreground mt-6 flex items-center gap-1.5 text-sm duration-200"
	>
		<ArrowLeft class="h-4 w-4" />
		Back home
	</a>
</main>
