<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/ocp_icon.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.initialize();
		
		// Also set up a global handler to debug
		if (typeof window !== 'undefined') {
			(window as any).debugTheme = () => {
				console.log('Current theme:', document.documentElement.classList);
				console.log('Has dark class:', document.documentElement.classList.contains('dark'));
				console.log('Has light class:', document.documentElement.classList.contains('light'));
				console.log('LocalStorage theme:', localStorage.getItem('theme'));
			};
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900 flex flex-col">
	<Header />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
