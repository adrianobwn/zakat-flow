"use client"

import { Lock, FileCheck } from "lucide-react"
import { motion } from "framer-motion"

export function TrustElements() {
  return (
    <section className="bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
          >
            <Lock className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Secure Payment</p>
              <p className="text-xs text-muted-foreground">by Mayar.id</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
          >
            <FileCheck className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Sertifikat Digital</p>
              <p className="text-xs text-muted-foreground">Otomatis via Email</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground/60"
        >
          <span>Mayar.id</span>
          <span>Bank BSI</span>
          <span>GoPay</span>
          <span>OVO</span>
          <span>DANA</span>
        </motion.div>
      </div>
    </section>
  )
}
