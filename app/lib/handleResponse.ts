import { NextResponse } from "next/server";
import { HttpStatus } from "./httpStatus";

export function handleApiResponse(status: HttpStatus, message: string, data?: unknown) {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300 ? true : false,
      message,
      data,
    },
    { status },
  );
}