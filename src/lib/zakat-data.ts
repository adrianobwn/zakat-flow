export const ZAKAT_CONSTANTS = {
    // General
    ASNAF: [
        "Fakir",
        "Miskin",
        "Amil",
        "Muallaf",
        "Riqab",
        "Gharimin",
        "Fisabilillah",
        "Ibnu Sabil"
    ],

    // Common Prices & Nisab references (Can be updated dynamically later from an API)
    PRICES: {
        GOLD_PER_GRAM: 1150000,
        SILVER_PER_GRAM: 12000,
        RICE_PER_KG: 15000, // Based on the documentation example
    },

    // Zakat Fitrah
    FITRAH: {
        RICE_WEIGHT_KG: 2.5,
        // money formula: riceWeightKg * ricePrice
    },

    // Zakat Maal (Property / Wealth)
    MAAL: {
        EMAS: {
            NISAB_GRAM: 85,
            RATE: 0.025, // 2.5%
        },
        PERAK: {
            NISAB_GRAM: 595,
            RATE: 0.025, // 2.5%
        },
        TABUNGAN: {
            NISAB_EQUIVALENT_GOLD_GRAM: 85,
            RATE: 0.025, // 2.5%
        },
        PENGHASILAN: {
            RATE: 0.025, // 2.5%
        },
        PERDAGANGAN: {
            NISAB_EQUIVALENT_GOLD_GRAM: 85,
            RATE: 0.025, // 2.5%
            // formula: (modal + keuntungan + aset_usaha - hutang) * RATE
        },
        PERTANIAN: {
            NISAB_KG: 653,
            RATES: {
                AIR_HUJAN_ALAMI: 0.10, // 10%
                IRIGASI_BERBAYAR: 0.05, // 5%
            }
        },
        RIKAZ: {
            // Harta temuan
            NISAB: 0, // No nisab
            RATE: 0.20, // 20%
        }
    },

    // Peternakan rules (simplified ranges as requested in the doc)
    PETERNAKAN: {
        KAMBING: [
            { min: 40, max: 120, zakat: "1 kambing" },
            { min: 121, max: 200, zakat: "2 kambing" },
            { min: 201, max: 300, zakat: "3 kambing" },
        ]
    }
};
