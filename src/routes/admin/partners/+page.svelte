<script lang="ts">
  import { enhance } from "$app/forms";
  import LogoUploader from "$lib/components/ui/logo-uploader/LogoUploader.svelte";

  let { form } = $props();
</script>

<div class="bg-white flex justify-center dark:bg-gray-900 py-8 mt-20">
  <div
    class="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
  >
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Add New Partner
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Fill out the form below to add a new partner.
    </p>

    {#if form?.success}
      <div
        class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6"
        role="alert"
      >
        <p class="font-bold">Success!</p>
        <p>{form.message}</p>
      </div>
    {/if}

    {#if form?.errors?.server}
      <div
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6"
        role="alert"
      >
        <p class="font-bold">Error!</p>
        <p>{form.errors.server}</p>
      </div>
    {/if}

    <form
      method="POST"
      use:enhance
      enctype="multipart/form-data"
      class="space-y-6"
    >
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Partner Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {#if form?.errors?.name}
          <p class="text-red-500 text-xs mt-1">{form.errors.name}</p>
        {/if}
      </div>

      <div>
        <label
          for="website"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Website URL
        </label>
        <input
          type="url"
          id="website"
          name="website"
          required
          placeholder="https://example.com"
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {#if form?.errors?.website}
          <p class="text-red-500 text-xs mt-1">{form.errors.website}</p>
        {/if}
      </div>

      <LogoUploader label="Light Mode Logo" namePrefix="lightLogo" />
      {#if form?.errors?.lightLogo}
        <p class="text-red-500 text-xs -mt-4">{form.errors.lightLogo}</p>
      {/if}

      <LogoUploader label="Dark Mode Logo" namePrefix="darkLogo" />
      {#if form?.errors?.darkLogo}
        <p class="text-red-500 text-xs -mt-4">{form.errors.darkLogo}</p>
      {/if}

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="A brief description of the partner and their relationship."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Partner
      </button>
    </form>
  </div>
</div>
