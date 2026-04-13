import prismaPkg from '@prisma/client';

const PrismaClient = prismaPkg.PrismaClient;
const prisma = new PrismaClient();

export { prisma };
