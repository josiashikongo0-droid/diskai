import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Hexagon, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

export default async function SigninPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')
  return <main className="auth-shell"><div className="auth-brand"><span className="brand-mark"><Hexagon size={20} strokeWidth={2.5} /><i /></span><strong>DISKAI</strong><span>Tour Operating System</span></div><div className="auth-grid"><section className="auth-intro"><div className="auth-kicker"><Sparkles size={15} /> Welcome back</div><h1>Your tours, <em>in motion.</em></h1><p>Pick up where you left off and keep every show moving forward.</p></section><section className="auth-card"><div className="auth-card-head"><span className="eyebrow">WELCOME BACK</span><h2>Sign in to DISKAI</h2><p>Access your touring workspace.</p></div><AuthForm mode="sign-in" /><p className="auth-switch">New to DISKAI? <Link href="/signup">Create an account</Link></p></section></div></main>
}
