<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";
  import { fly, fade } from "svelte/transition";

  let { articles } = $props();
console.log(articles)
  const itemsPerPage = 4;
  let currentPage = $state(1);

  const totalPages = $derived(Math.ceil(articles.length / itemsPerPage));
  const paginatedItems = $derived(
    articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage += 1;
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage -= 1;
    }
  }
</script>

<section class="bg-white dark:bg-gray-900 py-12 sm:py-16">
  <div class="max-w-7xl mx-auto px-4">
    <h2
      class="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
    >
      Latest Updates
    </h2>

    {#key currentPage}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each paginatedItems as item, i (item.slug)}
          <div
            in:fly={{ y: 20, duration: 300, delay: i * 75 }}
            out:fade={{ duration: 150 }}
            class="h-full"
          >
            <a
              href={`#`}
              class="block bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
            >
              <div class="flex flex-col h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  class="w-full h-40 object-cover rounded-t-lg"
                />
                <div class="p-4 flex flex-col flex-grow">
                  <h3
                    class="font-bold text-lg text-gray-900 dark:text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          </div>
        {/each}
      </div>
    {/key}

    <div class="flex justify-center items-center gap-4 mt-12">
      <button
        on:click={prevPage}
        disabled={currentPage === 1}
        class="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        aria-label="Previous Page"
      >
        <ChevronLeftIcon class="h-6 w-6" />
      </button>

      <button
        on:click={nextPage}
        disabled={currentPage === totalPages}
        class="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        aria-label="Next Page"
      >
        <ChevronRightIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</section>
