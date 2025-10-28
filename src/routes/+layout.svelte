<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/ocp_icon.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme, initializeTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Initialize theme from localStorage on first load
	onMount(() => {
		initializeTheme();
		
		// Subscribe to theme changes to update DOM
		const unsubscribe = theme.subscribe((t) => {
			if (typeof document !== "undefined") {
				document.documentElement.classList.remove("light", "dark");
				document.documentElement.classList.add(t);
			}
		});
		return unsubscribe;
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
