<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const publishedOn = $derived(
    new Date(data.post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );
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

      <div class="flex items-center gap-3 mt-6">
        {#if data.post.author}
          <img
            src={data.post.author.image}
            alt="{data.post.author.name}'s profile"
            class="h-11 w-11 rounded-full object-cover bg-gray-100 dark:bg-gray-800"
          />
        {/if}
        <div class="text-sm leading-snug">
          {#if data.post.author}
            <p class="font-semibold text-gray-900 dark:text-white">
              {data.post.author.name}
              <span class="font-normal text-gray-500 dark:text-gray-400">
                · {data.post.author.role}</span
              >
            </p>
          {/if}
          <p class="text-gray-500 dark:text-gray-400">
            <time datetime={data.post.date}>{publishedOn}</time>
          </p>
        </div>
      </div>
    </header>

    {#if data.post.image}
      <img
        src={data.post.image}
        alt="Cover image for {data.post.title}"
        class="w-full h-auto rounded-lg shadow-md mb-8"
      />
    {/if}

    <div class="article-body text-gray-800 dark:text-gray-200">
      {@html data.post.content}
    </div>
  </article>
</div>

<style>
  /* No typography plugin is installed, so style the rendered markdown here */
  .article-body {
    font-size: 1.0625rem;
    line-height: 1.75;
  }
  .article-body :global(p),
  .article-body :global(ul),
  .article-body :global(ol),
  .article-body :global(table) {
    margin-bottom: 1.25em;
  }
  .article-body :global(h2) {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 2em 0 0.75em;
  }
  .article-body :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.6em 0 0.6em;
  }
  .article-body :global(a) {
    color: #0284c7;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  :global(.dark) .article-body :global(a) {
    color: #38bdf8;
  }
  .article-body :global(ul) {
    list-style: disc;
    padding-left: 1.5em;
  }
  .article-body :global(ol) {
    list-style: decimal;
    padding-left: 1.5em;
  }
  .article-body :global(li) {
    margin: 0.35em 0;
  }
  .article-body :global(code) {
    font-size: 0.875em;
    padding: 0.15em 0.35em;
    border-radius: 0.25rem;
    background: rgb(0 0 0 / 0.06);
  }
  :global(.dark) .article-body :global(code) {
    background: rgb(255 255 255 / 0.1);
  }
  .article-body :global(table) {
    display: block;
    overflow-x: auto;
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .article-body :global(th),
  .article-body :global(td) {
    padding: 0.6em 0.8em;
    border-bottom: 1px solid rgb(0 0 0 / 0.1);
    text-align: left;
    vertical-align: top;
  }
  :global(.dark) .article-body :global(th),
  :global(.dark) .article-body :global(td) {
    border-bottom-color: rgb(255 255 255 / 0.12);
  }
  .article-body :global(th) {
    font-weight: 600;
  }

  /* Inline SVG diagrams take their colors from the text color, so they follow the theme */
  .article-body :global(figure.diagram) {
    margin: 2em 0;
    overflow-x: auto;
  }
  .article-body :global(figure.diagram svg) {
    display: block;
    width: 100%;
    min-width: 560px;
    height: auto;
  }
  .article-body :global(figure.diagram .ink) {
    fill: currentColor;
  }
  .article-body :global(figure.diagram .quiet) {
    fill: currentColor;
    fill-opacity: 0.65;
  }
  .article-body :global(figure.diagram .edge) {
    stroke: currentColor;
    stroke-opacity: 0.45;
  }
  .article-body :global(figure.diagram .edge-fill) {
    fill: currentColor;
    fill-opacity: 0.45;
  }
  .article-body :global(figure.diagram .accent) {
    stroke: #0ea5e9;
    fill: #0ea5e9;
    fill-opacity: 0.12;
  }
  .article-body :global(figure.diagram figcaption) {
    margin-top: 0.5em;
    font-size: 0.875rem;
    text-align: center;
    opacity: 0.7;
  }
</style>
