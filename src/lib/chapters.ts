import chaptersData from "../data/chapters.json";

export interface ChapterMeta {
  subject: string;
  id: string;
  title: string;
  path: string;
  order: number;
  published: boolean;
}

export function getAllChapters(): ChapterMeta[] {
  return (chaptersData as ChapterMeta[]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getChaptersBySubject(subject: string): ChapterMeta[] {
  const normSubject = subject.toLowerCase();
  return getAllChapters().filter(
    (c) => c.subject.toLowerCase() === normSubject && c.published !== false
  );
}

export function getChapterTitle(subject: string, rawChapter: string): string {
  if (!rawChapter || rawChapter === "General") return "General";
  const normSub = subject.toLowerCase();
  const normRaw = rawChapter.toLowerCase().trim();
  
  const found = getAllChapters().find(
    (c) =>
      c.subject.toLowerCase() === normSub &&
      (c.id.toLowerCase() === normRaw || c.path.toLowerCase() === normRaw || c.title.toLowerCase() === normRaw)
  );

  return found ? found.title : rawChapter;
}
