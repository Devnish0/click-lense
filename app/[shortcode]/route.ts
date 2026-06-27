import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { HttpStatus } from "../lib/httpStatus";
import { handleApiResponse } from "../lib/handleResponse";
import { handleApiError } from "../lib/handleError";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const { shortcode } = await params;
    const url = await prisma.url.findUnique({
      where: {
        shortCode: shortcode,
      },
      select:{
        id:true,
        expiresAt:true,
        password:true,
        maxClicks:true,
        clicks:true
      }
    });
    if (!url) {
      return handleApiResponse(HttpStatus.NOT_FOUND,"url doesnt exists")
    }
    if(url.expiresAt && url.expiresAt < new Date()){
      return handleApiResponse(HttpStatus.NOT_FOUND,"Url has expired")
    }

    if(url.password){
      return NextResponse.redirect(new URL(`/unlock/${shortcode}`,request.url))
    }

    if(url.maxClicks && url.maxClicks<=url.clicks){
      return handleApiResponse(HttpStatus.NOT_FOUND,"Url has reached max clicks")
    }

    const updatedUrl = await prisma.url.update({
      where :{
        shortCode:shortcode
      },
      data:{
        clicks:{
          increment:1,
        }
      },
      select :{
        originalUrl:true
      }
    })
    

    return NextResponse.redirect(updatedUrl.originalUrl)
  } catch (error) {
    console.log(error,"error from the [shortcode] route")
    return handleApiError(error)
  }
}
