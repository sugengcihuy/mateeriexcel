import Link from "next/link";
import { ArrowRight, Table, Zap, Users, Lightbulb, Keyboard, Target, Lock } from "lucide-react";
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
                  className="flex items-center gap-2.5 px-8 py-4 bg-[#FFC8DD] hover:bg-[#FFADAD] active:scale-95 text-[#2D2342] font-black rounded-2xl shadow-[5px_5px_15px_rgba(235,160,185,0.5),-5px_-5px_15px_rgba(255,255,255,0.9)] border-2 border-[#FFADAD] transition-all text-base"
                >
                  <span>Mulai Latihan Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/modules/01-basic/01-formula-dasar"
                  className="flex items-center gap-2 px-7 py-4 bg-white hover:bg-[#FAF5FF] text-[#2D2342] font-bold rounded-2xl border-2 border-[#E0CFFC] shadow-[5px_5px_15px_rgba(210,190,235,0.4),-5px_-5px_15px_rgba(255,255,255,0.9)] transition-all text-base"
                >
                  <Table className="w-5 h-5 text-[#FF758F]" />
                  <span>Coba Lembar Kerja Excel</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Sandbox Preview Mockup */}
          <FadeIn delay={0.3} className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-[#E0CFFC] bg-white shadow-[8px_8px_24px_rgba(210,190,235,0.45),-8px_-8px_24px_rgba(255,255,255,0.95)] p-4 sm:p-6">
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

              <div className="bg-[#FAF5FF] p-4 rounded-2xl border border-[#E0CFFC] font-mono text-xs text-[#2D2342] space-y-3">
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

      {/* Section 1: Tips & Trik Excel Praktis (Bahasa Manusiawi Sehari-hari) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF1C1] border border-[#FFD6A5] text-[#2D2342] text-xs font-black rounded-full">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span>Tips & Trik Excel Biar Kerja Nggak Capek</span>
            </div>
            <h2 className="text-3xl font-black text-[#2D2342]">Trik Singkat yang Langsung Terpakai</h2>
            <p className="text-sm text-slate-600 font-semibold max-w-xl mx-auto">
              Gak perlu hafal ratusan rumus. Cukup kuasai trik dasar ini buat ngehemat waktu kerja kamu setiap hari.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] space-y-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC8DD] border border-[#FFADAD] flex items-center justify-center text-[#2D2342]">
                <Keyboard className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Sorot Data Kilat</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Ctrl + Shift + Panah</code> untuk blok baris data panjang dalam sekali pencet tanpa perlu scroll mouse.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] space-y-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#BDE0FE] border border-[#90E0EF] flex items-center justify-center text-[#2D2342]">
                <Lock className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Kunci Sel Pakai $</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Tekan tombol <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">F4</code> saat menulis rumus untuk mengunci sel rujukan agar tidak bergeser saat ditarik ke bawah.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] space-y-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#CFFFE5] border border-[#A0E7E5] flex items-center justify-center text-[#2D2342]">
                <Zap className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">SUM Otomatis</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Tekan <code className="bg-[#FAF5FF] px-1.5 py-0.5 rounded border border-[#E0CFFC] font-mono">Alt + =</code> di sel paling bawah data angka. Excel akan otomatis menuliskan rumus SUM secara tepat!
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] space-y-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF1C1] border border-[#FFD6A5] flex items-center justify-center text-[#2D2342]">
                <Target className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-base text-[#2D2342]">Rapikan Kolom Berantakan</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Double-click batas antara judul kolom (misal batas garis A dan B) untuk menyesuaikan lebar kolom secara otomatis sesuai teks terpanjang.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Penjelasan Tingkatan Belajar yang Manusiawi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        <FadeIn>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#2D2342]">Pilih Tingkatan Belajar Kamu</h2>
            <p className="text-sm text-slate-600 font-semibold max-w-xl mx-auto">
              Disusun dari materi paling dasar sampai teknik pemrosesan data tingkat tinggi di kantor.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Level 1 */}
          <FadeIn delay={0.1}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#FFC8DD] shadow-[6px_6px_16px_rgba(210,190,235,0.45),-6px_-6px_16px_rgba(255,255,255,0.95)] space-y-4">
              <span className="inline-block px-3 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD]">
                Level 1: Adik-adik
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">Fungsi Dasar & Statistik</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Cocok buat kamu yang baru pertama kali menyentuh Excel. Belajar cara menjumlahkan omset, menghitung rata-rata nilai, mencari nilai tertinggi dan terendah secara otomatis.
              </p>
              <Link
                href="/modules/01-basic/01-formula-dasar"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF758F] hover:underline pt-2"
              >
                <span>Pelajari Level Dasar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Level 2 */}
          <FadeIn delay={0.2}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-[6px_6px_16px_rgba(210,190,235,0.45),-6px_-6px_16px_rgba(255,255,255,0.95)] space-y-4">
              <span className="inline-block px-3 py-1 bg-[#E0CFFC] text-[#2D2342] text-xs font-black rounded-full border border-[#C7CEEA]">
                Level 2: Abang-abangan
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">Logika IF & Pencarian HLOOKUP</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Tingkatkan kemampuan laporan kamu. Belajar membuat keputusan lulus/remidi otomatis dengan IF, menjumlahkan data sesuai kategori dengan SUMIF, dan mencari tabel mendatar HLOOKUP.
              </p>
              <Link
                href="/modules/02-intermediate/01-logika-if-sumif"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF758F] hover:underline pt-2"
              >
                <span>Pelajari Level Menengah</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Level 3 */}
          <FadeIn delay={0.3}>
            <div className="p-7 bg-white rounded-3xl border-2 border-[#FFF1C1] shadow-[6px_6px_16px_rgba(210,190,235,0.45),-6px_-6px_16px_rgba(255,255,255,0.95)] space-y-4">
              <span className="inline-block px-3 py-1 bg-[#FFF1C1] text-[#2D2342] text-xs font-black rounded-full border border-[#FFD6A5]">
                Level 3: Sepuh
              </span>
              <h3 className="text-xl font-black text-[#2D2342]">VLOOKUP, XLOOKUP & PivotTable</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
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
