<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card";


    import type { Quote } from '$lib/stores/quoteStore';
    export let quote: Quote;
  </script>
  
  <Card class="max-w-lg mx-auto mt-10">
    <CardHeader>
      <CardTitle class="text-xl">Quote of the Day</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <blockquote class="text-2xl font-semibold italic">
        "{quote.text}"
      </blockquote>
      <p class="text-lg text-gray-500">
        - {quote.author}
      </p>
    </CardContent>
  </Card>
  