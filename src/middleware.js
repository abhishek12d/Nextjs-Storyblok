import { NextResponse } from "next/server";

export function middleware(request) {
    const session = request?.cookies?.get("token")?.value;
    if (session && request?.nextUrl?.pathname?.startsWith("/auth")) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!session && !request?.nextUrl?.pathname?.startsWith("/auth")) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = { matcher: ['/', '/auth/:path*'] };
