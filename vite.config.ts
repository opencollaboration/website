import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    // Add the blocked host to the allowedHosts array
    allowedHosts: [
      "dev.verpitek.com", // todo remove
      "opencollaboration.dev",
      // Add 'localhost' or other hosts you might be using if they get blocked
    ],
  },
});
// vite.config.js
