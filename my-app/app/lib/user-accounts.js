// lib/user-accounts.js
import { db } from "@/lib/db"; // adjust if your db file is elsewhere

export async function getUserAccounts(userId) {
  try {
    const accounts = await db.account.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return accounts;
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    return [];
  }
}
