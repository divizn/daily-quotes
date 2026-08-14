<script lang="ts">
	import { onMount } from 'svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	type Theme = 'light' | 'dark';

	let theme: Theme = $state('dark');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	});

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (theme === 'light') {
			document.documentElement.dataset.theme = 'light';
		} else {
			delete document.documentElement.dataset.theme;
		}
		localStorage.setItem('theme', theme);
		window.dispatchEvent(new Event('themechange'));
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	class="border-border-strong text-foreground hover:border-foreground/40 flex h-8 w-8 items-center justify-center rounded-full border duration-200"
>
	{#if theme === 'dark'}
		<Sun class="h-4 w-4" />
	{:else}
		<Moon class="h-4 w-4" />
	{/if}
</button>
