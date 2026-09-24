import fs from "fs";
import path from "path";
import { ModuleData, LessonData, LessonContentData } from "@/types/module";
import { ExerciseData } from "@/types/exercise";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllModules(): ModuleData[] {
  const modulesDir = path.join(CONTENT_DIR, "modules");
  if (!fs.existsSync(modulesDir)) return [];

  const entries = fs.readdirSync(modulesDir, { withFileTypes: true });
  const modules: ModuleData[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const moduleMetaPath = path.join(modulesDir, entry.name, "module.json");
      if (fs.existsSync(moduleMetaPath)) {
        try {
          const raw = fs.readFileSync(moduleMetaPath, "utf-8");
          const mod = JSON.parse(raw) as ModuleData;
          modules.push(mod);
        } catch (e) {
          console.error(`Failed to parse module meta at ${moduleMetaPath}`, e);
        }
      }
    }
  }

  return modules.sort((a, b) => a.order - b.order);
}

export function getModuleBySlug(slug: string): ModuleData | null {
  const modules = getAllModules();
  return modules.find((m) => m.slug === slug) || null;
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string): { module: ModuleData; lesson: LessonData } | null {
  const moduleData = getModuleBySlug(moduleSlug);
  if (!moduleData) return null;

  const lesson = moduleData.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  return { module: moduleData, lesson };
}

export function getLessonContent(contentPath: string): LessonContentData | null {
  const fullPath = path.join(CONTENT_DIR, "modules", contentPath);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to read lesson content at ${fullPath}`, e);
    return null;
  }
}

export function getExerciseById(exerciseId: string): ExerciseData | null {
  const exercisePath = path.join(CONTENT_DIR, "exercises", `${exerciseId}.json`);
  if (!fs.existsSync(exercisePath)) return null;

  try {
    const raw = fs.readFileSync(exercisePath, "utf-8");
    return JSON.parse(raw) as ExerciseData;
  } catch (e) {
    console.error(`Failed to read exercise at ${exercisePath}`, e);
    return null;
  }
}
