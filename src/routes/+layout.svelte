<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/ui/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col min-h-screen">
	<ModeWatcher />
	<Header />
	<slot />
  </div>