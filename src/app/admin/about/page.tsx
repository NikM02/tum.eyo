'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ImageUploader from '@/components/admin/ImageUploader'
import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

interface AboutData {
  id?: number; heading: string; description: string; imageUrl: string
  stat1Label: string; stat1Value: string; stat2Label: string; stat2Value: string; stat3Label: string; stat3Value: string
}

const empty: AboutData = { heading: '', description: '', imageUrl: '', stat1Label: '', stat1Value: '', stat2Label: '', stat2Value: '', stat3Label: '', stat3Value: '' }

export default function AboutPage() {
  const [data, setData] = useState<AboutData>(empty)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetch('/api/about').then(r => r.json()).then(d => { if (d) setData(d) }).catch(() => {}) }, [])

  const save = async () => {
    setSaving(true)
    const method = data.id ? 'PUT' : 'POST'
    const res = await fetch('/api/about', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const result = await res.json()
    setData(result); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const update = (key: keyof AboutData, value: string) => setData({ ...data, [key]: value })

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">About Section</h1><p className="text-muted mt-1">Update your company information</p></div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
            <Save size={18} /> {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div><label className="block text-sm font-medium text-muted mb-2">Heading</label><input type="text" value={data.heading} onChange={e => update('heading', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="About heading..." /></div>
              <div><label className="block text-sm font-medium text-muted mb-2">Description</label><textarea value={data.description} onChange={e => update('description', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent h-40 resize-none" placeholder="Company description..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 1 Label</label><input type="text" value={data.stat1Label} onChange={e => update('stat1Label', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. Projects" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 1 Value</label><input type="text" value={data.stat1Value} onChange={e => update('stat1Value', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. 150+" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 2 Label</label><input type="text" value={data.stat2Label} onChange={e => update('stat2Label', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. Clients" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 2 Value</label><input type="text" value={data.stat2Value} onChange={e => update('stat2Value', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. 80+" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 3 Label</label><input type="text" value={data.stat3Label} onChange={e => update('stat3Label', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. Years" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Stat 3 Value</label><input type="text" value={data.stat3Value} onChange={e => update('stat3Value', e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. 10+" /></div>
              </div>
            </div>
            <ImageUploader value={data.imageUrl} onChange={(url) => update('imageUrl', url)} label="About Image" />
          </div>
        </div>
      </main>
    </div>
  )
}
