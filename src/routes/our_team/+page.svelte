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

    // NOTE: Updated 'Our Team' href to the root ('/') of this page,
    // and 'Adopted Projects' back to the main page ('/projects').
    // ... rest of your existing code (navItems, partners, benefits, etc.) remains unchanged ...
	const navItems = [
		{ name: 'Our Mission', href: '/our_mission' },
		{ name: 'Adopted Projects', href: '/adopted_projects' },
		{ name: 'Offers', href: '#offers' },
        { name: 'Our Team', href: '/our_team' },
		{ name: 'Join us!', href: '#contact' }
	];
    // --- End: Reusing Theme and Navigation Logic from Main Page ---

    // Define the team members based on the PDF content
    const teamMembers = [
        {
            name: 'Chris',
            role: 'Project Lead', // From PDF Source 4
            description: '"Hey! I\'m Chris. Some hal, Core iρηκα"', // From PDF Source 5-6
            image: 'src/resources/team/chris_profile.png', // Placeholder for profile pic (Source 2)
            hasImage: true, // Assuming this placeholder image will exist
        },
        {
            name: 'Owen',
            role: 'Infrastructure', // From PDF Source 8
            description: 'Focuses on handling the core infrastructure and ensuring smooth operation of all supported projects.', // Synthesized description based on role
            image: 'src/resources/team/owen_profile.png', // Placeholder for profile pic (Source 7)
            hasImage: true, // Assuming this placeholder image will exist
        }
    ];

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
                            aria-current={item.name === 'Our Team' ? 'page' : undefined}
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
                <h1 class="text-5xl font-extrabold text-white mb-4">Our Team</h1>
                <p class="text-xl text-indigo-200 dark:text-indigo-300 max-w-3xl mx-auto">
                    The core group responsible for the infrastructure, communications, and support of all our adopted projects.
                </p>
            </div>
        </section>

        <section class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
            <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-10 lg:gap-16"> 
                    {#each teamMembers as member}
                        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center text-center">
                            <div class="flex-shrink-0 mb-6">
                                {#if member.hasImage}
                                    <img
                                        src={member.image}
                                        alt="{member.name}'s Profile Picture"
                                        class="h-32 w-32 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
                                    />
                                {:else}
                                    <div
                                        class="h-32 w-32 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-6xl font-extrabold"
                                    >
                                        {member.name.charAt(0)}
                                    </div>
                                {/if}
                            </div>
                            
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h2>
                            <p class="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-4">{member.role}</p>
                            <p class="text-lg italic text-gray-600 dark:text-gray-300 max-w-md">
                                {member.description}
                            </p>
                        </div>
                    {/each}
                </div>

                <p class="text-center text-gray-600 dark:text-gray-400 mt-16 text-lg">
                    This group of dedicated people is responsible for
                    [cite_start]**handling infrastructure** [cite: 1][cite_start], **responding to e-mails** [cite: 1][cite_start], and **assisting adopted projects**[cite: 1].
                </p>
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