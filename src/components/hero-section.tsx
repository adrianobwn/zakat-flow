"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { SyariahBadge } from "@/components/ui/custom-icons"

export function HeroSection() {
  return (
    <section className="relative w-full bg-emerald-50 text-slate-900 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Soft welcoming background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left: Warm, Uplifting Text + Quranic Verse */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-10 pr-0 lg:pr-8"
          >

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
          </motion.div>

          {/* Right: Premium Islamic Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex flex-col items-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main Illustration */}
              <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden border-8 border-white shadow-soft transition-transform hover:scale-[1.02] duration-500">
                <img
                  src="/hero-illustration.png"
                  alt="Islamic Zakat Illustration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-amber-100/40 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl"></div>
            </div>

            {/* Premium CTA Mobile/Desktop alignment */}
            <div className="mt-12 w-full max-w-sm">
              <a
                href="#kalkulator"
                className="group/btn relative flex w-full items-center justify-center space-x-3 rounded-full bg-emerald-600 px-8 py-5 shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-hover active:scale-[0.98]"
              >
                <span className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Hitung Zakat Sekarang
                </span>
                <ArrowRight className="h-6 w-6 text-emerald-100 transition-transform group-hover/btn:translate-x-2" />
              </a>
              <p className="text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                Cepat • Akurat • Transparan
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
