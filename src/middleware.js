import { NextResponse } from 'next/server';
export function middleware(request) {

  // Check if the pathname is "/dashboard" and redirect to "/dashboard/invoices"
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/invoices', request.url));
  }
}


export const config = {
  matcher: '/dashboard',
}
