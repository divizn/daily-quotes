<script lang="ts">
    import Quote from '$lib/components/Quote.svelte';

    export let data;
    let quote = data
</script>

<main class="flex-grow flex items-center justify-center">
    <Quote {quote}/>
</main>