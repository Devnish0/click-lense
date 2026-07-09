import { prisma } from "./prisma";
console.log(await prisma.user.findMany());
