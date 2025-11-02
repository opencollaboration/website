<script>
  let { partnersWithStatus } = $props();
</script>

<section
  class="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h3
        class="text-3xl sm:text-4xl font-extrabold tracking-wider text-gray-900 dark:text-white mb-4"
      >
        Backed by our Partners
      </h3>
      <p
        class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
      >
        We collaborate with leading organizations to support and sustain free
        and open-source software in the Minecraft ecosystem.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {#each partnersWithStatus as partner}
        <div
          class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center transform hover:scale-105"
        >
          <div
            class="mb-6 h-24 sm:h-32 w-full flex items-center justify-center"
          >
            {#if partner.hasImage}
              <img
                src={partner.logo}
                alt={partner.name}
                class="max-h-full max-w-full object-contain"
                loading="lazy"
                style="outline: none; border: none;"
              />
            {:else}
              <span
                class="text-indigo-700 dark:text-indigo-500 font-bold text-lg sm:text-2xl uppercase tracking-wide"
              >
                {partner.name}
              </span>
            {/if}
          </div>
          <h4
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3"
          >
            {partner.name}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {partner.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
