import { writable, type Writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore(): Writable<Theme> {
  // Create the store
  const { subscribe, set, update } = writable<Theme>("light");

  // Load theme on mount
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      set(stored);
      applyTheme(stored);
    } else {
      applyTheme("light");
    }
  }

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
      applyTheme(theme);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
      set(theme);
    },
    update: (fn: (theme: Theme) => Theme) => {
      update((current) => {
        const next = fn(current);
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
