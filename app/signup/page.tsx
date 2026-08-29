'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, Hexagon, Sparkles } from 'lucide-react'

const benefits = ['Plan smarter tours with AI', 'Keep bookings, finances, and venues together', 'Start free with no credit card']

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="auth-shell">
      <div className="auth-brand"><span className="brand-mark"><Hexagon size={20} strokeWidth={2.5} /><i /></span><strong>DISKAI</strong><span>Tour Operating System</span></div>
      <div className="auth-grid">
        <section className="auth-intro">
          <div className="auth-kicker"><Sparkles size={15} /> Built for the next era of touring</div>
          <h1>Make every show <em>count.</em></h1>
          <p>One beautiful workspace for the artists, managers, and teams moving live music forward.</p>
          <ul>{benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul>
          <div className="auth-note"><span className="mini-avatars"><i>AJ</i><i>MR</i><i>+</i></span><span>Join 2,400+ touring teams</span></div>
        </section>
        <section className="auth-card">
          <div className="auth-card-head"><span className="eyebrow">GET STARTED</span><h2>Create your workspace</h2><p>Set up your free DISKAI account in a minute.</p></div>
          {submitted ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><h2>Welcome to DISKAI.</h2><p>Your workspace is ready. We&apos;ll take you there next.</p><Link href="/" className="auth-submit">Open dashboard <ArrowRight size={16} /></Link></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <label>Full name<input required placeholder="Alex Johnson" /></label>
            <label>Work email<input required type="email" placeholder="alex@yourcompany.com" /></label>
            <label>Password<div className="password-field"><input required minLength={8} type={showPassword ? 'text' : 'password'} placeholder="8+ characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
            <button className="auth-submit" type="submit">Create free workspace <ArrowRight size={16} /></button>
            <small className="terms">By creating an account, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</small>
          </form>}
          {!submitted && <p className="auth-switch">Already have an account? <Link href="/">Sign in</Link></p>}
        </section>
      </div>
    </main>
  )
}
