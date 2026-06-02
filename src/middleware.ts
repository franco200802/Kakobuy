import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas admin/dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const session = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString()
      );

      // Verificar que no haya expirado
      if (session.exp < Date.now()) {
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.cookies.delete('admin_session');
        return response;
      }

      // Verificar rol
      if (session.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
