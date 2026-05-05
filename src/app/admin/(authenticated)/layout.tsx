import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_TOKEN = 'tumeyo_admin_session_2024'

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session || session.value !== SESSION_TOKEN) {
    redirect('/admin/login')
  }

  return <>{children}</>
}
