import { PrismaClient, Prisma } from '@prisma/client';
import * as faker from 'faker';
const prisma = new PrismaClient();
const count = 7;
const userData: Prisma.LikeCreateInput[] = []; //sample

async function main() {
  console.log(`Start seeding ...`);

  for (let i = 0; i < count; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.unique(faker.internet.email),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
        role: 'USER',
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (let i = 0; i < count; i++) {
    const post = await prisma.post.create({
      data: {
        title: faker.name.title(),
        content: faker.lorem.paragraphs(),
        userId: faker.datatype.number({ min: 1, max: count }),
      },
    });
    console.log(`Created post with id: ${post.id}`);
  }

  for (let i = 0; i < count * 2; i++) {
    const image = await prisma.image.create({
      data: {
        imagePuth: faker.image.image(),
        postId: faker.datatype.number({ min: 1, max: count }),
        userId: faker.datatype.number({ min: 1, max: count }),
      },
    });
    console.log(`Created image with id: ${image.id}`);
  }

  for (let i = 0; i < count; i++) {
    const like = await prisma.like.create({
      data: {
        postId: faker.datatype.number({ min: 1, max: count }),
        userId: faker.datatype.number({ min: 1, max: count }),
      },
    });
    console.log(
      `Created like postId with id: ${like.postId} Created like userId with id: ${like.userId}`,
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/
