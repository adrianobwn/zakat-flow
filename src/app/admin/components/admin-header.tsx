import { logoutAction } from "../auth-actions"
import Link from "next/link"

export default function AdminHeader() {
    return (
        <header className="bg-white border-b border-slate-100 py-4 px-6 sm:px-8 z-10 relative shadow-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/admin" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <span className="text-white font-bold font-display text-lg">N</span>
                    </div>
                    <span className="font-display font-bold text-slate-900 tracking-tight text-lg hidden sm:block">NuraniZakat Admin</span>
                </Link>
                <div className="flex items-center space-x-4 sm:space-x-8">
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/admin" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Dashboard</Link>
                        <Link href="/admin/transactions" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Transaksi</Link>
                    </nav>

                    <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

                    <div className="flex items-center space-x-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">Admin Utama</p>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Divisi Keuangan</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                            <span className="text-emerald-700 font-bold text-sm">AU</span>
                        </div>

                        {/* Logout Form using Server Action */}
                        <form action={logoutAction}>
                            <button type="submit" className="ml-4 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}
