import { HyperFormula } from "hyperformula";

/**
 * Creates a server-side HyperFormula instance loaded with cell data.
 * Transforms key-value grid data like { "A1": { value: 10 }, "B1": { formula: "=A1*2" } }
 * into 2D array representation for HyperFormula evaluation.
 */
export function buildHyperFormulaEngine(
  gridData: Record<string, { value: string | number | boolean | null; formula?: string }>,
  maxRows: number = 20,
  maxCols: number = 10
) {
  // Construct 2D array representing sheet
  const sheetData: (string | number | boolean | null)[][] = Array.from({ length: maxRows }, () =>
    Array.from({ length: maxCols }, () => null)
  );

  // Helper to convert "A1" -> col 0, row 0
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
        // Ensure formula starts with =
        const formulaStr = cell.formula.startsWith("=") ? cell.formula : `=${cell.formula}`;
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
