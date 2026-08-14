import type { Component } from 'svelte';
import Github from '$lib/components/icons/Github.svelte';
import Linkedin from '$lib/components/icons/Linkedin.svelte';

export type Social = {
	label: string;
	href: string;
	icon: Component<{ class?: string }>;
};

export const socials: Social[] = [
	{ label: 'GitHub', href: 'https://github.com/divizn', icon: Github },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/hassanjaved186', icon: Linkedin }
];
