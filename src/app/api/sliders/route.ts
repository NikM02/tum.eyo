import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sliders = await prisma.slider.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(sliders)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const slider = await prisma.slider.create({ data })
  return NextResponse.json(slider)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  const slider = await prisma.slider.update({ where: { id }, data: rest })
  return NextResponse.json(slider)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  await prisma.slider.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
