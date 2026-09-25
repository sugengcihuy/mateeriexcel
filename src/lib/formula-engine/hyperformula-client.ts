import { HyperFormula } from "hyperformula";

export function normalizeFormulaForEngine(formula: string): string {
  if (!formula) return "";
  let trimmed = formula.trim();
  if (!trimmed.startsWith("=")) trimmed = `=${trimmed}`;

  // Normalize FALSE -> 0 and TRUE -> 1 inside VLOOKUP/HLOOKUP parameters to prevent #NAME? errors
  trimmed = trimmed
    .replace(/,\s*(FALSE|false)\b/gi, ", 0")
    .replace(/,\s*(TRUE|true)\b/gi, ", 1");

  // Auto-close unbalanced parentheses if any
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen > closeParen) {
    trimmed = trimmed + ")".repeat(openParen - closeParen);
  }

  return trimmed;
}

export function buildHyperFormulaEngine(
  gridData: Record<string, { value: string | number | boolean | null; formula?: string }>,
  maxRows: number = 20,
  maxCols: number = 10
) {
  const sheetData: (string | number | boolean | null)[][] = Array.from({ length: maxRows }, () =>
    Array.from({ length: maxCols }, () => null)
  );

  const parseCellRef = (ref: string) => {
    const match = ref.match(/^([A-Z]+)([0-9]+)$/i);
    if (!match) return null;
    const colStr = match[1].toUpperCase();
    const rowNum = parseInt(match[2], 10) - 1;

    let colNum = 0;
    for (let i = 0; i < colStr.length; i++) {
      colNum = colNum * 26 + (colStr.charCodeAt(i) - 64);
    }
    return { col: colNum - 1, row: rowNum };
  };

  Object.entries(gridData).forEach(([cellRef, cell]) => {
    const coords = parseCellRef(cellRef);
    if (coords && coords.row < maxRows && coords.col < maxCols) {
      if (cell.formula) {
        const formulaStr = normalizeFormulaForEngine(cell.formula);
        sheetData[coords.row][coords.col] = formulaStr;
      } else if (cell.value !== undefined && cell.value !== "") {
        sheetData[coords.row][coords.col] = cell.value;
      }
    }
  });

  const hfInstance = HyperFormula.buildFromArray(sheetData, {
    licenseKey: "gpl-v3",
  });

  return {
    hfInstance,
    getCellValue: (cellRef: string) => {
      const coords = parseCellRef(cellRef);
      if (!coords) return null;
      return hfInstance.getCellValue({ sheet: 0, row: coords.row, col: coords.col });
    },
    parseCellRef,
  };
}
