import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpStatus } from "./httpStatus";
import { Prisma } from "@/generated/prisma/client";
import { handleApiResponse } from "./handleResponse";

export async function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: "validation failed", errors: error.flatten().fieldErrors },
      { status: HttpStatus.BAD_REQUEST },
    );
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json(
          { message: "the code already exists" },
          { status: HttpStatus.CONFLICT },
        );
    }
  }
  return handleApiResponse(HttpStatus.INTERNAL_SERVER_ERROR,"Something went wrong from the handleError.ts")
}
