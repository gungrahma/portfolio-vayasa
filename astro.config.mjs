import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE ?? "https://lamfy.example.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
