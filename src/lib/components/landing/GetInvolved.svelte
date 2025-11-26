<script>
  const offers = [
    {
      title: "Commercial Partners",
      description:
        "Explore partnership opportunities and what we can offer your business.",
      linkText: "Our Offer",
      href: "/our-offer",
    },
    {
      title: "Contributors & Maintainers",
      description: "Find out how we support projects and how you can benefit.",
      linkText: "See what we can do",
      href: "/our-mission",
    },
  ];
</script>

<section id="offers" class="py-16 bg-gray-200 dark:bg-gray-800 sm:py-24">
  <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
    <h2
      class="mb-6 text-3xl font-extrabold text-primary-900 dark:text-white sm:text-4xl"
    >
      Get <span
        class="beachday text-primary dark:text-accent font-extrabold tracking-wide"
      >
        Involved!
      </span>
    </h2>

    <div class="mt-10 grid gap-8 text-left md:grid-cols-2">
      {#each offers as item}
        <div
          class="group/card relative mx-auto m-4 w-full max-w-lg cursor-pointer"
        >
          <div
            id="content"
            class="relative z-10 flex h-full flex-col justify-between space-y-7 rounded-xl bg-gray-50 p-8 shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-900"
          >
            <div class="ml-auto h-3 w-16 bg-primary dark:bg-accent"></div>

            <div>
              <span class="block text-3xl font-bold text-accent"
                >{item.title}</span
              >
              <p class="mt-4 text-gray-500">{item.description}</p>
            </div>

            <div>
              <a
                href={item.href}
                class="group flex items-center font-semibold text-accent transition hover:text-primary dark:hover:text-accent"
              >
                {item.linkText}
                <svg
                  class="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            id="outline"
            aria-hidden="true"
            class="absolute -left-2 -top-2 z-0 h-full w-full space-y-7 rounded-xl bg-primary p-8 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent"
          >
            <div
              class="ml-auto mt-2 h-3 w-16 border border-gray-700 bg-gray-100 opacity-50"
            ></div>

            <div class="opacity-0">
              <span class="text-3xl font-bold">{item.title}</span>
              <p class="text-gray-500">{item.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
