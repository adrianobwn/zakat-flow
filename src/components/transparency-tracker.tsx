"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

const COLLECTED = 2847500000
const DISTRIBUTED = 2156200000

export function TransparencyTracker() {
  const [progress, setProgress] = useState(0)
  const percentage = (DISTRIBUTED / COLLECTED) * 100

  useEffect(() => {
    const t = setTimeout(() => setProgress(percentage), 300)
    return () => clearTimeout(t)
  }, [percentage])

  const fmtBillion = (n: number) => {
    const b = n / 1_000_000_000
    return b >= 1 ? `${b.toFixed(1)}M` : `${(n / 1_000_000).toFixed(0)}jt`
  }

  return (
    <section id="transparency" className="bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Transparansi Dana
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-600">Live</span>
            </div>
          </div>
          <p className="mt-2 text-muted-foreground">
            Ramadhan 1446H / 2025
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tersalurkan</p>
                <p className="text-3xl font-bold text-foreground">
                  Rp {fmtBillion(DISTRIBUTED)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                dari Rp {fmtBillion(COLLECTED)}
              </p>
            </div>

            <Progress value={progress} className="h-3" />

            <p className="text-sm text-muted-foreground">
              {percentage.toFixed(0)}% dana sudah disalurkan
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-muted/40 py-4">
              <p className="text-2xl font-bold text-foreground">8,432</p>
              <p className="text-xs text-muted-foreground">Donatur</p>
            </div>
            <div className="rounded-lg bg-muted/40 py-4">
              <p className="text-2xl font-bold text-foreground">12,847</p>
              <p className="text-xs text-muted-foreground">Penerima</p>
            </div>
            <div className="rounded-lg bg-muted/40 py-4">
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Program</p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-sm font-medium text-foreground">Kemana aja?</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Fakir Miskin", pct: 45 },
                { label: "Pendidikan", pct: 25 },
                { label: "Kesehatan", pct: 18 },
                { label: "Lainnya", pct: 12 },
              ].map((c) => (
                <span
                  key={c.label}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {c.label} {c.pct}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
