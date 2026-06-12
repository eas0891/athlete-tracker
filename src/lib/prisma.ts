import { PrismaClient } from "@prisma/client";

// Prisma singleton — prevents opening too many database connections in development
// (Next.js hot-reloads the server on every save, which would create a new client each time)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
