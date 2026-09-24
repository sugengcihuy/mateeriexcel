"use client";

import React, { useState } from "react";
import { Table, Layers, Calculator, Play, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface RawDataItem {
  id: string;
  salesperson: string;
  region: string;
  category: string;
  amount: number;
}

const SAMPLE_RAW_DATA: RawDataItem[] = [
  { id: "1", salesperson: "Budi", region: "Jakarta", category: "Electronics", amount: 15000000 },
  { id: "2", salesperson: "Siti", region: "Bandung", category: "Furniture", amount: 8500000 },
  { id: "3", salesperson: "Budi", region: "Jakarta", category: "Furniture", amount: 12000000 },
  { id: "4", salesperson: "Rizky", region: "Surabaya", category: "Electronics", amount: 22000000 },
  { id: "5", salesperson: "Siti", region: "Bandung", category: "Electronics", amount: 18000000 },
  { id: "6", salesperson: "Rizky", region: "Surabaya", category: "Furniture", amount: 9500000 },
  { id: "7", salesperson: "Budi", region: "Jakarta", category: "Electronics", amount: 14000000 },
];

export function PivotBuilder({ onComplete }: { onComplete?: () => void }) {
  const [rowField, setRowField] = useState<string>("region"); // "region" | "salesperson" | "category"
  const [aggFunc, setAggFunc] = useState<"SUM" | "AVERAGE" | "COUNT">("SUM");
  const [generatedPivot, setGeneratedPivot] = useState<Record<string, number> | null>(null);

  const availableFields = [
    { key: "salesperson", label: "Salesperson (Nama)" },
    { key: "region", label: "Region (Wilayah)" },
    { key: "category", label: "Kategori Produk" },
  ];

  const handleGeneratePivot = () => {
    const summary: Record<string, { total: number; count: number }> = {};

    SAMPLE_RAW_DATA.forEach((item) => {
      const keyVal = String((item as unknown as Record<string, unknown>)[rowField] || "Unassigned");
      if (!summary[keyVal]) {
        summary[keyVal] = { total: 0, count: 0 };
      }
      summary[keyVal].total += item.amount;
      summary[keyVal].count += 1;
    });

    const result: Record<string, number> = {};
    Object.entries(summary).forEach(([key, val]) => {
      if (aggFunc === "SUM") {
        result[key] = val.total;
      } else if (aggFunc === "AVERAGE") {
        result[key] = Math.round(val.total / val.count);
      } else {
        result[key] = val.count;
      }
    });

    setGeneratedPivot(result);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            PivotTable Field Builder
          </span>
          <h3 className="text-xl font-bold text-slate-100 mt-2">Simulasi PivotTable Interaktif</h3>
        </div>
        <Table className="w-8 h-8 text-amber-400" />
      </div>

      {/* Raw Dataset Preview */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Data Mentah Penjualan (Source Table):
        </span>
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 max-h-48 overflow-y-auto text-xs">
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-800 text-slate-300 sticky top-0">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Salesperson</th>
                <th className="p-2">Region</th>
                <th className="p-2">Kategori</th>
                <th className="p-2 text-right">Nilai Penjualan (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-400">
              {SAMPLE_RAW_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900">
                  <td className="p-2">{row.id}</td>
                  <td className="p-2 text-slate-200">{row.salesperson}</td>
                  <td className="p-2">{row.region}</td>
                  <td className="p-2">{row.category}</td>
                  <td className="p-2 text-right text-emerald-400 font-bold">
                    {row.amount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drag & Drop / Field Selection Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        {/* Rows Field */}
        <div className="space-y-2">
          <label className="font-bold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>1. Pilih Baris (Rows Field):</span>
          </label>
          <select
            value={rowField}
            onChange={(e) => setRowField(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {availableFields.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Aggregation Function */}
        <div className="space-y-2">
          <label className="font-bold text-slate-300 flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span>2. Fungsi Agregasi (Summarize By):</span>
          </label>
          <select
            value={aggFunc}
            onChange={(e) => setAggFunc(e.target.value as "SUM" | "AVERAGE" | "COUNT")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="SUM">SUM (Total Jumlah Penjualan)</option>
            <option value="AVERAGE">AVERAGE (Rata-rata Penjualan)</option>
            <option value="COUNT">COUNT (Hitung Frekuensi Transaksi)</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleGeneratePivot}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Generate PivotTable</span>
          </button>
        </div>
      </div>

      {/* Generated Pivot Result */}
      {generatedPivot && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Hasil Tabel Pivot Ter-generate Otomatis:</span>
          </div>

          <div className="overflow-x-auto border border-emerald-500/40 rounded-xl bg-slate-950 text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-emerald-950/60 text-emerald-300 border-b border-emerald-900">
                <tr>
                  <th className="p-3 uppercase">Row Labels ({rowField})</th>
                  <th className="p-3 text-right uppercase">
                    {aggFunc} of Amount (Rp)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {Object.entries(generatedPivot).map(([key, val]) => (
                  <tr key={key} className="hover:bg-slate-900">
                    <td className="p-3 font-bold text-slate-200">{key}</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">
                      {aggFunc === "COUNT" ? val : val.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
