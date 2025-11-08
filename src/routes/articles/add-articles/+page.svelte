<script lang="ts">
  import { enhance } from "$app/forms";

  let { form } = $props();
</script>

<div
  class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
>
  <div
    class="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
  >
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Add New Article
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Fill out the form below to publish a new article.
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

    <form
      method="POST"
      use:enhance
      enctype="multipart/form-data"
      class="space-y-6"
    >
      <div>
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {#if form?.errors?.title}
          <p class="text-red-500 text-xs mt-1">{form.errors.title}</p>
        {/if}
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        {#if form?.errors?.description}
          <p class="text-red-500 text-xs mt-1">{form.errors.description}</p>
        {/if}
      </div>

      <div>
        <label
          for="date"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Publication Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {#if form?.errors?.date}
          <p class="text-red-500 text-xs mt-1">{form.errors.date}</p>
        {/if}
      </div>

      <!-- Image Upload -->
      <div>
        <label
          for="image"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cover Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          required
          accept="image/png, image/jpeg, image/webp, image/gif"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {#if form?.errors?.image}
          <p class="text-red-500 text-xs mt-1">{form.errors.image}</p>
        {/if}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Article
      </button>
    </form>
  </div>
</div>
