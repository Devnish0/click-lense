import { NextResponse } from "next/server";
import z from "zod";
import { createUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "@/app/lib/enums";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validateData = createUrlSchema.parse(body);

    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: validateData.id,
      },
    });
    return NextResponse.json({ url }, { status: HttpStatus.CREATED });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.name },
        { status: HttpStatus.INTERNAL_SERVER_ERROR },
      );
    }
    console.log(error);
    return NextResponse.json(
      { error: "internal Service Error" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function GET(request: Request) {
  const data = { message: "Hello from the App Router API!" };

  const urls = await prisma.url.findMany();
  console.log(urls);

  return NextResponse.json({ urls }, { status: HttpStatus.OK });
}
