import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const php = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/php",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    subject: z.string(),
    chapter: z.string(),
    author: z.string(),
  }),
});

export const collections = {
  php,
};