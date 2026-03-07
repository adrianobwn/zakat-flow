"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ZakatLogo } from "@/components/ui/custom-icons"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/50 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 shadow-soft transition-transform group-hover:scale-105">
            <ZakatLogo className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 font-display tracking-tight transition-colors group-hover:text-emerald-600">
              NuraniZakat
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#kalkulator" className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600">
            Kalkulator
          </a>
          <a href="#transparency" className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600">
            Laporan Umat
          </a>
          <a href="#history" className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600">
            Riwayat
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="#transparency" className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 font-display text-sm font-bold text-white shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-hover">
            Pantau Donasi
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-xl p-2 text-slate-600 hover:bg-emerald-50 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden shadow-soft-active">
          <div className="flex flex-col gap-2">
            <a
              href="#kalkulator"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Kalkulator
            </a>
            <a
              href="#transparency"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Laporan Umat
            </a>
            <a
              href="#history"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Riwayat
            </a>
            <div className="mt-4 border-t border-emerald-100 pt-4">
              <a href="#transparency" className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-6 font-display text-sm font-bold text-white shadow-soft transition-colors hover:bg-emerald-700">
                Pantau Donasi
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
