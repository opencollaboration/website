<script lang="ts">
  import { Rocket } from "@lucide/svelte";

  type Content = {
    title: string;
    description: string;
  };

  let { content }: { content: Content } = $props();
</script>

<div
  class="max-w-2xl mx-auto text-center bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 sm:p-12"
>
  <Rocket class="mx-auto h-12 w-12 text-primary-500" />
  <h2
    class="mt-6 text-2xl font-bold tracking-tight text-primary-900 dark:text-white"
  >
    {content.title}
  </h2>
  <p class="mt-4 text-base leading-7 text-primary-600 dark:text-primary-300">
    {content.description}
  </p>
  <a
          href="/contact"
          class="mt-8 block w-full sm:w-auto sm:min-w-[240px] mx-auto rounded-lg bg-primary dark:bg-accent px-6 py-3 text-base font-semibold text-accent dark:text-primary shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
  >
    Contact Us
  </a>

</div>
