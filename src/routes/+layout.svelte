<script lang="ts">
	import '../app.css';
	import '../style.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={"/resources/oc_icon.png"} />
</svelte:head>

<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900 flex flex-col">
	<ModeWatcher defaultMode={"dark"} themeColors={{ dark: "black", light: "white" }} />

	<Header />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
