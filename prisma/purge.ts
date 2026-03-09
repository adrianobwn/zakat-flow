import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Menghapus data transaksi dummy...')
    await prisma.transaction.deleteMany()

    console.log('Menghapus data distribusi dummy...')
    await prisma.distribution.deleteMany()

    console.log('Menghapus data campaign dummy...')
    await prisma.campaign.deleteMany()

    console.log('Data dummy berhasil dihapus! (Akun Admin tetap dipertahankan)')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
