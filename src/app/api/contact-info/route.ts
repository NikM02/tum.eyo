import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  let info = await prisma.contactInfo.findFirst()
  if (!info) {
    info = await prisma.contactInfo.create({ data: {} })
  }
  return NextResponse.json(info)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id: _id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  const existing = await prisma.contactInfo.findFirst()
  if (existing) {
    const info = await prisma.contactInfo.update({ where: { id: existing.id }, data: rest })
    return NextResponse.json(info)
  }
  const info = await prisma.contactInfo.create({ data: rest })
  return NextResponse.json(info)
}
