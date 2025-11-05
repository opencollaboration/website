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
  <Rocket class="mx-auto h-12 w-12 text-indigo-500" />
  <h2
    class="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
  >
    {content.title}
  </h2>
  <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
    {content.description}
  </p>
  <form class="mt-8 flex gap-x-4 max-w-md mx-auto">
    <label for="email-address" class="sr-only">Email address</label>
    <input
      id="email-address"
      name="email"
      type="email"
      autocomplete="email"
      required
      class="min-w-0 flex-auto rounded-md border-0 bg-white dark:bg-gray-800 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      placeholder="Enter your email"
    />
    <button
      type="submit"
      class="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Notify Me
    </button>
  </form>
</div>
