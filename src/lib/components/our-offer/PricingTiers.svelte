<script lang="ts">
  import PricingTierCard from "./PricingTierCard.svelte";

  type Tier = {
    name: string;
    description: string;
    features: string[];
    ctaText: string;
    isMostPopular: boolean;
  };

  let { tiers, intro }: { tiers: Tier[]; intro: string | undefined } = $props();
</script>

{#if intro}
  <div class="text-center max-w-2xl mx-auto mb-12">
    <p class="text-lg text-primary dark:text-accent">
      {intro}
    </p>
  </div>
{/if}

<div
  class="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3"
>
  {#each tiers as tier}
    <PricingTierCard {tier} />
  {/each}
</div>
