<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Theme store - now defaults to 'light' and ignores system preference
	const theme = writable('light');

	// Force theme by setting class on <html> - this is the core change
	const applyTheme = (currentTheme) => {
		// Remove any existing theme classes
		document.documentElement.classList.remove('light', 'dark');
		// Force the chosen theme class
		document.documentElement.classList.add(currentTheme);

		// Optional: also set data-theme attribute for compatibility
		document.documentElement.setAttribute('data-theme', currentTheme);
	};

	// Load ONLY from localStorage, ignore system preference
	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			theme.set(storedTheme);
			applyTheme(storedTheme);
		} else {
			// Default to light theme, no system detection
			applyTheme('light');
		}

		// Subscribe store to apply theme changes
		theme.subscribe(applyTheme);
	});

	// Toggle light <-> dark - now forces the chosen theme
	const toggleTheme = () => {
		theme.update((current) => {
			const newTheme = current === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			applyTheme(newTheme); // Force apply immediately
			return newTheme;
		});
	};

	// ... rest of your existing code (navItems, partners, benefits, etc.) remains unchanged ...
	const navItems = [
		{ name: 'Our Mission', href: '/our_mission' },
		{ name: 'Adopted Projects', href: '/adopted_projects' },
		{ name: 'Offers', href: '#offers' },
		{ name: 'Join us!', href: '#contact' },
		{ name: 'Our Team', href: '/our_team' }
	];

	const partners = [
		{ name: 'Ziax', logo: '/src/resources/partnericons/ziax_logo.svg' },
		{ name: 'Waypoint Studios', logo: '/logos/waypoint.png' },
		{ name: 'Mineville', logo: '/logos/mineville.png' }
	];

	let partnersWithStatus = [];

	function checkImage(url) {
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
		partnersWithStatus = [...results, ...results];
	});

	const benefits = [
		{
			title: 'Innovative and Transparent',
			description: 'Source code access and open development encourages continuous improvement.'
		},
		{
			title: 'Forkable and Resilient',
			description:
				'The community ensures long-term maintenance and protection against single-point failures.'
		},
		{
			title: 'Community Driven Access',
			description: 'Transparent and accessible development ensures broad user participation.'
		},
		{
			title: 'Encourages Learning',
			description:
				'A free environment to study code, learn best practices, and contribute directly.'
		},
		{
			title: 'Free to Use',
			description: 'No cost barrier for creators, multiplayer servers, and individual players.'
		},
		{
			title: 'Secure Long-term Development',
			description: 'With commercial partner support, we back projects for stability.'
		}
	];
</script>

<!-- Global styles and container. Apply theme class here and use dark: prefixes everywhere -->
<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900">
	<!-- Fixed Header/Navigation Bar -->
	<header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo/Title: Updated name and logo image -->
				<a
					href="/"
					class="flex items-center space-x-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 tracking-wider"
				>
					<!-- LOGO HEIGHT INCREASED FROM h-8 TO h-10 -->
					<img src="src/resources/ocp_icon.png" alt="Open Collaboration Logo" class="h-10 w-auto" />
					<span>Open Collaboration</span>
				</a>

				<!-- Desktop Navigation & Toggle -->
				<nav class="hidden md:flex items-center space-x-8">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150 ease-in-out"
						>
							{item.name}
						</a>
					{/each}

					<!-- Theme Toggle Button (Desktop) -->
					<button
						on:click={toggleTheme}
						class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						{#if $theme === 'light'}
							<!-- Sun (Light Mode Icon) -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-6 h-6"
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2" />
								<path d="M12 20v2" />
								<path d="M5 5l1.5 1.5" />
								<path d="M17.5 17.5l1.5 1.5" />
								<path d="M2 12h2" />
								<path d="M20 12h2" />
								<path d="M5 19l1.5-1.5" />
								<path d="M17.5 6.5l1.5-1.5" />
							</svg>
						{:else}
							<!-- Moon (Dark Mode Icon) -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-6 h-6"
							>
								<path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
							</svg>
						{/if}
					</button>
				</nav>

				<!-- Mobile Menu Placeholder & Toggle Button -->
				<div class="md:hidden flex items-center space-x-2">
					<!-- Theme Toggle Button for Mobile -->
					<button
						on:click={toggleTheme}
						class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						{#if $theme === 'light'}
							<!-- Sun (Light Mode Icon) -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-6 h-6"
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2" />
								<path d="M12 20v2" />
								<path d="M5 5l1.5 1.5" />
								<path d="M17.5 17.5l1.5 1.5" />
								<path d="M2 12h2" />
								<path d="M20 12h2" />
								<path d="M5 19l1.5-1.5" />
								<path d="M17.5 6.5l1.5-1.5" />
							</svg>
						{:else}
							<!-- Moon (Dark Mode Icon) -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-6 h-6"
							>
								<path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
							</svg>
						{/if}
					</button>
					<button
						class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>

	<main>
		<!-- Hero Section (Page 1: "We Open Source. And you?") -->
		<section
			class="relative hero-background text-white py-24 sm:py-32 overflow-hidden bg-indigo-700"
		>
			<!-- Dark overlay for text readability -->
			<div class="absolute inset-0 bg-indigo-900/70 dark:bg-gray-950/70"></div>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
				<img
					src="src/resources/ocp_logo.png"
					alt="Open Collaboration Project Logo"
					class="lg:h-[50vh] w-auto mx-auto mb-4"
				/>

				<h1 class="text-6xl sm:text-6xl lg:text-5xl font-extrabold mb-6">
					We ❤️ <span>Open Source</span>.
				</h1>
				<p class="text-3xl sm:text-4xl font-light mb-12">And you?</p>
			</div>
		</section>

		<!-- Mission & Project Summary Section (Page 1 content) -->
		<section
			id="mission"
			class="py-16 sm:py-24 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
		>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
				<!-- Mission Text -->
				<div class="order-2 md:order-1">
					<h2 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Mission</h2>
					<p class="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						We support <strong class="text-indigo-600 dark:text-indigo-400"
							>FOSS Projects in the Minecraft Ecosystem</strong
						> to help them thrive. They're not just individual passion projects: many creators, multiplayer
						servers, and players rely on them.
					</p>
					<p class="text-lg text-gray-500 dark:text-gray-400 mb-8">
						We're here to assist: with the help of our commercial partners, we want to back projects
						to secure long-term development.
					</p>
					<a
						href="our_mission"
						class="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition duration-150"
					>
						Read more about Our Mission &rarr;
					</a>
				</div>

				<!-- Project Metrics and Partners -->
				<div
					class="order-1 md:order-2 space-y-8 p-6 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl shadow-lg"
				>
					<div id="projects" class="text-center">
						<p class="text-6xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">35,000+</p>
						<p class="text-xl font-medium text-gray-700 dark:text-gray-300">
							Servers Powered by our Adopted Projects
						</p>
					</div>
				</div>
			</div>
		</section>


		<!-- Carousel Section -->
		<section
			class="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
		>
			<div class="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
				<h3
					class="text-center text-xl font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6"
				>
					Backed by our Partners
				</h3>

				<div class="relative w-full overflow-hidden">
					<div class="flex flex-nowrap animate-scroll">
						{#each partnersWithStatus as partner}
							<div class="flex-shrink-0 px-4 sm:px-6 flex justify-center items-center">
								<div
									class="w-40 h-16 sm:w-52 sm:h-20 flex items-center justify-center
                         p-3 rounded-xl shadow-md transition duration-300
                         border border-indigo-200 dark:border-indigo-700
                         bg-pink-200
                         hover:bg-pink-200 dark:hover:bg-indigo-300"
								>
									{#if partner.hasImage}
										<img
											src={partner.logo}
											alt={partner.name}
											class="max-h-full max-w-full object-contain partner-image"
											loading="lazy"
										/>
									{:else}
										<span
											class="text-indigo-700 dark:text-indigo-500 font-bold uppercase tracking-wide"
										>
											{partner.name}
										</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<style>
			@keyframes scroll {
				0% {
					transform: translateX(0);
				}
				100% {
					transform: translateX(-50%);
				}
			}
			.animate-scroll {
				animation: scroll 20s linear infinite;
			}
		</style>

		<!-- Offer/CTA Section (Page 2 content) -->
		<section id="offers" class="py-16 sm:py-24 bg-indigo-700 dark:bg-indigo-950">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 class="text-4xl font-extrabold text-white mb-6">Get Involved!</h2>

				<div class="grid md:grid-cols-2 gap-8 mt-10">
					<!-- Commercial Partners CTA -->
					<div
						class="p-8 bg-indigo-600 dark:bg-indigo-800 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02]"
					>
						<h3 class="text-3xl font-bold text-yellow-300 mb-4">Commercial Partners</h3>
						<p class="text-indigo-200 dark:text-indigo-300 mb-6">
							Explore partnership opportunities and what we can offer your business.
						</p>
						<a
							href="#commercial-partners"
							class="inline-flex items-center space-x-2 text-white font-semibold hover:text-yellow-300 transition duration-150"
						>
							<span>Our Offer</span>
							<svg
								class="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition duration-150"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/></svg
							>
						</a>
					</div>

					<!-- Contributors and Maintainers CTA -->
					<div
						class="p-8 bg-indigo-600 dark:bg-indigo-800 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02]"
					>
						<h3 class="text-3xl font-bold text-yellow-300 mb-4">Contributors & Maintainers</h3>
						<p class="text-indigo-200 dark:text-indigo-300 mb-6">
							Find out how we support projects and how you can benefit.
						</p>
						<a
							href="#maintainers"
							class="inline-flex items-center space-x-2 text-white font-semibold hover:text-yellow-300 transition duration-150"
						>
							<span>See what we can do</span>
							<svg
								class="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition duration-150"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/></svg
							>
						</a>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="bg-gray-800 dark:bg-gray-950 text-white py-12" id="contact">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				<!-- Site Map Links -->
				<div>
					<h4 class="text-lg font-semibold mb-4">Navigation</h4>
					<ul class="space-y-3 text-gray-400 text-sm">
						{#each navItems as item}
							<li>
								<a href={item.href} class="hover:text-indigo-400 transition duration-150"
									>{item.name}</a
								>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Legal/Info -->
				<div>
					<h4 class="text-lg font-semibold mb-4">Info</h4>
					<ul class="space-y-3 text-gray-400 text-sm">
						<li><a href="#" class="hover:text-indigo-400 transition duration-150">Our team</a></li>
						<li>
							<a
								href="https://ziax.com/terms/privacy-policy/"
								class="hover:text-indigo-400 transition duration-150">Privacy Policy</a
							>
						</li>
					</ul>
				</div>

				<!-- Contact/Social -->
				<div class="col-span-2 md:col-span-2">
					<h4 class="text-lg font-semibold mb-4">Get in Touch</h4>
					<p class="text-gray-400 text-sm mb-4">
						Follow our social links to stay up to date with FOSS project announcements.
					</p>
					<div class="flex space-x-4">
						<!-- Social Links Placeholder -->
						<!-- Add more social links (Twitter, Discord, etc.) -->
					</div>
				</div>
			</div>

			<div class="border-t border-gray-700 dark:border-gray-800 mt-10 pt-6 text-center">
				<p class="text-sm text-gray-500">
					&copy; {new Date().getFullYear()} Open Collaboration. All rights reserved.
				</p>
				<p class="text-sm text-gray-500">
					This website is not an official Minecraft website and is not associated with Mojang
					Studios or Microsoft. All product and company names are trademarks or registered
					trademarks of their respective holders. Use of these names does not imply any affiliation
					or endorsement by them.
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	@import 'tailwindcss';

	/* Custom variant for manual theme control */
	@custom-variant dark (&:where(.dark, .dark *));
	@custom-variant light (&:where(.light, .light *));

	/* Your existing custom styles remain unchanged */
	.hero-background {
		background-image: url('src/resources/upbg3.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	@keyframes jump {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.8;
		}
		50% {
			transform: translateY(-8px);
			opacity: 1;
		}
	}

	@keyframes scroll-x {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.animate-jump {
		animation: jump 1.5s infinite ease-in-out;
	}
	.animate-scroll {
		animation: scroll-x 30s linear infinite;
	}
</style>
