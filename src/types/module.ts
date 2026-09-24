export interface ModuleData {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: "basic" | "intermediate" | "advanced";
  order: number;
  lessons: LessonData[];
  quiz?: QuizQuestion[];
}

export interface LessonData {
  id: string;
  slug: string;
  moduleId: string;
  title: string;
  order: number;
  summary?: string;
  contentPath: string; // MDX path relative to content root
  exercises: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
