import Link from "next/link";
import { ArrowRight, Table, Zap, Users, Keyboard, Target, Lock, Copy, Eye, MoveHorizontal, MousePointerClick } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { IntroOverlay } from "@/components/motion/IntroOverlay";

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF5FF] text-[#2D2342] min-h-screen">
      {/* Intro Splash Animation */}
      <IntroOverlay />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-12 bg-gradient-to-b from-[#E0CFFC]/50 via-[#FAF5FF] to-[#FAF5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2D2342] leading-tight">
                Belajar Excel <span className="bg-gradient-to-r from-[#FF758F] via-[#BDE0FE] to-[#E0CFFC] bg-clip-text text-transparent underline decoration-[#FFC8DD] underline-offset-8">Ayya</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/modules"
                  className="flex items-center gap-2.5 px-8 py-4 bg-[#FFC8DD] hover:bg-[#FFADAD] active:scale-95 text-[#2D2342] font-black rounded-2xl shadow-[6px_6px_16px_rgba(235,160,185,0.5),-6px_-6px_16px_rgba(255,255,255,0.9)] border-2 border-[#FFADAD] transition-all text-base"
                >
                  <span>Mulai Latihan Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/modules/01-basic/01-formula-dasar"
                  className="flex items-center gap-2 px-7 py-4 bg-white hover:bg-[#FAF5FF] text-[#2D2342] font-bold rounded-2xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] transition-all text-base"
                >
                  <Table className="w-5 h-5 text-[#FF758F]" />
                  <span>Coba Lembar Kerja Excel</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Sandbox Preview Mockup */}
          <FadeIn delay={0.3} className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-[#E0CFFC] bg-white shadow-[10px_10px_24px_rgba(210,190,235,0.45),-10px_-10px_24px_rgba(255,255,255,0.95)] p-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#E0CFFC] pb-3 mb-4 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFADAD]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFD6A5]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#CFFFE5]" />
                  <span className="ml-2 font-bold text-[#2D2342]">Tampilan Lembar Kerja Excel (Simpel & Mirip Asli)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2D2342] font-bold bg-[#E0CFFC] px-3 py-1 rounded-full border border-[#C7CEEA]">
                  <Users className="w-3.5 h-3.5 text-[#FF758F]" />
                  <span>Realtime Sync Belajar Bareng</span>
                </div>
              </div>

              <div className="bg-[#FAF5FF] p-4 rounded-2xl border border-[#E0CFFC] font-mono text-xs text-[#2D2342] space-y-3 shadow-inner">
                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-[#C7CEEA] shadow-inner">
                  <span className="px-2 py-0.5 bg-[#FFC8DD] text-[#2D2342] font-black rounded">B7</span>
                  <span className="text-slate-600 font-bold">=SUM(B2:B6)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#E0CFFC] rounded-xl font-bold text-[#2D2342]">Bulan</div>
                  <div className="p-2 bg-[#E0CFFC] rounded-xl font-bold text-[#2D2342]">Penjualan</div>
                  <div className="p-2 bg-[#E0CFFC] rounded-xl font-bold text-[#2D2342]">Status</div>

                  <div className="p-2 bg-white rounded-lg border border-[#E0CFFC]">Januari</div>
                  <div className="p-2 bg-white rounded-lg border border-[#E0CFFC]">Rp 15.000.000</div>
                  <div className="p-2 bg-[#CFFFE5] text-emerald-800 rounded-lg font-bold">OK</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: Tips & Trik Excel Praktis (Tanpa Pill Badge Gambar 3, Diperbanyak & Relevan Modul) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#2D2342]">Tips & Trik Excel Biar Kerja Nggak Capek</h2>
            <p className="text-sm text-slate-600 font-bold max-w-xl mx-auto">
              Kumpulan pintasan dan trik praktis sehari-hari yang langsung terhubung dengan materi modul latihan kamu.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC8DD] border border-[#FFADAD] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Keyboard className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Sorot Data Ribuan Sel Sekali Klik</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Ctrl + Shift + Panah</code> untuk blok seluruh baris data panjang tanpa perlu scroll mouse.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#BDE0FE] border border-[#90E0EF] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Lock className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Kunci Sel Rumus Pakai Tanda $</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">F4</code> saat menulis VLOOKUP & SUMIF agar tabel acuan tidak bergeser saat ditarik ke bawah.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#CFFFE5] border border-[#A0E7E5] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Zap className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">SUM Otomatis Tanpa Ketik</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Alt + =</code> di sel bawah data angka. Excel akan otomatis menuliskan rumus SUM presisi!
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF1C1] border border-[#FFD6A5] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Target className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Auto-Fit Lebar Kolom Presisi</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Double-click batas antar huruf kolom (misal batas A dan B) untuk menyesuaikan lebar sel otomatis sesuai teks terpanjang.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#E0CFFC] border border-[#C7CEEA] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Copy className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Ubah Rumus Jadi Nilai Tetap</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Copy data rumus lalu tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Ctrl + Alt + V</code> lalu pilih Values agar file tidak lelet.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#FFADAD] border border-[#FF758F] flex items-center justify-center text-[#2D2342] shadow-sm">
                <Eye className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Cek Semua Rumus Sekaligus</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Ctrl + ~</code> untuk menampilkan seluruh teks rumus di lembar kerja agar gampang mencari sel error.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#DBCDF0] border border-[#C7CEEA] flex items-center justify-center text-[#2D2342] shadow-sm">
                <MoveHorizontal className="w-5 h-5 text-indigo-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Pindah Sheet Tanpa Mouse</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Gunakan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Ctrl + PageDown</code> atau <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">PageUp</code> untuk berpindah tab lembar kerja secara instan.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] space-y-3 h-full hover:border-[#FFC8DD] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#FFDAC1] border border-[#FFD6A5] flex items-center justify-center text-[#2D2342] shadow-sm">
                <MousePointerClick className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Auto-Fill Rumus ke Bawah</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Double-click kotak kecil hijau di pojok kanan bawah sel untuk mengisi rumus otomatis sampai baris data paling akhir.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Penjelasan Tingkatan Belajar dengan Nama Link yang Konsisten */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        <FadeIn>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#2D2342]">Pilih Tingkatan Belajar Kamu</h2>
            <p className="text-sm text-slate-600 font-bold max-w-xl mx-auto">
              Disusun dari materi paling dasar sampai teknik pemrosesan data tingkat tinggi di kantor.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Level 1: Adik-adik */}
          <FadeIn delay={0.1}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#FFC8DD] shadow-[8px_8px_20px_rgba(210,190,235,0.45),-8px_-8px_20px_rgba(255,255,255,0.95)] space-y-4 hover:border-[#FFADAD] transition-all">
              <span className="inline-block px-3.5 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD]">
                Level 1: Adik-adik
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">Fungsi Dasar & Statistik</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Cocok buat kamu yang baru pertama kali menyentuh Excel. Belajar cara menjumlahkan omset, menghitung rata-rata nilai, mencari nilai tertinggi dan terendah secara otomatis.
              </p>
              <Link
                href="/modules/01-basic/01-formula-dasar"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF758F] hover:underline pt-2"
              >
                <span>Pelajari Level Adik-adik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Level 2: Abang-abangan */}
          <FadeIn delay={0.2}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.45),-8px_-8px_20px_rgba(255,255,255,0.95)] space-y-4 hover:border-[#BDE0FE] transition-all">
              <span className="inline-block px-3.5 py-1 bg-[#E0CFFC] text-[#2D2342] text-xs font-black rounded-full border border-[#C7CEEA]">
                Level 2: Abang-abangan
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">Logika IF & Pencarian HLOOKUP</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Tingkatkan kemampuan laporan kamu. Belajar membuat keputusan lulus/remidi otomatis dengan IF, menjumlahkan data sesuai kategori dengan SUMIF, dan mencari tabel mendatar HLOOKUP.
              </p>
              <Link
                href="/modules/02-intermediate/01-logika-if-sumif"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF758F] hover:underline pt-2"
              >
                <span>Pelajari Level Abang-abangan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Level 3: Sepuh */}
          <FadeIn delay={0.3}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#FFF1C1] shadow-[8px_8px_20px_rgba(210,190,235,0.45),-8px_-8px_20px_rgba(255,255,255,0.95)] space-y-4 hover:border-[#FFD6A5] transition-all">
              <span className="inline-block px-3.5 py-1 bg-[#FFF1C1] text-[#2D2342] text-xs font-black rounded-full border border-[#FFD6A5]">
                Level 3: Sepuh
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">VLOOKUP, XLOOKUP & PivotTable</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Senjata utama profesional kerja. Ambil data dari tabel master besar secara otomatis dengan VLOOKUP & XLOOKUP, serta buat ringkasan laporan eksekutif interaktif dengan PivotTable.
              </p>
              <Link
                href="/modules/03-advanced/01-vlookup"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF758F] hover:underline pt-2"
              >
                <span>Pelajari Level Sepuh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
