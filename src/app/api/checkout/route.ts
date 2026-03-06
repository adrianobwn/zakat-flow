import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ZakatType } from "@prisma/client";

const MAYAR_API_URL = "https://api.mayar.id/hl/v1/payment/create";

const FITRAH_RICE_KG_PER_PERSON = 2.5;
const FITRAH_PRICE_PER_PERSON = 45000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, amount, zakatType, campaignId } = body;

    if (!email || !amount || !zakatType) {
      return NextResponse.json(
        { error: "Field email, amount, dan zakatType wajib diisi." },
        { status: 400 }
      );
    }

    if (!Object.values(ZakatType).includes(zakatType)) {
      return NextResponse.json(
        { error: "Tipe zakat tidak valid." },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Nominal harus berupa angka positif." },
        { status: 400 }
      );
    }

    // Simpan transaksi ke database dengan status PENDING
    const transaction = await prisma.transaction.create({
      data: {
        name: name || null,
        email,
        amount,
        zakatType,
        status: "PENDING",
        campaignId: campaignId || null,
      },
    });

    // Buat deskripsi pembayaran
    let description = `Zakat ${zakatType} - ${email}`;
    if (zakatType === "FITRAH") {
      const totalPersons = Math.floor(amount / FITRAH_PRICE_PER_PERSON);
      const totalRice = totalPersons * FITRAH_RICE_KG_PER_PERSON;
      description += ` (${totalPersons} jiwa, ${totalRice} kg beras)`;
    }

    // Panggil API Mayar untuk generate link pembayaran
    const mayarResponse = await fetch(MAYAR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
      },
      body: JSON.stringify({
        name: name || email,
        email,
        amount,
        description,
        mobile_id: transaction.id,
      }),
    });

    if (!mayarResponse.ok) {
      const errorData = await mayarResponse.text();
      console.error("Mayar API error:", errorData);
      return NextResponse.json(
        { error: "Gagal membuat link pembayaran." },
        { status: 502 }
      );
    }

    const mayarData = await mayarResponse.json();
    const paymentUrl = mayarData.data?.link;

    // Update transaksi dengan payment URL
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { paymentUrl },
    });

    return NextResponse.json({
      transactionId: transaction.id,
      paymentUrl,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
