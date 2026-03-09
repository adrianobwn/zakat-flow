import { ZakatLogo, SyariahBadge } from "@/components/ui/custom-icons"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white py-16 text-slate-900 border-t border-emerald-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-soft">
              <ZakatLogo className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-slate-900">NuraniZakat</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-900 transition-colors">Beranda</a>
            <a href="#kalkulator" className="hover:text-emerald-900 transition-colors">Kalkulator</a>
            <a href="#transparency" className="hover:text-emerald-900 transition-colors">Laporan Keuangan</a>
            <a href="#kontak" className="hover:text-emerald-900 transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }}>Kontak</a>
          </div>
        </div>

        {/* Original bottom section */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-emerald-100 pt-8 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600/70">
              &copy; 2026 NuraniZakat.
            </p>
            <Link href="/admin/login" className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/60 hover:text-emerald-900 transition-colors">
              Portal Admin
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 sm:mt-0">
            <div className="flex items-center gap-2 text-emerald-600/60">
              <SyariahBadge className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tersertifikasi BAZNAS</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Keamanan Bank</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600/60 font-medium">
              <span className="text-[10px] font-bold uppercase tracking-widest">Mitra Pembayaran: </span>
              <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Mayar.id</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
