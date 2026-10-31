'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const result = mode === 'sign-up'
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error) { setError('We could not complete that request. Check your details and try again.'); return }
    router.push('/')
    router.refresh()
  }

  return <form onSubmit={submit}>
    {mode === 'sign-up' && <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" /></label>}
    <label>Work email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@yourcompany.com" /></label>
    <label>Password<div className="password-field"><input required minLength={8} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
    {error && <p role="alert" className="auth-error">{error}</p>}
    <button className="auth-submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'sign-up' ? 'Create free workspace' : 'Sign in'} <ArrowRight size={16} /></button>
  </form>
}
