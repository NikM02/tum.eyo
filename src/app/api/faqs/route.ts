import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabase.from('FAQ').select('*').order('order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { data: faq, error } = await supabase.from('FAQ').insert([data]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(faq)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  const { data: faq, error } = await supabase.from('FAQ').update(rest).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(faq)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  const { error } = await supabase.from('FAQ').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
