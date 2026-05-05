'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useEffect, useState } from 'react'
import { Trash2, Mail, Clock, Download } from 'lucide-react'

interface Contact { id: number; name: string; email: string; message: string; createdAt: string }

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => { setLoading(true); const r = await fetch('/api/contacts'); const d = await r.json(); setItems(Array.isArray(d)?d:[]); setLoading(false) }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [])

  const remove = async (id: number) => { if (!confirm('Delete this message?')) return; await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' }); load() }

  const exportToExcel = () => {
    if (items.length === 0) return
    const escapeCSV = (val: string) => `"${val.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    const headers = ['Name', 'Email', 'Message', 'Date']
    const rows = items.map(item => [
      escapeCSV(item.name), escapeCSV(item.email), escapeCSV(item.message),
      escapeCSV(new Date(item.createdAt).toLocaleString()),
    ].join(','))
    const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'application/vnd.ms-excel;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `messages_${new Date().toISOString().split('T')[0]}.xls`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">Messages</h1><p className="text-muted mt-1">Contact form submissions</p></div>
          {items.length > 0 && (
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Download size={16} /> Export Excel
            </button>
          )}
        </div>
        {loading ? <div className="text-center text-muted py-20">Loading...</div> : items.length === 0 ? (
          <div className="text-center text-muted py-20 bg-card rounded-xl border border-border"><Mail size={40} className="mx-auto mb-3 opacity-30" /><p>No messages yet</p></div>
        ) : (
          <div className="space-y-3">{items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border p-5 hover:border-accent/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2"><h3 className="font-semibold text-white">{item.name}</h3><span className="text-accent text-sm">{item.email}</span></div>
                  <p className="text-sm text-muted whitespace-pre-wrap">{item.message}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted/60"><Clock size={12} />{new Date(item.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={() => remove(item.id)} className="p-2 text-muted hover:text-danger rounded-lg shrink-0"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}</div>
        )}
      </main>
    </div>
  )
}
