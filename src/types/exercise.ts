export interface CellData {
  value: string | number | boolean | null;
  formula?: string;
  format?: string;
}

export interface GridDataset {
  rows: number;
  cols: number;
  data: Record<string, CellData>;
  headers?: string[];
}

export interface ExpectedAnswer {
  targetCell: string;
  expectedValue?: string | number;
  requiredFormulaPattern?: string;
  checkType?: "value" | "formula" | "both";
  tolerance?: number;
}

export interface ExerciseData {
  id: string;
  lessonId: string;
  title?: string;
  taskNumber?: number;
  type: "formula" | "pivot" | "cell-value";
  dataset: GridDataset;
  instruction: string;
  expectedAnswer: ExpectedAnswer;
  multiTargetAnswers?: ExpectedAnswer[];
  hint?: string;
}

export interface ValidationResponse {
  correct: boolean;
  message: string;
  targetCell?: string;
  whyWrong?: string;
  howToFix?: string;
  actualValue?: string | number | boolean | null;
  userFormula?: string;
}
