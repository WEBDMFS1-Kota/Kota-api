import { PrismaClient } from '@prisma/client';
import tags from './tags.json';

console.table(tags);

const prisma = new PrismaClient();

async function main() {
  console.log('=== Begin Seed ===');

  const result = await prisma.tags.createMany({
    data: tags,
    skipDuplicates: true,
  });

  console.log(`Inserted ${result.count} records`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
