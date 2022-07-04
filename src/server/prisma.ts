import { PrismaClient } from '@prisma/client';

const __is_prod__ = process.env.NODE_ENV === 'production';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: !__is_prod__ ? ['query', 'error', 'warn'] : ['error'],
  });

if (!__is_prod__) global.prisma = prisma;
