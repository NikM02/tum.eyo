import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(faqs)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const faq = await prisma.fAQ.create({ data })
  return NextResponse.json(faq)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  const faq = await prisma.fAQ.update({ where: { id }, data: rest })
  return NextResponse.json(faq)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  await prisma.fAQ.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
