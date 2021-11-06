import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';
const prisma = new PrismaClient();

async function main() {}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
