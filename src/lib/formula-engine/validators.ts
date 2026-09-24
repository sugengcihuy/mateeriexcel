import { buildHyperFormulaEngine } from "./hyperformula-client";
import { ExpectedAnswer, ValidationResponse } from "@/types/exercise";

export function validateExerciseAnswer(
  userGridData: Record<string, { value: string | number | boolean | null; formula?: string }>,
  expectedAnswer: ExpectedAnswer
): ValidationResponse {
  const { targetCell, expectedValue, requiredFormulaPattern, checkType = "both" } = expectedAnswer;

  const cellInput = userGridData[targetCell];
  if (!cellInput) {
    return {
      correct: false,
      message: `Cell ${targetCell} belum diisi nih, Ayya!`,
      targetCell,
      whyWrong: `Kamu belum mengisikan jawaban atau rumus apapun di kotak ${targetCell}.`,
      howToFix: `Klik kotak ${targetCell} lalu ketikkan rumus yang diminta (contoh: =${requiredFormulaPattern || "SUM"}(...)).`,
    };
  }

  const userFormula = (cellInput.formula || "").trim().toUpperCase();

  // Build HyperFormula engine to calculate actual computed result on server
  const engine = buildHyperFormulaEngine(userGridData);
  const rawEval = engine.getCellValue(targetCell);
  const safeEvaluatedValue =
    typeof rawEval === "object" && rawEval !== null
      ? String((rawEval as { value?: unknown }).value || rawEval)
      : (rawEval as string | number | boolean | null);

  // Check 1: Required formula pattern check (e.g., must use SUM or VLOOKUP, not hardcoded number)
  if (checkType === "formula" || checkType === "both" || requiredFormulaPattern) {
    if (!cellInput.formula) {
      return {
        correct: false,
        message: `Oops! Kamu ngetik angka mentah langsung tanpa pakai rumus di cell ${targetCell}.`,
        targetCell,
        whyWrong: `Di Excel, kalau kamu ngetik angka langsung misal '${cellInput.value}', angkanya tidak akan otomatis terhitung saat data berubah.`,
        howToFix: `Awali jawaban kamu dengan tanda sama dengan ('='). Contoh: =${requiredFormulaPattern || "SUM"}(...).`,
        actualValue: safeEvaluatedValue,
        userFormula: "",
      };
    }

    if (requiredFormulaPattern) {
      const pattern = requiredFormulaPattern.toUpperCase();
      if (!userFormula.includes(pattern)) {
        return {
          correct: false,
          message: `Rumus di cell ${targetCell} harus menggunakan fungsi ${pattern}.`,
          targetCell,
          whyWrong: `Kamu mengetikkan rumus '${cellInput.formula}', padahal latihan ini membutuhkan fungsi ${pattern}.`,
          howToFix: `Ganti rumus di cell ${targetCell} supaya menggunakan =${pattern}(...).`,
          actualValue: safeEvaluatedValue,
          userFormula: cellInput.formula,
        };
      }
    }
  }

  // Check 2: Value check
  if (checkType === "value" || checkType === "both" || expectedValue !== undefined) {
    if (safeEvaluatedValue === null || safeEvaluatedValue === undefined || safeEvaluatedValue === "") {
      return {
        correct: false,
        message: `Hasil perhitungan di cell ${targetCell} masih kosong atau error.`,
        targetCell,
        whyWrong: `Rumus yang kamu ketik belum merujuk ke rentang cell yang benar sehingga hasilnya kosong.`,
        howToFix: `Periksa kembali acuan cell di dalam tanda kurung formula kamu.`,
        actualValue: safeEvaluatedValue,
        userFormula: cellInput.formula,
      };
    }

    // Compare values
    const isNumExpected = typeof expectedValue === "number";
    const numEval = Number(safeEvaluatedValue);

    let isMatch = false;

    if (isNumExpected && !isNaN(numEval)) {
      const tolerance = expectedAnswer.tolerance ?? 0.01;
      isMatch = Math.abs(numEval - (expectedValue as number)) <= tolerance;
    } else {
      isMatch = String(safeEvaluatedValue).trim().toLowerCase() === String(expectedValue).trim().toLowerCase();
    }

    if (!isMatch) {
      return {
        correct: false,
        message: `Hasil perhitungan cell ${targetCell} adalah '${safeEvaluatedValue}', padahal yang benar harusnya '${expectedValue}'.`,
        targetCell,
        whyWrong: `Hitungan rumusnya belum pas. Hasil saat ini '${safeEvaluatedValue}', beda dengan target jawaban '${expectedValue}'.`,
        howToFix: `Cek rentang data di dalam rumus kamu dan pastikan acuan cell sudah benar.`,
        actualValue: safeEvaluatedValue,
        userFormula: cellInput.formula,
      };
    }
  }

  return {
    correct: true,
    message: `Horeee! Jawaban kamu di cell ${targetCell} 100% BENAR BANGEEET!`,
    targetCell,
    actualValue: safeEvaluatedValue,
    userFormula: cellInput.formula,
    howToFix: `Kamu telah menggunakan rumus ${cellInput.formula} dengan sangat tepat pada cell ${targetCell} sehingga menghasilkan nilai ${safeEvaluatedValue} secara presisi.`,
  };
}
