import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  let { data, error } = await supabase.from('ContactInfo').select('*').limit(1).single()
  if (error && error.code === 'PGRST116') {
    const { data: newData, error: insertError } = await supabase.from('ContactInfo').insert([{}]).select().single()
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
    return NextResponse.json(newData)
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id: _id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  
  const { data: existing } = await supabase.from('ContactInfo').select('id').limit(1).single()
  
  if (existing) {
    const { data: info, error } = await supabase.from('ContactInfo').update(rest).eq('id', existing.id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(info)
  }
  
  const { data: info, error } = await supabase.from('ContactInfo').insert([rest]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(info)
}
