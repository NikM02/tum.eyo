import { prisma } from '@/lib/prisma'

export async function fetchSliders() {
  try {
    const data = await prisma.slider.findMany({ orderBy: { order: 'asc' } })
    return data.filter((s) => s.active)
  } catch (error) {
    console.error('Failed to fetch sliders', error)
    return []
  }
}

export async function fetchAbout() {
  try {
    return await prisma.about.findFirst()
  } catch (error) {
    console.error('Failed to fetch about info', error)
    return null
  }
}

export async function fetchPortfolio() {
  try {
    return await prisma.portfolio.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error('Failed to fetch portfolio', error)
    return []
  }
}

export async function fetchFAQs() {
  try {
    const data = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } })
    return data.filter((f) => f.active)
  } catch (error) {
    console.error('Failed to fetch FAQs', error)
    return []
  }
}

export async function fetchServices() {
  try {
    const data = await prisma.service.findMany({ orderBy: { order: 'asc' } })
    return data.filter((s) => s.active)
  } catch (error) {
    console.error('Failed to fetch services', error)
    return []
  }
}

export async function fetchContactInfo() {
  try {
    let info = await prisma.contactInfo.findFirst()
    if (!info) {
      info = await prisma.contactInfo.create({ data: {} })
    }
    return info
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
