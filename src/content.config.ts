import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
  subject: z.string(),
  chapter: z.string(),
  author: z.string(),
});

const createSubjectCollection = (dirName: string) => defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `./src/content/${dirName}`,
  }),
  schema: noteSchema,
});

export const collections = {
  php: createSubjectCollection("php"),
  python: createSubjectCollection("python"),
  java: createSubjectCollection("java"),
  cpp: createSubjectCollection("cpp"),
  c: createSubjectCollection("c"),
  mysql: createSubjectCollection("mysql"),
  dsa: createSubjectCollection("dsa"),
  html: createSubjectCollection("html"),
  css: createSubjectCollection("css"),
  js: createSubjectCollection("js"),
};