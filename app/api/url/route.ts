import { NextResponse } from "next/server";
import { createUrlSchema, deleteUrlSchema, updateUrlSchema } from "@/app/lib/validators/url";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "@/app/lib/httpStatus";
import { handleApiError } from "@/app/lib/handleError";
import { handleApiResponse } from "@/app/lib/handleResponse";
import {cookies} from 'next/headers';
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_demo_token");
    if(!token){
      return handleApiResponse(HttpStatus.UNAUTHORIZED,"Please login to create a url")
    }
    const data = jwt.verify(token.value,process.env.JWT_SECRET!) as {
      UserToken: {
        id: string;
      }
    }

    // checking if the user is guest then we can limit the number of urls
    const user = await prisma.user.findUnique({
      where:{
        id:data.UserToken.id
      },
      select:{
        isGuest:true,
        _count:{
          select:{
            urls:true
          }
        }
      }
    })

    if(user?.isGuest && user._count.urls >= 5){
      return handleApiResponse(HttpStatus.FORBIDDEN,"You can only create 5 urls as a guest")
    }

    const body = await request.json();

    const validateData = createUrlSchema.parse(body);

    const url = await prisma.url.create({
      data: {
        originalUrl: validateData.originalUrl,
        shortCode: validateData.slug,
        userId: data.UserToken.id,
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

export async function DELETE(request:Request){
  const cookieStore = await cookies();
  const token = cookieStore.get("user_demo_token");
  if(!token){
    return handleApiResponse(HttpStatus.UNAUTHORIZED,"Please login to create a url")
  }
  try{
    if(token && process.env.JWT_SECRET){
        const data = jwt.verify(token.value,process.env.JWT_SECRET!) as {
          UserToken: {
            id: string;
          }
        }
        const body = await request.json();
        const validateData = deleteUrlSchema.parse(body);
        const deletedUserUrl = await prisma.url.delete({
          where:{
            userId:data.UserToken.id,
            id:validateData.id
          },
          select:{
            id:true,
          }
        })
        return handleApiResponse(HttpStatus.OK,"url deleted successfully",{deletedUserUrl})
    }

  }catch(error){
    return handleApiError(error)
  }
}

export async function PATCH(request:Request){
  const cookieStore = await cookies();
  const token = cookieStore.get("user_demo_token");
  if(!token){
    return handleApiResponse(HttpStatus.UNAUTHORIZED,"Please login to create a url")
  }
  try{
    if(token && process.env.JWT_SECRET){
        const data = jwt.verify(token.value,process.env.JWT_SECRET!) as {
          UserToken: {
            id: string;
          }
        }
        const body = await request.json();
        const validateData = updateUrlSchema.parse(body);
        const updatedUserUrl = await prisma.url.update({
          where:{
            userId:data.UserToken.id,
            id:validateData.id
          },
          data:{
            shortCode:validateData.slug,
          }
        })
        return handleApiResponse(HttpStatus.OK,"url updated successfully",{updatedUserUrl})
    }

  }catch(error){
    return handleApiError(error)
  }
}