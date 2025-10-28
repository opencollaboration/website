import { writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore() {
  const baseStore = writable<Theme>("light");

  // Apply theme to DOM immediately
  function applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    html.style.colorScheme = theme;

    console.log("Applied theme:", theme);
  }

  // Get the theme preference from localStorage or system
  function getThemePreference(): Theme {
    if (typeof localStorage === "undefined") return "light";

    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    return "light";
  }

  return {
    subscribe: baseStore.subscribe,

    toggle() {
      baseStore.update((current) => {
        const next = current === "light" ? "dark" : "light";
        applyTheme(next);

        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", next);
        }

        console.log("Theme toggled to:", next);
        return next;
      });
    },

    set(theme: Theme) {
      baseStore.set(theme);
      applyTheme(theme);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    },

    initialize() {
      if (typeof window === "undefined") return;

      const pref = getThemePreference();
      baseStore.set(pref);
      applyTheme(pref);
    },
  };
}

export const theme = createThemeStore();
