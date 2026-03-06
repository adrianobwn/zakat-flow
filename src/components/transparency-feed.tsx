"use client"

export function TransparencyFeed() {
    const milestones = [
        {
            id: 1,
            date: "12 Mar 2026",
            amount: "Rp 124.500.000",
            category: "Bantuan Pangan",
            description: "Penyaluran 1,000 paket sembako untuk keluarga pra-sejahtera di wilayah Jabodetabek. Dokumentasi lengkap tersedia pada laporan tahunan.",
        },
        {
            id: 2,
            date: "10 Mar 2026",
            amount: "Rp 85.000.000",
            category: "Infrastruktur Pendidikan",
            description: "Renovasi fasilitas sanitasi dan perpustakaan di SD Negeri 04 Garut, Jawa Barat.",
        },
        {
            id: 3,
            date: "05 Mar 2026",
            amount: "Rp 45.250.000",
            category: "Pemberdayaan Ekonomi",
            description: "Pemberian modal usaha tanpa bunga kepada 30 UMKM perempuan di Surabaya.",
        }
    ]

    return (
        <section id="transparency" className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-6">
                        <span className="font-display text-xs font-bold tracking-widest text-emerald-700 uppercase px-4">
                            Transparansi Dana Umat
                        </span>
                    </div>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                        Jejak Kebaikan Anda
                    </h2>
                    <p className="max-w-xl text-lg text-slate-500">Setiap rupiah yang Anda sampaikan, kami laporkan penggunaannya secara terperinci untuk membangun kepercayaan umat.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* The soft vertical line */}
                    <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-[2px] bg-emerald-100 hidden sm:block transform lg:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.id} className={`relative flex flex-col sm:flex-row group ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Center Node (Hidden on Mobile) */}
                                <div className="hidden sm:flex absolute left-6 lg:left-1/2 transform -translate-x-1/2 top-6 items-center justify-center z-10">
                                    <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-50 transition-transform duration-300 group-hover:scale-125"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`sm:w-full lg:w-1/2 ${index % 2 === 0 ? 'sm:pl-16 lg:pl-0 lg:pr-16 text-left lg:text-right' : 'sm:pl-16'}`}>
                                    <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-soft-hover transition-shadow border border-slate-100 text-left">

                                        <div className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                                            {milestone.date}
                                        </div>

                                        <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                                            {milestone.category}
                                        </h3>

                                        <p className="text-base text-slate-500 mb-6 font-medium">
                                            {milestone.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tersalurkan</span>
                                            <span className="font-display text-xl font-bold text-emerald-600">
                                                {milestone.amount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white border border-emerald-200 text-emerald-700 font-bold text-sm shadow-soft transition-all hover:bg-emerald-50 hover:shadow-soft-hover active:scale-[0.98]">
                        <span>Unduh Laporan Format PDF</span>
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    )
}
