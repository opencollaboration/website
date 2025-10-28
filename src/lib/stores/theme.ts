import { writable, type Writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore(): Writable<Theme> {
  // Create the store with default value
  const { subscribe, set, update } = writable<Theme>("light");

  function applyTheme(theme: Theme) {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  return {
    subscribe,
    set: (theme: Theme) => {
      set(theme);
      applyTheme(theme);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    },
    update: (fn: (theme: Theme) => Theme) => {
      update((current) => {
        const next = fn(current);
        set(next);
        applyTheme(next);
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", next);
        }
        return next;
      });
    },
  };
}

export const theme = createThemeStore();
export function initializeTheme() {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    const themeToLoad = stored || "light";

    // Apply immediately to DOM
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeToLoad);
    document.documentElement.setAttribute("data-theme", themeToLoad);

    // Update the store
    theme.set(themeToLoad);
  }
}
