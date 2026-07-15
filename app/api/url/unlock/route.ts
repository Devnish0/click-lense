import { collectAnalytics } from "@/app/lib/analytics";
import { handleApiError } from "@/app/lib/handleError";
import { handleApiResponse } from "@/app/lib/handleResponse";
import { HttpStatus } from "@/app/lib/httpStatus";
import { prisma } from "@/app/lib/prisma";
import { unlockUrl } from "@/app/lib/validators/url";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const validateData = unlockUrl.safeParse(body);
    if (!validateData.success) {
      return handleApiResponse(
        HttpStatus.BAD_REQUEST,
        "there is a problem in working with this request",
      );
    }
    const { Password, slug } = validateData.data;

    const urlRecord = await prisma.url.findUnique({
      where: {
        shortCode: slug,
        password: {
          not: null,
        },
      },
      select: {
        id: true,
        password: true,
        originalUrl: true,
        expiresAt: true,
        maxClicks: true,
        clicks: true,
      },
    });

    if (!urlRecord) {
      return handleApiResponse(
        HttpStatus.NOT_FOUND,
        "slug is invalid or password not required redirecting....",
      );
    }

    if (urlRecord.expiresAt && urlRecord.expiresAt < new Date()) {
      return handleApiResponse(HttpStatus.BAD_REQUEST, "url has expired");
    }

    if (urlRecord.maxClicks && urlRecord.maxClicks <= urlRecord.clicks) {
      return handleApiResponse(
        HttpStatus.BAD_REQUEST,
        "url has reached max clicks",
      );
    }
    if (urlRecord.password === null) {
      return handleApiResponse(
        HttpStatus.OK,
        "this url does not require password redirecting...",
      );
    }
    if (urlRecord.password !== Password) {
      return handleApiResponse(
        HttpStatus.UNAUTHORIZED,
        "password is incorrect try again",
      );
    }

    // Password was correct - log click analytics and increment clicks
    const analytics = collectAnalytics(request);

    const [updatedUrl] = await prisma.$transaction([
      prisma.url.update({
        where: { shortCode: slug },
        data: { clicks: { increment: 1 } },
        select: { originalUrl: true },
      }),
      prisma.click.create({
        data: {
          urlId: urlRecord.id,
          browser: analytics.browser,
          os: analytics.os,
          device: analytics.device,
          country: analytics.country,
          referrer: analytics.referrer,
          ipHash: analytics.ipHash,
        },
      }),
    ]);

    return handleApiResponse(
      HttpStatus.OK,
      "password was correct, redirecting",
      { originalUrl: updatedUrl.originalUrl },
    );
  } catch (error) {
    return await handleApiError(error);
  }
}
