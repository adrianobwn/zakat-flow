"use client"

import { useState } from "react"
import { ArrowRight, Landmark } from "lucide-react"
import { SyariahBadge } from "@/components/ui/custom-icons"

export function HeroSection() {
  const [amount, setAmount] = useState("")

  return (
    <section className="relative w-full bg-emerald-50 text-slate-900 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Soft welcoming background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left: Warm, Uplifting Text + Quranic Verse */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10 pr-0 lg:pr-8">

            {/* Spiritual Core - At-Tawbah 103 */}
            <div className="flex flex-col space-y-3 border-l-4 border-emerald-300 pl-6 py-2">
              <p className="font-display text-2xl md:text-3xl text-emerald-800 leading-relaxed" dir="rtl">
                خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-relaxed text-slate-600">
                  "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..."
                </p>
                <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  QS. At-Tawbah: 103
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
                Sucikan Harta.<br />
                <span className="text-emerald-600 font-light">Berdayakan Sesama.</span>
              </h1>

              <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-600">
                Platform Islami yang ramah untuk menunaikan kewajiban Zakat Anda. Proses yang mudah, transparan, dan berdampak nyata bagi umat.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold text-emerald-800 uppercase tracking-widest">
              <SyariahBadge className="h-6 w-6 text-emerald-500" />
              Tersertifikasi Syariah
            </div>
          </div>

          {/* Right: Soft & Welcoming Calculator */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">

            <div className="relative p-8 rounded-3xl border border-emerald-100 bg-white shadow-soft transition-shadow hover:shadow-soft-hover">

              {/* Decorative top arch shape hint */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white border-t border-l border-r border-emerald-100 rounded-t-full hidden sm:block"></div>

              <div className="mb-10 text-center relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-full mb-4 ring-4 ring-white shadow-sm">
                  <Landmark className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">Kalkulator Zakat</h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">Hitung cepat kewajiban zakat penghasilan Anda</p>
              </div>

              <div className="space-y-10">
                <div className="relative group/input">
                  <label htmlFor="amount" className="block text-sm font-bold text-slate-700 mb-2">
                    Penghasilan Bulanan
                  </label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <span className="pr-3 font-display text-lg font-bold text-slate-400">Rp</span>
                    <input
                      type="text"
                      id="amount"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "")
                        setAmount(val)
                      }}
                      className="w-full bg-transparent font-display text-3xl font-bold tracking-tight text-slate-900 outline-none placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4 rounded-2xl bg-emerald-50/50 p-6 border border-emerald-100/50">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-600">Nisab Rate</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">2.5%</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-emerald-100/50 pt-4">
                    <span className="font-display text-sm font-bold text-slate-700">
                      Wajib Ditunaikan
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-600">
                      Rp {(amount ? Number(amount) * 0.025 : 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button className="group/btn relative flex w-full items-center justify-center space-x-2 rounded-full bg-emerald-600 px-6 py-4 shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-hover active:scale-[0.98]">
                  <span className="font-display text-sm font-bold text-white">
                    Tunaikan Zakat Sekarang
                  </span>
                  <ArrowRight className="h-5 w-5 text-emerald-100 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
