import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, description } = body
  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 })
  const todo = await prisma.todo.create({ data: { title, description } })
  return NextResponse.json(todo)
}
