'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useEffect, useState } from 'react'
import { Save, Mail, Phone, Globe, Link2 } from 'lucide-react'

interface ContactInfoData {
  id?: number; heading: string; subtitle: string; email: string; phone: string; instagramUrl: string; linkedinUrl: string
}

const empty: ContactInfoData = { heading: '', subtitle: '', email: '', phone: '', instagramUrl: '', linkedinUrl: '' }

export default function ContactInfoPage() {
  const [data, setData] = useState<ContactInfoData>(empty)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetch('/api/contact-info').then(r => r.json()).then(d => { if (d) setData(d) }).catch(() => {}) }, [])

  const save = async () => {
    setSaving(true)
    const res = await fetch('/api/contact-info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const result = await res.json()
    setData(result); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const update = (key: keyof ContactInfoData, value: string) => setData({ ...data, [key]: value })

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">Contact Section</h1><p className="text-muted mt-1">Update contact information displayed on the landing page</p></div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
            <Save size={18} /> {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Section Content</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-muted mb-2">Heading</label><input type="text" value={data.heading} onChange={e => update('heading', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="Let's Build Something Amazing Together" /></div>
              <div><label className="block text-sm font-medium text-muted mb-2">Subtitle</label><textarea value={data.subtitle} onChange={e => update('subtitle', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent h-24 resize-none" placeholder="Ready to transform your digital presence?..." /></div>
            </div>
          </div>
          <hr className="border-border" />
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="flex items-center gap-2 text-sm font-medium text-muted mb-2"><Mail size={14} /> Email Address</label><input type="email" value={data.email} onChange={e => update('email', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="hello@example.com" /></div>
              <div><label className="flex items-center gap-2 text-sm font-medium text-muted mb-2"><Phone size={14} /> Phone Number</label><input type="text" value={data.phone} onChange={e => update('phone', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="+1 (234) 567-890" /></div>
            </div>
          </div>
          <hr className="border-border" />
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Social Media Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="flex items-center gap-2 text-sm font-medium text-muted mb-2"><Globe size={14} /> Instagram URL</label><input type="url" value={data.instagramUrl} onChange={e => update('instagramUrl', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="https://instagram.com/..." /></div>
              <div><label className="flex items-center gap-2 text-sm font-medium text-muted mb-2"><Link2 size={14} /> LinkedIn URL</label><input type="url" value={data.linkedinUrl} onChange={e => update('linkedinUrl', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="https://linkedin.com/company/..." /></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
