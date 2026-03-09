"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function loginAction(prevState: any, formData: FormData): Promise<{ error?: string; success?: boolean }> {
    const password = formData.get('password')

    // Dummy hardcoded password check for Admin
    if (password === 'adminbismillah') {
        const cookieStore = await cookies()
        cookieStore.set('adminAuth', 'true', { secure: true, path: '/' })
        revalidatePath('/', 'layout')
        redirect('/admin')
    } else {
        return { error: 'Kode rahasia salah.' }
    }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete('adminAuth')
    revalidatePath('/', 'layout')
    redirect('/admin/login')
}
