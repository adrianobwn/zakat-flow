"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TransactionTableClient({ transactions }: { transactions: any[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const totalPages = Math.ceil(transactions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

    const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[600px]">
            <div className="flex flex-col h-full relative">
                {/* Header - Fixed & Unscrollable */}
                <div className="bg-slate-50 border-b border-slate-200 z-20">
                    <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] md:grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr] text-left text-xs uppercase text-slate-500 font-bold w-full h-12">
                        <div className="px-6 py-4 truncate">Waktu</div>
                        <div className="px-6 py-4 truncate">Muzakki</div>
                        <div className="px-6 py-4 truncate">Tipe Zakat</div>
                        <div className="px-6 py-4 truncate">Nominal</div>
                        <div className="px-6 py-4 truncate">Status</div>
                    </div>
                </div>

                {/* Body - Scrollable Container */}
                <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
                    <div className="w-full flex flex-col text-sm text-slate-600">
                        {transactions.length === 0 ? (
                            <div className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada data transaksi.</div>
                        ) : (
                            currentTransactions.map((tx: any) => (
                                <div key={tx.id} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] md:grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr] items-center w-full border-b border-slate-50 hover:bg-slate-50/50 transition-colors min-h-[72px]">
                                    <div className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {format(new Date(tx.createdAt), "dd MMM yyyy HH:mm", { locale: id })}
                                    </div>
                                    <div className="px-6 py-4 flex flex-col justify-center overflow-hidden">
                                        <p className="font-bold text-slate-900 truncate">{tx.name || "Hamba Allah"}</p>
                                        <p className="text-xs text-slate-400 truncate">{tx.email}</p>
                                    </div>
                                    <div className="px-6 py-4 font-medium text-slate-700 truncate">{tx.zakatType}</div>
                                    <div className="px-6 py-4 font-bold text-emerald-600 truncate">{fmt(tx.amount)}</div>
                                    <div className="px-6 py-4">
                                        <span className={`px-3 py-1 inline-flex items-center justify-center whitespace-nowrap rounded-full text-[10px] font-bold tracking-widest uppercase ${tx.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                                                tx.status === "PENDING" ? "bg-amber-100 text-amber-700 border border-amber-200" :
                                                    "bg-red-100 text-red-700 border border-red-200"
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            {transactions.length > 0 && (
                <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-4 flex items-center justify-between z-20">
                    <p className="text-xs text-slate-500 font-medium">
                        Menampilkan <span className="font-bold text-slate-900">{startIndex + 1}</span> hingga <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, transactions.length)}</span> dari total <span className="font-bold text-slate-900">{transactions.length}</span> transaksi
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-white hover:text-emerald-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                // Simple logic to show pages around current page
                                let pageToShow = i + 1;
                                if (totalPages > 5 && currentPage > 3) {
                                    pageToShow = currentPage - 2 + i;
                                    if (pageToShow > totalPages) pageToShow = totalPages - 4 + i;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageToShow)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === pageToShow
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                            : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {pageToShow}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-white hover:text-emerald-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
