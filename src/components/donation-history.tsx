"use client"

import { useState } from "react"
import { Search, Loader2, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <section id="history" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Riwayat Donasi
        </h2>
        <p className="mt-2 text-muted-foreground">
          Cek riwayat pembayaran zakat kamu dengan email.
        </p>

        <form onSubmit={handleSearch} className="mt-8 flex gap-2">
          <div className="flex-1">
            <Label htmlFor="history-email" className="sr-only">Email</Label>
            <Input
              id="history-email"
              type="email"
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Cari
          </Button>
        </form>

        {errorMsg && (
          <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
        )}

        {hasSearched && history.length === 0 && (
          <div className="mt-12 flex flex-col items-center text-center">
            <Inbox className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-muted-foreground">
              Belum ada riwayat donasi untuk email ini.
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 space-y-3">
            {history.map((item) => (
              <Card key={item.id} className="border-border/60">
                <CardContent className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ZAKAT_COLORS[item.zakatType] || "bg-gray-100 text-gray-700"}`}>
                        {ZAKAT_LABELS[item.zakatType] || item.zakatType}
                      </span>
                      {item.campaignName && (
                        <span className="truncate text-xs text-muted-foreground">
                          {item.campaignName}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {fmtDate(item.date)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {fmt(item.amount)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
