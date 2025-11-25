<script>
  import { teamMembers } from "$lib/assets/data/teamMembersData";
</script>

<section class="bg-gray-50 py-16 dark:bg-gray-800 sm:py-24">
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap justify-center gap-10">
      {#each teamMembers as member, i}
        <div class="group/card relative w-full max-w-[315px] min-h-[200px]">
          <figure
            class="font-roboto relative z-10 h-full w-full overflow-hidden rounded-xl bg-white text-left leading-snug shadow-lg transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:translate-y-1 dark:bg-gray-900 dark:text-white"
          >
            <div class="h-40 w-full overflow-hidden">
              <img
                src={member.background}
                alt="{member.name} background"
                class="h-full w-full object-cover opacity-85"
              />
            </div>
            <figcaption
              class="relative w-full p-6 text-white dark:text-gray-900
                                   before:absolute before:bottom-full before:left-0 before:h-0 before:w-0
                                   before:border-t-[55px] before:border-solid before:border-t-transparent
                                   before:border-l-[400px] before:border-l-current"
            >
              <img
                src={member.image}
                alt="{member.name}'s profile"
                class="absolute bottom-full left-6 z-10 h-20 w-20 rounded-full bg-primary border-4 border-white shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:border-gray-900"
              />

              <div class="text-gray-900 dark:text-white">
                <h2 class="m-0 mb-1.5 text-2xl font-bold">
                  {member.name}
                  <span
                    class="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-accent"
                  >
                    {member.role}
                  </span>
                </h2>
                <p class="m-0 mb-2.5 text-sm text-gray-500 dark:text-gray-400">
                  {member.description}
                </p>
              </div>
            </figcaption>
          </figure>

          <div
            aria-hidden="true"
            class="absolute -left-2 -top-2 z-0 h-full w-full rounded-xl bg-primary transition-all duration-300 ease-out group-hover/card:-left-4 group-hover/card:-top-4 dark:bg-accent"
          ></div>
        </div>
      {/each}
    </div>
  </div>
</section>
