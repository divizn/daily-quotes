<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/ui/Header.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<slot />
  </div>