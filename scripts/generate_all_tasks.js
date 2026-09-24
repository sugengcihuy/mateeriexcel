const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '..', 'content', 'exercises');
const modulesDir = path.join(__dirname, '..', 'content', 'modules');

if (!fs.existsSync(exercisesDir)) {
  fs.mkdirSync(exercisesDir, { recursive: true });
}

// 1. MODULE 1 BASIC (10 TASKS)
const basicTasks = [
  {
    id: "ex-basic-01",
    lessonId: "les-basic-01",
    taskNumber: 1,
    title: "Soal 1: Total Penjualan Toko Q1",
    instruction: "Hitunglah Total Penjualan di cell B7 menggunakan rumus =SUM(B2:B6).",
    targetCell: "B7",
    expectedValue: 100000000,
    pattern: "SUM",
    hint: "=SUM(B2:B6)",
    data: {
      "A1": { value: "Bulan" }, "B1": { value: "Penjualan (Rp)" },
      "A2": { value: "Januari" }, "B2": { value: 15000000 },
      "A3": { value: "Februari" }, "B3": { value: 18500000 },
      "A4": { value: "Maret" }, "B4": { value: 22000000 },
      "A5": { value: "April" }, "B5": { value: 19000000 },
      "A6": { value: "Mei" }, "B6": { value: 25500000 },
      "A7": { value: "Total Q1" }, "B7": { value: "" }
    }
  },
  {
    id: "ex-basic-02",
    lessonId: "les-basic-01",
    taskNumber: 2,
    title: "Soal 2: Rata-rata Penjualan Toko",
    instruction: "Hitung Rata-rata Penjualan di cell B8 menggunakan rumus =AVERAGE(B2:B6).",
    targetCell: "B8",
    expectedValue: 20000000,
    pattern: "AVERAGE",
    hint: "=AVERAGE(B2:B6)",
    data: {
      "A1": { value: "Bulan" }, "B1": { value: "Penjualan (Rp)" },
      "A2": { value: "Januari" }, "B2": { value: 15000000 },
      "A3": { value: "Februari" }, "B3": { value: 18500000 },
      "A4": { value: "Maret" }, "B4": { value: 22000000 },
      "A5": { value: "April" }, "B5": { value: 19000000 },
      "A6": { value: "Mei" }, "B6": { value: 25500000 },
      "A8": { value: "Rata-rata" }, "B8": { value: "" }
    }
  },
  {
    id: "ex-basic-03",
    lessonId: "les-basic-01",
    taskNumber: 3,
    title: "Soal 3: Jumlah Bulan Transaksi",
    instruction: "Hitung ada berapa banyak bulan transaksi di cell B7 menggunakan rumus =COUNT(B2:B6).",
    targetCell: "B7",
    expectedValue: 5,
    pattern: "COUNT",
    hint: "=COUNT(B2:B6)",
    data: {
      "A1": { value: "Bulan" }, "B1": { value: "Nilai Penjualan" },
      "A2": { value: "Jan" }, "B2": { value: 15000000 },
      "A3": { value: "Feb" }, "B3": { value: 18500000 },
      "A4": { value: "Mar" }, "B4": { value: 22000000 },
      "A5": { value: "Apr" }, "B5": { value: 19000000 },
      "A6": { value: "Mei" }, "B6": { value: 25500000 },
      "A7": { value: "Jumlah Transaksi" }, "B7": { value: "" }
    }
  },
  {
    id: "ex-basic-04",
    lessonId: "les-basic-01",
    taskNumber: 4,
    title: "Soal 4: Penjualan Paling Tinggi",
    instruction: "Cari nilai Penjualan Paling Tinggi di cell B8 menggunakan rumus =MAX(B2:B6).",
    targetCell: "B8",
    expectedValue: 25500000,
    pattern: "MAX",
    hint: "=MAX(B2:B6)",
    data: {
      "A1": { value: "Bulan" }, "B1": { value: "Penjualan" },
      "A2": { value: "Jan" }, "B2": { value: 15000000 },
      "A3": { value: "Feb" }, "B3": { value: 18500000 },
      "A4": { value: "Mar" }, "B4": { value: 22000000 },
      "A5": { value: "Apr" }, "B5": { value: 19000000 },
      "A6": { value: "Mei" }, "B6": { value: 25500000 },
      "A8": { value: "Penjualan Tertinggi" }, "B8": { value: "" }
    }
  },
  {
    id: "ex-basic-05",
    lessonId: "les-basic-01",
    taskNumber: 5,
    title: "Soal 5: Penjualan Paling Rendah",
    instruction: "Cari nilai Penjualan Paling Rendah di cell B8 menggunakan rumus =MIN(B2:B6).",
    targetCell: "B8",
    expectedValue: 15000000,
    pattern: "MIN",
    hint: "=MIN(B2:B6)",
    data: {
      "A1": { value: "Bulan" }, "B1": { value: "Penjualan" },
      "A2": { value: "Jan" }, "B2": { value: 15000000 },
      "A3": { value: "Feb" }, "B3": { value: 18500000 },
      "A4": { value: "Mar" }, "B4": { value: 22000000 },
      "A5": { value: "Apr" }, "B5": { value: 19000000 },
      "A6": { value: "Mei" }, "B6": { value: 25500000 },
      "A8": { value: "Penjualan Terendah" }, "B8": { value: "" }
    }
  },
  {
    id: "ex-basic-06",
    lessonId: "les-basic-01",
    taskNumber: 6,
    title: "Soal 6: Total Gaji Karyawan",
    instruction: "Hitung Total Gaji seluruh staf di cell C7 menggunakan rumus =SUM(C2:C6).",
    targetCell: "C7",
    expectedValue: 43400000,
    pattern: "SUM",
    hint: "=SUM(C2:C6)",
    data: {
      "A1": { value: "Nama" }, "B1": { value: "Divisi" }, "C1": { value: "Gaji (Rp)" },
      "A2": { value: "Budi" }, "B2": { value: "Finance" }, "C2": { value: 8500000 },
      "A3": { value: "Siti" }, "B3": { value: "Marketing" }, "C3": { value: 7200000 },
      "A4": { value: "Rizky" }, "B4": { value: "IT" }, "C4": { value: 9800000 },
      "A5": { value: "Dewi" }, "B5": { value: "HRD" }, "C5": { value: 6900000 },
      "A6": { "value": "Andi" }, "B6": { value: "Ops" }, "C6": { value: 11000000 },
      "B7": { value: "Total Gaji" }, "C7": { value: "" }
    }
  },
  {
    id: "ex-basic-07",
    lessonId: "les-basic-01",
    taskNumber: 7,
    title: "Soal 7: Rata-rata Nilai Ujian",
    instruction: "Hitung Rata-rata Nilai Ujian siswa di cell B7 menggunakan rumus =AVERAGE(B2:B6).",
    targetCell: "B7",
    expectedValue: 85,
    pattern: "AVERAGE",
    hint: "=AVERAGE(B2:B6)",
    data: {
      "A1": { value: "Siswa" }, "B1": { value: "Nilai Ujian" },
      "A2": { value: "Ayya" }, "B2": { value: 95 },
      "A3": { value: "Budi" }, "B3": { value: 80 },
      "A4": { value: "Siti" }, "B4": { value: 85 },
      "A5": { value: "Rizky" }, "B5": { value: 75 },
      "A6": { value: "Dewi" }, "B6": { value: 90 },
      "A7": { value: "Rata-rata Nilai" }, "B7": { value: "" }
    }
  },
  {
    id: "ex-basic-08",
    lessonId: "les-basic-01",
    taskNumber: 8,
    title: "Soal 8: Nilai Ujian Paling Tinggi",
    instruction: "Cari Nilai Ujian Paling Tinggi di cell B8 menggunakan rumus =MAX(B2:B6).",
    targetCell: "B8",
    expectedValue: 95,
    pattern: "MAX",
    hint: "=MAX(B2:B6)",
    data: {
      "A1": { value: "Siswa" }, "B1": { value: "Nilai Ujian" },
      "A2": { value: "Ayya" }, "B2": { value: 95 },
      "A3": { value: "Budi" }, "B3": { value: 80 },
      "A4": { value: "Siti" }, "B4": { value: 85 },
      "A5": { value: "Rizky" }, "B5": { value: 75 },
      "A6": { value: "Dewi" }, "B6": { value: 90 },
      "A8": { value: "Nilai Tertinggi" }, "B8": { value: "" }
    }
  },
  {
    id: "ex-basic-09",
    lessonId: "les-basic-01",
    taskNumber: 9,
    title: "Soal 9: Nilai Ujian Paling Rendah",
    instruction: "Cari Nilai Ujian Paling Rendah di cell B8 menggunakan rumus =MIN(B2:B6).",
    targetCell: "B8",
    expectedValue: 75,
    pattern: "MIN",
    hint: "=MIN(B2:B6)",
    data: {
      "A1": { value: "Siswa" }, "B1": { value: "Nilai Ujian" },
      "A2": { value: "Ayya" }, "B2": { value: 95 },
      "A3": { value: "Budi" }, "B3": { value: 80 },
      "A4": { value: "Siti" }, "B4": { value: 85 },
      "A5": { value: "Rizky" }, "B5": { value: 75 },
      "A6": { value: "Dewi" }, "B6": { value: 90 },
      "A8": { value: "Nilai Terendah" }, "B8": { value: "" }
    }
  },
  {
    id: "ex-basic-10",
    lessonId: "les-basic-01",
    taskNumber: 10,
    title: "Soal 10: Total Omset 5 Cabang Toko",
    instruction: "Hitunglah Total Omset dari 5 Cabang Toko di cell B7 menggunakan rumus =SUM(B2:B6).",
    targetCell: "B7",
    expectedValue: 180000000,
    pattern: "SUM",
    hint: "=SUM(B2:B6)",
    data: {
      "A1": { value: "Cabang" }, "B1": { value: "Omset (Rp)" },
      "A2": { value: "Jakarta Selatan" }, "B2": { value: 45000000 },
      "A3": { value: "Bandung Barat" }, "B3": { value: 30000000 },
      "A4": { value: "Surabaya Pusat" }, "B4": { value: 50000000 },
      "A5": { value: "Medan Kota" }, "B5": { value: 25000000 },
      "A6": { value: "Semarang Tim" }, "B6": { value: 30000000 },
      "A7": { value: "Total Omset" }, "B7": { value: "" }
    }
  }
];

// 2. MODULE 2 INTERMEDIATE (10 TASKS)
const intermediateTasks = [
  {
    id: "ex-int-01",
    lessonId: "les-int-01",
    taskNumber: 1,
    title: "Soal 1: Penjualan Wilayah Jakarta (SUMIF)",
    instruction: "Hitung Total Penjualan khusus wilayah Jakarta di cell F2 pake rumus =SUMIF(B2:B6, \"Jakarta\", C2:C6).",
    targetCell: "F2",
    expectedValue: 41000000,
    pattern: "SUMIF",
    hint: "=SUMIF(B2:B6, \"Jakarta\", C2:C6)",
    data: {
      "A1": { value: "ID" }, "B1": { value: "Wilayah" }, "C1": { value: "Penjualan (Rp)" }, "E1": { value: "Cari" }, "F1": { value: "Total Jakarta" },
      "A2": { value: "001" }, "B2": { value: "Jakarta" }, "C2": { value: 15000000 },
      "A3": { value: "002" }, "B3": { value: "Bandung" }, "C3": { value: 8500000 },
      "A4": { value: "003" }, "B4": { value: "Jakarta" }, "C4": { value: 12000000 },
      "A5": { value: "004" }, "B5": { value: "Surabaya" }, "C5": { value: 22000000 },
      "A6": { value: "005" }, "B6": { value: "Jakarta" }, "C6": { value: 14000000 },
      "E2": { value: "Jakarta" }, "F2": { value: "" }
    }
  },
  {
    id: "ex-int-02",
    lessonId: "les-int-01",
    taskNumber: 2,
    title: "Soal 2: Penjualan Wilayah Bandung (SUMIF)",
    instruction: "Hitung Total Penjualan khusus wilayah Bandung di cell F2 pake rumus =SUMIF(B2:B6, \"Bandung\", C2:C6).",
    targetCell: "F2",
    expectedValue: 26500000,
    pattern: "SUMIF",
    hint: "=SUMIF(B2:B6, \"Bandung\", C2:C6)",
    data: {
      "A1": { value: "ID" }, "B1": { value: "Wilayah" }, "C1": { value: "Penjualan (Rp)" }, "E1": { value: "Cari" }, "F1": { value: "Total Bandung" },
      "A2": { value: "001" }, "B2": { value: "Bandung" }, "C2": { value: 8500000 },
      "A3": { value: "002" }, "B3": { value: "Jakarta" }, "C3": { value: 15000000 },
      "A4": { value: "003" }, "B4": { value: "Bandung" }, "C4": { value: 18000000 },
      "A5": { value: "004" }, "B5": { value: "Surabaya" }, "C5": { value: 22000000 },
      "A6": { value: "005" }, "B6": { value: "Jakarta" }, "C6": { value: 14000000 },
      "E2": { value: "Bandung" }, "F2": { value: "" }
    }
  },
  {
    id: "ex-int-03",
    lessonId: "les-int-01",
    taskNumber: 3,
    title: "Soal 3: Status Kelulusan Nilai (IF)",
    instruction: "Ketik rumus IF di cell C2: jika Nilai (B2) >= 75 maka \"LULUS\", jika tidak \"REMIDI\": =IF(B2>=75, \"LULUS\", \"REMIDI\").",
    targetCell: "C2",
    expectedValue: "LULUS",
    pattern: "IF",
    hint: "=IF(B2>=75, \"LULUS\", \"REMIDI\")",
    data: {
      "A1": { value: "Nama" }, "B1": { value: "Nilai" }, "C1": { value: "Status" },
      "A2": { value: "Ayya" }, "B2": { value: 90 }, "C2": { value: "" },
      "A3": { value: "Budi" }, "B3": { value: 65 }, "C3": { value: "" }
    }
  },
  {
    id: "ex-int-04",
    lessonId: "les-int-01",
    taskNumber: 4,
    title: "Soal 4: Hitung Berapa Orang Lulus (COUNTIF)",
    instruction: "Hitung ada berapa siswa yang \"LULUS\" di cell E2 pake rumus =COUNTIF(C2:C6, \"LULUS\").",
    targetCell: "E2",
    expectedValue: 4,
    pattern: "COUNTIF",
    hint: "=COUNTIF(C2:C6, \"LULUS\")",
    data: {
      "A1": { value: "Nama" }, "B1": { value: "Nilai" }, "C1": { value: "Status" }, "E1": { value: "Jumlah Lulus" },
      "A2": { value: "Ayya" }, "B2": { value: 95 }, "C2": { value: "LULUS" },
      "A3": { value: "Budi" }, "B3": { value: 60 }, "C3": { value: "REMIDI" },
      "A4": { value: "Siti" }, "B4": { value: 85 }, "C4": { value: "LULUS" },
      "A5": { value: "Rizky" }, "B5": { value: 78 }, "C5": { value: "LULUS" },
      "A6": { value: "Dewi" }, "B6": { value: 90 }, "C6": { value: "LULUS" },
      "E2": { value: "" }
    }
  },
  {
    id: "ex-int-05",
    lessonId: "les-int-01",
    taskNumber: 5,
    title: "Soal 5: Hitung Berapa Orang Remidi (COUNTIF)",
    instruction: "Hitung berapa siswa yang \"REMIDI\" di cell E2 pake rumus =COUNTIF(C2:C6, \"REMIDI\").",
    targetCell: "E2",
    expectedValue: 2,
    pattern: "COUNTIF",
    hint: "=COUNTIF(C2:C6, \"REMIDI\")",
    data: {
      "A1": { value: "Nama" }, "B1": { value: "Nilai" }, "C1": { value: "Status" }, "E1": { value: "Jumlah Remidi" },
      "A2": { value: "Ayya" }, "B2": { value: 95 }, "C2": { value: "LULUS" },
      "A3": { value: "Budi" }, "B3": { value: 60 }, "C3": { value: "REMIDI" },
      "A4": { value: "Siti" }, "B4": { value: 85 }, "C4": { value: "LULUS" },
      "A5": { value: "Rizky" }, "B5": { value: 55 }, "C5": { value: "REMIDI" },
      "A6": { value: "Dewi" }, "B6": { value: 90 }, "C6": { value: "LULUS" },
      "E2": { value: "" }
    }
  },
  {
    id: "ex-int-06",
    lessonId: "les-int-02",
    taskNumber: 6,
    title: "Soal 6: Cari Harga Keyboard (HLOOKUP)",
    instruction: "Cari Harga produk PRD03 di cell C6 pake HLOOKUP: =HLOOKUP(B6, B1:E3, 3, FALSE).",
    targetCell: "C6",
    expectedValue: 750000,
    pattern: "HLOOKUP",
    hint: "=HLOOKUP(B6, B1:E3, 3, FALSE)",
    data: {
      "A1": { value: "Kode" }, "B1": { value: "PRD01" }, "C1": { value: "PRD02" }, "D1": { value: "PRD03" }, "E1": { value: "PRD04" },
      "A2": { value: "Nama" }, "B2": { value: "Laptop" }, "C2": { value: "Mouse" }, "D2": { value: "Keyboard" }, "E2": { value: "Monitor" },
      "A3": { value: "Harga" }, "B3": { value: 12000000 }, "C3": { value: 250000 }, "D3": { value: 750000 }, "E3": { value: 3500000 },
      "A6": { value: "Kode:" }, "B6": { value: "PRD03" }, "C6": { value: "" }
    }
  },
  {
    id: "ex-int-07",
    lessonId: "les-int-02",
    taskNumber: 7,
    title: "Soal 7: Cari Harga Laptop (HLOOKUP)",
    instruction: "Cari Harga Laptop (kode PRD01) di cell C6 pake HLOOKUP: =HLOOKUP(B6, B1:E3, 3, FALSE).",
    targetCell: "C6",
    expectedValue: 12000000,
    pattern: "HLOOKUP",
    hint: "=HLOOKUP(B6, B1:E3, 3, FALSE)",
    data: {
      "A1": { value: "Kode" }, "B1": { value: "PRD01" }, "C1": { value: "PRD02" }, "D1": { value: "PRD03" }, "E1": { value: "PRD04" },
      "A2": { value: "Nama" }, "B2": { value: "Laptop" }, "C2": { value: "Mouse" }, "D2": { value: "Keyboard" }, "E2": { value: "Monitor" },
      "A3": { value: "Harga" }, "B3": { value: 12000000 }, "C3": { value: 250000 }, "D3": { value: 750000 }, "E3": { value: 3500000 },
      "A6": { value: "Kode:" }, "B6": { value: "PRD01" }, "C6": { value: "" }
    }
  },
  {
    id: "ex-int-08",
    lessonId: "les-int-02",
    taskNumber: 8,
    title: "Soal 8: Total Bonus Sales Budi (SUMIF)",
    instruction: "Hitung total bonus khusus untuk Budi di cell F2 pake =SUMIF(A2:A6, \"Budi\", C2:C6).",
    targetCell: "F2",
    expectedValue: 4500000,
    pattern: "SUMIF",
    hint: "=SUMIF(A2:A6, \"Budi\", C2:C6)",
    data: {
      "A1": { value: "Nama" }, "B1": { value: "Item" }, "C1": { value: "Bonus" }, "E1": { value: "Target" }, "F1": { value: "Total Bonus Budi" },
      "A2": { value: "Budi" }, "B2": { value: "Laptop" }, "C2": { value: 2000000 },
      "A3": { value: "Siti" }, "B3": { value: "Mouse" }, "C3": { value: 500000 },
      "A4": { value: "Budi" }, "B4": { value: "Keyboard" }, "C4": { value: 2500000 },
      "A5": { value: "Rizky" }, "B5": { value: "Monitor" }, "C5": { value: 1500000 },
      "A6": { value: "Siti" }, "B6": { value: "Laptop" }, "C6": { value: 2000000 },
      "E2": { value: "Budi" }, "F2": { value: "" }
    }
  },
  {
    id: "ex-int-09",
    lessonId: "les-int-01",
    taskNumber: 9,
    title: "Soal 9: Kelayakan Diskon (IF)",
    instruction: "Hitung status Diskon di cell C2: jika Belanja (B2) > 500000 maka \"DAPAT DISKON\", jika tidak \"TIDAK DAPAT\": =IF(B2>500000, \"DAPAT DISKON\", \"TIDAK DAPAT\").",
    targetCell: "C2",
    expectedValue: "DAPAT DISKON",
    pattern: "IF",
    hint: "=IF(B2>500000, \"DAPAT DISKON\", \"TIDAK DAPAT\")",
    data: {
      "A1": { value: "Pelanggan" }, "B1": { value: "Total Belanja" }, "C1": { value: "Status Diskon" },
      "A2": { value: "Ayya" }, "B2": { value: 750000 }, "C2": { value: "" },
      "A3": { value: "Budi" }, "B3": { value: 300000 }, "C3": { value: "" }
    }
  },
  {
    id: "ex-int-10",
    lessonId: "les-int-02",
    taskNumber: 10,
    title: "Soal 10: Cari Tarif Ongkir (HLOOKUP)",
    instruction: "Cari Tarif Ongkir ke Kota JKT di cell C6 pake =HLOOKUP(B6, B1:E3, 3, FALSE).",
    targetCell: "C6",
    expectedValue: 10000,
    pattern: "HLOOKUP",
    hint: "=HLOOKUP(B6, B1:E3, 3, FALSE)",
    data: {
      "A1": { value: "Kode Kota" }, "B1": { value: "JKT" }, "C1": { value: "BDG" }, "D1": { value: "SBY" }, "E1": { value: "MDN" },
      "A2": { value: "Kota" }, "B2": { value: "Jakarta" }, "C2": { value: "Bandung" }, "D2": { value: "Surabaya" }, "E2": { value: "Medan" },
      "A3": { value: "Ongkir (Rp)" }, "B3": { value: 10000 }, "C3": { value: 15000 }, "D3": { value: 20000 }, "E3": { value: 35000 },
      "A6": { "value": "Cari Kode:" }, "B6": { value: "JKT" }, "C6": { value: "" }
    }
  }
];

// 3. MODULE 3 ADVANCED (10 TASKS)
const advancedTasks = [
  {
    id: "ex-adv-vlookup-01",
    lessonId: "les-adv-01",
    taskNumber: 1,
    title: "Soal 1: Cari Gaji EMP003 (VLOOKUP)",
    instruction: "Cari Gaji karyawan dengan ID EMP003 di cell G2 pake =VLOOKUP(F2, A2:D6, 4, FALSE).",
    targetCell: "G2",
    expectedValue: 9800000,
    pattern: "VLOOKUP",
    hint: "=VLOOKUP(F2, A2:D6, 4, FALSE)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Gaji" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP002" }, "B3": { value: "Siti Nurhaliza" }, "C3": { value: "Marketing" }, "D3": { value: 7200000 },
      "A4": { value: "EMP003" }, "B4": { value: "Rizky Febian" }, "C4": { value: "IT Support" }, "D4": { value: 9800000 },
      "A5": { value: "EMP004" }, "B5": { value: "Dewi Persik" }, "C5": { value: "HRD" }, "D5": { value: 6900000 },
      "A6": { value: "EMP005" }, "B6": { value: "Andi Wijaya" }, "C6": { value: "Operations" }, "D6": { value: 11000000 },
      "F2": { value: "EMP003" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-02",
    lessonId: "les-adv-01",
    taskNumber: 2,
    title: "Soal 2: Cari Departemen EMP001 (VLOOKUP)",
    instruction: "Cari Departemen karyawan EMP001 di cell G2 pake =VLOOKUP(F2, A2:D6, 3, FALSE).",
    targetCell: "G2",
    expectedValue: "Finance",
    pattern: "VLOOKUP",
    hint: "=VLOOKUP(F2, A2:D6, 3, FALSE)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Dept" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP002" }, "B3": { value: "Siti Nurhaliza" }, "C3": { value: "Marketing" }, "D3": { value: 7200000 },
      "A4": { value: "EMP003" }, "B4": { value: "Rizky Febian" }, "C4": { value: "IT Support" }, "D4": { value: 9800000 },
      "F2": { value: "EMP001" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-03",
    lessonId: "les-adv-01",
    taskNumber: 3,
    title: "Soal 3: Cari Nama Karyawan EMP005 (VLOOKUP)",
    instruction: "Cari Nama karyawan EMP005 di cell G2 pake =VLOOKUP(F2, A2:D6, 2, FALSE).",
    targetCell: "G2",
    expectedValue: "Andi Wijaya",
    pattern: "VLOOKUP",
    hint: "=VLOOKUP(F2, A2:D6, 2, FALSE)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Nama" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP005" }, "B3": { value: "Andi Wijaya" }, "C3": { value: "Operations" }, "D3": { value: 11000000 },
      "F2": { value: "EMP005" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-xlookup-01",
    lessonId: "les-adv-02",
    taskNumber: 4,
    title: "Soal 4: Cari Departemen EMP004 (XLOOKUP)",
    instruction: "Cari Departemen karyawan EMP004 di cell G2 pake =XLOOKUP(F2, A2:A6, C2:C6).",
    targetCell: "G2",
    expectedValue: "HRD",
    pattern: "XLOOKUP",
    hint: "=XLOOKUP(F2, A2:A6, C2:C6)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Dept" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP002" }, "B3": { value: "Siti Nurhaliza" }, "C3": { value: "Marketing" }, "D3": { value: 7200000 },
      "A4": { value: "EMP003" }, "B4": { value: "Rizky Febian" }, "C4": { value: "IT Support" }, "D4": { value: 9800000 },
      "A5": { value: "EMP004" }, "B5": { value: "Dewi Persik" }, "C5": { value: "HRD" }, "D5": { value: 6900000 },
      "A6": { value: "EMP005" }, "B6": { value: "Andi Wijaya" }, "C6": { value: "Operations" }, "D6": { value: 11000000 },
      "F2": { value: "EMP004" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-05",
    lessonId: "les-adv-02",
    taskNumber: 5,
    title: "Soal 5: Cari Gaji EMP002 (XLOOKUP)",
    instruction: "Cari Gaji karyawan EMP002 di cell G2 pake =XLOOKUP(F2, A2:A6, D2:D6).",
    targetCell: "G2",
    expectedValue: 7200000,
    pattern: "XLOOKUP",
    hint: "=XLOOKUP(F2, A2:A6, D2:D6)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Gaji" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP002" }, "B3": { value: "Siti Nurhaliza" }, "C3": { value: "Marketing" }, "D3": { value: 7200000 },
      "F2": { value: "EMP002" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-06",
    lessonId: "les-adv-02",
    taskNumber: 6,
    title: "Soal 6: Pencarian Dinamis (INDEX MATCH)",
    instruction: "Cari Gaji karyawan EMP003 pake kombinasi =INDEX(D2:D6, MATCH(F2, A2:A6, 0)) di cell G2.",
    targetCell: "G2",
    expectedValue: 9800000,
    pattern: "INDEX",
    hint: "=INDEX(D2:D6, MATCH(F2, A2:A6, 0))",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Gaji" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP002" }, "B3": { value: "Siti Nurhaliza" }, "C3": { value: "Marketing" }, "D3": { value: 7200000 },
      "A4": { value: "EMP003" }, "B4": { value: "Rizky Febian" }, "C4": { value: "IT Support" }, "D4": { value: 9800000 },
      "F2": { value: "EMP003" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-07",
    lessonId: "les-adv-01",
    taskNumber: 7,
    title: "Soal 7: Cari Gaji Manajer IT (VLOOKUP)",
    instruction: "Cari Gaji karyawan EMP003 di cell G2 pake =VLOOKUP(F2, A2:D6, 4, FALSE).",
    targetCell: "G2",
    expectedValue: 9800000,
    pattern: "VLOOKUP",
    hint: "=VLOOKUP(F2, A2:D6, 4, FALSE)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Gaji" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "A3": { value: "EMP003" }, "B3": { value: "Rizky Febian" }, "C3": { value: "IT Support" }, "D3": { value: 9800000 },
      "F2": { value: "EMP003" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-08",
    lessonId: "les-adv-02",
    taskNumber: 8,
    title: "Soal 8: Cari Nama via ID (XLOOKUP)",
    instruction: "Cari Nama karyawan EMP001 di cell G2 pake =XLOOKUP(F2, A2:A6, B2:B6).",
    targetCell: "G2",
    expectedValue: "Budi Santoso",
    pattern: "XLOOKUP",
    hint: "=XLOOKUP(F2, A2:A6, B2:B6)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Nama" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 8500000 },
      "F2": { value: "EMP001" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-09",
    lessonId: "les-adv-01",
    taskNumber: 9,
    title: "Soal 9: Cari Bonus Karyawan (VLOOKUP)",
    instruction: "Cari Bonus karyawan EMP001 di cell G2 pake =VLOOKUP(F2, A2:D6, 4, FALSE).",
    targetCell: "G2",
    expectedValue: 2500000,
    pattern: "VLOOKUP",
    hint: "=VLOOKUP(F2, A2:D6, 4, FALSE)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Bonus (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Bonus" },
      "A2": { value: "EMP001" }, "B2": { value: "Budi Santoso" }, "C2": { value: "Finance" }, "D2": { value: 2500000 },
      "F2": { value: "EMP001" }, "G2": { value: "" }
    }
  },
  {
    id: "ex-adv-10",
    lessonId: "les-adv-02",
    taskNumber: 10,
    title: "Soal 10: Cari Gaji EMP005 (XLOOKUP)",
    instruction: "Cari Gaji karyawan EMP005 di cell G2 pake =XLOOKUP(F2, A2:A6, D2:D6).",
    targetCell: "G2",
    expectedValue: 11000000,
    pattern: "XLOOKUP",
    hint: "=XLOOKUP(F2, A2:A6, D2:D6)",
    data: {
      "A1": { value: "ID Karyawan" }, "B1": { value: "Nama" }, "C1": { value: "Departemen" }, "D1": { value: "Gaji (Rp)" }, "F1": { value: "ID Dicari" }, "G1": { value: "Hasil Gaji" },
      "A2": { value: "EMP005" }, "B2": { value: "Andi Wijaya" }, "C2": { value: "Operations" }, "D2": { value: 11000000 },
      "F2": { value: "EMP005" }, "G2": { value: "" }
    }
  }
];

const allTasks = [...basicTasks, ...intermediateTasks, ...advancedTasks];

allTasks.forEach((t) => {
  const fileContent = {
    id: t.id,
    lessonId: t.lessonId,
    taskNumber: t.taskNumber,
    title: t.title,
    type: "formula",
    instruction: t.instruction,
    dataset: {
      rows: 9,
      cols: 7,
      data: t.data
    },
    expectedAnswer: {
      targetCell: t.targetCell,
      expectedValue: t.expectedValue,
      requiredFormulaPattern: t.pattern,
      checkType: "both"
    },
    hint: t.hint
  };

  const filePath = path.join(exercisesDir, `${t.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf-8');
});

console.log(`Successfully generated ${allTasks.length} task JSON files!`);
