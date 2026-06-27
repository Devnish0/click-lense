import { NextResponse } from "next/server";
import z from "zod";
import { createUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "@/app/lib/httpStatus";
import { handleApiError } from "@/app/lib/handleError";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validateData = createUrlSchema.parse(body);

    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: validateData.userId,
        password: validateData?.password,
        expiresAt: validateData?.expiresAt,
        maxClicks: validateData?.maxClicks,
      },
    });
    return NextResponse.json({ url }, { status: HttpStatus.CREATED });
  } catch (error) {
    console.log(error,"error from the url route")
    return handleApiError(error);
  }
}

export async function GET(request: Request) {
  const data = { message: "Hello from the App Router API!" };

  const urls = await prisma.url.findMany();
  console.log(urls);

  return NextResponse.json({ urls }, { status: HttpStatus.OK });
}
