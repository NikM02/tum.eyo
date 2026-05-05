'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

interface FAQ { id?: number; question: string; answer: string; order: number; active: boolean }
const empty: FAQ = { question: '', answer: '', order: 0, active: true }

export default function FAQsPage() {
  const [items, setItems] = useState<FAQ[]>([])
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => { setLoading(true); const r = await fetch('/api/faqs'); const d = await r.json(); setItems(Array.isArray(d)?d:[]); setLoading(false) }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    await fetch('/api/faqs', { method: editing.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null); load()
  }

  const remove = async (id: number) => { if (!confirm('Delete this FAQ?')) return; await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' }); load() }

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">FAQs</h1><p className="text-muted mt-1">Manage frequently asked questions</p></div>
          <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg"><Plus size={18} /> Add FAQ</button>
        </div>
        {editing && (
          <div className="bg-card rounded-xl p-6 border border-accent/30 mb-8">
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">{editing.id ? 'Edit' : 'New'} FAQ</h2><button onClick={() => setEditing(null)} className="text-muted hover:text-white"><X size={20} /></button></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-muted mb-2">Question</label><input type="text" value={editing.question} onChange={e => setEditing({...editing, question: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" placeholder="Enter question..." /></div>
              <div><label className="block text-sm font-medium text-muted mb-2">Answer</label><textarea value={editing.answer} onChange={e => setEditing({...editing, answer: e.target.value})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent h-32 resize-none" placeholder="Enter answer..." /></div>
              <div className="flex gap-4">
                <div className="flex-1"><label className="block text-sm font-medium text-muted mb-2">Order</label><input type="number" value={editing.order} onChange={e => setEditing({...editing, order: parseInt(e.target.value)||0})} className="w-full bg-input-bg border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent" /></div>
                <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={editing.active} onChange={e => setEditing({...editing, active: e.target.checked})} className="accent-accent w-4 h-4" /><span className="text-sm text-muted">Active</span></div>
              </div>
            </div>
            <div className="flex justify-end mt-6"><button onClick={save} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-medium"><Save size={18} /> Save</button></div>
          </div>
        )}
        {loading ? <div className="text-center text-muted py-20">Loading...</div> : items.length === 0 ? (
          <div className="text-center text-muted py-20 bg-card rounded-xl border border-border"><p>No FAQs yet</p></div>
        ) : (
          <div className="space-y-3">{items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border p-5 hover:border-accent/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1"><h3 className="font-semibold text-white">{item.question}</h3><p className="text-sm text-muted mt-2 whitespace-pre-wrap">{item.answer}</p></div>
                <div className="flex items-center gap-2 shrink-0"><span className={`text-xs px-2 py-1 rounded-full ${item.active ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'}`}>{item.active ? 'Active' : 'Inactive'}</span><button onClick={() => setEditing(item)} className="p-2 text-muted hover:text-accent rounded-lg"><Pencil size={14} /></button><button onClick={() => remove(item.id!)} className="p-2 text-muted hover:text-danger rounded-lg"><Trash2 size={14} /></button></div>
              </div>
            </div>
          ))}</div>
        )}
      </main>
    </div>
  )
}
