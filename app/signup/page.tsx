import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Check, Hexagon, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

const benefits = ['Plan smarter tours with AI', 'Keep bookings, finances, and venues together', 'Start free with no credit card']

export default async function SignupPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')
  return <main className="auth-shell"><div className="auth-brand"><span className="brand-mark"><Hexagon size={20} strokeWidth={2.5} /><i /></span><strong>DISKAI</strong><span>Tour Operating System</span></div><div className="auth-grid"><section className="auth-intro"><div className="auth-kicker"><Sparkles size={15} /> Built for the next era of touring</div><h1>Make every show <em>count.</em></h1><p>One beautiful workspace for the artists, managers, and teams moving live music forward.</p><ul>{benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul></section><section className="auth-card"><div className="auth-card-head"><span className="eyebrow">GET STARTED</span><h2>Create your workspace</h2><p>Set up your free DISKAI account in a minute.</p></div><AuthForm mode="sign-up" /><p className="auth-switch">Already have an account? <Link href="/signin">Sign in</Link></p></section></div></main>
}
