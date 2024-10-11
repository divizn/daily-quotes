<script lang="ts">
    import Quote from '$lib/components/Quote.svelte';

    export let data;
    let quote = data
</script>

<svelte:head>
    <title>Quote by {quote.author}</title>
    <meta name="description" content="{quote.text} - {quote.author}" />
</svelte:head>

<main class="flex-grow flex items-center sm:justify-center">
    <Quote {quote}/>
</main>