import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { collectAnalytics } from "../lib/analytics";
import { handleApiError } from "../lib/handleError";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const headers = request.headers;
    const refer = headers.get("referer") || undefined;

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
      // console.log("request.url from [shortcode] route", request.url);
      const redirectUrl = new URL("/unlock", request.url);
      redirectUrl.searchParams.set("code", shortcode);
      if (refer) {
        redirectUrl.searchParams.set("ref", refer);
      }
      return NextResponse.redirect(redirectUrl);
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
