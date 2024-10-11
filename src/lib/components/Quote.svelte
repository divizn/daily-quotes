<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";

  export let quote;
</script>
  
<Card class="sm:w-4/5 h-max sm:mx-auto -mt-2 border-0 sm:mt-10">
  <CardContent class="space-y-4">
    <blockquote class="text-3xl sm:text-6xl font-semibold italic text-transparent bg-gradient-to-t from-purple-500 to-blue-600 bg-clip-text dark:from-blue-400 dark:to-purple-600">
      "{quote.text}"
    </blockquote>
    <p class="text-lg sm:text-xl text-zinc-700 dark:text-white text-right font-mono">
      - {quote.author}
    </p>
  </CardContent>
</Card>
  