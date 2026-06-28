import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('admin_session');
  const { pathname } = req.nextUrl;

  // Allow the login page and the login API through
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  // Protect /admin and /api/admin/*
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (session?.value !== 'authenticated') {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
