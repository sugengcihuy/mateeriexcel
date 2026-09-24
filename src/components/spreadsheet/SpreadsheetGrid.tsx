"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { GridDataset, CellData } from "@/types/exercise";
import { FormulaBar } from "./FormulaBar";
import { HyperFormula } from "hyperformula";
import { Maximize2, Minimize2 } from "lucide-react";

interface SpreadsheetGridProps {
  initialDataset: GridDataset;
  gridData?: Record<string, CellData>;
  onGridChange?: (gridData: Record<string, CellData>) => void;
  readOnly?: boolean;
}

export function SpreadsheetGrid({
  initialDataset,
  gridData: externalGridData,
  onGridChange,
  readOnly = false,
}: SpreadsheetGridProps) {
  const [gridData, setGridData] = useState<Record<string, CellData>>(initialDataset.data || {});
  const [activeCell, setActiveCell] = useState<string>("B7");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [computedValues, setComputedValues] = useState<Record<string, string | number | boolean | null>>({});
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const numRows = initialDataset.rows || 10;
  const numCols = initialDataset.cols || 7;

  const getColLetter = (index: number) => String.fromCharCode(65 + index);
  const getColIndex = (letter: string) => letter.toUpperCase().charCodeAt(0) - 65;

  // Auto-focus inline input when cell editing starts
  useEffect(() => {
    if (editingCell && inlineInputRef.current) {
      inlineInputRef.current.focus();
    }
  }, [editingCell]);

  // Recalculate HyperFormula live evaluation on client
  const recalculateGrid = useCallback(
    (currentData: Record<string, CellData>) => {
      try {
        const sheet: (string | number | boolean | null)[][] = Array.from({ length: numRows }, () =>
          Array.from({ length: numCols }, () => null)
        );

        Object.entries(currentData).forEach(([cellRef, cell]) => {
          const match = cellRef.match(/^([A-Z]+)([0-9]+)$/i);
          if (match) {
            const colIndex = getColIndex(match[1]);
            const rowIndex = parseInt(match[2], 10) - 1;

            if (rowIndex >= 0 && rowIndex < numRows && colIndex >= 0 && colIndex < numCols) {
              if (cell.formula) {
                const formula = cell.formula.startsWith("=") ? cell.formula : `=${cell.formula}`;
                sheet[rowIndex][colIndex] = formula;
              } else {
                sheet[rowIndex][colIndex] = cell.value ?? null;
              }
            }
          }
        });

        const hf = HyperFormula.buildFromArray(sheet, { licenseKey: "gpl-v3" });
        const newComputed: Record<string, string | number | boolean | null> = {};

        for (let r = 0; r < numRows; r++) {
          for (let c = 0; c < numCols; c++) {
            const cellRef = `${getColLetter(c)}${r + 1}`;
            const val = hf.getCellValue({ sheet: 0, row: r, col: c });
            newComputed[cellRef] = val as string | number | boolean | null;
          }
        }

        setComputedValues(newComputed);
      } catch (err) {
        console.error("HyperFormula recalc error:", err);
      }
    },
    [numRows, numCols]
  );

  useEffect(() => {
    setGridData(initialDataset.data || {});
  }, [initialDataset]);

  // Sync internal gridData state when external gridData prop updates from remote room sync
  useEffect(() => {
    if (externalGridData && Object.keys(externalGridData).length > 0) {
      setGridData((prev) => ({
        ...prev,
        ...externalGridData,
      }));
    }
  }, [externalGridData]);

  useEffect(() => {
    recalculateGrid(gridData);
  }, [gridData, recalculateGrid]);

  const updateCell = useCallback(
    (cellRef: string, input: string) => {
      const trimmed = input.trim();
      const isFormula = trimmed.startsWith("=");

      const updatedCell: CellData = isFormula
        ? { value: "", formula: trimmed }
        : { value: isNaN(Number(trimmed)) || trimmed === "" ? trimmed : Number(trimmed), formula: undefined };

      const newGrid = {
        ...gridData,
        [cellRef]: updatedCell,
      };

      setGridData(newGrid);
      if (onGridChange) {
        onGridChange(newGrid);
      }
    },
    [gridData, onGridChange]
  );

  const handleCellClick = (cellRef: string) => {
    if (editingCell && editingCell !== cellRef) {
      updateCell(editingCell, editInputValue);
      setEditingCell(null);
    }
    setActiveCell(cellRef);
  };

  const handleCellDoubleClick = (cellRef: string) => {
    if (readOnly) return;
    setActiveCell(cellRef);
    setEditingCell(cellRef);

    const cell = gridData[cellRef];
    const rawVal = cell?.formula || (cell?.value !== undefined ? String(cell.value) : "");
    setEditInputValue(rawVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editingCell) {
      if (e.key === "Enter") {
        updateCell(editingCell, editInputValue);
        setEditingCell(null);

        const match = editingCell.match(/^([A-Z]+)([0-9]+)$/i);
        if (match) {
          const col = match[1];
          const row = parseInt(match[2], 10);
          if (row < numRows) {
            setActiveCell(`${col}${row + 1}`);
          }
        }
      } else if (e.key === "Escape") {
        setEditingCell(null);
      }
      return;
    }

    const match = activeCell.match(/^([A-Z]+)([0-9]+)$/i);
    if (!match) return;
    const colStr = match[1];
    const colIdx = getColIndex(colStr);
    const rowNum = parseInt(match[2], 10);

    if (e.key === "ArrowUp" && rowNum > 1) {
      e.preventDefault();
      setActiveCell(`${colStr}${rowNum - 1}`);
    } else if (e.key === "ArrowDown" && rowNum < numRows) {
      e.preventDefault();
      setActiveCell(`${colStr}${rowNum + 1}`);
    } else if (e.key === "ArrowLeft" && colIdx > 0) {
      e.preventDefault();
      setActiveCell(`${getColLetter(colIdx - 1)}${rowNum}`);
    } else if (e.key === "ArrowRight" && colIdx < numCols - 1) {
      e.preventDefault();
      setActiveCell(`${getColLetter(colIdx + 1)}${rowNum}`);
    } else if (e.key === "Enter" || e.key === "F2") {
      e.preventDefault();
      handleCellDoubleClick(activeCell);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && !readOnly) {
      setEditingCell(activeCell);
      setEditInputValue(e.key);
    }
  };

  const getCellDisplay = (cellRef: string) => {
    if (computedValues[cellRef] !== undefined && computedValues[cellRef] !== null) {
      const val = computedValues[cellRef];
      if (typeof val === "number") {
        if (val >= 1000) {
          return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
        }
        return val.toLocaleString("id-ID");
      }
      return String(val);
    }

    const cell = gridData[cellRef];
    if (!cell) return "";
    return cell.value !== undefined ? String(cell.value) : "";
  };

  const activeCellData = gridData[activeCell];
  const formulaBarCurrentVal = activeCellData?.formula || (activeCellData?.value !== undefined ? String(activeCellData.value) : "");

  const gridContent = (
    <div className="flex flex-col gap-3 w-full focus:outline-none" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Header controls with clean mobile responsive layout */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
        <FormulaBar
          activeCellRef={activeCell}
          value={formulaBarCurrentVal}
          onCommit={(val) => updateCell(activeCell, val)}
          onLiveChange={(val) => updateCell(activeCell, val)}
        />
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="px-3.5 py-2 bg-[#E0CFFC] hover:bg-[#DBCDF0] text-[#2D2342] border border-[#C7CEEA] rounded-full text-xs font-black flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-all shadow-sm"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#FF758F]" /> : <Maximize2 className="w-4 h-4 text-[#FF758F]" />}
          <span>{isFullscreen ? "Tutup Mode Fullscreen" : "Mode Fullscreen Excel"}</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto border-2 border-[#E0CFFC] rounded-2xl shadow-md bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#E0CFFC]/60 text-[#2D2342] select-none">
              <th className="w-12 p-2.5 border-b-2 border-r-2 border-[#DBCDF0] text-center text-xs font-black">
                #
              </th>
              {Array.from({ length: numCols }).map((_, cIdx) => (
                <th
                  key={cIdx}
                  className="p-2.5 border-b-2 border-r-2 border-[#DBCDF0] text-center font-black min-w-[130px] text-xs uppercase text-[#2D2342]"
                >
                  {getColLetter(cIdx)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRows }).map((_, rIdx) => {
              const rowNum = rIdx + 1;
              return (
                <tr key={rIdx} className="hover:bg-[#FAF5FF]">
                  <td className="w-12 p-2 border-b border-r border-[#E0CFFC] bg-[#E0CFFC]/30 text-[#2D2342] text-center font-mono text-xs font-bold select-none">
                    {rowNum}
                  </td>
                  {Array.from({ length: numCols }).map((_, cIdx) => {
                    const cellRef = `${getColLetter(cIdx)}${rowNum}`;
                    const isSelected = activeCell === cellRef;
                    const isEditing = editingCell === cellRef;
                    const cell = gridData[cellRef];
                    const isHeaderRow = rowNum === 1;

                    return (
                      <td
                        key={cellRef}
                        onClick={() => handleCellClick(cellRef)}
                        onDoubleClick={() => handleCellDoubleClick(cellRef)}
                        className={`relative border-b border-r border-[#E0CFFC] px-3 py-2 cursor-pointer transition-colors ${
                          isHeaderRow ? "bg-[#FFF1C1]/60 font-black text-[#2D2342]" : ""
                        } ${isSelected ? "ring-2 ring-[#FF758F] ring-inset bg-[#FFC8DD]/50" : ""}`}
                      >
                        {isEditing ? (
                          <input
                            ref={inlineInputRef}
                            type="text"
                            value={editInputValue}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditInputValue(val);
                              updateCell(cellRef, val);
                            }}
                            onBlur={() => {
                              updateCell(cellRef, editInputValue);
                              setEditingCell(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateCell(cellRef, editInputValue);
                                setEditingCell(null);
                              }
                            }}
                            className="w-full bg-white border-2 border-[#FF758F] text-[#2D2342] rounded px-2 py-1 outline-none font-mono text-xs font-bold shadow-inner"
                          />
                        ) : (
                          <div className={`truncate select-none font-mono text-xs ${
                            typeof computedValues[cellRef] === "number" || typeof cell?.value === "number"
                              ? "text-right font-bold text-[#2D2342]"
                              : "text-left font-semibold text-[#2D2342]"
                          }`}>
                            {getCellDisplay(cellRef)}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FAF5FF] p-6 overflow-y-auto flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#E0CFFC] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFADAD]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFD6A5]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#CFFFE5]" />
            <span className="font-black text-[#2D2342] text-sm ml-2">Microsoft Excel Sandbox — Mode Fullscreen</span>
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            className="px-4 py-2 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] rounded-2xl font-black text-xs border border-[#FFADAD] shadow-sm"
          >
            Tutup Fullscreen
          </button>
        </div>
        <div className="flex-1">{gridContent}</div>
      </div>
    );
  }

  return gridContent;
}

