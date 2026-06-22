import { NextResponse } from "next/server";
import z from "zod";
import { createUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const { shortcode } = await params;
    const update = await prisma.url.findUnique({})
    const url = await prisma.url.findUnique({
      where: {
        shortCode: shortcode,
      },
      select: {
        originalUrl: true,
      },
    });
    // const { originalUrl } = originalUrl;
    if (!url) {
      return NextResponse.json(
        { success: false, message: "Url doesnt exist" },
        { status: 400 },
      );
    } else {
      return NextResponse.redirect(url.originalUrl);
    }
  } catch (error) {
    console.log(error);
  }
}
