<script lang="ts">
    import { GitCommitHorizontalIcon, StarIcon } from "@lucide/svelte";

  export let item: {
    title: string;
    description: string;
    githubUrl: string;
    stars: string;
    commits: string;
  };
</script>

<div class="group/card relative h-full w-full h-[200px]">
  <!-- Front card -->
  <div
    class="relative z-10 flex h-full flex-col justify-between space-y-5 rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-900"
  >
    <div class="ml-auto h-2 w-12 bg-primary dark:bg-accent"></div>

    <div>
      <h3 class="mb-2 text-lg font-bold text-accent dark:text-secondary">
        {item.title}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {item.description}
      </p>
    </div>

    <div
      class="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300"
    >
      <a
        href={item.githubUrl}
        target="_blank"
        class="underline hover:text-primary dark:hover:text-accent"
      >
        View on GitHub
      </a>
      <div class="flex space-x-4">
        <span><StarIcon class="inline h-4"/> {item.stars}</span>
        <span><GitCommitHorizontalIcon class="inline h-4" /> {item.commits}</span>
      </div>
    </div>
  </div>

  <!-- Background card -->
  <div
    aria-hidden="true"
    class="absolute -left-2 -top-2 z-0 h-full w-full space-y-5 rounded-xl bg-primary p-6 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent"
  >
    <div
      class="ml-auto mt-1 h-2 w-12 border border-gray-700 bg-gray-100 opacity-50"
    ></div>
  </div>
</div>
