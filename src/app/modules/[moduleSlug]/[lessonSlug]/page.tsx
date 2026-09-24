import { notFound } from "next/navigation";
import { getLessonBySlug, getLessonContent, getExerciseById, getAllModules } from "@/lib/content-loader";
import { LessonContent } from "@/components/lesson/LessonContent";
import { ExercisePanel } from "@/components/lesson/ExercisePanel";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
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

  // Load all 10 exercises for this lesson
  const exerciseList: ExerciseData[] = [];
  for (const exId of lesson.exercises || []) {
    const ex = getExerciseById(exId);
    if (ex) {
      exerciseList.push(ex);
    }
  }

  // Determine next lesson URL if any
  const allModules = getAllModules();
  let nextLessonUrl: string | undefined = undefined;

  const currentLessonIndex = mod.lessons.findIndex((l) => l.slug === lesson.slug);
  if (currentLessonIndex < mod.lessons.length - 1) {
    const nextLes = mod.lessons[currentLessonIndex + 1];
    nextLessonUrl = `/modules/${mod.slug}/${nextLes.slug}`;
  } else {
    // Check next module
    const currentModIndex = allModules.findIndex((m) => m.slug === mod.slug);
    if (currentModIndex < allModules.length - 1) {
      const nextMod = allModules[currentModIndex + 1];
      if (nextMod.lessons.length > 0) {
        nextLessonUrl = `/modules/${nextMod.slug}/${nextMod.lessons[0].slug}`;
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#2D2342] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D2342] bg-white/90 p-3 rounded-2xl border-2 border-[#FFC8DD] shadow-sm">
          <Link href="/modules" className="hover:text-[#FF758F] flex items-center gap-1 font-black">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Daftar Pelajaran</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600 font-bold">{mod.title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#FF758F] font-black">{lesson.title}</span>
        </div>

        {/* Main Grid Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Reading Content */}
          <div className="lg:col-span-5 space-y-6">
            {content ? (
              <LessonContent
                title={content.title || lesson.title}
                subtitle={content.subtitle}
                sections={content.sections || []}
              />
            ) : (
              <div className="p-6 bg-white rounded-3xl border-2 border-[#FFC8DD] shadow-md">
                <h2 className="font-black text-lg text-[#2D2342]">{lesson.title}</h2>
                <p className="text-sm text-slate-600 mt-2">{lesson.summary}</p>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Sandbox & Exercise */}
          <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-3xl border-2 border-[#FFC8DD] shadow-md">
            <ExercisePanel exerciseList={exerciseList} nextLessonUrl={nextLessonUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
