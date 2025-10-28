<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import IconSun from './IconSun.svelte';
	import IconMoon from './IconMoon.svelte';
	import IconHamburger from './IconHamburger.svelte';

	interface NavItem {
		name: string;
		href: string;
	}

	let navItems: NavItem[] = [
		{ name: 'Our Mission', href: '/our_mission' },
		{ name: 'Adopted Projects', href: '/adopted_projects' },
		{ name: 'Offers', href: '#offers' },
		{ name: 'Our Team', href: '/our_team' },
		{ name: 'Join us!', href: '#contact' }
	];

	const theme: Writable<'light' | 'dark'> = writable('light');
	let mobileMenuOpen = $state(false);

	const applyTheme = (currentTheme: 'light' | 'dark') => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(currentTheme);
		document.documentElement.setAttribute('data-theme', currentTheme);
	};

	onMount(() => {
		const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		if (storedTheme) {
			theme.set(storedTheme);
			applyTheme(storedTheme);
		} else {
			applyTheme('light');
		}

		theme.subscribe(applyTheme);
	});

	const toggleTheme = () => {
		theme.update((current) => {
			const newTheme = current === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			applyTheme(newTheme);
			return newTheme;
		});
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
</script>

<header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo/Title -->
			<a
				href="/"
				class="flex items-center space-x-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 tracking-wider"
			>
				<img
					src="/src/resources/ocp_icon.png"
					alt="Open Collaboration Logo"
					class="h-10 w-auto"
				/>
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
					aria-label={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
					class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{#if $theme === 'light'}
						<IconSun />
					{:else}
						<IconMoon />
					{/if}
				</button>
			</nav>

			<!-- Mobile Menu Controls -->
			<div class="md:hidden flex items-center space-x-2">
				<!-- Theme Toggle Button for Mobile -->
				<button
					on:click={toggleTheme}
					aria-label={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
					class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{#if $theme === 'light'}
						<IconSun />
					{:else}
						<IconMoon />
					{/if}
				</button>
				<!-- Hamburger Button -->
				<button
					on:click={toggleMobileMenu}
					aria-label="Toggle navigation menu"
					aria-expanded={mobileMenuOpen}
					class="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					<IconHamburger />
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<nav class="md:hidden pb-4 space-y-2">
				{#each navItems as item}
					<a
						href={item.href}
						on:click={() => (mobileMenuOpen = false)}
						class="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition duration-150"
					>
						{item.name}
					</a>
				{/each}
			</nav>
		{/if}
	</div>
</header>
