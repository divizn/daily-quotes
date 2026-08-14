<script lang="ts">
	import Terminal from 'lucide-svelte/icons/terminal';
	import ThemeToggle from './ThemeToggle.svelte';
	import Github from './icons/Github.svelte';
</script>

<header class="border-border border-b">
	<div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
		<a
			href="https://phons.dev"
			aria-label="Back to phon"
			class="border-border-strong bg-card text-foreground hover:border-foreground/40 flex h-8 w-8 items-center justify-center rounded-full border duration-200"
		>
			<Terminal class="h-4 w-4" />
		</a>
		<div class="flex items-center gap-2">
			<ThemeToggle />
			<a
				href="https://github.com/divizn/daily-quotes"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Source on GitHub"
				class="border-border-strong text-foreground hover:border-foreground/40 flex h-8 w-8 items-center justify-center rounded-full border duration-200"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
