<script lang="ts">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	const partners = [
		{
			name: 'Ziax',
			logo: '/src/resources/partnericons/ziax_logo.svg',
			description: 'Leading infrastructure and development partner',
			hasImage: false
		},
		{
			name: 'Waypoint Studios',
			logo: '/logos/waypoint.png',
			description: 'Creative studio supporting FOSS initiatives',
			hasImage: false
		},
		{
			name: 'Mineville',
			logo: '/logos/mineville.png',
			description: 'Community-focused partner in Minecraft ecosystem',
			hasImage: false
		}
	];

	let partnersWithStatus: typeof partners = $state(partners);

	function checkImage(url: string) {
		return new Promise((resolve) => {
			if (!url) return resolve(false);
			const img = new Image();
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
			img.src = url;
		});
	}

	onMount(async () => {
		const results = await Promise.all(
			partners.map(async (p) => {
				const hasImage = await checkImage(p.logo);
				return { ...p, hasImage };
			})
		);
		partnersWithStatus = results;
	});
</script>

<!-- Hero Section -->
<section class="relative hero-background text-white py-24 sm:py-32 overflow-hidden bg-indigo-700">
undefined
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
		<img
			src="src/resources/ocp_logo.png"
			alt="Open Collaboration Project Logo"
			class="lg:h-[50vh] w-auto mx-auto mb-4 select-none outline-none"
			draggable="false"
			style="outline: none; border: none;"
		/>

		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
			Building Minecraft <span>Open Source Software</span>.
		</h1>
		<p class="text-xl sm:text-2xl lg:text-4xl font-light mb-12">Together with you?</p>
	</div>
</section>

<!-- Mission & Project Summary Section -->
<section id="mission" class="py-16 sm:py-24 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Rounded Box Wrapper -->
		<div class="rounded-3xl bg-gray-50 dark:bg-gray-800 shadow-2xl p-8 sm:p-12 md:p-16 transition duration-300">
			<div class="grid md:grid-cols-[2fr_1fr] gap-8 md:gap-12 items-start">
				<!-- Mission Text (left on desktop, top on mobile) -->
				<div>
					<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
						Our Mission
					</h2>

					<p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						We support <strong class="text-indigo-600 dark:text-indigo-400">Free Open Source Software</strong> in the
						<strong class="text-indigo-600 dark:text-indigo-400">Minecraft Ecosystem</strong>. They're not just individual passion projects: many
						<strong class="text-indigo-600 dark:text-indigo-400">creators, multiplayer servers, and players</strong>
						rely on them. We want to unite interests and empower project maintainers!
					</p>

					<p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						We are here to assist: with the help of our commercial partners, we provide the resources, governance, and infrastructure needed to ensure
						<strong class="text-indigo-600 dark:text-indigo-400">long-term success</strong> for OSS projects that are fundamental to the ecosystem and its users.
					</p>
				</div>

				<!-- Right column: two separate stacked boxes (metric card + CTA card) -->
				<div class="flex flex-col gap-6">
				<!-- Metric Card (non-clickable) -->
				<div class="w-full p-6 sm:p-8 bg-indigo-50 dark:bg-gray-950 rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
						<p class="text-5xl sm:text-7xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-1 leading-none">
							35,000+
						</p>
						<p class="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
							Servers Powered
						</p>
						<p class="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
							by our Adopted Projects
						</p>
					</div>

					<!-- CTA Card filling vertical space -->
					<a
						href="our_mission"
						class="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-600 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 p-6 sm:p-8"
					>
						<p class="text-sm sm:text-base text-indigo-100 mb-2 uppercase tracking-wide">
							Read more
						</p>
						<p class="text-xl sm:text-3xl font-extrabold text-white">
							Our Mission &rarr;
						</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Partners Section -->
<section class="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h3 class="text-3xl sm:text-4xl font-extrabold tracking-wider text-gray-900 dark:text-white mb-4">
				Backed by our Partners
			</h3>
			<p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				We collaborate with leading organizations to support and sustain free and open-source software in the Minecraft ecosystem.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
			{#each partnersWithStatus as partner}
				<div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center transform hover:scale-105">
					<div class="mb-6 h-24 sm:h-32 w-full flex items-center justify-center">
						{#if partner.hasImage}
							<img
								src={partner.logo}
								alt={partner.name}
								class="max-h-full max-w-full object-contain"
								loading="lazy"
								style="outline: none; border: none;"
							/>
						{:else}
							<span class="text-indigo-700 dark:text-indigo-500 font-bold text-lg sm:text-2xl uppercase tracking-wide">
								{partner.name}
							</span>
						{/if}
					</div>
					<h4 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">{partner.name}</h4>
					<p class="text-sm text-gray-600 dark:text-gray-300">{partner.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Get Involved Section -->
<section id="offers" class="py-16 sm:py-24 bg-gray-100 dark:bg-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Get Involved!</h2>

		<div class="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10">
			<!-- Commercial Partners CTA -->
			<div class="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] border-l-4 border-indigo-600">
				<h3 class="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Commercial Partners</h3>
				<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
					Explore partnership opportunities and what we can offer your business.
				</p>
				<a
					href="#commercial-partners"
					class="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150"
				>
					<span>Our Offer</span>
					<svg class="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>

			<!-- Contributors and Maintainers CTA -->
			<div class="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] border-l-4 border-indigo-600">
				<h3 class="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Contributors & Maintainers</h3>
				<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
					Find out how we support projects and how you can benefit.
				</p>
				<a
					href="#maintainers"
					class="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150"
				>
					<span>See what we can do</span>
					<svg class="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	@import 'tailwindcss';

	.hero-background {
		background-image: url('src/resources/upbg3.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
