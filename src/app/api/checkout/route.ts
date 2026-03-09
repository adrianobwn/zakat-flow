import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ZakatType } from "@prisma/client";

// Get base URL dynamically based on whether it's a test or live key
const getMayarApiUrl = (apiKey: string) => {
  if (apiKey?.startsWith('sk_test_') || apiKey?.startsWith('eyJ')) {
    // Both JWT tokens (like from sandbox) and sk_test_ keys use sandbox URL 
    // unless defined explicitly in env.
    return process.env.MAYAR_API_URL || "https://api.mayar.club/hl/v1/payment/create";
  }
  return process.env.MAYAR_API_URL || "https://api.mayar.id/hl/v1/payment/create";
};
const FITRAH_RICE_KG_PER_PERSON = 2.5;
const FITRAH_PRICE_PER_PERSON = 45000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MAYAR_API_KEY || "";
  const apiUrl = getMayarApiUrl(apiKey);

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
    const mayarResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name: name || email,
        email,
        mobile: (body.mobile || "081111111111").substring(0, 12), // Required, Max 12 chars
        amount,
        description,
        mobile_id: transaction.id,
        redirect_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
    console.error("Checkout error (DETAIL):", error);
    if (error instanceof Error) {
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
