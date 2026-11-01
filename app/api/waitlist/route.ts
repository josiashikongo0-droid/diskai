import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
}

async function sendConfirmationEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `DISKAI <${process.env.GMAIL_SMTP_USER}>`,
    to: email,
    subject: 'You are on the DISKAI waitlist',
    text: `Thanks for joining the DISKAI private beta waitlist. We will be in touch when your access is ready.\n\nDISKAI — Independent artists, amplified.`,
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

  const { error } = await getSupabase().from('waitlist_entries').insert({ email })
  if (error?.code === '23505') return NextResponse.json({ message: 'You are already on the list. We will be in touch.' })
  if (error) return NextResponse.json({ error: 'Unable to join waitlist.' }, { status: 500 })

  try {
    await sendConfirmationEmail(email)
  } catch (emailError) {
    console.error('[waitlist] Confirmation email failed:', emailError)
  }

  return NextResponse.json({ message: 'You are in. Check your inbox for a confirmation email.' }, { status: 201 })
}
