<script lang="ts">
  import { ShieldCheck } from "@lucide/svelte";

  type Tier = {
    name: string;
    description: string;
    features: string[];
    ctaText: string;
    isMostPopular: boolean;
  };

  let { tier }: { tier: Tier } = $props();
</script>

<div
  class="relative flex flex-col rounded-2xl p-8"
  class:border-2={tier.isMostPopular}
  class:border-primary-500={tier.isMostPopular}
  class:dark:border-accent={tier.isMostPopular}
  class:shadow-xl={tier.isMostPopular}
  class:border={!tier.isMostPopular}
  class:border-gray-200={!tier.isMostPopular}
  class:dark:border-gray-700={!tier.isMostPopular}
  class:shadow-sm={!tier.isMostPopular}
  class:bg-white={true}
  class:dark:bg-gray-900={tier.isMostPopular}
  class:dark:bg-gray-800={!tier.isMostPopular}
>
  {#if tier.isMostPopular}
    <div class="absolute top-0 -translate-y-1/2 transform">
      <span
        class="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-medium text-primary"
      >
        Most Popular
      </span>
    </div>
  {/if}
  <h3 class="text-2xl font-semibold leading-8 text-accent dark:text-secondary">
    {tier.name}
  </h3>
  <p class="mt-4 text-sm text-accent dark:text-secondary">
    {tier.description}
  </p>
  <div class="mt-8 flex-1">
    <ul role="list" class="space-y-4">
      {#each tier.features as feature}
        <li class="flex items-start">
          <div class="flex-shrink-0">
            <ShieldCheck class="h-5 w-5 text-accent dark:text-secondary" />
          </div>
          <p class="ml-3 text-sm text-accent dark:text-secondary">
            {feature}
          </p>
        </li>
      {/each}
    </ul>
  </div>
  {#if tier.isMostPopular}
    <a
      href="/contact"
      class="mt-10 block rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-accent shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
    >
      {tier.ctaText}
    </a>
  {:else}
    <a
      href="/contact"
      class="mt-10 block rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-accent dark:text-secondary shadow-sm ring-1 ring-inset hover:bg-primary/90 dark:hover:bg-primary/50 transition-colors"
    >
      {tier.ctaText}
    </a>
  {/if}
</div>
