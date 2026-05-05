import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const about = await prisma.about.findFirst()
  return NextResponse.json(about)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const existing = await prisma.about.findFirst()
  if (existing) {
    const about = await prisma.about.update({ where: { id: existing.id }, data })
    return NextResponse.json(about)
  }
  const about = await prisma.about.create({ data })
  return NextResponse.json(about)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const { id, ...rest } = data
  delete rest.createdAt
  delete rest.updatedAt
  const about = await prisma.about.update({ where: { id }, data: rest })
  return NextResponse.json(about)
}
