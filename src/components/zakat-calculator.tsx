"use client"

import { useState } from "react"
import { Coins, Users, Wheat, CreditCard, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const ZAKAT_FITRAH_MONEY = 50000
const ZAKAT_FITRAH_RICE_KG = 2.5
const RICE_PRICE_KG = 18000
const GOLD_PRICE_GRAM = 1150000
const NISAB_GRAM = 85
const FIDYAH_PER_DAY = 60000

type ZakatTab = "fitrah" | "maal" | "fidyah"

const ZAKAT_TYPE_MAP: Record<ZakatTab, string> = {
  fitrah: "FITRAH",
  maal: "MAAL",
  fidyah: "FIDYAH",
}

export function ZakatCalculator() {
  const [activeTab, setActiveTab] = useState<ZakatTab>("fitrah")
  const [fitrahPeople, setFitrahPeople] = useState(1)
  const [fitrahType, setFitrahType] = useState<"money" | "rice">("money")
  const [wealth, setWealth] = useState("")
  const [fidyahDays, setFidyahDays] = useState(1)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const fitrahTotal = fitrahType === "money" 
    ? fitrahPeople * ZAKAT_FITRAH_MONEY 
    : fitrahPeople * ZAKAT_FITRAH_RICE_KG * RICE_PRICE_KG

  const wealthNum = parseInt(wealth.replace(/\D/g, "")) || 0
  const nisab = NISAB_GRAM * GOLD_PRICE_GRAM
  const maalTotal = wealthNum >= nisab ? Math.round(wealthNum * 0.025) : 0

  const fidyahTotal = fidyahDays * FIDYAH_PER_DAY

  const fitrahRiceEquivalent = Math.round((fitrahTotal / RICE_PRICE_KG) * 10) / 10

  function getActiveTotal(): number {
    switch (activeTab) {
      case "fitrah": return fitrahTotal
      case "maal": return maalTotal
      case "fidyah": return fidyahTotal
    }
  }

  async function handleSubmit() {
    setErrorMsg("")

    const amount = getActiveTotal()
    if (amount <= 0) {
      setErrorMsg("Nominal zakat harus lebih dari 0.")
      return
    }
    if (!email.trim()) {
      setErrorMsg("Email wajib diisi.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          amount,
          zakatType: ZAKAT_TYPE_MAP[activeTab],
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

  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

  return (
    <section id="calculator" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Kalkulator Zakat
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hitung dulu, biar tau berapa yang harus dibayar.
          </p>

          <Card className="mt-8 border-border/60">
            <CardContent className="pt-6">
              <Tabs defaultValue="fitrah" onValueChange={(v) => { setActiveTab(v as ZakatTab); setErrorMsg("") }}>
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                  <TabsTrigger value="fitrah" className="text-xs sm:text-sm">
                    Fitrah
                  </TabsTrigger>
                  <TabsTrigger value="maal" className="text-xs sm:text-sm">
                    Maal
                  </TabsTrigger>
                  <TabsTrigger value="fidyah" className="text-xs sm:text-sm">
                    Fidyah
                  </TabsTrigger>
                </TabsList>

                {/* FITRAH */}
                <TabsContent value="fitrah" className="mt-6 space-y-5">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Jumlah orang
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFitrahPeople(Math.max(1, fitrahPeople - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center text-lg font-semibold text-foreground">
                        {fitrahPeople}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFitrahPeople(fitrahPeople + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Bayar pakai
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFitrahType("money")}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-colors",
                          fitrahType === "money"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        <CreditCard className="h-4 w-4" />
                        Uang
                      </button>
                      <button
                        onClick={() => setFitrahType("rice")}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-colors",
                          fitrahType === "rice"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        <Wheat className="h-4 w-4" />
                        Beras
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-4">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(fitrahTotal)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {fitrahPeople} orang x {fitrahType === "money" ? "Rp 50.000" : "2.5 kg beras"}
                    </p>
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      🌾 Setara dengan {fitrahRiceEquivalent} kg Beras
                    </p>
                  </div>
                </TabsContent>

                {/* MAAL */}
                <TabsContent value="maal" className="mt-6 space-y-5">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Total harta (tabungan, emas, investasi, dll)
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        className="pl-9 text-lg"
                        value={wealth ? parseInt(wealth).toLocaleString("id-ID") : ""}
                        onChange={(e) => setWealth(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Nisab: {fmt(nisab)} (85 gram emas)
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-4">
                    {wealthNum > 0 && wealthNum < nisab && (
                      <p className="mb-2 text-sm text-muted-foreground">
                        Belum sampai nisab, belum wajib zakat.
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">Zakat 2.5%</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(maalTotal)}
                    </p>
                  </div>
                </TabsContent>

                {/* FIDYAH */}
                <TabsContent value="fidyah" className="mt-6 space-y-5">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Jumlah hari puasa yang ditinggalkan
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFidyahDays(Math.max(1, fidyahDays - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center text-lg font-semibold text-foreground">
                        {fidyahDays}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFidyahDays(fidyahDays + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Untuk yang tidak bisa puasa karena sakit, hamil, lansia, dll.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-4">
                    <p className="text-sm text-muted-foreground">Total Fidyah</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(fidyahTotal)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {fidyahDays} hari x Rp 60.000
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-3">
                <div>
                  <Label htmlFor="calc-name" className="text-sm text-muted-foreground">
                    Nama (opsional)
                  </Label>
                  <Input
                    id="calc-name"
                    type="text"
                    placeholder="Nama lengkap"
                    className="mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="calc-email" className="text-sm text-muted-foreground">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="calc-email"
                    type="email"
                    placeholder="email@contoh.com"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
              )}

              <Button
                className="mt-4 w-full gap-2 py-6"
                size="lg"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Bayar
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Sertifikat digital langsung dikirim ke email
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
