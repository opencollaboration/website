<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/ocp_icon.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Initialize theme on page load
	onMount(() => {
		// Theme store will handle initialization
		// Just make sure it's subscribed to updates
		const unsubscribe = theme.subscribe((t) => {
			// This will apply theme when it changes
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
