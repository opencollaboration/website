<script lang="ts">
  import {
    adoptedProjects,
    type Project,
  } from "$lib/assets/data/adoptedProjectsData";
  import { onMount } from "svelte";

  let projectsWithStatus: Project[] = $state(adoptedProjects);

  function checkImage(url: string) {
    return new Promise<boolean>((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  onMount(async () => {
    const results = await Promise.all(
      adoptedProjects.map(async (p) => {
        const hasImage = await checkImage(p.logo);
        return { ...p, hasImage };
      })
    );
    projectsWithStatus = results;
  });
</script>

<svelte:head>
  <title>Adopted Projects</title>
</svelte:head>

<section class="bg-primary py-16 text-center dark:bg-gray-950 sm:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1
      class="mb-4 text-4xl font-extrabold tracking-wide text-accent sm:text-5xl"
    >
      Adopted Projects
    </h1>
    <p
      class="mx-auto max-w-3xl text-lg text-primary-100 dark:text-primary-300 sm:text-xl"
    >
      Free and open-source projects we actively support and contribute to
    </p>
  </div>
</section>

<section class="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="grid gap-10 md:grid-cols-2">
      {#each projectsWithStatus as project}
        <div class="group/card relative h-full w-full">
          <div
            class="relative z-10 flex h-full flex-col rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-800"
          >
            <div class="ml-auto h-3 w-16 bg-primary dark:bg-accent"></div>

            <div class="mb-6 mt-4 flex h-24 items-center">
              {#if project.hasImage}
                <img
                  src={project.logo}
                  alt={project.name}
                  class="max-h-full max-w-full object-contain"
                  loading="lazy"
                  style="outline: none; border: none;"
                />
              {:else}
                <span
                  class="text-3xl font-bold text-primary-600 dark:text-primary-400"
                >
                  {project.name}
                </span>
              {/if}
            </div>

            <div class="flex-grow">
              <h3
                class="mb-3 text-2xl font-bold text-primary-900 dark:text-white"
              >
                {project.name}
              </h3>
              <p class="mb-6 text-base text-primary-600 dark:text-primary-300">
                {project.description}
              </p>
            </div>

            <div class="mt-auto">
              <a
                href={project.link}
                class="group flex items-center font-semibold text-primary-600 transition hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Learn More
                <svg
                  class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
            aria-hidden="true"
            class="absolute -left-2 -top-2 z-0 h-full w-full rounded-xl bg-primary p-8 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent"
          >
            <div
              class="ml-auto mt-2 h-3 w-16 border border-gray-700 bg-gray-100 opacity-50"
            ></div>

            <div class="opacity-0">
              <div class="mb-6 mt-4 h-24 w-full"></div>

              <h3 class="mb-3 text-2xl font-bold">{project.name}</h3>
              <p class="mb-6 text-base">{project.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
