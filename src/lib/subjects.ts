import subjectsData from "../data/subjects.json";

export interface SubjectMeta {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  published: boolean;
}

export function getAllSubjects(): SubjectMeta[] {
  return (subjectsData as SubjectMeta[]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getActiveSubjects(): SubjectMeta[] {
  return getAllSubjects().filter((s) => s.published !== false);
}

export function getSubjectBySlug(slug: string): SubjectMeta | undefined {
  const normalized = slug.toLowerCase();
  return getAllSubjects().find((s) => s.slug.toLowerCase() === normalized || s.id.toLowerCase() === normalized);
}
