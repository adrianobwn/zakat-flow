"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SpiritualQuote } from "@/components/spiritual-quote"
import { TransparencyFeed } from "@/components/transparency-feed"
import { Footer } from "@/components/footer"

export default function ZakatFlowPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-200">
      <Navbar />
      <main>
        <HeroSection />
        <SpiritualQuote />
        <TransparencyFeed />
      </main>
      <Footer />
    </div>
  )
}
