import { writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore() {
  // Initialize to "light", but will be synced in initialize()
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

  // Get the CURRENT theme from the DOM (set by HTML script or manually)
  function getCurrentThemeFromDOM(): Theme {
    if (typeof document === "undefined") return "light";

    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    return "light";
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
        // Always check the DOM for the actual current state
        const actualCurrent = getCurrentThemeFromDOM();
        const next = actualCurrent === "light" ? "dark" : "light";
        applyTheme(next);

        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", next);
        }

        console.log("Theme toggled from", actualCurrent, "to:", next);
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

      // Sync with what the HTML script already set up
      const actualTheme = getCurrentThemeFromDOM();
      baseStore.set(actualTheme);

      console.log("Theme store initialized to:", actualTheme);
    },
  };
}

export const theme = createThemeStore();
