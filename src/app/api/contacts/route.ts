import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(contacts)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const contact = await prisma.contact.create({ data })
  return NextResponse.json(contact)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  await prisma.contact.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
