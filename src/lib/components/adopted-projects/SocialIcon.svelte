<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let href: string;
  export let label: string;
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={label}
  title={label}
  class="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
>
  <div class="flex h-5 w-5 items-center justify-center">
    <slot />
  </div>
</a>