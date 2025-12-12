import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const list = await prisma.watchlist.findMany({
      where: { userId },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error("WATCHLIST GET ERROR:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId, symbol } = await req.json();

    const item = await prisma.watchlist.create({
      data: { userId, symbol },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("WATCHLIST POST ERROR:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
