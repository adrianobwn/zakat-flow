export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkAdminAuth() {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('adminAuth')

    if (isAdmin?.value !== "true") {
        redirect('/admin/login')
    }
}
