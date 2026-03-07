import { PrismaClient } from "@/generated/prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

if (process.env.NODE_ENV === "development") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as {
  cachedPrisma: PrismaClient | undefined;
};

const isProd = process.env.NODE_ENV === "production";

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({
    adapter,
    log: isProd ? ["error"] : ["warn", "error"],
  });
}

export const prisma = globalForPrisma.cachedPrisma ?? createPrismaClient();

if (!isProd) {
  globalForPrisma.cachedPrisma = prisma;
}

export const db = prisma;
export default prisma;
