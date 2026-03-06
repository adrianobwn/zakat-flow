import { ZakatLogo, SyariahBadge } from "@/components/ui/custom-icons"

export function Footer() {
  return (
    <footer className="bg-white py-16 text-slate-900 border-t border-emerald-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-soft">
              <ZakatLogo className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-slate-900">Zakat-Flow</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-900">Tentang</a>
            <a href="#" className="hover:text-emerald-900">Kontak</a>
            <a href="#" className="hover:text-emerald-900">Laporan Keuangan</a>
            <a href="#" className="hover:text-emerald-900">Kebijakan Privasi</a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-emerald-100 pt-8 sm:flex-row">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600/70">
            &copy; 2026 Zakat-Flow.
          </p>
          <div className="mt-6 flex gap-8 sm:mt-0">
            <div className="flex items-center gap-2 text-emerald-600/60">
              <SyariahBadge className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tersertifikasi BAZNAS</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Keamanan Bank</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
