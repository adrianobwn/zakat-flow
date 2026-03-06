"use client"

import { MapPin, Calendar, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: 1,
    title: "Penyaluran 50 paket sembako",
    location: "Desa Sukamaju, Cianjur",
    date: "15 Mar 2025",
    recipients: 50,
    category: "Sembako",
  },
  {
    id: 2,
    title: "Beasiswa untuk 30 anak yatim",
    location: "Kota Bandung",
    date: "12 Mar 2025",
    recipients: 30,
    category: "Pendidikan",
  },
  {
    id: 3,
    title: "Pengobatan gratis massal",
    location: "Desa Cibeureum, Sukabumi",
    date: "10 Mar 2025",
    recipients: 200,
    category: "Kesehatan",
  },
  {
    id: 4,
    title: "Bantuan modal usaha pedagang kecil",
    location: "Kota Tasikmalaya",
    date: "8 Mar 2025",
    recipients: 20,
    category: "Ekonomi",
  },
  {
    id: 5,
    title: "Renovasi 5 rumah tidak layak huni",
    location: "Kampung Cicadas, Garut",
    date: "5 Mar 2025",
    recipients: 5,
    category: "Infrastruktur",
  },
  {
    id: 6,
    title: "Santunan untuk 80 lansia",
    location: "Kecamatan Lembang",
    date: "1 Mar 2025",
    recipients: 80,
    category: "Sosial",
  },
]

const categoryStyle: Record<string, string> = {
  Sembako: "bg-amber-50 text-amber-700",
  Pendidikan: "bg-blue-50 text-blue-700",
  Kesehatan: "bg-rose-50 text-rose-700",
  Ekonomi: "bg-teal-50 text-teal-700",
  Infrastruktur: "bg-purple-50 text-purple-700",
  Sosial: "bg-green-50 text-green-700",
}

export function DistributionFeed() {
  return (
    <section id="distribution" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Bukti Penyaluran
            </h2>
            <p className="mt-2 text-muted-foreground">
              Ini yang sudah kita salurkan bersama.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="hidden gap-1 sm:flex">
            Lihat semua
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <article
              key={a.id}
              className="group rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    categoryStyle[a.category] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {a.category}
                </span>
              </div>

              <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary">
                {a.title}
              </h3>

              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {a.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {a.date}
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <span className="text-sm">
                  <span className="font-semibold text-primary">{a.recipients}</span>
                  <span className="text-muted-foreground"> penerima manfaat</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="gap-1">
            Lihat semua
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
