import { writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore() {
  // Initialize with a default value
  const { subscribe, set } = writable<Theme>("light");

  let currentTheme: Theme = "light";
  subscribe((t) => {
    currentTheme = t;
  });

  // Apply theme to DOM
  function applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }

  // Load from localStorage and apply
  function loadTheme() {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return;

    const saved = localStorage.getItem("theme") as Theme | null;
    const themeToUse = saved || "light";

    set(themeToUse);
    applyTheme(themeToUse);
  }

  return {
    subscribe,
    toggle: () => {
      const next = currentTheme === "light" ? "dark" : "light";
      set(next);
      applyTheme(next);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", next);
      }
    },
    set: (theme: Theme) => {
      set(theme);
      applyTheme(theme);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    },
    init: loadTheme,
  };
}

export const theme = createThemeStore();
