import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const data = { message: "Hello from the App Router API!" };
  return NextResponse.json(data);
}

export async function GET(request: Request) {
  const data = { message: "Hello from the App Router API!" };

  return NextResponse.json(data);
}
