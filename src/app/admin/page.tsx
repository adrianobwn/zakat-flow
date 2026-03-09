import { Users, CreditCard, Activity, TrendingUp } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DashboardChart from "./components/dashboard-chart"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('adminAuth')

    if (isAdmin?.value !== "true") {
        redirect("/admin/login")
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const results = await Promise.all([


        // Zakat Hari Ini
        prisma.transaction.aggregate({
            where: {
                status: "SUCCESS",
                createdAt: { gte: today }
            },
            _sum: { amount: true }
        }),
        // Transaksi Tertunda
        prisma.transaction.count({
            where: { status: "PENDING" }
        }),
        // Total unik Muzakki (berdasarkan email) yang sudah bayar
        prisma.transaction.findMany({
            where: { status: "SUCCESS" },
            select: { email: true },
            distinct: ['email']
        }),
        // Penyaluran Bulan Ini (Dari tabel distributions)
        prisma.distribution.aggregate({
            where: {
                createdAt: { gte: firstDayOfMonth }
            },
            _sum: { amount: true }
        }),
        // Transaksi Terbaru
        prisma.transaction.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        // Data Grafik 7 Hari Terakhir
        prisma.transaction.findMany({
            where: {
                status: "SUCCESS",
                createdAt: { gte: sevenDaysAgo }
            },
            select: { amount: true, createdAt: true }
        })
    ]);

    const chartTransactions = results[5]

    // Format chart data
    const chartData = []
    for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo)
        d.setDate(d.getDate() + i)
        const dateStr = d.toLocaleDateString('id-ID', { weekday: 'short' })

        let dailyTotal = 0
        // sum up for this specific day
        for (const tx of chartTransactions) {
            const txDate = new Date(tx.createdAt)
            if (txDate.getDate() === d.getDate() && txDate.getMonth() === d.getMonth()) {
                dailyTotal += tx.amount
            }
        }

        chartData.push({ date: dateStr, amount: dailyTotal })
    }

    const totalZakatHariIni = results[0]._sum.amount || 0;
    const totalPenyaluranBulanIni = results[3]._sum.amount || 0;
    const totalMuzakki = results[2].length;
    const transaksiTertunda = results[1];

    const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">Dashboard Admin</h2>
                <p className="text-slate-500 mt-2">Data ringkasan aktivitas dan penerimaan zakat hari ini secara real-time.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { label: "Total Zakat Hari Ini", value: fmt(totalZakatHariIni), icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", progress: "Real-time hari ini" },
                    { label: "Muzakki Aktif", value: `${totalMuzakki} Jiwa`, icon: Users, color: "text-blue-600", bg: "bg-blue-50", progress: "Sepanjang waktu" },
                    { label: "Penyaluran Bulan Ini", value: fmt(totalPenyaluranBulanIni), icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50", progress: "Distribusi Zakat" },
                    { label: "Transaksi Tertunda", value: `${transaksiTertunda} Transaksi`, icon: Activity, color: "text-red-600", bg: "bg-red-50", progress: "Butuh pembayaran" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-[0.03] transform group-hover:scale-110 transition-transform"><stat.icon className="w-24 h-24" /></div>
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold font-display text-slate-800">{stat.value}</p>
                                <p className="text-[10px] font-medium text-slate-400 mt-2">{stat.progress}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Latest Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Grafik Penerimaan Zakat (7 Hari Terakhir)</h3>
                    <DashboardChart data={chartData} />
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900 font-display">Transaksi Terbaru</h3>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Live</span>
                    </div>
                    <div className="space-y-4">
                        {results[4].length === 0 ? (
                            <p className="text-sm text-slate-500 italic text-center py-4">Belum ada transaksi.</p>
                        ) : (
                            results[4].map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {(item.name || item.email.split('@')[0]).slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 truncate max-w-[120px]">{item.name || "Hamba Allah"}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">Zakat {item.zakatType}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-600">{fmt(item.amount)}</p>
                                        <p className={`text-[10px] font-bold ${item.status === "SUCCESS" ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {item.status}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Link href="/admin/transactions" className="block text-center w-full mt-6 py-3 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        Lihat Semua Transaksi
                    </Link>
                </div>
            </div>
        </div>
    )
}
