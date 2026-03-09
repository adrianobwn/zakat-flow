import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // Bypass caching so webhook is always processed in real-time
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const FITRAH_RICE_KG_PER_PERSON = 2.5;
const FITRAH_PRICE_PER_PERSON = 45000;

function verifySignature(payload: string, signature: string): boolean {
  try {
    const secret = process.env.MAYAR_WEBHOOK_SECRET || "";
    if (!secret || !signature) return false;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expected = hmac.digest("hex");

    if (signature.length !== expected.length) {
      return false; // Prevent timingSafeEqual throw if length mismatch
    }

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch (error) {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    // Mayar might use different headers depending on the webhook version
    const signature =
      req.headers.get("x-callback-signature") ||
      req.headers.get("x-mayar-signature") ||
      req.headers.get("authorization") ||
      "";

    console.log("=== INCOMING WEBHOOK ===");
    console.log("All Headers:", JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));
    console.log("Extracted Signature:", signature);

    // Verifikasi signature webhook dari Mayar
    if (!verifySignature(rawBody, signature)) {
      console.error("WEBHOOK ERROR: Signature Mismatch. Expected proper HMAC SHA-256.");
      return NextResponse.json(
        { error: "Signature tidak valid." },
        { status: 401 }
      );
    }

    const body = JSON.parse(rawBody);
    console.log("Webhook Event Type:", body.event);
    console.log("Webhook Data ID:", body.data?.id || body.data?.mobile_id);

    const { event, data } = body;

    // Hanya proses event pembayaran sukses
    if (event !== "payment.success") {
      console.log("WEBHOOK WARNING: Event skipped. We only process 'payment.success'");
      return NextResponse.json({ message: "Event diabaikan." });
    }

    const transactionId = data.mobile_id || data.reference_id || data.id;
    console.log("WEBHOOK: Extracted Transaction ID:", transactionId);

    if (!transactionId) {
      console.error("WEBHOOK ERROR: mobile_id missing from payload data.");
      return NextResponse.json(
        { error: "mobile_id tidak ditemukan." },
        { status: 400 }
      );
    }

    // Cari transaksi berdasarkan mobile_id (transaction ID kita)
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      console.error(`WEBHOOK ERROR: Transaction ID ${transactionId} not found in our database.`);
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Jika sudah SUCCESS, skip (idempotent)
    if (transaction.status === "SUCCESS") {
      return NextResponse.json({ message: "Transaksi sudah diproses." });
    }

    // Update status transaksi jadi SUCCESS
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "SUCCESS" },
    });

    // Update currentAmount di Campaign (Live Tracker)
    if (transaction.campaignId) {
      const updateData: { currentAmount: { increment: number }; fitrahRiceKg?: { increment: number } } = {
        currentAmount: { increment: transaction.amount },
      };

      // Jika tipe FITRAH, hitung juga total paket beras
      if (transaction.zakatType === "FITRAH") {
        const totalPersons = Math.floor(transaction.amount / FITRAH_PRICE_PER_PERSON);
        const totalRice = totalPersons * FITRAH_RICE_KG_PER_PERSON;
        updateData.fitrahRiceKg = { increment: totalRice };
      }

      await prisma.campaign.update({
        where: { id: transaction.campaignId },
        data: updateData,
      });
    }

    return NextResponse.json({ message: "Webhook berhasil diproses." });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
