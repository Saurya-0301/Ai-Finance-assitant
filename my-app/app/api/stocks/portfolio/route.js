import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const portfolio = await prisma.portfolio.findMany({
      where: { userId },
      include: { stock: true },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("PORTFOLIO GET ERROR:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId, stockSymbol, quantity, buyPrice } = await req.json();

    if (!buyPrice)
      return NextResponse.json({ error: "buyPrice missing" }, { status: 400 });

    let stock = await prisma.stock.findFirst({
      where: { symbol: stockSymbol },
    });

    if (!stock) {
      stock = await prisma.stock.create({
        data: { symbol: stockSymbol },
      });
    }

    const newEntry = await prisma.portfolio.create({
      data: {
        userId,
        stockId: stock.id,
        quantity,
        buyPrice,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("PORTFOLIO POST ERROR:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
