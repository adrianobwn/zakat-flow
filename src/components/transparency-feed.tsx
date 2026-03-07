"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function TransparencyFeed() {
    const milestones = [
        {
            id: 1,
            date: "12 Mar 2026",
            amount: "Rp 124.500.000",
            category: "Bantuan Pangan",
            description: "Penyaluran 1,000 paket sembako untuk keluarga pra-sejahtera di wilayah Jabodetabek. Dokumentasi lengkap tersedia pada laporan.",
            fullDescription: "Alhamdulilah pada tanggal 12 Maret 2026, telah disalurkan 1.000 paket sembako yang berisi beras premium, minyak goreng, gula, dan kebutuhan pokok lainnya. Distribusi ini disebarkan ke berbagai kecamatan padat penduduk di area Jabodetabek. Bantuan ini merupakan kumpulan fidyah dan zakat fitrah dari para muzakki NuraniZakat.",
            imageUrl: "/images/transparency/sembako.png",
            location: "Jabodetabek",
            beneficiaries: "1,000 Keluarga"
        },
        {
            id: 2,
            date: "10 Mar 2026",
            amount: "Rp 85.000.000",
            category: "Infrastruktur Pendidikan",
            description: "Renovasi fasilitas sanitasi dan perpustakaan di SD Negeri 04 Garut, Jawa Barat.",
            fullDescription: "Penyaluran dana zakat infrastruktur berhasil direalisasikan untuk merenovasi 4 titik MCK (Mandi Cuci Kakus) yang rusak parah serta membangun kembali atap perpustakaan yang bocor di SD Negeri 04 Garut. Anak-anak kini dapat belajar dengan fasilitas yang lebih layak dan higienis.",
            imageUrl: "/images/transparency/edukasi.png",
            location: "Garut, Jawa Barat",
            beneficiaries: "350 Siswa"
        },
        {
            id: 3,
            date: "05 Mar 2026",
            amount: "Rp 45.250.000",
            category: "Pemberdayaan Ekonomi",
            description: "Pemberian modal usaha tanpa bunga kepada 30 UMKM perempuan di Surabaya.",
            fullDescription: "Program pemberdayaan ekonomi perempuan mandiri lewat skema Qardhul Hasan (Pinjaman Kebaikan Tanpa Bunga) diberikan kepada 30 ibu-ibu penggerak UMKM rumahan (seperti penjual nasi campur, penjahit, dan pedagang pasar) di kawasan Dolly, Surabaya. Selain dana, mereka juga menerima mentoring bisnis selama 3 bulan penuh.",
            imageUrl: "/images/transparency/umkm.png",
            location: "Surabaya, Jawa Timur",
            beneficiaries: "30 Penggerak UMKM"
        }
    ]

    const [isDownloading, setIsDownloading] = useState(false)
    const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null)

    const handleDownload = () => {
        setIsDownloading(true)
        setTimeout(() => setIsDownloading(false), 2000)
    }

    // Modal click outside handler
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setSelectedMilestone(null)
        }
    }

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (selectedMilestone) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedMilestone])

    return (
        <section id="transparency" className="bg-slate-50 py-24 sm:py-32 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 md:mb-24 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-6 relative overflow-hidden group border border-emerald-200 cursor-help">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        <span className="font-display text-xs font-bold tracking-widest text-emerald-700 uppercase px-4 z-10 transition-colors group-hover:text-emerald-800">
                            Transparansi Dana Umat
                        </span>

                        {/* Tooltip for the badge (optional interactivity) */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max max-w-[250px] bg-slate-800 text-white text-[10px] p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            Data dikelola dan divalidasi oleh Admin Amil NuraniZakat.
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-slate-800" />
                        </div>
                    </div>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                        Jejak Kebaikan Anda
                    </h2>
                    <p className="max-w-xl text-lg text-slate-500">Setiap rupiah yang Anda sampaikan, kami laporkan penggunaannya secara terperinci untuk membangun kepercayaan umat.</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* The soft vertical line */}
                    <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-[2px] bg-emerald-100 hidden sm:block transform lg:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.id} className={`relative flex flex-col sm:flex-row group/timeline ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Center Node (Hidden on Mobile) */}
                                <div className="hidden sm:flex absolute left-6 lg:left-1/2 transform -translate-x-1/2 top-6 items-center justify-center z-10">
                                    <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-50 transition-transform duration-300 group-hover/timeline:scale-125"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`sm:w-full lg:w-1/2 ${index % 2 === 0 ? 'sm:pl-16 lg:pl-0 lg:pr-16 text-left lg:text-right' : 'sm:pl-16'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="bg-white rounded-3xl shadow-soft hover:shadow-soft-hover transition-all border border-slate-100 text-left overflow-hidden cursor-pointer group hover:-translate-y-1 relative flex flex-col h-full"
                                        onClick={() => setSelectedMilestone(milestone)}
                                    >

                                        {/* Image Header with Hover Effect */}
                                        <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-slate-100 shrink-0">
                                            <img
                                                src={milestone.imageUrl}
                                                alt={milestone.category}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 inline-flex px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-emerald-700 text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 transition-transform group-hover:scale-105 origin-top-left">
                                                {milestone.date}
                                            </div>

                                            {/* Hover "See Details" Reveal */}
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                                                <span className="text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-1.5">
                                                    Lihat Detail Dokumentasi
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 sm:p-8 flex-1 flex flex-col bg-white z-20">
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-emerald-700">
                                                {milestone.category}
                                            </h3>

                                            <p className="text-sm sm:text-base text-slate-500 mb-6 font-medium leading-relaxed line-clamp-2">
                                                {milestone.description}
                                            </p>

                                            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Tersalurkan</span>
                                                <span className="font-display text-lg sm:text-xl font-bold text-emerald-600 transition-transform group-hover:scale-105 origin-right">
                                                    {milestone.amount}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white border border-emerald-200 text-emerald-700 font-bold text-sm shadow-soft transition-all hover:bg-emerald-50 hover:shadow-soft-hover active:scale-[0.98] disabled:opacity-70"
                    >
                        <span>{isDownloading ? "Menyiapkan Laporan..." : "Unduh Laporan Format PDF"}</span>
                        {!isDownloading && (
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        )}
                    </button>
                    <p className="mt-4 text-[10px] text-slate-400 font-medium tracking-widest uppercase">Semua foto & laporan di atas diunggah resmi oleh Admin Amil NuraniZakat</p>
                </motion.div>

            </div>

            {/* MODAL / POPUP DETAILS */}
            {selectedMilestone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 sm:py-12">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={handleBackdropClick}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200 ease-out z-10 flex-shrink-0">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedMilestone(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/20"
                            aria-label="Tutup"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {/* Modal Header Image */}
                            <div className="relative w-full h-56 sm:h-80 shrink-0 bg-slate-100">
                                <img
                                    src={selectedMilestone.imageUrl}
                                    alt={selectedMilestone.category}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-400">
                                        {selectedMilestone.date}
                                    </div>
                                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                                        {selectedMilestone.category}
                                    </h3>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 sm:p-8 shrink-0">
                                {/* Highlights Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 py-6 border-b border-t border-slate-100 bg-slate-50/50 rounded-2xl px-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Penyaluran</p>
                                        <p className="font-display text-xl sm:text-2xl font-bold text-emerald-600">{selectedMilestone.amount}</p>
                                    </div>
                                    <div className="hidden md:block w-px h-full bg-slate-200 mx-auto" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Area Distribusi</p>
                                        <p className="font-bold text-slate-700 sm:text-lg">{selectedMilestone.location}</p>
                                    </div>
                                    <div className="hidden md:block w-px h-full bg-slate-200 mx-auto" />
                                    <div className="col-span-2 md:col-span-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Penerima Manfaat</p>
                                        <p className="font-bold text-slate-700 sm:text-lg">{selectedMilestone.beneficiaries}</p>
                                    </div>
                                </div>

                                {/* Full Description */}
                                <div className="space-y-4">
                                    <h4 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                        Laporan Terperinci
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed sm:text-lg">
                                        {selectedMilestone.fullDescription}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-xl border-emerald-100/50">
                                    <div className="flex gap-3">
                                        <div className="bg-emerald-100 p-2 rounded-full shrink-0 h-fit">
                                            <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-0.5">
                                                Telah Terverifikasi oleh Auditor Syariah
                                            </p>
                                            <p className="text-[10px] text-emerald-600/80 font-medium">Validitas dokumentasi dan penerima manfaat telah diaudit.</p>
                                        </div>
                                    </div>

                                    {/* Action button in modal */}
                                    <button
                                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full transition-colors whitespace-nowrap"
                                        onClick={() => {
                                            setSelectedMilestone(null)
                                            document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                    >
                                        Ikut Berkontribusi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Inject Global Keyframe for shimmer if not present via config */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </section>
    )
}
