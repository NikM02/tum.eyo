'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useEffect, useState } from 'react'
import { Image, Briefcase, HelpCircle, Mail } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ sliders: 0, portfolio: 0, faqs: 0, contacts: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/sliders').then(r => r.json()),
      fetch('/api/portfolio').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
      fetch('/api/contacts').then(r => r.json()),
    ]).then(([s, p, f, c]) => {
      setStats({
        sliders: Array.isArray(s) ? s.length : 0,
        portfolio: Array.isArray(p) ? p.length : 0,
        faqs: Array.isArray(f) ? f.length : 0,
        contacts: Array.isArray(c) ? c.length : 0,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Hero Sliders', value: stats.sliders, icon: Image, color: 'from-orange-500 to-amber-500' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { label: 'FAQs', value: stats.faqs, icon: HelpCircle, color: 'from-purple-500 to-pink-500' },
    { label: 'Messages', value: stats.contacts, icon: Mail, color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted mt-1">Manage your landing page content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <card.icon size={24} className="text-white" />
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="text-muted text-sm mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted">
            <div className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <p>Use <strong className="text-white">Hero Sliders</strong> to manage the homepage banner images and text.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <p>Update <strong className="text-white">About Section</strong> to change company info and stats.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <p>Add project images in <strong className="text-white">Portfolio</strong> to showcase your work.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <p>Manage <strong className="text-white">FAQs</strong> to answer common client questions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
