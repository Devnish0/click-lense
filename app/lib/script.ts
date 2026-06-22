import { prisma } from "./prisma";

// const user = await prisma.user.create({
//   data: {
//     //     id String @id @default(cuid())
//     //   email String? @unique
//     //   password String?

//     //   isGuest Boolean @default(true)

//     //   expiresAt DateTime?

//     //   urls Url[]
//     //   createdAt DateTime @default(now())
//     //   updatedAt DateTime @updatedAt

//     isGuest: true,
//   },
// });

console.log(await prisma.user.findMany());
