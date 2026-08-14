<script lang="ts">
	import { socials } from '$lib/constants/social';
</script>

<footer class="border-border border-t">
	<div
		class="text-muted-foreground mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-10 text-sm sm:flex-row sm:justify-between"
	>
		<p>&copy; {new Date().getFullYear()} divizn</p>
		<ul class="flex gap-4">
			{#each socials as social (social.href)}
				<li>
					<a
						href={social.href}
						target="_blank"
						rel="external noopener noreferrer"
						class="hover:text-foreground flex items-center gap-1.5 duration-200"
					>
						<social.icon class="h-4 w-4" />
						{social.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>
