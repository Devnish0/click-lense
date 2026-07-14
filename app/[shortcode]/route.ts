import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "../lib/httpStatus";
import { handleApiResponse } from "../lib/handleResponse";
import { handleApiError } from "../lib/handleError";
import { collectAnalytics } from "../lib/analytics";
import { notFound } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const { shortcode } = await params;
    const url = await prisma.url.findUnique({
      where: {
        shortCode: shortcode,
      },
      select: {
        id: true,
        expiresAt: true,
        password: true,
        maxClicks: true,
        clicks: true,
      },
    });
    if (!url) {
      return NextResponse.redirect(new URL("/error/notfound", request.url));
      //  handleApiResponse(HttpStatus.NOT_FOUND,"url doesnt exists")
    }
    if (url.expiresAt && url.expiresAt < new Date()) {
      return NextResponse.redirect(
        new URL(`/error/expired?code=${shortcode}`, request.url),
      );
      // handleApiResponse(HttpStatus.NOT_FOUND,"Url has expired")
    }

    if (url.password) {
      return NextResponse.redirect(
        new URL(`/unlock?code=${shortcode}`, request.url),
      );
    }

    if (url.maxClicks && url.maxClicks <= url.clicks) {
      return NextResponse.redirect(
        new URL(`/error/maxclicks?code=${shortcode}`, request.url),
      );
      // handleApiResponse(HttpStatus.NOT_FOUND,"Url has reached max clicks")
    }

    const analytics = collectAnalytics(request);

    const [updatedUrl] = await prisma.$transaction([
      prisma.url.update({
        where: { shortCode: shortcode },
        data: { clicks: { increment: 1 } },
        select: { originalUrl: true },
      }),
      prisma.click.create({
        data: {
          urlId: url.id,
          browser: analytics.browser,
          os: analytics.os,
          device: analytics.device,
          country: analytics.country,
          referrer: analytics.referrer,
          ipHash: analytics.ipHash,
        },
      }),
    ]);

    return NextResponse.redirect(updatedUrl.originalUrl);
  } catch (error) {
    console.log(error, "error from the [shortcode] route");
    return handleApiError(error);
  }
}
