export interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  createdAt: Date;
}

export interface UserProgressMap {
  [lessonId: string]: "not-started" | "in-progress" | "completed";
}
