import { prisma } from "@/lib/prisma"
import ReportButtons from "../components/report-buttons"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export const dynamic = 'force-dynamic'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import TransactionTableClient from "../components/transaction-table-client"

export default async function AdminTransactions() {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('adminAuth')
    if (isAdmin?.value !== "true") {
        redirect("/admin/login")
    }

    const transactions = await prisma.transaction.findMany({
        orderBy: { createdAt: 'desc' }
    })

    const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">Data Transaksi & Laporan</h2>
                    <p className="text-slate-500 mt-2">Daftar lengkap transaksi penerimaan Zakat dari Muzakki dan pelaporan unduhan pdf.</p>
                </div>
                <ReportButtons />
            </div>

            <TransactionTableClient transactions={transactions} />
        </div>
    )
}
