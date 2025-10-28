<script lang="ts">
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
</script>

<footer class="bg-gray-800 dark:bg-gray-950 text-white py-12" id="contact">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-3 gap-8">
			<!-- Navigation Links -->
			<div>
				<h4 class="text-lg font-semibold mb-4">Navigation</h4>
				<ul class="space-y-3 text-gray-400 text-sm">
					{#each navItems as item}
						<li>
							<a href={item.href} class="hover:text-indigo-400 transition duration-150">
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Info Links -->
			<div>
				<h4 class="text-lg font-semibold mb-4">Info</h4>
				<ul class="space-y-3 text-gray-400 text-sm">
					<li><a href="/our_team" class="hover:text-indigo-400 transition duration-150">Our Team</a></li>
					<li>
						<a
							href="https://ziax.com/terms/privacy-policy/"
							class="hover:text-indigo-400 transition duration-150"
						>
							Privacy Policy
						</a>
					</li>
				</ul>
			</div>

			<!-- Contact & Social -->
			<div class="col-span-2 md:col-span-1">
				<h4 class="text-lg font-semibold mb-4">Get in Touch</h4>
				<ul class="space-y-3 text-gray-400 text-sm">
					<li>
						<a href="mailto:contact@opencollaboration.dev" class="hover:text-indigo-400 transition duration-150">
							contact@opencollaboration.dev
						</a>
					</li>
					<li>
						<a href="https://x.com/opencollaboration" class="hover:text-indigo-400 transition duration-150">
							Twitter / X
						</a>
					</li>
					<li>
						<a href="https://github.com/opencollaboration" class="hover:text-indigo-400 transition duration-150">
							GitHub
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-700 dark:border-gray-800 mt-10 pt-6 text-center">
			<p class="text-sm text-gray-500">
				&copy; {new Date().getFullYear()} Open Collaboration. All rights reserved.
			</p>
			<p class="text-sm text-gray-500 mt-2">
				This website is not an official Minecraft website and is not associated with Mojang Studios or
				Microsoft.
			</p>
			<p class="text-sm text-gray-500 mt-2">
				All product and company names are trademarks or registered trademarks of their respective holders.
			</p>
		</div>
	</div>
</footer>
