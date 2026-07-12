import { auth } from "@/app/lib/auth";
import { handleApiResponse } from "@/app/lib/handleResponse";
import { HttpStatus } from "@/app/lib/httpStatus";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return handleApiResponse(HttpStatus.BAD_REQUEST, "Slug is required");
  }
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    // if (!session?.session?.id) {
    //   return handleApiResponse(
    //     HttpStatus.UNAUTHORIZED,
    //     "Please login to create a url",
    //   );
    // }
    const slugCheck = prisma.url.findUnique({
      where: {
        shortCode: slug,
      },
      select: {
        id: true,
      },
    });
    const slugExists = await slugCheck;
    if (slugExists) {
      return handleApiResponse(HttpStatus.OK, "Slug already exists", {
        exists: true,
      });
    }
    return handleApiResponse(HttpStatus.OK, "Slug is available", {
      exists: false,
    });
  } catch (error) {}
  return NextResponse.json({ message: "slug check route" });
}
