import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createDemoUser } from "@/app/lib/validators/user";
import { cookies } from "next/headers";
import { HttpStatus } from "@/app/lib/enums";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("jwt secret isnt loading");
  }
  try {
    const data = request.json();
    const parsedData = await createDemoUser.parse(data);
    if (typeof parsedData.isGuest === "boolean") {
      const id = await prisma.user.create({
        data: { isGuest: parsedData.isGuest },
        select: {
          id: true,
        },
      });
      const token = jwt.sign({ UserToken: id }, JWT_SECRET);
      cookiesStore.set({
        name: "user_demo_token",
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      return NextResponse.json(
        { success: true, message: "cookies setted successfully" },
        { status: HttpStatus.CREATED },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "invalid parsed data or is guest might be wrong",
        },
        {
          status: 400,
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
}
