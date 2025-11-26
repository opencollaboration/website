<script>
	const helpItems = [
	  {
		title: "Governance & Operations",
		description:
		  "We help projects maintain quality governance — clearly listing maintainers, decision processes, and community standards.",
	  },
	  {
		title: "Stakeholder Engagement",
		description:
		  "We represent projects in conversations with commercial and community partners to encourage contributions and innovation.",
	  },
	  {
		title: "Accessibility & Inclusion",
		description:
		  "We help projects foster inclusive communities through clear guidelines and transparent rules to ensure everyone feels welcome.",
	  },
	];
  </script>
  
  <section class="border-t border-gray-200 bg-gray-200 py-16 dark:border-gray-700 dark:bg-gray-800 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
	  <h2 class="mb-8 text-center text-3xl font-extrabold text-primary-900 dark:text-white sm:mb-12 sm:text-4xl">
		How We help
		<span class="text-primary dark:text-accent"> Adopted Projects </span>
	  </h2>
  
	  <div class="grid gap-10 md:grid-cols-3">
		{#each helpItems as item}
		  <div class="group/card relative h-full w-full">
			<div class="relative z-10 flex h-full flex-col justify-between rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 ease-out group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 dark:bg-gray-900">
			  <div>
				<h3 class="mb-3 text-lg font-bold text-primary-700 dark:text-primary-400 sm:text-2xl">
				  {item.title}
				</h3>
				<p class="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
				  {item.description}
				</p>
			  </div>
			  
			  <div class="mt-6 h-2 w-12 bg-primary dark:bg-accent"></div>
			</div>
  
			<div aria-hidden="true" class="absolute -bottom-2 -right-2 z-0 h-full w-full rounded-xl bg-primary p-8 transition-all duration-300 ease-out group-hover/card:-bottom-4 group-hover/card:-right-4 dark:bg-accent">
			  <div class="opacity-0">
				 <h3 class="mb-3 text-lg font-bold sm:text-2xl">{item.title}</h3>
				 <p class="text-sm sm:text-base">{item.description}</p>
				 <div class="mt-6 h-2 w-12 border border-gray-700"></div>
			  </div>
			</div>
		  </div>
		{/each}
	  </div>
	</div>
  </section>