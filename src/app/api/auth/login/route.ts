import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'tumeyo@gmail.com'
const ADMIN_PASSWORD = 'Tum07123$$$'
const SESSION_TOKEN = 'tumeyo_admin_session_2024'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
