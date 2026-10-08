<script lang="ts">
  import GetInvolved from "$lib/components/landing/GetInvolved.svelte";
  import Hero from "$lib/components/landing/Hero.svelte";
  import Mission from "$lib/components/landing/Mission.svelte";
  import Partners from "$lib/components/landing/Partners.svelte";
  import NewsTicker from "$lib/components/ui/mini-blog/NewsTicker.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Open Collaboration</title>
</svelte:head>

<Hero />
{#if data.articles.length > 0}
  <NewsTicker articles={data.articles} />
{/if}
<Mission />
<Partners partners={data.partners} />
<GetInvolved />