<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.description} />
</svelte:head>

<div class="bg-white dark:bg-gray-900 py-8 mt-20">
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <header class="mb-8">
      <h1
        class="text-4xl font-extrabold text-primary-900 dark:text-white leading-tight mb-2"
      >
        {data.post.title}
      </h1>
      <p class="text-lg text-primary-500 dark:text-primary-400">
        {data.post.description}
      </p>
      <p class="text-sm text-primary-400 dark:text-primary-500 mt-2">
        Published on {new Date(data.post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </header>

    {#if data.post.image}
      <img
        src={data.post.image}
        alt="Cover image for {data.post.title}"
        class="w-full h-auto rounded-lg shadow-md mb-8"
      />
    {/if}

    <div class="prose dark:prose-invert prose-lg max-w-none">
      {@html data.post.content}
    </div>
  </article>
</div>
