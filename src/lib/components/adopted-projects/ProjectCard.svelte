<script lang="ts">
  import {
    GitCommitHorizontalIcon,
    StarIcon,
    DownloadIcon,
    BookIcon,
    GithubIcon,
  } from "@lucide/svelte";
  import SocialIcon from "./SocialIcon.svelte";
  import ModrinthIcon from "../ui/icons/ModrinthIcon.svelte";

  export let item: {
    icon: string | undefined;
    title: string;
    description: string;
    githubUrl: string;
    modrinthUrl: string | undefined;
    downloadUrl: string | undefined;
    wikiUrl: string | undefined;
    stars: string;
    commits: string;
    cardColor: string | undefined;
  };
</script>

<div class="group/card relative h-full w-full h-[200px]">
  <!-- Front card -->
  <div
    class="relative z-10 flex h-full flex-col justify-between space-y-5 rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-900"
  >
    {#if item.cardColor !== undefined}
      <div class="ml-auto h-2 w-12" style:background={item.cardColor}></div>
    {:else}
      <div class="ml-auto h-2 w-12 bg-primary dark:bg-accent"></div>
    {/if}

    {#if item.icon !== undefined}
      <img
        class="h-[4rem] w-[4rem] rounded-xl"
        alt="Project Icon"
        src={item.icon}
      />
    {/if}

    <div>
      <h3 class="mb-2 text-lg font-bold text-accent dark:text-secondary">
        {item.title}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {item.description}
      </p>
    </div>

    <div
      class="mt-2 grid grid-cols-2 gap-1 items-center text-sm text-gray-600 dark:text-gray-300"
    >
      <div class="flex gap-4 justify-start">
        <SocialIcon href={item.githubUrl} label="GitHub">
          <GithubIcon />
        </SocialIcon>
        {#if item.modrinthUrl !== undefined}
          <SocialIcon href={item.modrinthUrl} label="Modrinth">
            <ModrinthIcon />
          </SocialIcon>
        {/if}
        {#if item.downloadUrl !== undefined}
          <SocialIcon href={item.downloadUrl} label="Download">
            <DownloadIcon />
          </SocialIcon>
        {/if}
        {#if item.wikiUrl !== undefined}
          <SocialIcon href={item.wikiUrl} label="Documentation">
            <BookIcon />
          </SocialIcon>
        {/if}
      </div>
      <div class="flex justify-end space-x-2">
        <span><StarIcon class="inline h-4" /> {item.stars}</span>
        <span><GitCommitHorizontalIcon class="inline h-4" /> {item.commits}</span>
      </div>
    </div>
  </div>

  <!-- Background card -->
  {#if item.cardColor !== undefined}
    <div
      aria-hidden="true"
      class="absolute -left-2 -top-2 z-0 h-full w-full space-y-5 rounded-xl p-6 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4"
      style:background={item.cardColor}
    >
      <div
        class="ml-auto mt-1 h-2 w-12 border border-gray-700 bg-gray-100 opacity-50"
      ></div>
    </div>
  {:else}
    <div
      aria-hidden="true"
      class="absolute -left-2 -top-2 z-0 h-full w-full space-y-5 rounded-xl bg-primary p-6 transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent"
    >
      <div
        class="ml-auto mt-1 h-2 w-12 border border-gray-700 bg-gray-100 opacity-50"
      ></div>
    </div>
  {/if}
</div>
