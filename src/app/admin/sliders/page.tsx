'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ImageUploader from '@/components/admin/ImageUploader'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Save, GripVertical } from 'lucide-react'

interface Slider {
  id?: number
  title: string
  subtitle: string
  imageUrl: string
  order: number
  active: boolean
}

const empty: Slider = { title: '', subtitle: '', imageUrl: '', order: 0, active: true }

export default function SlidersPage() {
  const [items, setItems] = useState<Slider[]>([])
  const [editing, setEditing] = useState<Slider | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/sliders')
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    await fetch('/api/sliders', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setEditing(null)
    load()
  }

  const remove = async (id: number) => {
    if (!confirm('Delete this slider?')) return
    await fetch(`/api/sliders?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Hero Sliders</h1>
            <p className="text-muted mt-1">Manage homepage banner slides</p>
          </div>
          <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} /> Add Slide
          </button>
        </div>

        {editing && (
          <div className="bg-card rounded-xl p-6 border border-accent/30 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{editing.id ? 'Edit' : 'New'} Slider</h2>
              <button onClick={() => setEditing(null)} className="text-muted hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Title</label>
                  <input type="text" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="Slide title..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Subtitle</label>
                  <textarea value={editing.subtitle} onChange={e => setEditing({...editing, subtitle: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent h-24 resize-none" placeholder="Slide subtitle..." />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-muted mb-2">Order</label>
                    <input type="number" value={editing.order} onChange={e => setEditing({...editing, order: parseInt(e.target.value) || 0})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" checked={editing.active} onChange={e => setEditing({...editing, active: e.target.checked})} className="accent-accent w-4 h-4" />
                    <span className="text-sm text-muted">Active</span>
                  </div>
                </div>
              </div>
              <ImageUploader value={editing.imageUrl} onChange={(url) => setEditing({...editing, imageUrl: url})} label="Slide Image" />
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={save} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
                <Save size={18} /> Save
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted py-20">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted py-20 bg-card rounded-xl border border-border">
            <p className="text-lg">No sliders yet</p>
            <p className="text-sm mt-1">Click &ldquo;Add Slide&rdquo; to create your first banner</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:border-accent/20 transition-colors">
                <GripVertical size={18} className="text-muted/50" />
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-32 h-20 object-cover rounded-lg" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <p className="text-sm text-muted truncate">{item.subtitle}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${item.active ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'}`}>
                  {item.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(item)} className="p-2 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => remove(item.id!)} className="p-2 text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
