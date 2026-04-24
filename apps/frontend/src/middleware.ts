import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

 export const middleware = async(request: NextRequest, responce:NextResponse, ) => {
     const { url, cookies } = request
     
     const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
     const isAuthPage = url.includes('/auth')
     const pathname = request.nextUrl.pathname

     const isRootURL = pathname === '/' || pathname === '';
     
     if (isRootURL) {
    if (accessToken) {
      return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
    }
    return NextResponse.redirect(new URL('/auth', request.url));
    }
     
     if (isAuthPage && accessToken) {
         return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
     }
     if (isAuthPage) {
         return NextResponse.next()
     }
     if (!accessToken) {
         return NextResponse.redirect(new URL('/auth', request.url))
     }
     return NextResponse.next()
}

export const config = {
    matcher: ['/', '/home/:path*', '/auth/:path*']
}