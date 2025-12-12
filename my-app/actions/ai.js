"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAiInsights() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const accounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const defaultAcc = accounts.find((a) => a.isDefault);
    if (!defaultAcc)
      return { insights: ["No default account found."] };

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await db.transaction.findMany({
      where: {
        accountId: defaultAcc.id,
        date: { gte: firstDay, lte: lastDay },
      },
      orderBy: { date: "desc" },
    });

    if (!transactions.length) {
      return { insights: ["No transactions for this month."] };
    }

    const summary = transactions.map((t) => ({
      category: t.category,
      amount: t.amount.toNumber(),
      type: t.type,
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ❗ SHORT AND MEANINGFUL INSIGHTS PROMPT
    const prompt = `
Analyze these current-month transactions:

${JSON.stringify(summary, null, 2)}

Give ONLY:
- 3 to 5 insights
- Each insight MUST be short (max 1 line)
- Must be meaningful and actionable
- No long explanations
- Only bullet points (•)
- Avoid generic advice

Focus on:
- Overspending categories
- Simple saving opportunities
- Small changes that help reduce waste
- A quick prediction of spending trend
`;

    const result = await model.generateContent([prompt]);
    const text = result.response.text();

    const insights = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return { insights };
  } catch (err) {
    console.error("AI Insights Error:", err);
    throw new Error(err.message);
  }
}
