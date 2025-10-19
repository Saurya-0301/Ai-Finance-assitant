import { PrismaClient } from "./generated/prisma"; // points to ../lib/generated/prisma

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
