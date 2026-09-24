export interface CellData {
  value: string | number | boolean | null;
  formula?: string;
  format?: string;
}

export interface GridDataset {
  rows: number;
  cols: number;
  data: Record<string, CellData>; // key: "A1", "B2", etc.
  headers?: string[];
}

export interface ExpectedAnswer {
  targetCell: string; // e.g. "B10" or array of cells
  expectedValue?: string | number;
  requiredFormulaPattern?: string; // regex string or substring check e.g. "SUM" or "VLOOKUP"
  checkType?: "value" | "formula" | "both";
  tolerance?: number; // numeric rounding tolerance
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
