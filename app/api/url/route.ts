import { NextResponse } from "next/server";
import z from "zod";
import { createUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";

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
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.name }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json(
      { error: "internal Service Error" },
      { status: 400 },
    );
  }
}

export async function GET(request: Request) {
  const data = { message: "Hello from the App Router API!" };

  const urls = await prisma.url.findMany();
  console.log(urls);

  return NextResponse.json({ urls }, { status: 200 });
}
