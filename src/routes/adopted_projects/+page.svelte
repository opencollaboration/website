<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // --- Start: Reusing Theme and Navigation Logic from Main Page ---
    const theme = writable('light');

    const applyTheme = (currentTheme) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
    };

    onMount(() => {
        const storedTheme = localStorage.getItem('theme');
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

    // ... rest of your existing code (navItems, partners, benefits, etc.) remains unchanged ...
	const navItems = [
		{ name: 'Our Mission', href: '/our_mission' },
		{ name: 'Adopted Projects', href: '/adopted_projects' },
		{ name: 'Offers', href: '#offers' },
        { name: 'Our Team', href: '/our_team' },
		{ name: 'Join us!', href: '#contact' }
	];
    // --- End: Reusing Theme and Navigation Logic from Main Page ---

    // Define the list of Adopted Projects based on the PDF content
    const adoptedProjects = [
        {
            name: 'CloudburstMC', // From PDF Source 5
            description: 'CloudburstMC is best known for maintaining the Nukkit Bedrock server software, but also their Minecraft: Bedrock Edition networking and protocol libraries that power many projects across the ecosystem.',
            github: 'https://github.com/CloudburstMC', // Placeholder link
            website: 'https://cloudburstmc.org', // Placeholder link
            logo: 'src/resources//projects/cloudburst_icon.png' // Placeholder for logo path
        },
        {
            name: 'Geyser', // From PDF Source 7, assumed 'Geyser luc is' refers to Geyser
            description: 'GeyserMC is the organization behind the Geyser software, which enables true cross-play between both editions of Minecraft. This is not just limited to servers - this includes resource pack conversions and the Global API that are used by many others!',
            github: 'https://github.com/GeyserMC/Geyser', // Placeholder link
            website: 'https://geysermc.org', // Placeholder link
            logo: 'src/resources/projects/geysermc_icon.png' // Placeholder for logo path
        }
    ];

    // Helper to check image existence (same as in main page)
    function checkImage(url) {
        return new Promise((resolve) => {
            if (!url) return resolve(false);
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    let projectsWithStatus = [];

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

<div class="min-h-screen font-inter bg-gray-50 dark:bg-gray-900">
    <header id="top" class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a
                    href="/"
                    class="flex items-center space-x-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 tracking-wider"
                >
                    <img src="src/resources/ocp_icon.png" alt="Open Collaboration Logo" class="h-10 w-auto" />
                    <span>Open Collaboration</span>
                </a>

                <nav class="hidden md:flex items-center space-x-8">
                    {#each navItems as item}
                        <a
                            href={item.href}
                            class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150 ease-in-out"
                        >
                            {item.name}
                        </a>
                    {/each}
                     <button
                        on:click={toggleTheme}
                        class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {#if $theme === 'light'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M5 5l1.5 1.5" /><path d="M17.5 17.5l1.5 1.5" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M5 19l1.5-1.5" /><path d="M17.5 6.5l1.5-1.5" /></svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                        {/if}
                    </button>
                </nav>

                <div class="md:hidden flex items-center space-x-2">
                    <button
                        on:click={toggleTheme}
                        class="p-2 rounded-full text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {#if $theme === 'light'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M5 5l1.5 1.5" /><path d="M17.5 17.5l1.5 1.5" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M5 19l1.5-1.5" /><path d="M17.5 6.5l1.5-1.5" /></svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
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
        <section class="py-20 sm:py-24 bg-indigo-600 dark:bg-indigo-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-5xl font-extrabold text-white mb-4">Adopted Projects</h1>
                <p class="text-xl text-indigo-200 dark:text-indigo-300 max-w-3xl mx-auto">
                    Listed here are all open-source projects which we support and help maintain.
                </p>
            </div>
        </section>

        <section class="bg-gray-50 dark:bg-gray-900">
            {#each projectsWithStatus as project, index}
                <div class="py-16 sm:py-20 {index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            class="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-10"
                        >
                            <div class="flex-shrink-0">
                                {#if project.hasImage}
                                    <img
                                        src={project.logo}
                                        alt="{project.name} Logo"
                                        class="h-20 w-20 rounded-lg object-contain lg:h-24 lg:w-24"
                                    />
                                {:else}
                                    <div
                                        class="h-20 w-20 lg:h-24 lg:w-24 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-4xl font-bold"
                                    >
                                        {project.name.charAt(0)}
                                    </div>
                                {/if}
                            </div>
                            
                            <div class="flex-grow">
                                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h2>
                                <p class="text-xl text-gray-600 dark:text-gray-300">{project.description}</p>
                            </div>

                            <div class="flex-shrink-0 flex space-x-6 pt-4 lg:pt-0 lg:pl-10">
                                {#if project.github}
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3 4.95 4.95 0 0 0 17 5.4c-1-.7-2.3-1.1-3.6-1.1s-2.6.4-3.6 1.1A4.95 4.95 0 0 0 4.09 3a5.07 5.07 0 0 0-.08 1.77A5.44 5.44 0 0 0 2 11.23c0 4.3 3.3 5.75 6.44 7A3.37 3.37 0 0 0 9 19"/></svg>
                                        <span class="hidden sm:inline">GitHub</span>
                                    </a>
                                {/if}
                                {#if project.website}
                                    <a
                                        href={project.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/></svg>
                                        <span class="hidden sm:inline">Website</span>
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
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
                    Studios or Microsoft.
                </p>
                <p class="text-sm text-gray-500">
                    All product and company names are trademarks or registered
                    trademarks of their respective holders.
                </p>
			</div>
		</div>
	</footer>
</div>

<style>
    @import 'tailwindcss';

    /* Custom variant for manual theme control (Necessary for Tailwind to pick up dark/light classes correctly) */
    @custom-variant dark (&:where(.dark, .dark *));
    @custom-variant light (&:where(.light, .light *));
</style>