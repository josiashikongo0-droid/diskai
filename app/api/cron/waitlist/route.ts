import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new NextResponse('Unauthorized', { status: 401 })

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const { count, error } = await supabase.from('waitlist_entries').select('id', { count: 'exact', head: true })
  if (error) return NextResponse.json({ error: 'Could not read waitlist.' }, { status: 500 })

  const transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.GMAIL_SMTP_USER, pass: process.env.GMAIL_SMTP_PASSWORD } })
  await transporter.sendMail({ from: `DISKAI Waitlist <${process.env.GMAIL_SMTP_USER}>`, to: process.env.WAITLIST_RECIPIENT_EMAIL, subject: `DISKAI waitlist: ${count ?? 0} people`, text: `Your DISKAI waitlist currently has ${count ?? 0} people.` })
  return NextResponse.json({ count: count ?? 0, sent: true })
}
