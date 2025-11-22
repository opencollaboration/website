<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";
  import { mode, setMode } from "mode-watcher";

  function handleModeChange() {
    if (mode.current === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }
</script>

<button
  on:click={handleModeChange}
  type="button"
  class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md
           text-secondary hover:bg-slate-100 hover:text-slate-900
           focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none
           dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50
           dark:focus-visible:ring-slate-500"
  aria-label="Toggle color scheme"
>
  <Sun
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">{mode.current}</span>
</button>
