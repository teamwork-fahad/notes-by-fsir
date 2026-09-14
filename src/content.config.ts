import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// Relaxed note schema: migrated content has variable frontmatter fields.
// Make most fields optional to avoid build-time validation failures.
const noteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  subject: z.string().optional(),
  chapter: z.string().optional(),
  author: z.string().optional(),
});

export const collections = {
  php: defineCollection({ schema: noteSchema }),
  python: defineCollection({ schema: noteSchema }),
  java: defineCollection({ schema: noteSchema }),
  cpp: defineCollection({ schema: noteSchema }),
  c: defineCollection({ schema: noteSchema }),
  mysql: defineCollection({ schema: noteSchema }),
  dsa: defineCollection({ schema: noteSchema }),
  html: defineCollection({ schema: noteSchema }),
  css: defineCollection({ schema: noteSchema }),
  js: defineCollection({ schema: noteSchema }),
  maths: defineCollection({ schema: noteSchema }),
  foc: defineCollection({ schema: noteSchema }),
  docs: defineCollection({ schema: noteSchema }),
};
