<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// --- Shared Theme Logic ---
	const theme = writable('light');
	const applyTheme = (t) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(t);
		document.documentElement.setAttribute('data-theme', t);
	};
	onMount(() => {
		const stored = localStorage.getItem('theme');
		const t = stored || 'light';
		theme.set(t);
		applyTheme(t);
		theme.subscribe(applyTheme);
	});
	const toggleTheme = () => {
		theme.update((c) => {
			const n = c === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', n);
			applyTheme(n);
			return n;
		});
	};

	const navItems = [
		{ name: 'Our Mission', href: '/our_mission' },
		{ name: 'Adopted Projects', href: '/adopted_projects' },
		{ name: 'Offers', href: '#offers' },
		{ name: 'Join us!', href: '#contact' },
		{ name: 'Our Team', href: '/our_team' }
	];
</script>

<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<a href="/" class="flex items-center space-x-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400">
					<img src="src/resources/ocp_icon.png" alt="OCP Logo" class="h-10 w-auto" />
					<span>Open Collaboration</span>
				</a>

				<nav class="hidden md:flex items-center space-x-8">
					{#each navItems as item}
						<a href={item.href} class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">
							{item.name}
						</a>
					{/each}
					<button on:click={toggleTheme} class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
						{#if $theme === 'light'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M2 12h2M20 12h2M5 19l1.5-1.5M17.5 6.5l1.5-1.5"/></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
						{/if}
					</button>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero -->
<section class="relative hero-background text-white py-24 sm:py-32 overflow-hidden">
		<!-- Dark overlay for readability -->
		<div class="absolute inset-0 dark:bg-gray-950/70"></div>

		<div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
			<h1 class="text-6xl sm:text-7xl font-extrabold mb-6">Our Mission</h1>
			<p class="text-2xl sm:text-3xl text-indigo-100 dark:text-indigo-300">
				Supporting creators with open tools, sustained by collaboration.
			</p>
		</div>
</section>


	<!-- Intro -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="max-w-5xl mx-auto px-6 space-y-6">
			<h2 class="text-4xl font-bold text-gray-900 dark:text-white">Introduction</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				Minecraft has always been a game where creators thrive: server networks redefine what multiplayer gaming can be.
				Build teams and Marketplace creators craft rich experiences played by millions.
				Server hosts empower anyone to play together.
			</p>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				But this creation at scale requires powerful technical tooling.
				That’s our mission: supporting creators with first-class open-source software — built in the open, sustained by collaboration, and designed for creative freedom.
			</p>
		</div>
	</section>

	<!-- Why Open Source -->
	<section class="py-20 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Why Open Source?</h2>
			<p class="text-lg text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
				Open Source is not easy — maintaining code, documentation, and community takes work. But the benefits are worth it:
			</p>
			<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Innovative & Community Driven</h3>
					<p class="text-gray-600 dark:text-gray-400">Progress shaped by creators themselves.</p>
				</li>
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Forkable & Extensible</h3>
					<p class="text-gray-600 dark:text-gray-400">Customization for unique needs.</p>
				</li>
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Safe through Transparency</h3>
					<p class="text-gray-600 dark:text-gray-400">Full access to source code.</p>
				</li>
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Accessible to All</h3>
					<p class="text-gray-600 dark:text-gray-400">Free to use and improve.</p>
				</li>
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Educational</h3>
					<p class="text-gray-600 dark:text-gray-400">Encourages learning, collaboration, and best practices.</p>
				</li>
				<li class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
					<h3 class="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">Sustainable Value</h3>
					<p class="text-gray-600 dark:text-gray-400">Better long-term returns compared to private tooling.</p>
				</li>
			</ul>
		</div>
	</section>

	<!-- Our Approach -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="max-w-6xl mx-auto px-6 text-center">
			<h2 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Our Approach</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
				We adopt and support key free and open-source Minecraft projects to make open creation sustainable.
				By working closely with creators and communities, we’re building an ecosystem where everyone — from individuals to large studios — has the freedom to create,
				the support to grow, and the tools to power the future of Minecraft.
			</p>
			<a href="/adopted_projects" class="inline-block mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition font-semibold">
				Read about our Adopted Projects →
			</a>
		</div>
	</section>

	<!-- How We Help -->
	<section class="py-20 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12">How We Help Adopted Projects</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border dark:border-gray-700">
					<h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Governance & Operations</h3>
					<p class="text-gray-600 dark:text-gray-400">
						We help projects maintain quality governance — clearly listing maintainers, decision processes, and community standards.
						We also provide licensing, infrastructure, and build support for long-term success.
					</p>
				</div>

				<div class="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border dark:border-gray-700">
					<h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Stakeholder Engagement</h3>
					<p class="text-gray-600 dark:text-gray-400">
						We represent projects in conversations with commercial and community partners to encourage contributions,
						feature sponsorships, and shared innovation — reducing fragmentation and strengthening the open ecosystem.
					</p>
				</div>

				<div class="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border dark:border-gray-700">
					<h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Accessibility & Inclusion</h3>
					<p class="text-gray-600 dark:text-gray-400">
						We help projects foster inclusive communities through clear contributor guidelines, strong documentation,
						and transparent rules to ensure everyone feels welcome.
					</p>
				</div>
			</div>
		</div>
	</section>

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
	@custom-variant dark (&:where(.dark, .dark *));
	@custom-variant light (&:where(.light, .light *));
	
	.hero-background {
			background-image: url('src/resources/upbg3.png');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
		}
</style>
