<script>
  const benefits = [
    {
      title: "Innovative & Community Driven",
      description: "Progress shaped by creators themselves.",
    },
    {
      title: "Forkable & Extensible",
      description: "Customization for unique needs.",
    },
    {
      title: "Safe through Transparency",
      description: "Full access to source code.",
    },
    {
      title: "Accessible to All",
      description: "Free to use and improve.",
    },
    {
      title: "Educational",
      description: "Encourages learning and best practices.",
    },
    {
      title: "Sustainable Value",
      description: "Better long-term returns than private tooling.",
    },
  ];
</script>

<section class="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800 sm:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 class="mb-8 text-center text-3xl font-extrabold text-accent dark:text-white sm:mb-12 sm:text-4xl">
      Why <span class="text-primary dark:text-accent">Open Source?</span>
    </h2>
    
    <p class="mx-auto mb-12 max-w-3xl text-center text-base text-accent dark:text-secondary sm:text-lg">
      Open Source is not easy — maintaining code, documentation, and community
      takes work. But the benefits are worth it:
    </p>

    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {#each benefits as item}
        <div class="group/card relative h-full w-full !h-[200px]">
          <div class="relative z-10 flex h-full flex-col space-y-5 rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-900">
            <div class="ml-auto h-2 w-12 bg-primary dark:bg-accent"></div>
            
            <div>
              <h3 class="mb-2 text-lg font-bold text-accent dark:text-secondary">
                {item.title}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                {item.description}
              </p>
            </div>
          </div>

          <div aria-hidden="true" class="absolute -left-2 -top-2 z-0 h-full w-full space-y-5 rounded-xl bg-primary p-6 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent">
            <div class="ml-auto mt-1 h-2 w-12 border border-gray-700 bg-gray-100 opacity-50"></div>
            
            <div class="opacity-0">
              <h3 class="mb-2 text-lg font-bold">{item.title}</h3>
              <p class="text-sm sm:text-base">{item.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>