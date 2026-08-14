<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="text-foreground flex min-h-screen flex-col antialiased">
	<Nav />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
