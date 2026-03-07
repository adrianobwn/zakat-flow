"use client"

import { useState } from "react"
import { Coins, Users, Wheat, CreditCard, ChevronRight, Loader2, Info } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const ZAKAT_FITRAH_RICE_KG = 2.5
const RICE_PRICE_KG = 20000 // Menyamakan dengan 50rb per jiwa
const ZAKAT_FITRAH_MONEY = ZAKAT_FITRAH_RICE_KG * RICE_PRICE_KG

const GOLD_PRICE_GRAM = 1150000
const NISAB_GRAM = 85
const NISAB_HARTA = NISAB_GRAM * GOLD_PRICE_GRAM

const FIDYAH_PER_DAY = 60000

type MainTab = "fitrah" | "maal" | "fidyah"
type MaalTab = "penghasilan" | "tabungan" | "perdagangan" | "emas" | "pertanian" | "peternakan" | "rikaz"

const ZAKAT_TYPE_MAP: Record<MainTab | MaalTab, string> = {
  fitrah: "FITRAH",
  maal: "MAAL", // fallback
  emas: "MAAL_EMAS",
  tabungan: "MAAL_TABUNGAN",
  penghasilan: "MAAL_PENGHASILAN",
  perdagangan: "MAAL_PERDAGANGAN",
  pertanian: "MAAL_PERTANIAN",
  peternakan: "MAAL_PETERNAKAN",
  rikaz: "MAAL_RIKAZ",
  fidyah: "FIDYAH",
}

export function ZakatCalculator() {
  const [activeTab, setActiveTab] = useState<MainTab>("fitrah")
  const [activeMaalTab, setActiveMaalTab] = useState<MaalTab>("penghasilan")

  // Fitrah
  const [fitrahPeople, setFitrahPeople] = useState(1)
  const [fitrahType, setFitrahType] = useState<"money" | "rice">("money")

  // Emas / Tabungan / Penghasilan / Rikaz
  const [wealthAmount, setWealthAmount] = useState("")

  // Perdagangan
  const [modal, setModal] = useState("")
  const [keuntungan, setKeuntungan] = useState("")
  const [piutangKas, setPiutangKas] = useState("")
  const [hutang, setHutang] = useState("")

  // Pertanian
  const [panen, setPanen] = useState("")
  const [irigasi, setIrigasi] = useState<"alami" | "berbayar">("alami")

  // Peternakan
  const [kambing, setKambing] = useState("")

  // Fidyah
  const [fidyahDays, setFidyahDays] = useState(1)

  // Form Details
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")
  const parseRp = (v: string) => parseInt(v.replace(/\D/g, "")) || 0

  // Calculations
  const fitrahTotal = fitrahType === "money"
    ? fitrahPeople * ZAKAT_FITRAH_MONEY
    : fitrahPeople * ZAKAT_FITRAH_RICE_KG * RICE_PRICE_KG
  const fitrahRiceEquivalent = fitrahPeople * ZAKAT_FITRAH_RICE_KG

  const wealthNum = parseRp(wealthAmount)

  // Emas & Tabungan
  const isNisabHarta = wealthNum >= NISAB_HARTA
  const hartaTotal = isNisabHarta ? Math.round(wealthNum * 0.025) : 0

  // Penghasilan (bulanan 1/12 nisab)
  const nisabBulan = Math.round(NISAB_HARTA / 12)
  const isNisabPenghasilan = wealthNum >= nisabBulan
  const penghasilanTotal = isNisabPenghasilan ? Math.round(wealthNum * 0.025) : 0

  // Rikaz
  const rikazTotal = Math.round(wealthNum * 0.20) // 20% tanpa nisab

  // Perdagangan
  const tModal = parseRp(modal)
  const tUntung = parseRp(keuntungan)
  const tKas = parseRp(piutangKas)
  const tHutang = parseRp(hutang)
  const asetDagang = (tModal + tUntung + tKas) - tHutang
  const isNisabDagang = asetDagang >= NISAB_HARTA
  const perdaganganTotal = isNisabDagang ? Math.round(asetDagang * 0.025) : 0

  // Pertanian
  const panenKg = parseRp(panen)
  const isNisabTani = panenKg >= 653
  const persentaseTani = irigasi === "alami" ? 0.1 : 0.05
  const pertanianZakatKg = isNisabTani ? Math.round(panenKg * persentaseTani) : 0
  const pertanianTotalValue = pertanianZakatKg * RICE_PRICE_KG // Estimasi IDR

  // Peternakan
  const jmlKambing = parseRp(kambing)
  let zakatKambing = 0
  if (jmlKambing >= 40 && jmlKambing <= 120) zakatKambing = 1
  else if (jmlKambing >= 121 && jmlKambing <= 200) zakatKambing = 2
  else if (jmlKambing >= 201 && jmlKambing <= 300) zakatKambing = 3
  else if (jmlKambing > 300) {
    zakatKambing = Math.floor(jmlKambing / 100) // Simplifikasi
  }
  const peternakanTotalValue = zakatKambing * 2500000 // Asumsi harga 1 kambing 2.5jt

  // Fidyah
  const fidyahTotal = fidyahDays * FIDYAH_PER_DAY

  function getActiveTotal(): number {
    switch (activeTab) {
      case "fitrah": return fitrahTotal
      case "maal":
        switch (activeMaalTab) {
          case "emas":
          case "tabungan": return hartaTotal
          case "penghasilan": return penghasilanTotal
          case "perdagangan": return perdaganganTotal
          case "pertanian": return pertanianTotalValue
          case "peternakan": return peternakanTotalValue
          case "rikaz": return rikazTotal
          default: return 0
        }
      case "fidyah": return fidyahTotal
      default: return 0
    }
  }

  async function handleSubmit() {
    setErrorMsg("")

    const amount = getActiveTotal()
    if (amount <= 0) {
      setErrorMsg("Nominal zakat harus lebih dari 0 atau memenuhi nisab.")
      return
    }
    if (!email.trim()) {
      setErrorMsg("Email wajib diisi.")
      return
    }

    setIsSubmitting(true)

    const finalZakatType = activeTab === "maal" ? ZAKAT_TYPE_MAP[activeMaalTab] : ZAKAT_TYPE_MAP[activeTab]

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          amount,
          zakatType: finalZakatType,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Gagal membuat pembayaran.")
        return
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Input Reset ketika pindah tab maal agar tidak bingung inputan nyangkut
  function handleMaalTabChange(tab: string) {
    setActiveMaalTab(tab as MaalTab)
    setWealthAmount("")
    setModal("")
    setKeuntungan("")
    setPiutangKas("")
    setHutang("")
    setPanen("")
    setKambing("")
    setErrorMsg("")
  }

  return (
    <section id="kalkulator" className="bg-emerald-950 py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay">
        <img src="/images/people_in_need_sharp.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-emerald-900/50 backdrop-blur-sm rounded-full mb-6 border border-emerald-800">
            <span className="font-display text-xs font-bold tracking-widest text-emerald-300 uppercase px-4">
              Hitung Kewajiban
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-5xl font-display tracking-tight">
            Kalkulator Zakat Komprehensif
          </h2>
          <p className="mt-4 text-lg text-emerald-100 font-medium">
            Tunaikan kewajiban Anda dengan perhitungan teliti sesuai syariat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-emerald-100/50 to-transparent backdrop-blur-sm">
            <div className="relative bg-white rounded-[2.3rem] shadow-2xl overflow-hidden min-h-[600px]">

              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-12 bg-white rounded-t-[3rem] hidden sm:block"></div>

              <div className="p-6 sm:p-10">
                <Tabs defaultValue="fitrah" value={activeTab} onValueChange={(v) => { setActiveTab(v as MainTab); setErrorMsg("") }}>

                  {/* MAIN TABS */}
                  <div className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-50 p-1.5 rounded-2xl h-auto gap-1">
                      <TabsTrigger value="fitrah" className="rounded-xl py-3 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all">Fitrah</TabsTrigger>
                      <TabsTrigger value="maal" className="rounded-xl py-3 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all">Maal (Harta)</TabsTrigger>
                      <TabsTrigger value="fidyah" className="rounded-xl py-3 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all">Fidyah</TabsTrigger>
                    </TabsList>
                  </div>

                  {/* FITRAH */}
                  <TabsContent value="fitrah" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-slate-700">Jumlah Orang yang Dizakati</Label>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-emerald-600 hover:bg-emerald-50" onClick={() => setFitrahPeople(Math.max(1, fitrahPeople - 1))}>
                          <span className="text-2xl">-</span>
                        </Button>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold font-display text-slate-900">{fitrahPeople}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Jiwa</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-emerald-600 hover:bg-emerald-50" onClick={() => setFitrahPeople(fitrahPeople + 1)}>
                          <span className="text-2xl">+</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-slate-700">Pilihan Penunaian</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setFitrahType("money")} className={cn("flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-5 px-4 transition-all group", fitrahType === "money" ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 ring-4 ring-emerald-500/10" : "border-slate-100 bg-white text-slate-400 hover:border-emerald-200 hover:bg-slate-50")}>
                          <div className={cn("p-3 rounded-full transition-colors", fitrahType === "money" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600")}><CreditCard className="h-5 w-5" /></div>
                          <span className="text-sm font-bold">Uang Tunai</span>
                        </button>
                        <button onClick={() => setFitrahType("rice")} className={cn("flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-5 px-4 transition-all group", fitrahType === "rice" ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 ring-4 ring-emerald-500/10" : "border-slate-100 bg-white text-slate-400 hover:border-emerald-200 hover:bg-slate-50")}>
                          <div className={cn("p-3 rounded-full transition-colors", fitrahType === "rice" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600")}><Wheat className="h-5 w-5" /></div>
                          <span className="text-sm font-bold">Beras / Makanan</span>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-emerald-600 p-6 text-white shadow-soft relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110"><Coins className="h-24 w-24" /></div>
                      <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Kewajiban Zakat</p>
                        <p className="mt-1 text-3xl font-bold font-display leading-none">{fmt(fitrahTotal)}</p>
                        <div className="mt-4 pt-4 border-t border-emerald-500/50 flex flex-col gap-1">
                          <p className="text-[10px] font-medium text-emerald-100 uppercase tracking-wider">Rincian: {fitrahPeople} jiwa x {fmt(ZAKAT_FITRAH_MONEY)}</p>
                          <p className="text-xs font-bold text-white flex items-center gap-1">🌾 Setara dengan {fitrahRiceEquivalent} kg Beras</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* MAAL (WITH SUB TABS) */}
                  <TabsContent value="maal" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Tabs value={activeMaalTab} onValueChange={handleMaalTabChange}>
                      <div className="mb-6 pb-2 relative w-full overflow-hidden">
                        <TabsList className="flex w-full overflow-x-auto bg-transparent p-0 h-auto gap-4 scrollbar-none snap-x *:shrink-0 justify-start border-b border-slate-100 rounded-none">
                          <TabsTrigger value="penghasilan" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Penghasilan</TabsTrigger>
                          <TabsTrigger value="tabungan" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Tabungan</TabsTrigger>
                          <TabsTrigger value="perdagangan" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Perdagangan</TabsTrigger>
                          <TabsTrigger value="emas" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Emas/Perak</TabsTrigger>
                          <TabsTrigger value="pertanian" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Pertanian</TabsTrigger>
                          <TabsTrigger value="peternakan" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Peternakan</TabsTrigger>
                          <TabsTrigger value="rikaz" className="rounded-none py-2 px-1 text-sm font-bold text-slate-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 transition-all snap-start">Rikaz (Temuan)</TabsTrigger>
                        </TabsList>
                      </div>

                      {/* MAAL: PENGHASILAN */}
                      <TabsContent value="penghasilan" className="space-y-8 animate-in fade-in duration-300">
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Gaji Kotor Bulanan (Rp)</Label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-5 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                            <span className="pr-3 font-display text-lg font-bold text-slate-400">Rp</span>
                            <input
                              type="text" inputMode="numeric" placeholder="0"
                              className="w-full bg-transparent font-display text-3xl font-bold text-slate-900 outline-none"
                              value={wealthAmount ? parseInt(wealthAmount).toLocaleString("id-ID") : ""}
                              onChange={(e) => setWealthAmount(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nisab Bulanan (1/12 x 85g Emas)</p>
                            <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{fmt(nisabBulan)}</p>
                          </div>
                        </div>

                        <div className={cn("rounded-2xl p-6 shadow-soft transition-all", isNisabPenghasilan ? "bg-emerald-600 text-white" : "bg-slate-50 border border-slate-200")}>
                          {wealthNum > 0 && !isNisabPenghasilan && (
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> Belum Mencapai Nisab
                            </p>
                          )}
                          <div>
                            <p className={cn("text-xs font-bold uppercase tracking-widest", isNisabPenghasilan ? "text-emerald-100" : "text-slate-400")}>Zakat Profesi 2.5%</p>
                            <p className={cn("mt-1 text-3xl font-bold font-display", isNisabPenghasilan ? "text-white" : "text-slate-300")}>{fmt(penghasilanTotal)}</p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* MAAL: TABUNGAN & EMAS */}
                      {["tabungan", "emas"].map((tab) => (
                        <TabsContent key={tab} value={tab} className="space-y-8 animate-in fade-in duration-300">
                          <div className="space-y-4">
                            <Label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                              {tab === "emas" ? "Total Nilai Emas/Perak (Rp)" : "Total Saldo Tabungan Mengendap (Rp)"}
                            </Label>
                            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-5 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                              <span className="pr-3 font-display text-lg font-bold text-slate-400">Rp</span>
                              <input
                                type="text" inputMode="numeric" placeholder="0"
                                className="w-full bg-transparent font-display text-3xl font-bold text-slate-900 outline-none placeholder:text-slate-200"
                                value={wealthAmount ? parseInt(wealthAmount).toLocaleString("id-ID") : ""}
                                onChange={(e) => setWealthAmount(e.target.value.replace(/\D/g, ""))}
                              />
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nisab (85g Emas / 1 Tahun)</p>
                              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{fmt(NISAB_HARTA)}</p>
                            </div>
                          </div>

                          <div className={cn("rounded-2xl p-6 shadow-soft transition-all", isNisabHarta ? "bg-emerald-600 text-white" : "bg-slate-50 border border-slate-200")}>
                            {wealthNum > 0 && !isNisabHarta && (
                              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> Belum Mencapai Nisab
                              </p>
                            )}
                            <div>
                              <p className={cn("text-xs font-bold uppercase tracking-widest", isNisabHarta ? "text-emerald-100" : "text-slate-400")}>Zakat Keluaran 2.5%</p>
                              <p className={cn("mt-1 text-3xl font-bold font-display", isNisabHarta ? "text-white" : "text-slate-300")}>{fmt(hartaTotal)}</p>
                            </div>
                          </div>
                        </TabsContent>
                      ))}

                      {/* MAAL: PERDAGANGAN */}
                      <TabsContent value="perdagangan" className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Modal Awal</Label>
                            <Input value={modal ? parseRp(modal).toLocaleString("id-ID") : ""} onChange={e => setModal(e.target.value)} placeholder="0" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Keuntungan</Label>
                            <Input value={keuntungan ? parseRp(keuntungan).toLocaleString("id-ID") : ""} onChange={e => setKeuntungan(e.target.value)} placeholder="0" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Piutang & Kas</Label>
                            <Input value={piutangKas ? parseRp(piutangKas).toLocaleString("id-ID") : ""} onChange={e => setPiutangKas(e.target.value)} placeholder="0" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Hutang Jatuh Tempo</Label>
                            <Input value={hutang ? parseRp(hutang).toLocaleString("id-ID") : ""} onChange={e => setHutang(e.target.value)} placeholder="0" className="h-12 bg-red-50 border-red-100 text-red-700 rounded-xl" />
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Aset Dagang</p>
                          <p className="font-bold text-slate-700">{fmt(asetDagang)}</p>
                        </div>

                        <div className={cn("rounded-2xl p-6 shadow-soft transition-all", isNisabDagang ? "bg-emerald-600 text-white" : "bg-slate-50 border border-slate-200")}>
                          {asetDagang > 0 && !isNisabDagang && (
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> Belum Mencapai Nisab ({fmt(NISAB_HARTA)})
                            </p>
                          )}
                          <div>
                            <p className={cn("text-xs font-bold uppercase tracking-widest", isNisabDagang ? "text-emerald-100" : "text-slate-400")}>Zakat Perdagangan 2.5%</p>
                            <p className={cn("mt-1 text-3xl font-bold font-display", isNisabDagang ? "text-white" : "text-slate-300")}>{fmt(perdaganganTotal)}</p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* MAAL: PERTANIAN */}
                      <TabsContent value="pertanian" className="space-y-6 animate-in fade-in duration-300">
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-slate-700">Hasil Panen (Kg)</Label>
                          <Input value={panen ? parseRp(panen).toLocaleString("id-ID") : ""} onChange={e => setPanen(e.target.value)} placeholder="Masukan dalam Kilogram" className="h-14 font-display text-2xl font-bold bg-slate-50 border-slate-200 rounded-2xl" />
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-slate-700">Jenis Irigasi/Pengairan</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setIrigasi("alami")} className={cn("rounded-2xl border-2 py-4 px-3 text-sm font-bold transition-all", irigasi === "alami" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-white text-slate-400")}>Alami / Hujan (10%)</button>
                            <button onClick={() => setIrigasi("berbayar")} className={cn("rounded-2xl border-2 py-4 px-3 text-sm font-bold transition-all", irigasi === "berbayar" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-white text-slate-400")}>Berbayar (5%)</button>
                          </div>
                        </div>

                        <div className={cn("rounded-2xl p-6 shadow-soft transition-all", isNisabTani ? "bg-emerald-600 text-white" : "bg-slate-50 border border-slate-200")}>
                          {panenKg > 0 && !isNisabTani && (
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Belum Mencapai Nisab (653 Kg)</p>
                          )}
                          <div>
                            <p className={cn("text-xs font-bold uppercase tracking-widest", isNisabTani ? "text-emerald-100" : "text-slate-400")}>Zakat Berupa Hasil Tani</p>
                            <p className={cn("mt-1 text-3xl font-bold font-display", isNisabTani ? "text-white" : "text-slate-300")}>{pertanianZakatKg} Kg</p>
                            {isNisabTani && (
                              <p className="mt-2 text-xs font-medium text-emerald-200 flex items-center gap-1"><Info className="w-3 h-3" /> Checkout via web ini dikonversi senilai {fmt(pertanianTotalValue)}.</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>

                      {/* MAAL: PETERNAKAN */}
                      <TabsContent value="peternakan" className="space-y-6 animate-in fade-in duration-300">
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-slate-700">Jumlah Hewan (Kambing/Domba)</Label>
                          <Input value={kambing ? parseRp(kambing).toLocaleString("id-ID") : ""} onChange={e => setKambing(e.target.value)} placeholder="0 Ekor" className="h-14 font-display text-2xl font-bold bg-slate-50 border-slate-200 rounded-2xl" />
                        </div>

                        <div className={cn("rounded-2xl p-6 shadow-soft transition-all", zakatKambing > 0 ? "bg-emerald-600 text-white" : "bg-slate-50 border border-slate-200")}>
                          {jmlKambing > 0 && zakatKambing === 0 && (
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Belum Mencapai Nisab (Min. 40 Ekor)</p>
                          )}
                          <div>
                            <p className={cn("text-xs font-bold uppercase tracking-widest", zakatKambing > 0 ? "text-emerald-100" : "text-slate-400")}>Zakat Hewan Ternak</p>
                            <p className={cn("mt-1 text-3xl font-bold font-display", zakatKambing > 0 ? "text-white" : "text-slate-300")}>{zakatKambing} Kambing</p>
                            {zakatKambing > 0 && (
                              <p className="mt-2 text-xs font-medium text-emerald-200 flex items-center gap-1"><Info className="w-3 h-3" /> Checkout via web sedekah setara {fmt(peternakanTotalValue)}.</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>

                      {/* MAAL: RIKAZ */}
                      <TabsContent value="rikaz" className="space-y-8 animate-in fade-in duration-300">
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Nilai Harta Temuan (Rp)</Label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-5 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                            <span className="pr-3 font-display text-lg font-bold text-slate-400">Rp</span>
                            <input
                              type="text" inputMode="numeric" placeholder="0"
                              className="w-full bg-transparent font-display text-3xl font-bold text-slate-900 outline-none"
                              value={wealthAmount ? parseInt(wealthAmount).toLocaleString("id-ID") : ""}
                              onChange={(e) => setWealthAmount(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md inline-flex flex-wrap items-center gap-1 w-fit mt-2">
                            <Info className="w-3 h-3 shrink-0" /> Zakat Rikaz dikeluarkan 20% sesaat setelah ditemukan, tanpa haul atau nisab.
                          </p>
                        </div>

                        <div className="rounded-2xl p-6 shadow-soft bg-emerald-600 text-white transition-all">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Zakat Rikaz 20%</p>
                            <p className="mt-1 text-3xl font-bold font-display text-white">{fmt(rikazTotal)}</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* FIDYAH */}
                  <TabsContent value="fidyah" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-slate-700">Hari Puasa yang Ditinggalkan</Label>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-emerald-600 hover:bg-emerald-50" onClick={() => setFidyahDays(Math.max(1, fidyahDays - 1))}><span className="text-2xl">-</span></Button>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold font-display text-slate-900">{fidyahDays}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Hari</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-emerald-600 hover:bg-emerald-50" onClick={() => setFidyahDays(fidyahDays + 1)}><span className="text-2xl">+</span></Button>
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic text-center">Bagi lansia, musafir, orang sakit menahun, atau ibu hamil/menyusui.</p>
                    </div>

                    <div className="rounded-2xl bg-emerald-600 p-6 text-white shadow-soft group relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Total Fidyah</p>
                        <p className="mt-1 text-3xl font-bold font-display leading-none">{fmt(fidyahTotal)}</p>
                        <p className="mt-4 pt-4 border-t border-emerald-500/50 text-[10px] font-medium text-emerald-100 uppercase tracking-wider">Perhitungan: {fidyahDays} hari x Rp 60.000 / hari</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 space-y-4 border-t border-slate-100 pt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calc-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Lengkap</Label>
                      <Input id="calc-name" type="text" placeholder="Hamba Allah" className="rounded-xl border-slate-100 bg-slate-50/50 p-6 h-12 focus:ring-emerald-500/20" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calc-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email <span className="text-emerald-500">*</span></Label>
                      <Input id="calc-email" type="email" placeholder="akram@gmail.com" className="rounded-xl border-slate-100 bg-slate-50/50 p-6 h-12 focus:ring-emerald-500/20" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <p className="text-xs font-bold tracking-tight">{errorMsg}</p>
                  </div>
                )}

                <Button
                  className="mt-8 w-full group/btn relative flex items-center justify-center space-x-2 rounded-full bg-emerald-600 px-6 py-8 shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-hover active:scale-[0.98] disabled:opacity-70"
                  size="lg"
                  disabled={isSubmitting || getActiveTotal() === 0}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin text-emerald-100" /><span className="font-display text-base font-bold text-white">Memproses...</span></>
                  ) : (
                    <><span className="font-display text-base font-bold text-white">Tunaikan Zakat </span><ChevronRight className="h-5 w-5 text-emerald-100 group-hover/btn:translate-x-1" /></>
                  )}
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-1 w-1 bg-emerald-300 rounded-full" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Kalkulator Akurat sesuai Syariat</p>
                  <div className="h-1 w-1 bg-emerald-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
