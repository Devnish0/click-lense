import { handleApiResponse } from "@/app/lib/handleResponse";
import { HttpStatus } from "@/app/lib/httpStatus";
import { prisma } from "@/app/lib/prisma";

interface incomingdata {
  id: string;
  slug: string;
}

export async function POST(request: Request) {
  try {
    const incomingdata: incomingdata = await request.json();
    console.log(incomingdata);

    const urlAnalytics = await prisma.url.findUnique({
      where: {
        userId: incomingdata.id,
        shortCode: incomingdata.slug,
      },

      include: { clickEvents: true },
    });
    console.log(urlAnalytics);

    return handleApiResponse(HttpStatus.OK, "working", urlAnalytics);
  } catch (error: any) {
    return handleApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
}
