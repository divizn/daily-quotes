<script lang="ts">
    import Quote from '$lib/components/Quote.svelte';
	import quoteStore from '$lib/stores/quoteStore';

    let quote = $quoteStore[0];
</script>

<main class="flex-grow flex items-center justify-center">
    {#if $quoteStore}
        <Quote {quote}/>
    {:else}
        <p>Loading...</p>
    {/if}
</main>