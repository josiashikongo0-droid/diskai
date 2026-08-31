import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

const emailSchema = z.object({ email: z.string().trim().email().max(320) })

export async function POST(request: Request) {
  try {
    const parsed = emailSchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })

    await db.execute(sql`INSERT INTO waitlist_signups (email) VALUES (${parsed.data.email.toLowerCase()}) ON CONFLICT (email) DO NOTHING`)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
