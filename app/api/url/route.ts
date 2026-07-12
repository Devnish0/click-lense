import { NextResponse } from "next/server";
import {
  createUrlSchema,
  deleteUrlSchema,
  updateUrlSchema,
} from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "@/app/lib/httpStatus";
import { handleApiError } from "@/app/lib/handleError";
import { handleApiResponse } from "@/app/lib/handleResponse";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.session?.id) {
      return handleApiResponse(
        HttpStatus.UNAUTHORIZED,
        "Please login to create a url",
      );
    }

    // checking if the user is guest then we can limit the number of urls
    const user = await prisma.user.findUnique({
      where: {
        id: session?.session?.userId,
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

    const body = await request.json();

    const validateData = createUrlSchema.parse(body);
    console.log("validateData is", validateData);
    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: session?.session?.userId,
        password: validateData?.password,
        expiresAt: validateData?.expiresAt,
        maxClicks: validateData?.maxClicks,
      },
    });
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
    console.log("session is", session);
    if (session?.session?.id) {
      // const data = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      //   UserToken: {
      //     id: string;
      //   };
      // };
      const userUrls = await prisma.url.findMany({
        where: {
          userId: session?.session?.userId,
        },
      });
      return handleApiResponse(HttpStatus.OK, "success", { userUrls });
    }
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("user_demo_token");
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.session?.id) {
    return handleApiResponse(
      HttpStatus.UNAUTHORIZED,
      "Please login to create a url",
    );
  }
  try {
    if (session?.session?.id) {
      // const data = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      //   UserToken: {
      //     id: string;
      //   };
      // };
      const body = await request.json();
      const validateData = deleteUrlSchema.parse(body);
      const deletedUserUrl = await prisma.url.delete({
        where: {
          userId: session?.session?.userId,
          id: validateData.id,
        },
        select: {
          id: true,
        },
      });
      return handleApiResponse(HttpStatus.OK, "url deleted successfully", {
        deletedUserUrl,
      });
    }
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
    if (session?.session?.id) {
      // const data = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      //   UserToken: {
      //     id: string;
      //   };
      // };
      const body = await request.json();
      const validateData = updateUrlSchema.parse(body);
      const updatedUserUrl = await prisma.url.update({
        where: {
          userId: session?.session?.userId,
          id: validateData.id,
        },
        data: {
          shortCode: validateData.slug,
        },
      });
      return handleApiResponse(HttpStatus.OK, "url updated successfully", {
        updatedUserUrl,
      });
    }
  } catch (error) {
    return handleApiError(error);
  }
}
