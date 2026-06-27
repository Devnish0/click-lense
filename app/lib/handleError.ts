import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpStatus } from "./httpStatus";
import { Prisma } from "@/generated/prisma/client";
import { handleApiResponse } from "./handleResponse";

export async function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return handleApiResponse(HttpStatus.BAD_REQUEST,"Validation failed",error.flatten().fieldErrors)
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return handleApiResponse(HttpStatus.CONFLICT,"The code already exists")
    }
  }
  return handleApiResponse(HttpStatus.INTERNAL_SERVER_ERROR,"Something went wrong from the handleError.ts")
}
