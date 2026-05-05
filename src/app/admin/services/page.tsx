'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

const ICON_OPTIONS = ['Megaphone', 'MonitorPlay', 'Code2', 'Cpu', 'Globe', 'Palette', 'Zap', 'BarChart2', 'Shield', 'Camera', 'PenTool', 'Layers', 'Share2', 'TrendingUp', 'Search', 'Mail', 'Video', 'Star']

interface Service { id?: number; title: string; description: string; icon: string; order: number; active: boolean }
const empty: Service = { title: '', description: '', icon: 'Cpu', order: 0, active: true }

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [editing, setEditing] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => { setLoading(true); const r = await fetch('/api/services'); const d = await r.json(); setItems(Array.isArray(d) ? d : []); setLoading(false) }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (editing.id) { await fetch(`/api/services?id=${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }) }
    else { await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }) }
    setEditing(null); load()
  }

  const remove = async (id: number) => { if (!confirm('Delete this service?')) return; await fetch(`/api/services?id=${id}`, { method: 'DELETE' }); load() }

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">Services</h1><p className="text-muted mt-1">Manage the services shown on your landing page</p></div>
          <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg"><Plus size={18} /> Add Service</button>
        </div>
        {editing && (
          <div className="bg-card rounded-xl p-6 border border-accent/30 mb-8">
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">{editing.id ? 'Edit' : 'New'} Service</h2><button onClick={() => setEditing(null)} className="text-muted hover:text-white"><X size={20} /></button></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-muted mb-2">Service Title</label><input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="e.g. Digital Marketing" /></div>
              <div><label className="block text-sm font-medium text-muted mb-2">Description</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent h-28 resize-none" placeholder="Short description..." /></div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Icon Name (Lucide)</label>
                <div className="flex flex-wrap gap-2">{ICON_OPTIONS.map(icon => (<button key={icon} onClick={() => setEditing({ ...editing, icon })} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${editing.icon === icon ? 'bg-accent border-accent text-white' : 'border-border text-muted hover:border-accent/50 hover:text-white'}`}>{icon}</button>))}</div>
                <input type="text" value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} className="w-full mt-2 bg-input-bg border border-border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-accent" placeholder="Or type any Lucide icon name..." />
              </div>
              <div className="flex gap-4">
                <div className="flex-1"><label className="block text-sm font-medium text-muted mb-2">Order</label><input type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" /></div>
                <div className="flex items-center gap-2 pt-7"><input type="checkbox" checked={editing.active} onChange={e => setEditing({ ...editing, active: e.target.checked })} className="accent-accent w-4 h-4" /><span className="text-sm text-muted">Active</span></div>
              </div>
            </div>
            <div className="flex justify-end mt-6"><button onClick={save} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-medium"><Save size={18} /> Save Service</button></div>
          </div>
        )}
        {loading ? (<div className="text-center text-muted py-20">Loading...</div>) : items.length === 0 ? (
          <div className="text-center text-muted py-20 bg-card rounded-xl border border-border"><p>No services yet. Add your first service above.</p></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">{items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1"><div className="flex items-center gap-3 mb-2"><span className="text-xs font-mono px-2 py-1 bg-accent/10 text-accent rounded">{item.icon}</span><h3 className="font-semibold text-white">{item.title}</h3></div><p className="text-sm text-muted">{item.description}</p></div>
                <div className="flex items-center gap-2 shrink-0"><span className={`text-xs px-2 py-1 rounded-full ${item.active ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'}`}>{item.active ? 'Active' : 'Inactive'}</span><button onClick={() => setEditing(item)} className="p-2 text-muted hover:text-accent rounded-lg"><Pencil size={14} /></button><button onClick={() => remove(item.id!)} className="p-2 text-muted hover:text-danger rounded-lg"><Trash2 size={14} /></button></div>
              </div>
            </div>
          ))}</div>
        )}
      </main>
    </div>
  )
}
