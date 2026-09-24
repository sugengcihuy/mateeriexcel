import { notFound } from "next/navigation";
import { getLessonBySlug, getLessonContent, getExerciseById, getAllModules } from "@/lib/content-loader";
import { LessonWorkspace } from "@/components/lesson/LessonWorkspace";
import { ExerciseData } from "@/types/exercise";

export const revalidate = 0;

export default function LessonPage({
  params,
}: {
  params: { moduleSlug: string; lessonSlug: string };
}) {
  const data = getLessonBySlug(params.moduleSlug, params.lessonSlug);
  if (!data) return notFound();

  const { module: mod, lesson } = data;
  const content = getLessonContent(lesson.contentPath);

  // Load all exercises into map
  const exerciseMap: Record<string, ExerciseData> = {};

  // If content has subtopics, gather all exercise IDs
  if (content && content.subtopics) {
    for (const st of content.subtopics) {
      for (const exId of st.exercises || []) {
        const ex = getExerciseById(exId);
        if (ex) exerciseMap[exId] = ex;
      }
    }
  } else {
    for (const exId of lesson.exercises || []) {
      const ex = getExerciseById(exId);
      if (ex) exerciseMap[exId] = ex;
    }
  }

  // Determine next lesson URL
  const allModules = getAllModules();
  let nextLessonUrl: string | undefined = undefined;

  const currentLessonIndex = mod.lessons.findIndex((l) => l.slug === lesson.slug);
  if (currentLessonIndex < mod.lessons.length - 1) {
    const nextLes = mod.lessons[currentLessonIndex + 1];
    nextLessonUrl = `/modules/${mod.slug}/${nextLes.slug}`;
  } else {
    const currentModIndex = allModules.findIndex((m) => m.slug === mod.slug);
    if (currentModIndex < allModules.length - 1) {
      const nextMod = allModules[currentModIndex + 1];
      if (nextMod.lessons.length > 0) {
        nextLessonUrl = `/modules/${nextMod.slug}/${nextMod.lessons[0].slug}`;
      }
    }
  }

  return (
    <LessonWorkspace
      lessonTitle={lesson.title}
      moduleTitle={mod.title}
      subtopics={content?.subtopics || []}
      exerciseMap={exerciseMap}
      nextLessonUrl={nextLessonUrl}
    />
  );
}
