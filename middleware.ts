// middleware.ts - Next.js Edge Middleware for token validation & canonical domain enforcement
import { NextRequest, NextResponse } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/influencer/login'];

export function middleware(request: NextRequest) {
  // Enforce canonical domain: Redirect any direct IP or port 5000 access to https://admin.punroyal.com
  const host = request.headers.get('host') || '';
  if (host.includes('194.5.157.175') || host.includes(':5000')) {
    const redirectUrl = new URL(request.url);
    redirectUrl.protocol = 'https:';
    redirectUrl.hostname = 'admin.punroyal.com';
    redirectUrl.port = '';
    return NextResponse.redirect(redirectUrl, 301);
  }

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

  const isInfluencerRoute = pathname.startsWith('/influencer');

  // Check for role-specific token in cookies or headers
  let token = request.cookies.get('auth-token')?.value || request.cookies.get('token')?.value;
  if (isInfluencerRoute) {
    token =
      request.cookies.get('influencer-token')?.value ||
      request.cookies.get('influencer-auth-token')?.value ||
      token;
  } else {
    token =
      request.cookies.get('admin-token')?.value ||
      request.cookies.get('admin-auth-token')?.value ||
      token;
  }

  // If no token and trying to access protected route, redirect to login
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = isInfluencerRoute ? '/influencer/login' : '/';
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
