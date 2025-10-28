import { writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore() {
  const baseStore = writable<Theme>("light");

  // Apply theme to DOM and inject override CSS
  function applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    html.style.colorScheme = theme;

    // Inject CSS that overrides @media(prefers-color-scheme:dark) by forcing light mode
    // when user selects light theme
    if (theme === "light") {
      injectLightModeOverride();
    } else {
      removeLightModeOverride();
    }

    console.log("Applied theme:", theme);
  }

  // Inject CSS that makes browser think it's in light mode (overrides prefers-color-scheme)
  function injectLightModeOverride() {
    if (document.getElementById("theme-override-light")) return;

    const style = document.createElement("style");
    style.id = "theme-override-light";
    style.textContent = `
      @media (prefers-color-scheme: dark) {
        :root { color-scheme: light; }
      }
    `;
    document.head.appendChild(style);
  }

  function removeLightModeOverride() {
    const existing = document.getElementById("theme-override-light");
    if (existing) existing.remove();
  }

  // Get the CURRENT theme from the DOM
  function getCurrentThemeFromDOM(): Theme {
    if (typeof document === "undefined") return "light";
    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    return "light";
  }

  return {
    subscribe: baseStore.subscribe,

    toggle() {
      baseStore.update((_) => {
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

      const actualTheme = getCurrentThemeFromDOM();
      baseStore.set(actualTheme);
      applyTheme(actualTheme);

      console.log("Theme store initialized to:", actualTheme);
    },
  };
}

export const theme = createThemeStore();
