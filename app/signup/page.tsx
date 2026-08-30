'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Hexagon, Sparkles } from 'lucide-react'

const roles = ['Artist', 'Comedian', 'Manager', 'Creator', 'Agency', 'Other']

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="auth-shell">
      <div className="auth-brand"><span className="brand-mark"><Hexagon size={20} strokeWidth={2.5} /><i /></span><strong>DISKAI</strong><span>Tour Operating System</span></div>
      <div className="auth-grid">
        <section className="auth-intro">
          <div className="auth-kicker"><Sparkles size={15} /> Built for the next era of touring</div>
          <h1>Make every show <em>count.</em></h1>
          <p>One beautiful workspace for the artists, managers, and teams moving live music forward.</p>
          <div className="auth-note"><span className="mini-avatars"><i>AJ</i><i>MR</i><i>+</i></span><span>Join other touring professionals getting early access.</span></div>
        </section>
        <section className="auth-card">
          <div className="auth-card-head"><span className="eyebrow">GET EARLY ACCESS</span><h2>Join the DISKAI waitlist.</h2><p>Be first to experience a calmer, smarter way to run your tour.</p></div>
          {submitted ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><h2>You&apos;re on the list.</h2><p>We&apos;ll contact you when DISKAI is ready for early access.</p><Link href="/" className="auth-submit">Explore DISKAI <ArrowRight size={16} /></Link></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <label>Full name<input required placeholder="Alex Johnson" /></label>
            <label>Email address<input required type="email" placeholder="alex@yourcompany.com" /></label>
            <label>What do you do? <span className="optional">Optional</span><select defaultValue=""><option value="" disabled>Select your role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
            <button className="auth-submit" type="submit">Join the waitlist <ArrowRight size={16} /></button>
            <small className="terms">Join other touring professionals getting early access.</small>
          </form>}
        </section>
      </div>
    </main>
  )
}
