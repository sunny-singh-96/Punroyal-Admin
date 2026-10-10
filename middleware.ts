// middleware.ts - Next.js Edge Middleware for token validation
import { NextRequest, NextResponse } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow static assets, images, Next internals, or files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Check for token in cookies or headers
  const token = request.cookies.get('auth-token')?.value || request.cookies.get('token')?.value;

  // If not token and trying to access protected route, redirect to home
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    // Store the redirect URL to return after login
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files and assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

