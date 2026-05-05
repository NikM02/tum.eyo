'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ImageUploader from '@/components/admin/ImageUploader'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

interface PortfolioItem { id?: number; title: string; category: string; imageUrl: string; order: number }
const empty: PortfolioItem = { title: '', category: '', imageUrl: '', order: 0 }

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => { setLoading(true); const r = await fetch('/api/portfolio'); const d = await r.json(); setItems(Array.isArray(d)?d:[]); setLoading(false) }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    await fetch('/api/portfolio', { method: editing.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null); load()
  }

  const remove = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' }); load() }

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">Portfolio</h1><p className="text-muted mt-1">Manage project showcase</p></div>
          <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg"><Plus size={18} /> Add Project</button>
        </div>
        {editing && (
          <div className="bg-card rounded-xl p-6 border border-accent/30 mb-8">
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">{editing.id ? 'Edit' : 'New'} Project</h2><button onClick={() => setEditing(null)} className="text-muted hover:text-white"><X size={20} /></button></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-muted mb-2">Title</label><input type="text" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Category</label><input type="text" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-sm font-medium text-muted mb-2">Order</label><input type="number" value={editing.order} onChange={e => setEditing({...editing, order: parseInt(e.target.value)||0})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" /></div>
              </div>
              <ImageUploader value={editing.imageUrl} onChange={(url) => setEditing({...editing, imageUrl: url})} />
            </div>
            <div className="flex justify-end mt-6"><button onClick={save} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-medium"><Save size={18} /> Save</button></div>
          </div>
        )}
        {loading ? <div className="text-center text-muted py-20">Loading...</div> : items.length === 0 ? (
          <div className="text-center text-muted py-20 bg-card rounded-xl border border-border"><p>No portfolio items yet</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/20 transition-colors">
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-muted">{item.category}</p>
                <div className="flex gap-2 mt-3"><button onClick={() => setEditing(item)} className="p-2 text-muted hover:text-accent rounded-lg"><Pencil size={14} /></button><button onClick={() => remove(item.id!)} className="p-2 text-muted hover:text-danger rounded-lg"><Trash2 size={14} /></button></div>
              </div>
            </div>
          ))}</div>
        )}
      </main>
    </div>
  )
}
