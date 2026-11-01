import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

  const { error } = await getSupabase().from('waitlist_entries').insert({ email })
  if (error?.code === '23505') return NextResponse.json({ message: 'You are already on the list. We will be in touch.' })
  if (error) return NextResponse.json({ error: 'Unable to join waitlist.' }, { status: 500 })
  return NextResponse.json({ message: 'You are in. We will be in touch soon.' }, { status: 201 })
}
