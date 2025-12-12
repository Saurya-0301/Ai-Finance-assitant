import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let symbol = searchParams.get("symbol");

    if (!symbol) {
      return NextResponse.json({ error: "Symbol missing" }, { status: 400 });
    }

    // Convert NSE:TCS → TCS.NS
    symbol = symbol.replace("NSE:", "").replace(".NS", "") + ".NS";

    const options = {
      method: "GET",
      url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/",
      params: { symbol },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
      },
      timeout: 5000,
    };

    const res = await axios.request(options);
    const d = res.data?.quoteResponse?.result?.[0];

    if (!d) {
      return NextResponse.json(
        { error: "Stock not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol: d.symbol,
      price: d.regularMarketPrice,
      change: d.regularMarketChange,
      percent: d.regularMarketChangePercent,
      high: d.regularMarketDayHigh,
      low: d.regularMarketDayLow,
      previousClose: d.regularMarketPreviousClose,
      updated: d.regularMarketTime,
    });
  } catch (err) {
    console.error("PRICE API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch price" },
      { status: 500 }
    );
  }
}
