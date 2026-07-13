<script lang="ts">
    import { GithubIcon, GlobeIcon, TwitterIcon } from "@lucide/svelte";
    import ProjectCard from "./ProjectCard.svelte";
    import SocialIcon from "./SocialIcon.svelte";
    import ModrinthIcon from "../ui/icons/ModrinthIcon.svelte";

    export let logo: string;
    export let title: string;
    export let description: string;
    export let projects: any[];
    export let githubUrl: string;
    export let websiteUrl: string | undefined = undefined;
    export let twitterUrl: string | undefined = undefined;
    export let modrinthUrl: string | undefined = undefined;
    export let index: number = 0;
</script>

<section
    class={`border-t border-gray-200 py-6 sm:py-10
        ${index % 2 === 0 ? 'bg-background dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-800'} 
        ${index % 2 === 0 ? 'dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'}`}
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
            <p class="mb-4 text-base text-gray-500 dark:text-gray-300">
                {description}
            </p>
        </div>

        <div class="flex gap-4 mb-10">
            <SocialIcon href={githubUrl} label="GitHub">
                <GithubIcon />
            </SocialIcon>
            {#if websiteUrl !== undefined}
	            <SocialIcon href={websiteUrl} label="Website">
                    <GlobeIcon />
                </SocialIcon>
            {/if}
            {#if modrinthUrl !== undefined}
                <SocialIcon href={modrinthUrl} label="Modrinth">
                    <ModrinthIcon />
                </SocialIcon>
            {/if}
            {#if twitterUrl !== undefined}
                <SocialIcon href={twitterUrl} label="X (Twitter)">
                    <TwitterIcon />
                </SocialIcon>
            {/if}
        </div>

        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {#each projects as item}
                <ProjectCard {item} />
            {/each}
        </div>
    </div>
</section>
