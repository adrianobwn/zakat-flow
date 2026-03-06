"use client"

export function SpiritualQuote() {
    return (
        <section className="bg-emerald-600 py-24 sm:py-32 border-b border-t border-emerald-500">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Decorative Top Line */}
                <div className="flex items-center space-x-4 mb-12">
                    <div className="h-[1px] w-12 bg-emerald-500"></div>
                    <div className="h-2 w-2 rotate-45 border border-emerald-100 bg-emerald-100"></div>
                    <div className="h-[1px] w-12 bg-emerald-500"></div>
                </div>

                {/* Arabic Calligraphy / Text */}
                <div className="mb-10 w-full">
                    <p
                        className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.6] md:leading-[1.6] tracking-wide drop-shadow-sm"
                        dir="rtl"
                    >
                        مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ
                    </p>
                </div>

                {/* Indonesian Translation & Source */}
                <div className="max-w-2xl space-y-6">
                    <p className="text-xl sm:text-2xl font-light leading-relaxed text-emerald-50">
                        "Harta tidak akan berkurang karena disedekahkan."
                    </p>

                    <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                        <span className="h-[1px] w-8 bg-emerald-400"></span>
                        <p className="font-display text-xs font-bold tracking-[0.2em] text-emerald-200 uppercase">
                            HR. Muslim
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
