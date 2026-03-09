"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-80 flex flex-col items-center justify-center text-slate-400 gap-3 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 pb-4">
                <p className="text-sm font-medium">Belum ada data transaksi yang cukup untuk 7 hari terakhir.</p>
            </div>
        )
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickFormatter={(value) => `Rp ${value / 1000000}Jt`}
                        dx={-10}
                    />
                    <Tooltip
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [`Rp ${value.toLocaleString("id-ID")}`, "Total Zakat"]}
                    />
                    <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
