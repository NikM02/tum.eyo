import { supabase } from '@/lib/supabase'

export async function fetchSliders() {
  try {
    const { data, error } = await supabase.from('Slider').select('*').order('order', { ascending: true })
    if (error) throw error
    return data ? data.filter((s) => s.active) : []
  } catch (error) {
    console.error('Failed to fetch sliders', error)
    return []
  }
}

export async function fetchAbout() {
  try {
    const { data, error } = await supabase.from('About').select('*').limit(1).single()
    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  } catch (error) {
    console.error('Failed to fetch about info', error)
    return null
  }
}

export async function fetchPortfolio() {
  try {
    const { data, error } = await supabase.from('Portfolio').select('*').order('order', { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch portfolio', error)
    return []
  }
}

export async function fetchFAQs() {
  try {
    const { data, error } = await supabase.from('FAQ').select('*').order('order', { ascending: true })
    if (error) throw error
    return data ? data.filter((f) => f.active) : []
  } catch (error) {
    console.error('Failed to fetch FAQs', error)
    return []
  }
}

export async function fetchServices() {
  try {
    const { data, error } = await supabase.from('Service').select('*').order('order', { ascending: true })
    if (error) throw error
    return data ? data.filter((s) => s.active) : []
  } catch (error) {
    console.error('Failed to fetch services', error)
    return []
  }
}

export async function fetchContactInfo() {
  try {
    let { data, error } = await supabase.from('ContactInfo').select('*').limit(1).single()
    if (error && error.code === 'PGRST116') {
      const { data: newData, error: insertError } = await supabase.from('ContactInfo').insert([{}]).select().single()
      if (insertError) throw insertError
      return newData
    } else if (error) {
      throw error
    }
    return data
  } catch (error) {
    console.error('Failed to fetch contact info', error)
    return null
  }
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  } catch (error) {
    console.error('Failed to submit contact', error)
    return false
  }
}
