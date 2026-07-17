import { prisma } from "@/app/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllUrls = (userId: string) => {
  const geturl = unstable_cache(
    async () => {
      const userUrls = await prisma.url.findMany({
        where: {
          userId: userId,
        },
        select: {
          shortCode: true,
          originalUrl: true,
          password: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      console.log("db hit");
      return userUrls;
    },

    [userId], //userid as the cache key
    {
      tags: [`url-${userId}`],
      revalidate: 60 * 60,
    },
  );
  return geturl();
};
