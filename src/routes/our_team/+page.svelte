<script lang="ts">
	interface TeamMember {
		name: string;
		role: string;
		description: string;
		image: string;
		hasImage: boolean;
	}

	const teamMembers: TeamMember[] = [
		{
			name: 'Chris',
			role: 'Project Lead',
			description:
				'Leads the Open Collaboration Project with a focus on community-driven development and ensuring the success of all adopted open-source projects.',
			image: 'src/resources/team/chris_profile.png',
			hasImage: false
		},
		{
			name: 'Owen',
			role: 'Infrastructure',
			description:
				'Focuses on handling the core infrastructure and ensuring smooth operation of all supported projects. Manages the technical backbone that keeps our ecosystem running.',
			image: 'src/resources/team/owen_profile.png',
			hasImage: false
		}
	];
</script>

<!-- Hero Section -->
<section class="py-16 sm:py-24 bg-indigo-600 dark:bg-indigo-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Team</h1>
		<p class="text-lg sm:text-xl text-indigo-100 dark:text-indigo-300 max-w-3xl mx-auto">
			The core group responsible for the infrastructure, communications, and support of all our adopted projects.
		</p>
	</div>
</section>

<!-- Team Members Section -->
<section class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
	<div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-10 lg:gap-16">
			{#each teamMembers as member}
				<div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl flex flex-col items-center text-center">
					<div class="flex-shrink-0 mb-6">
						{#if member.hasImage}
							<img
								src={member.image}
								alt="{member.name}'s Profile Picture"
								class="h-32 w-32 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
							/>
						{:else}
							<div class="h-32 w-32 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-6xl font-extrabold">
								{member.name.charAt(0)}
							</div>
						{/if}
					</div>

					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h2>
					<p class="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">{member.role}</p>
					<p class="text-base sm:text-lg italic text-gray-600 dark:text-gray-300 max-w-md">
						{member.description}
					</p>
				</div>
			{/each}
		</div>

		<p class="text-center text-gray-600 dark:text-gray-400 mt-12 sm:mt-16 text-base sm:text-lg">
			This group of dedicated people is responsible for <strong class="text-indigo-600 dark:text-indigo-400">handling infrastructure</strong>, <strong class="text-indigo-600 dark:text-indigo-400">responding to communications</strong>, and <strong class="text-indigo-600 dark:text-indigo-400">assisting adopted projects</strong>.
		</p>
	</div>
</section>
