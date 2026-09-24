import { buildHyperFormulaEngine } from "./hyperformula-client";
import { ExpectedAnswer, ValidationResponse } from "@/types/exercise";

export function validateExerciseAnswer(
  userGridData: Record<string, { value: string | number | boolean | null; formula?: string }>,
  expectedAnswer: ExpectedAnswer,
  multiTargetAnswers?: ExpectedAnswer[]
): ValidationResponse {
  const engine = buildHyperFormulaEngine(userGridData);

  // Helper function to validate 1 single target cell
  const validateSingle = (target: ExpectedAnswer): ValidationResponse => {
    const { targetCell, expectedValue, requiredFormulaPattern, checkType = "both" } = target;
    const cellInput = userGridData[targetCell];

    if (!cellInput) {
      return {
        correct: false,
        message: `Cell ${targetCell} belum diisi nih, Ayya!`,
        targetCell,
        whyWrong: `Kamu belum mengisikan jawaban atau rumus di kotak ${targetCell}.`,
        howToFix: `Klik kotak ${targetCell} lalu masukkan rumus yang diminta (contoh: =${requiredFormulaPattern || "SUM"}(...)).`,
      };
    }

    const userFormula = (cellInput.formula || "").trim().toUpperCase();
    const rawEval = engine.getCellValue(targetCell);
    const safeEvaluatedValue =
      typeof rawEval === "object" && rawEval !== null
        ? String((rawEval as { value?: unknown }).value || rawEval)
        : (rawEval as string | number | boolean | null);

    if (checkType === "formula" || checkType === "both" || requiredFormulaPattern) {
      if (!cellInput.formula) {
        return {
          correct: false,
          message: `Oops! Kamu ngetik angka mentah langsung di cell ${targetCell}.`,
          targetCell,
          whyWrong: `Di Excel, jika mengetik angka langsung '${cellInput.value}', nilainya tidak akan otomatis terhitung saat data lain berubah.`,
          howToFix: `Awali jawaban kamu di cell ${targetCell} dengan tanda sama dengan ('='). Contoh: =${requiredFormulaPattern || "SUM"}(...).`,
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
            whyWrong: `Kamu mengetikkan rumus '${cellInput.formula}', padahal cell ${targetCell} membutuhkan fungsi ${pattern}.`,
            howToFix: `Ganti rumus di cell ${targetCell} supaya menggunakan =${pattern}(...).`,
            actualValue: safeEvaluatedValue,
            userFormula: cellInput.formula,
          };
        }
      }
    }

    if (checkType === "value" || checkType === "both" || expectedValue !== undefined) {
      if (safeEvaluatedValue === null || safeEvaluatedValue === undefined || safeEvaluatedValue === "") {
        return {
          correct: false,
          message: `Hasil perhitungan di cell ${targetCell} masih kosong atau error.`,
          targetCell,
          whyWrong: `Rumus yang kamu ketik belum merujuk ke rentang cell yang benar.`,
          howToFix: `Periksa kembali acuan cell di dalam tanda kurung formula kamu.`,
          actualValue: safeEvaluatedValue,
          userFormula: cellInput.formula,
        };
      }

      const isNumExpected = typeof expectedValue === "number";
      const numEval = Number(safeEvaluatedValue);

      let isMatch = false;

      if (isNumExpected && !isNaN(numEval)) {
        const tolerance = target.tolerance ?? 0.01;
        isMatch = Math.abs(numEval - (expectedValue as number)) <= tolerance;
      } else {
        isMatch = String(safeEvaluatedValue).trim().toLowerCase() === String(expectedValue).trim().toLowerCase();
      }

      if (!isMatch) {
        return {
          correct: false,
          message: `Hasil perhitungan cell ${targetCell} adalah '${safeEvaluatedValue}', padahal yang benar harusnya '${expectedValue}'.`,
          targetCell,
          whyWrong: `Hasil saat ini '${safeEvaluatedValue}', beda dengan target jawaban '${expectedValue}'.`,
          howToFix: `Cek rentang data di dalam rumus kamu di cell ${targetCell}.`,
          actualValue: safeEvaluatedValue,
          userFormula: cellInput.formula,
        };
      }
    }

    return {
      correct: true,
      message: `Cell ${targetCell} 100% BENAR!`,
      targetCell,
      actualValue: safeEvaluatedValue,
      userFormula: cellInput.formula,
      howToFix: `Rumus ${cellInput.formula} pada cell ${targetCell} sudah sangat tepat.`,
    };
  };

  // If multiTargetAnswers is provided (Integrated Master Test)
  if (multiTargetAnswers && multiTargetAnswers.length > 0) {
    for (const target of multiTargetAnswers) {
      const res = validateSingle(target);
      if (!res.correct) {
        return res; // Return first failing target cell feedback
      }
    }

    return {
      correct: true,
      message: `Horeee! SELURUH CELL DALAM UJIAN CAMPURAN 100% BENAR BANGEEET!`,
      targetCell: "Semua Cell",
      howToFix: `Luar biasa! Kamu telah berhasil menggabungkan seluruh fungsi dalam satu laporan kerja secara presisi!`,
    };
  }

  // Single cell validation
  return validateSingle(expectedAnswer);
}
