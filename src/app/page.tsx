import Link from "next/link";
import { ArrowRight, Table, CheckCircle2, Zap, Sparkles, Trophy, Users, GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF5FF] text-[#2D2342] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-12 bg-gradient-to-b from-[#E0CFFC]/60 via-[#FAF5FF] to-[#FAF5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2D2342] leading-tight">
                Belajar Excel <span className="bg-gradient-to-r from-[#FF758F] via-[#BDE0FE] to-[#E0CFFC] bg-clip-text text-transparent underline decoration-[#FFC8DD] underline-offset-8">Ayya</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl mx-auto">
                Yuk belajar Excel bareng! Dari dasar sampai bisa PivotTable dan Lookup. Tampilannya lucu, gampang dimengerti, dan praktiknya beneran mirip Excel asli. Bisa konek belajar realtime berdua juga!
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/modules"
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-[#FFC8DD] hover:bg-[#FFADAD] active:scale-95 text-[#2D2342] font-black rounded-2xl shadow-md border border-[#FFADAD] transition-all text-base"
                >
                  <span>Mulai Latihan Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/modules/01-basic/01-formula-dasar"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF5FF] text-[#2D2342] font-bold rounded-2xl border-2 border-[#E0CFFC] transition-all text-base shadow-sm"
                >
                  <Table className="w-5 h-5 text-[#FF758F]" />
                  <span>Coba Lembar Kerja Excel</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Sandbox Preview Mockup */}
          <FadeIn delay={0.4} className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-[#E0CFFC] bg-white shadow-xl p-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#E0CFFC] pb-3 mb-4 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FFADAD]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFD6A5]" />
                  <div className="w-3 h-3 rounded-full bg-[#CFFFE5]" />
                  <span className="ml-2 font-bold text-[#2D2342]">Tampilan Lembar Kerja Excel (Simpel & Mirip Asli)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2D2342] font-bold bg-[#E0CFFC] px-3 py-1 rounded-full border border-[#C7CEEA]">
                  <Users className="w-3.5 h-3.5 text-[#FF758F]" />
                  <span>Realtime Sync Belajar Bareng</span>
                </div>
              </div>

              <div className="bg-[#FAF5FF] p-4 rounded-2xl border border-[#E0CFFC] font-mono text-xs text-[#2D2342] space-y-3">
                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-[#C7CEEA]">
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

                  <div className="p-2 bg-white rounded-lg border border-[#E0CFFC]">Februari</div>
                  <div className="p-2 bg-white rounded-lg border border-[#E0CFFC]">Rp 18.500.000</div>
                  <div className="p-2 bg-[#CFFFE5] text-emerald-800 rounded-lg font-bold">OK</div>

                  <div className="p-2 bg-[#FFDAC1] text-[#2D2342] rounded-lg font-bold">Total (B7)</div>
                  <div className="p-2 bg-[#FFF1C1] text-[#2D2342] rounded-lg font-bold">Rp 100.000.000</div>
                  <div className="p-2 bg-[#FFC8DD] text-[#2D2342] rounded-lg font-black flex items-center justify-center gap-1 border border-[#FFADAD]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>BENAR BANGEET!</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black text-[#2D2342]">
            Kenapa Enak Belajar Di Sini?
          </h2>
          <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto">
            Gak usah pusing sama teori ribet, tinggal buka materi singkat lalu langsung coba sendiri di kotaknya!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.1} className="p-6 bg-white rounded-3xl border-2 border-[#FFDAC1] shadow-md space-y-4">
            <div className="w-12 h-12 bg-[#FFDAC1] rounded-2xl flex items-center justify-center text-[#2D2342]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#2D2342]">Langsung Coba Sendiri</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Ketik langsung rumus Excel di kotak spreadsheet-nya. Langsung kerasa gimana cara kerjanya di dunia nyata.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="p-6 bg-white rounded-3xl border-2 border-[#CFFFE5] shadow-md space-y-4">
            <div className="w-12 h-12 bg-[#CFFFE5] rounded-2xl flex items-center justify-center text-[#2D2342]">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-xl font-black text-[#2D2342]">Cek Jawaban Otomatis</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Tinggal klik &quot;Cek Jawaban&quot;, sistem bakal kasih tau jawaban kamu udah bener atau masih perlu diperbaiki plus penjelasannya!
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="p-6 bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-md space-y-4">
            <div className="w-12 h-12 bg-[#E0CFFC] rounded-2xl flex items-center justify-center text-[#2D2342]">
              <Users className="w-6 h-6 text-[#FF758F]" />
            </div>
            <h3 className="text-xl font-black text-[#2D2342]">Konek Belajar Realtime</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Masukin Kode Ruang yang sama buat belajar bareng temen kamu. Tiap kali ngubah isi cell, di layar temen kamu langsung keubah realtime!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Course Levels Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-[#2D2342] rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-[#E0CFFC] space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#FF758F] font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#FF758F]" />
              <span>3 Tingkatan Belajar</span>
            </span>
            <h2 className="text-3xl font-black text-[#2D2342]">Mau Belajar Yang Mana Dulu?</h2>
            <p className="text-sm text-slate-600 font-medium">
              Pilih tingkatan belajar kamu: Adik-adik (Dasar), Abang-abangan (Menengah), atau Sepuh (Lanjutan).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Adik-adik */}
            <div className="p-6 bg-[#FAF5FF] rounded-2xl border-2 border-[#FFC8DD] space-y-3 hover:bg-[#FFC8DD]/20 transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
                <span>Level: Adik-adik</span>
              </div>
              <h4 className="text-lg font-black text-[#2D2342]">SUM, AVERAGE, MAX, MIN</h4>
              <p className="text-xs text-slate-600 font-medium">Belajar cara hitung total, rata-rata, sama nyari angka paling gede atau paling kecil dari dasar.</p>
            </div>

            {/* Level 2: Abang-abangan */}
            <div className="p-6 bg-[#FAF5FF] rounded-2xl border-2 border-[#BDE0FE] space-y-3 hover:bg-[#BDE0FE]/20 transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#BDE0FE] text-[#2D2342] text-xs font-black rounded-full border border-[#90E0EF]">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>Level: Abang-abangan</span>
              </div>
              <h4 className="text-lg font-black text-[#2D2342]">IF, SUMIF & HLOOKUP</h4>
              <p className="text-xs text-slate-600 font-medium">Belajar rumus logika &quot;kalau-maka&quot;, penjumlahan bersyarat, dan cara nyari data mendatar.</p>
            </div>

            {/* Level 3: Sepuh */}
            <div className="p-6 bg-[#FAF5FF] rounded-2xl border-2 border-[#FFD6A5] space-y-3 hover:bg-[#FFD6A5]/20 transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD6A5] text-[#2D2342] text-xs font-black rounded-full border border-[#FFB5A7]">
                <Trophy className="w-3.5 h-3.5 text-amber-700" />
                <span>Level: Sepuh</span>
              </div>
              <h4 className="text-lg font-black text-[#2D2342]">VLOOKUP, XLOOKUP & PivotTable</h4>
              <p className="text-xs text-slate-600 font-medium">Belajar nyari data otomatis dari tabel lain dan bikin ringkasan laporan otomatis pake PivotTable.</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black text-sm rounded-2xl transition-all shadow-md border border-[#FFADAD]"
            >
              <span>Lihat Semua Materi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


