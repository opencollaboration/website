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
  class:dark:border-primary-500={tier.isMostPopular}
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
        class="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-500 px-4 py-1 text-sm font-medium text-primary-700 dark:text-primary-100"
      >
        Most Popular
      </span>
    </div>
  {/if}
  <h3 class="text-2xl font-semibold leading-8 text-primary-900 dark:text-white">
    {tier.name}
  </h3>
  <p class="mt-4 text-sm text-primary-600 dark:text-primary-300">
    {tier.description}
  </p>
  <div class="mt-8 flex-1">
    <ul role="list" class="space-y-4">
      {#each tier.features as feature}
        <li class="flex items-start">
          <div class="flex-shrink-0">
            <ShieldCheck
              class="h-5 w-5 text-primary-500 dark:text-primary-400"
            />
          </div>
          <p class="ml-3 text-sm text-primary-700 dark:text-primary-200">
            {feature}
          </p>
        </li>
      {/each}
    </ul>
  </div>
  {#if tier.isMostPopular}
    <a
      href="/contact"
      class="mt-10 block rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
    >
      {tier.ctaText}
    </a>
  {:else}
    <a
      href="/contact"
      class="mt-10 block rounded-md bg-white dark:bg-gray-700 px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-inset ring-indigo-300 dark:ring-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors"
    >
      {tier.ctaText}
    </a>
  {/if}
</div>
