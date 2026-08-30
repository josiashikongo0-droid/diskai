'use client'

import { useState } from 'react'
import { ArrowRight, Check, Hexagon } from 'lucide-react'

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="waitlist-page">
      <header className="waitlist-nav">
        <div className="waitlist-brand">
          <span className="waitlist-logo"><Hexagon size={14} strokeWidth={2.8} /><i /></span>
          <div><strong>DISKAI</strong><small>Tour Operating System</small></div>
        </div>
      </header>

      <section className="waitlist-content">
        <div className="waitlist-copy">
          <p className="waitlist-kicker">✣ &nbsp; Early access · 2026</p>
          <h1>The next era of<br />touring is<br /><em>intelligent.</em></h1>
          <p className="waitlist-description">DISKAI gives artists and their teams a calmer, clearer way to build profitable tours. Join the private beta and be first in line.</p>

          <div className="waitlist-form-wrap">
            {submitted ? (
              <div className="waitlist-success"><Check size={16} /><span>You&apos;re on the list. We&apos;ll be in touch.</span></div>
            ) : (
              <form className="waitlist-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
                <label className="sr-only" htmlFor="email">Your email address</label>
                <input id="email" type="email" required placeholder="Your email address" />
                <button type="submit">Join the waitlist <ArrowRight size={15} /></button>
              </form>
            )}
            <p className="waitlist-note">No spam. Just a thoughtful invite when your seat is ready.</p>
          </div>
        </div>

        <div className="waitlist-preview" aria-hidden="true">
          <div className="preview-window">
            <div className="preview-chrome"><span /><span /><span /><small>DISKAI / TOUR OS</small></div>
            <div className="preview-body"><aside><b>—</b><i /><i /><i /><i /></aside><article><small>THURSDAY, SEPTEMBER 12, 2026</small><h2>Good morning, Alex</h2><div className="preview-rule" /><strong>3</strong><small>Active tours</small></article></div>
          </div>
        </div>
      </section>
    </main>
  )
}
