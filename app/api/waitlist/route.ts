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
  const category = typeof body?.category === 'string' ? body.category.trim().slice(0, 80) || null : null
  const country = typeof body?.country === 'string' ? body.country.trim().slice(0, 80) || null : null
  const referredBy = typeof body?.referral === 'string' ? body.referral.trim().slice(0, 80) || null : null
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

  const referralCode = `diskai-${crypto.randomUUID().slice(0, 8)}`
  const { error } = await getSupabase().from('waitlist_signups').insert({ email, professional_category: category, country, referred_by: referredBy, referral_code: referralCode })
  if (error?.code === '23505') return NextResponse.json({ message: 'You are already on the list. We will be in touch.' })
  if (error) return NextResponse.json({ error: 'Unable to join waitlist.' }, { status: 500 })

  try {
    await sendConfirmationEmail(email)
  } catch (emailError) {
    console.error('[waitlist] Confirmation email failed:', emailError)
  }

  return NextResponse.json({ message: 'You are in. Check your inbox for a confirmation email.', referralCode }, { status: 201 })
}
