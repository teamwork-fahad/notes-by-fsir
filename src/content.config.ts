import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Relaxed note schema: migrated content has variable frontmatter fields.
// Make most fields optional to avoid build-time validation failures.
const noteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  subject: z.string().optional(),
  chapter: z.string().optional(),
  author: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional().default(true),
});

const noteCollection = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: `./src/content/${folder}` }),
    schema: noteSchema,
  });

export const collections = {
  php: noteCollection("php"),
  python: noteCollection("python"),
  java: noteCollection("java"),
  cpp: noteCollection("cpp"),
  c: noteCollection("c"),
  mysql: noteCollection("mysql"),
  plsql: noteCollection("plsql"),
  dsa: noteCollection("dsa"),
  html: noteCollection("html"),
  css: noteCollection("css"),
  js: noteCollection("js"),
  maths: noteCollection("maths"),
  foc: noteCollection("foc"),
  docs: noteCollection("docs"),
};
