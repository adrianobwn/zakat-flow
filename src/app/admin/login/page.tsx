"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "../auth-actions"

const initialState: { error?: string; success?: boolean } = {}

export default function AdminLogin() {
    const [state, formAction] = useActionState(loginAction, initialState)
    const router = useRouter()

    useEffect(() => {
        // Manipulate browser history to intercept "Back" button
        window.history.pushState(null, "", window.location.href)

        const handlePopState = () => {
            // When user tries to go back, forcibly route to the public home page
            router.push("/")
        }

        window.addEventListener("popstate", handlePopState)
        return () => window.removeEventListener("popstate", handlePopState)
    }, [router])

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                    <span className="text-white font-bold font-display text-4xl">N</span>
                </div>

                <h1 className="text-2xl font-bold font-display text-slate-900 text-center mb-2 tracking-tight">Login Portal Admin</h1>
                <p className="text-slate-500 text-center mb-8 text-sm">Akses khusus Amil dan Pengurus NuraniZakat</p>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                            Kata Sandi Akses
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Masukkan kode rahasia admin..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                            required
                        />
                        {state?.error && (
                            <p className="text-red-500 text-xs font-bold mt-2 animate-in fade-in slide-in-from-top-1">{state.error}</p>
                        )}
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">Bantuan (Dummy): Ketik "adminbismillah"</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-soft hover:shadow-soft-hover transition-all active:scale-[0.98]"
                    >
                        Masuk ke Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}
