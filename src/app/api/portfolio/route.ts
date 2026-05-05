import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const portfolio = await prisma.portfolio.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(portfolio)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const item = await prisma.portfolio.create({ data })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, createdAt, updatedAt, ...rest } = data
  const item = await prisma.portfolio.update({ where: { id }, data: rest })
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  await prisma.portfolio.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
