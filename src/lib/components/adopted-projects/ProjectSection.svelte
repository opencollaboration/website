<script lang="ts">
    import { GithubIcon, GlobeIcon, TwitterIcon } from "@lucide/svelte";
    import ProjectCard from "./ProjectCard.svelte";
    import SocialIcon from "./SocialIcon.svelte";

    export let logo: string;
    export let title: string;
    export let description: string;
    export let projects: any[];
    export let githubUrl: string;
    export let websiteUrl: string;
    export let twitterUrl: string;
</script>

<section
    class="border-t border-gray-200 bg-gray-200 py-6 dark:border-gray-700 dark:bg-gray-800 sm:py-10"
>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-4 mt-4 flex h-24 items-center">
            <img
                src={logo}
                alt={`${title} logo`}
                class="max-h-full max-w-full object-contain"
                loading="lazy"
            />
        </div>

        <div>
            <h3
                class="mb-3 text-4xl font-bold text-primary-900 dark:text-white"
            >
                {title}
            </h3>
            <p class="mb-4 text-base text-primary-600 dark:text-primary-300">
                {description}
            </p>
        </div>

        <div class="flex gap-4 mb-10">
            <SocialIcon href={websiteUrl} label="Website" Icon={GlobeIcon} />
            <SocialIcon href={twitterUrl} label="X (Twitter)" Icon={TwitterIcon} />
            <SocialIcon href={githubUrl} label="GitHub" Icon={GithubIcon} />
        </div>

        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {#each projects as item}
                <ProjectCard {item} />
            {/each}
        </div>

        <a href={githubUrl} class="text-sm tracking-wide text-gray-300">
            View all projects on GitHub
        </a>
    </div>
</section>
