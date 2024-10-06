<script lang="ts">
	import quoteStore, { type Quote as TQuote } from '$lib/stores/quoteStore';
    import Quote from '$lib/components/Quote.svelte';

    let quote: TQuote;
    if ($quoteStore){
        quote = $quoteStore;
    }

</script>

<main class="flex-grow flex items-center justify-center">
    {#if $quoteStore}
        <Quote {quote}/>
    {:else}
        <p>Loading...</p>
    {/if}
</main>