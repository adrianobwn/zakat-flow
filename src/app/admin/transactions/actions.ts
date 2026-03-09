"use server"

import { prisma } from "@/lib/prisma"
import { checkAdminAuth } from "../check-auth"

export async function getTransactionsForReport() {
    await checkAdminAuth()
    const txs = await prisma.transaction.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return txs.map((tx: any) => ({
        ...tx,
        createdAt: tx.createdAt.toISOString(),
        updatedAt: tx.updatedAt.toISOString(),
    }))
}

export async function getDistributionsForReport() {
    await checkAdminAuth()
    const dist = await prisma.distribution.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            campaign: {
                select: { title: true }
            }
        }
    })

    return dist.map((d: any) => ({
        ...d,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
    }))
}
