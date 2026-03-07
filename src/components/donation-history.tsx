"use client"

import { useState } from "react"
import { Search, Loader2, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

type HistoryItem = {
  id: string
  zakatType: string
  amount: number
  date: string
  campaignName: string | null
}

const ZAKAT_LABELS: Record<string, string> = {
  FITRAH: "Zakat Fitrah",
  MAAL: "Zakat Maal",
  FIDYAH: "Fidyah",
  SEDEKAH: "Sedekah",
}

const ZAKAT_COLORS: Record<string, string> = {
  FITRAH: "bg-emerald-100 text-emerald-700",
  MAAL: "bg-blue-100 text-blue-700",
  FIDYAH: "bg-amber-100 text-amber-700",
  SEDEKAH: "bg-purple-100 text-purple-700",
}

export function DonationHistory() {
  const [email, setEmail] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg("")

    if (!email.trim()) {
      setErrorMsg("Email wajib diisi.")
      return
    }

    setIsLoading(true)
    setHasSearched(false)

    try {
      const res = await fetch(`/api/history?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Gagal memuat riwayat.")
        return
      }

      setHistory(data.history)
      setHasSearched(true)
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.")
    } finally {
      setIsLoading(false)
    }
  }

  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  return (
    <section id="history" className="bg-white py-24 sm:py-32 overflow-hidden relative">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-50 rounded-full mb-6 text-emerald-700">
            <Search className="h-4 w-4 mr-2" />
            <span className="font-display text-xs font-bold tracking-widest uppercase px-2">
              Lacak Kebaikan
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl font-display tracking-tight">
            Riwayat Donasi
          </h2>
          <p className="mt-4 text-lg text-slate-500 font-medium">
            Cek catatan penunaian zakat Anda cukup dengan alamat email.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-[2rem] shadow-soft border border-emerald-100 transition-all focus-within:ring-4 focus-within:ring-emerald-500/10">
            <div className="flex-1 relative">
              <Label htmlFor="history-email" className="sr-only">Email</Label>
              <Input
                id="history-email"
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full border-none bg-transparent h-14 pl-6 text-slate-900 placeholder:text-slate-300 focus-visible:ring-0 rounded-[2rem]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold shadow-soft transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Cari Riwayat
                </>
              )}
            </Button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-red-600">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <p className="text-xs font-bold tracking-tight">{errorMsg}</p>
          </div>
        )}

        {hasSearched && history.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="p-6 bg-slate-50 rounded-full mb-6">
              <Inbox className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">
              Belum menemukan riwayat donasi untuk email ini.
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2">
              Ditemukan {history.length} Catatan
            </p>
            {history.map((item) => (
              <div key={item.id} className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-soft hover:shadow-soft-hover transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                        ZAKAT_COLORS[item.zakatType] || "bg-slate-100 text-slate-700"
                      )}>
                        {ZAKAT_LABELS[item.zakatType] || item.zakatType}
                      </span>
                      {item.campaignName && (
                        <span className="text-[10px] font-bold text-slate-400 border-l border-slate-200 pl-2 uppercase tracking-tight">
                          {item.campaignName}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        {fmtDate(item.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-display text-emerald-600">
                      {fmt(item.amount)}
                    </p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                      Berhasil
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-8 text-center">
              <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
                Seluruh data terenkripsi dan aman sesuai standar syariah digital.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
