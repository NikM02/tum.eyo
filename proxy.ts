import { NextResponse, type NextRequest } from 'next/server'

const SESSION_TOKEN = 'tumeyo_admin_session_2024'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't protect login page or auth API
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // Don't protect public API routes (contacts POST for form submission)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')
    if (!session || session.value !== SESSION_TOKEN) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
