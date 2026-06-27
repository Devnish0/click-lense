import { NextResponse } from "next/server";
import { createUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "@/app/lib/httpStatus";
import { handleApiError } from "@/app/lib/handleError";
import { handleApiResponse } from "@/app/lib/handleResponse";
import {cookies} from 'next/headers';
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validateData = createUrlSchema.parse(body);

    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: validateData.userId,
        password: validateData?.password,
        expiresAt: validateData?.expiresAt,
        maxClicks: validateData?.maxClicks,
      },
    });
    return handleApiResponse( HttpStatus.CREATED,"url created successfully",{url})
  } catch (error) {
    console.log(error,"error from the url route")
    return handleApiError(error);
  }
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_demo_token");
  try{
    if(token && process.env.JWT_SECRET){
        const data = jwt.verify(token.value,process.env.JWT_SECRET!) as {
          UserToken: {
            id: string;
          }
        }
        const userUrls = await prisma.url.findMany({
          where:{
            userId:data.UserToken.id
          }
        })
        return handleApiResponse(HttpStatus.OK,"success",{userUrls})
    }

  }catch(error){
    return handleApiError(error)
  }
}
