"use client"

import { useState } from "react"
import { BarChart3, FileText, Loader2 } from "lucide-react"
import { getTransactionsForReport, getDistributionsForReport } from "../transactions/actions"

export default function ReportButtons() {
    const [isDownloading, setIsDownloading] = useState<string | null>(null)

    const generatePDF = async (title: string, columns: string[], rows: string[][], filename: string) => {
        try {
            const { jsPDF } = await import("jspdf")
            const autoTable = (await import("jspdf-autotable")).default

            const doc = new jsPDF()

            doc.setFontSize(22)
            doc.setTextColor(5, 150, 105)
            doc.text("Laporan Internal Transparansi Dana Umat", 14, 25)
            doc.setFontSize(10)
            doc.setTextColor(100, 116, 139)
            doc.text("Laporan resmi diterbitkan oleh Admin NuraniZakat.", 14, 30)

            doc.setFontSize(14)
            doc.setTextColor(15, 23, 42)
            doc.text(title, 14, 38)

            doc.setDrawColor(203, 213, 225)
            doc.setLineWidth(0.5)
            doc.line(14, 38, 196, 38)

            autoTable(doc, {
                startY: 45,
                head: [columns],
                body: rows,
                headStyles: { fillColor: [5, 150, 105] },
                alternateRowStyles: { fillColor: [248, 250, 252] },
                margin: { top: 45 },
            })

            doc.save(filename)
        } catch (error) {
            console.error("Gagal membuat PDF:", error)
            alert("Terjadi kesalahan saat membuat laporan PDF.")
        }
    }

    const handleDownloadTransactions = async () => {
        setIsDownloading("transactions")
        try {
            const txs = await getTransactionsForReport()
            const columns = ["Waktu", "Nama/Email", "Tipe", "Nominal", "Status"]
            const rows = txs.map((tx: any) => [
                new Date(tx.createdAt).toLocaleDateString("id-ID"),
                tx.name ? `${tx.name}\n(${tx.email})` : tx.email,
                tx.zakatType,
                `Rp ${tx.amount.toLocaleString("id-ID")}`,
                tx.status
            ])
            await generatePDF("Data Rekapitulasi Transaksi Zakat", columns, rows, "Laporan_Transaksi_NuraniZakat.pdf")
        } finally {
            setIsDownloading(null)
        }
    }

    const handleDownloadDistributions = async () => {
        setIsDownloading("distributions")
        try {
            const dists = await getDistributionsForReport()
            const columns = ["Waktu", "Kampanye", "Nominal Penyaluran", "Keterangan"]
            const rows = dists.map((d: any) => [
                new Date(d.createdAt).toLocaleDateString("id-ID"),
                d.campaign?.title || "Umum",
                `Rp ${d.amount.toLocaleString("id-ID")}`,
                d.description
            ])
            await generatePDF("Data Rekapitulasi Penyaluran Zakat", columns, rows, "Laporan_Penyaluran_NuraniZakat.pdf")
        } finally {
            setIsDownloading(null)
        }
    }

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleDownloadTransactions}
                disabled={isDownloading !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm text-sm"
            >
                {isDownloading === "transactions" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <FileText className="w-4 h-4" />
                )}
                <span>Unduh Transaksi</span>
            </button>
            <button
                onClick={handleDownloadDistributions}
                disabled={isDownloading !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm text-sm"
            >
                {isDownloading === "distributions" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <BarChart3 className="w-4 h-4" />
                )}
                <span>Unduh Penyaluran</span>
            </button>
        </div>
    )
}
