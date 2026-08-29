'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, Hexagon, Sparkles } from 'lucide-react'

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <main className="waitlist-page">
      <nav className="waitlist-nav" aria-label="Main navigation">
        <Link href="/" className="brand waitlist-brand">
          <span className="brand-mark" aria-hidden="true"><Hexagon size={17} strokeWidth={2.6} /><i /></span>
          <span><b>DISKAI</b><small>Tour Operating System</small></span>
        </Link>
        <Link href="/" className="waitlist-login">Already have an account <ChevronRight size={15} /></Link>
      </nav>

      <section className="waitlist-hero">
        <div className="waitlist-copy">
          <p className="eyebrow"><Sparkles size={14} /> Early access · 2024</p>
          <h1>The next era of touring is <em>intelligent.</em></h1>
          <p className="waitlist-subtitle">DISKAI gives artists and their teams a calmer, clearer way to build profitable tours. Join the private beta and be first in line.</p>
          {submitted ? (
            <div className="waitlist-success"><span><Check size={17} /></span><div><strong>You&apos;re on the list.</strong><p>We&apos;ll reach out at {email} with your private access invite.</p></div></div>
          ) : (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input id="waitlist-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your best email address" />
              <button type="submit">Join the waitlist <ArrowRight size={16} /></button>
            </form>
          )}
          <p className="waitlist-note">No spam. Just a thoughtful invite when your seat is ready.</p>
        </div>
        <div className="waitlist-preview" aria-label="DISKAI product preview">
          <div className="preview-window"><div className="preview-top"><span /><span /><span /><b>DISKAI / TOUR OS</b></div><div className="preview-body"><div className="preview-sidebar"><i /><i /><i /><i /><i /></div><div className="preview-main"><small>THURSDAY, SEPTEMBER 12, 2024</small><h2>Good morning, Alex</h2><div className="preview-stats"><span><b>3</b> Active tours</span><span><b>18</b> Confirmed shows</span><span><b>$42.8K</b> Revenue</span></div><div className="preview-route"><div><small>AI ROUTE OPTIMIZATION</small><strong>Your September route</strong></div><div className="route-cities"><b>NYC</b><i /> <b>BOS</b><i /> <b>CHI</b><i /> <b>PHL</b></div></div></div></div></div>
          <div className="preview-caption"><span className="status"><i /> AI-powered tour intelligence</span><b>Built for the people who move culture.</b></div>
        </div>
      </section>
      <footer className="waitlist-footer"><span>DISKAI © 2024</span><span>Made for artists, managers, and the road ahead.</span></footer>
    </main>
  )
}
