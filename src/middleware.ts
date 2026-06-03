import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If accessing /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For a real app, use next-auth or JWT.
    // For this requirement, we use a simple basic auth or cookie check.
    // Since we need "Username: admin, Password: admin123", we can check basic auth header
    
    const basicAuth = request.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === 'admin123') {
        return NextResponse.next();
      }
    }

    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
