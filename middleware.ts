import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect section pages to homepage with hash
  if (pathname === '/about') {
    return NextResponse.redirect(new URL('/#about', request.url));
  }
  
  if (pathname === '/services') {
    return NextResponse.redirect(new URL('/#services', request.url));
  }
  
  if (pathname === '/portfolio') {
    return NextResponse.redirect(new URL('/#portfolio', request.url));
  }
  
  if (pathname === '/contact') {
    return NextResponse.redirect(new URL('/#contact', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/about', '/services', '/portfolio', '/contact']
};