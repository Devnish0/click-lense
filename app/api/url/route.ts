import { auth } from "@/app/lib/auth";
import { handleApiError } from "@/app/lib/handleError";
import { handleApiResponse } from "@/app/lib/handleResponse";
import { HttpStatus } from "@/app/lib/httpStatus";
import { prisma } from "@/app/lib/prisma";
import {
  createUrlSchema,
  deleteUrlSchema,
  updateUrlSchema,
} from "@/app/lib/validators/url";
import { revalidateTag } from "next/cache";
import { getAllUrls } from "../(functions)/urlfunctions";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.session?.id) {
      return handleApiResponse(
        HttpStatus.UNAUTHORIZED,
        "Please login to create a url",
      );
    }

    // Checking if the user is guest and enforcing URL limit
    const user = await prisma.user.findUnique({
      where: {
        id: session.session.userId,
      },
      select: {
        isGuest: true,
        _count: {
          select: {
            urls: true,
          },
        },
      },
    });

    // if (user?.isGuest && user._count.urls >= 5) {
    //   return handleApiResponse(
    //     HttpStatus.FORBIDDEN,
    //     "Guest accounts can create up to 5 URLs. Please create a full account to shorten more links.",
    //   );
    // }

    const body = await request.json();
    const validateData = createUrlSchema.parse(body);

    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: session.session.userId,
        password: validateData?.password,
        expiresAt: validateData?.expiresAt,
        maxClicks: validateData?.maxClicks,
      },
    });

    revalidateTag(`url-${session.session.userId}`, "max");
    return handleApiResponse(HttpStatus.CREATED, "url created successfully", {
      url,
    });
  } catch (error) {
    console.log(error, "error from the url route");
    return handleApiError(error);
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.session?.id) {
      return handleApiResponse(
        HttpStatus.UNAUTHORIZED,
        "Please login to view your URLs",
      );
    }
    const userUrls = await getAllUrls(session.session.userId);

    return handleApiResponse(HttpStatus.OK, "success", { userUrls });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.session?.id) {
    return handleApiResponse(
      HttpStatus.UNAUTHORIZED,
      "Please login to create a url",
    );
  }
  try {
    const body = await request.json();
    const validateData = deleteUrlSchema.parse(body);
    const deletedUserUrl = await prisma.url.delete({
      where: {
        userId: session.session.userId,
        id: validateData.id,
      },
      select: {
        id: true,
      },
    });

    revalidateTag(`url-${session.session.userId}`, "max");

    return handleApiResponse(HttpStatus.OK, "url deleted successfully", {
      deletedUserUrl,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.session?.id) {
    return handleApiResponse(
      HttpStatus.UNAUTHORIZED,
      "Please login to create a url",
    );
  }
  try {
    const body = await request.json();
    const validateData = updateUrlSchema.parse(body);
    const updatedUserUrl = await prisma.url.update({
      where: {
        userId: session.session.userId,
        id: validateData.id,
      },
      data: {
        shortCode: validateData.slug,
      },
    });

    revalidateTag(`url-${session.session.userId}`, "max");

    return handleApiResponse(HttpStatus.OK, "url updated successfully", {
      updatedUserUrl,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
