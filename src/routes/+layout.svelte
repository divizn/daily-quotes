<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/ui/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="flex min-h-screen flex-col">
	<ModeWatcher />
	<Header />
	<slot />
</div>
