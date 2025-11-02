<script lang="ts">
	import { onMount } from 'svelte';

	interface Project {
		name: string;
		description: string;
		logo: string;
		link: string;
		hasImage: boolean;
	}

	const adoptedProjects: Project[] = [
		{
			name: 'Geyser',
			description: 'Bridges Minecraft Java and Bedrock editions',
			logo: '/resources/projects/geysermc_icon.png',
			link: 'https://geysermc.org',
			hasImage: false
		},
		{
			name: 'Cloudburst',
			description: 'High-performance Minecraft Bedrock server',
			logo: '/resources/projects/cloudburst_icon.png',
			link: '#',
			hasImage: false
		}
	];

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

<!-- Hero Section -->
<section class="py-16 sm:py-24 bg-indigo-600 dark:bg-indigo-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Adopted Projects</h1>
		<p class="text-lg sm:text-xl text-indigo-100 dark:text-indigo-300 max-w-3xl mx-auto">
			Free and open-source projects we actively support and contribute to
		</p>
	</div>
</section>

<!-- Projects Grid -->
<section class="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-2 gap-8">
			{#each projectsWithStatus as project}
				<div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
					<div class="mb-6 h-24 flex items-center">
						{#if project.hasImage}
							<img
								src={project.logo}
								alt={project.name}
								class="max-h-full max-w-full object-contain"
								loading="lazy"
								style="outline: none; border: none;"
							/>
						{:else}
							<span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{project.name}</span>
						{/if}
					</div>
					<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.name}</h3>
					<p class="text-base text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
					<a
						href={project.link}
						class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition"
					>
						Learn More →
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
