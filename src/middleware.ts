import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session");

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/v1/login')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const tokenData: string = token.value;

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(tokenData, secretKey, {
      algorithms: ["HS256"],
    });

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/api/v1/chat"],
};