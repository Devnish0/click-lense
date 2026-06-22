import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "../lib/enums";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const { shortcode } = await params;
    const url = await prisma.url.update({
      where: {
        shortCode: shortcode,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
      select: {
        originalUrl: true,
        clicks: true,
      },
    });
    if (!url) {
      return NextResponse.json(
        { success: false, message: "Url doesnt exist" },
        { status: HttpStatus.NOT_FOUND },
      );
    } else {
      return NextResponse.redirect(url.originalUrl);
    }
  } catch (error) {
    console.log(error);
  }
}
