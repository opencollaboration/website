<script>
  import MissionApproach from "$lib/components/our-mission/MissionApproach.svelte";
  import MissionHelp from "$lib/components/our-mission/MissionHelp.svelte";
  import MissionHero from "$lib/components/our-mission/MissionHero.svelte";
  import MissionIntro from "$lib/components/our-mission/MissionIntro.svelte";
  import MissionOpenSource from "$lib/components/our-mission/MissionOpenSource.svelte";
</script>

<svelte:head>
  <title>Our Mission</title>
</svelte:head>
<MissionHero />
<MissionIntro />
<MissionOpenSource />
<MissionApproach />
<MissionHelp />
