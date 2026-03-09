import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'NuraniZakat | Platform Zakat Digital Transparan',
  description: 'Tunaikan zakat dengan mudah dan pantau penyaluran secara real-time. Platform zakat digital terpercaya dengan transparansi penuh.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-slate-50 text-slate-950`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
