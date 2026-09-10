<script lang="ts">
  import GetInvolved from "$lib/components/landing/GetInvolved.svelte";
  import Hero from "$lib/components/landing/Hero.svelte";
  import Mission from "$lib/components/landing/Mission.svelte";
  import Partners from "$lib/components/landing/Partners.svelte";
  import NewsTicker from "$lib/components/ui/mini-blog/NewsTicker.svelte";

  let { data } = $props();

  const enabledArticles = [];

  for (const article of data.articles) {
    if (article.disabled !== "true") enabledArticles.push(article);
  }
</script>

<svelte:head>
  <title>Open Collaboration</title>
</svelte:head>

<Hero />
{#if enabledArticles.length > 0}
  <NewsTicker articles={enabledArticles} />
{/if}
<Mission />
<Partners partners={data.partners} />
<GetInvolved />