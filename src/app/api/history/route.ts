import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Parameter email wajib diisi." },
      { status: 400 }
    );
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      email,
      status: "SUCCESS",
    },
    orderBy: { createdAt: "desc" },
    include: {
      campaign: {
        select: { title: true },
      },
    },
  });

  const history = transactions.map((tx) => ({
    id: tx.id,
    zakatType: tx.zakatType,
    amount: tx.amount,
    date: tx.createdAt,
    campaignName: tx.campaign?.title || null,
  }));

  return NextResponse.json({ history });
}
