import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const p = await params
  const id = Number(p.id)
  const body = await req.json()
  const updated = await prisma.todo.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const p = await params
  const id = Number(p.id)
  await prisma.todo.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
