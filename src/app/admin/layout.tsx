import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import AdminHeader from './components/admin-header'

export const metadata: Metadata = {
    title: 'Admin NuraniZakat',
    description: 'Sistem Manajemen dan Transparansi Dana Umat',
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('adminAuth')

    // If it's a login page, we don't want to show the header but we do want to render
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {isAdmin?.value === "true" && <AdminHeader />}
            <main className={isAdmin?.value === "true" ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full" : "w-full"}>
                {children}
            </main>
        </div>
    )
}
