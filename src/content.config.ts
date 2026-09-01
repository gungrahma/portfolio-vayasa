import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Primary discipline. Drives the type filter on /portfolio. */
      type: z.enum(["Photography", "Videography"]),
      /** Secondary grouping, e.g. "Wedding", "Portrait", "Commercial". */
      category: z.string(),
      client: z.string(),
      year: z.string(),
      role: z.string(),
      equipment: z.string(),
      shortDescription: z.string(),
      images: z.array(image()).min(1),
      order: z.number().int().nonnegative().default(999),
    }),
});

export const collections = { projects };
