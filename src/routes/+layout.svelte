<script lang="ts">
  import "../app.css";
  import "../style.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<svelte:head>
  <meta name="description" content="A description of my awesome Svelte site." />

  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/resources/favicons/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/resources/favicons/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/resources/favicons/favicon-16x16.png"
  />
  <link rel="manifest" href="/resources/favicons/site.webmanifest" />
  <link rel="shortcut icon" href="/resources/favicons/favicon.ico" />

</svelte:head>
<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900 flex flex-col">
  <ModeWatcher
    defaultMode={"dark"}
    themeColors={{ dark: "black", light: "white" }}
  />

  <Header />
  <main class="flex-1">
    {@render children?.()}
  </main>
  <Footer />
</div>
