import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE ?? "https://vayasa.example.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
