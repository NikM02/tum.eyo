'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image, Info, Briefcase, HelpCircle, Mail, Menu, X, Settings, Phone, LogOut } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/sliders', label: 'Hero Sliders', icon: Image },
  { href: '/admin/about', label: 'About Section', icon: Info },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/contact-info', label: 'Contact Section', icon: Phone },
  { href: '/admin/contacts', label: 'Messages', icon: Mail },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card p-2 rounded-lg text-white"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-border flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-white">
            <span className="text-accent">tum</span>.eyo
          </h1>
          <p className="text-xs text-muted mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'text-muted hover:bg-sidebar-hover hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="bg-card rounded-lg p-3">
            <p className="text-xs text-muted">Landing Page</p>
            <a href="/" target="_blank" className="text-accent text-sm hover:underline">
              View Site →
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-danger/10 hover:text-danger transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  )
}
