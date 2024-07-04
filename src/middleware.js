import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
export async function middleware(request) {

    const pathName = request.nextUrl.pathname
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    const isAuthenticated = Boolean(token)
    const isPublicPath = pathName === "/"

    if(!isPublicPath && !isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/create-prompt/:path*",
    "/profile/:path*",
    "/update-prompt/:path*"
  ]
}