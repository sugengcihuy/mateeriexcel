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
  contentPath: string;
  exercises: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SubtopicSection {
  type: "concept" | "tip" | "warning";
  heading: string;
  body: string;
}

export interface SubtopicData {
  id: string;
  title: string;
  icon?: string;
  subtitle?: string;
  sections: SubtopicSection[];
  exercises: string[]; // 3 exercise IDs per subtopic
}

export interface LessonContentData {
  title: string;
  subtitle?: string;
  sections?: SubtopicSection[];
  subtopics?: SubtopicData[];
}
