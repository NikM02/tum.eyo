import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const service = await prisma.service.create({ data })
  return NextResponse.json(service)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, createdAt, updatedAt, ...rest } = data
  const service = await prisma.service.update({ where: { id }, data: rest })
  return NextResponse.json(service)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
