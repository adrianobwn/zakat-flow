import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const campUmum = await prisma.campaign.create({
    data: {
      title: 'Zakat Umum & Bantuan Bencana',
      description: 'Program tanggap bencana dan penyaluran darurat',
      targetAmount: 500000000,
      currentAmount: 185000000,
    }
  })

  // Dummy Distributions
  await prisma.distribution.create({
    data: {
      campaignId: campUmum.id,
      description: 'Penyaluran beras bantuan 2 ton untuk korban banjir.',
      photoUrl: '/images/transparency/sembako.png',
      amount: 45000000,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  })

  await prisma.distribution.create({
    data: {
      campaignId: campUmum.id,
      description: 'Sumbangan pembangunan atap madrasah terdampak',
      photoUrl: '/images/transparency/edukasi.png',
      amount: 22000000,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  })

  // Dummy Transactions
  const names = ['Budi Santoso', 'Siti Aminah', 'Andi Firmansyah', 'Agus Setiawan', 'Ayu Lestari']
  const emails = ['budi@mail.com', 'siti@mail.com', 'andi@mail.com', 'agus@mail.com', 'ayu@mail.com']
  const types: Array<'FITRAH' | 'MAAL' | 'FIDYAH' | 'SEDEKAH'> = ['FITRAH', 'MAAL', 'FIDYAH', 'SEDEKAH']

  for (let i = 0; i < 100; i++) {
    const rName = names[Math.floor(Math.random() * names.length)]
    const rEmail = emails[Math.floor(Math.random() * emails.length)]
    const rType = types[Math.floor(Math.random() * types.length)]
    const amt = Math.floor(Math.random() * 200) * 10000 + 45000
    const stat = Math.random() > 0.2 ? 'SUCCESS' : 'PENDING'

    await prisma.transaction.create({
      data: {
        email: rEmail,
        name: rName,
        amount: amt,
        zakatType: rType,
        status: stat,
        campaignId: stat === 'SUCCESS' ? campUmum.id : null,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }
    })
  }

  console.log("Seeding complete!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
