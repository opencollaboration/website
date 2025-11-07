<script>
	import { teamMembers } from "$lib/assets/data/teamMembersData";
  

  </script>
  
  <section class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
	<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  
	  <div class="flex flex-wrap justify-center gap-8">
		{#each teamMembers as member, i}
		  <figure
			class="font-roboto relative overflow-hidden max-w-[315px] w-full bg-white dark:bg-gray-800 text-dark dark:text-white text-left leading-snug"
		  >
			<img
			  src={member.background}
			  alt="{member.name} background"
			  class="max-w-full align-top opacity-85"
			/>
			<figcaption
			  class="w-full  p-6 relative 
					 before:content-[''] before:absolute before:bottom-full before:left-0 
					 before:w-0 before:h-0 before:border-solid before:border-t-[55px] before:border-t-transparent 
					 before:border-l-[400px] before:border-l-[#141414]"
			>
			  <img
				src={member.image}
				alt="{member.name}'s profile"
				class="profile rounded-full absolute bottom-full left-6 z-10 max-w-[90px] opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
			  />
			  <h2 class="m-0 mb-1.5  text-2xl">
				{member.name}
				<span class="block text-xs text-[#2980b9]">{member.role}</span>
			  </h2>
			  <p class="m-0 mb-2.5 text-sm opacity-80">
				{member.description}
			  </p>
			</figcaption>
		  </figure>
		{/each}
	  </div>

	</div>
  </section>