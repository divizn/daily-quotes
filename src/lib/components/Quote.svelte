<script lang="ts">
	let { text, author, date }: { text: string; author: string; date: string } = $props();
</script>

<div class="animate-fade-in w-full">
	<p class="text-muted-foreground text-xs tracking-widest uppercase">{date}</p>
	<blockquote class="font-display animate-title-glow text-foreground mt-6 text-3xl sm:text-5xl">
		"{text}"
	</blockquote>
	<p class="text-muted-foreground mt-6 text-right font-mono text-sm">- {author}</p>
</div>
