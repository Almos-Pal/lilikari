import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  const pathname = request.nextUrl.pathname;

  // API route-ok: engedélyezzük őket (ők maguk ellenőrzik az auth-t ha szükséges)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Ha nincs auth token és nem login oldal, átirányítás login-ra
  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Ha van auth token és a login oldalon van, átirányítás főoldalra
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

