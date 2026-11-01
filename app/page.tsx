'use client'

import { FormEvent, useState } from 'react'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setStatus('success')
      setMessage(data.message)
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('We could not add you right now. Please try again.')
    }
  }

  return (
    <main className="waitlist-page">
      <div className="waitlist-orb waitlist-orb-one" aria-hidden="true" />
      <div className="waitlist-orb waitlist-orb-two" aria-hidden="true" />
      <nav className="waitlist-nav" aria-label="Main navigation">
        <a className="waitlist-brand" href="/" aria-label="DISKAI home">
          DISK<span>AI</span>
        </a>
        <span className="waitlist-nav-note">Built for the entertainment industry</span>
      </nav>

      <section className="waitlist-hero" aria-labelledby="waitlist-heading">
        <div className="waitlist-eyebrow"><span /> Private beta · 2026</div>
        <h1 id="waitlist-heading">The operating system for your <em>touring career.</em></h1>
        <p className="waitlist-copy">DISKAI brings your tours, releases, royalties, and opportunities into one clear command center. Join the private beta and be first in line.</p>
        <form className="waitlist-form" onSubmit={joinWaitlist}>
          <label className="sr-only" htmlFor="waitlist-email">Email address</label>
          <input id="waitlist-email" name="email" type="email" required autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} disabled={status === 'loading'} />
          <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Joining…' : 'Join the waitlist'} <span aria-hidden="true">↗</span></button>
        </form>
        <p className={`waitlist-message waitlist-message-${status}`} role={status === 'error' ? 'alert' : 'status'}>{message || 'No spam. Just early access and useful updates.'}</p>
      </section>

      <section className="waitlist-features" aria-label="DISKAI features">
        <article><span className="waitlist-number">01</span><h2>See the whole picture</h2><p>One home for every moving part of your career.</p></article>
        <article><span className="waitlist-number">02</span><h2>Move with intent</h2><p>Turn messy data into your next best decision.</p></article>
        <article><span className="waitlist-number">03</span><h2>Keep what you earn</h2><p>Stay on top of revenue, splits, and opportunities.</p></article>
      </section>

      <footer className="waitlist-footer"><span>© 2026 DISKAI</span><span>Independent artists, amplified.</span></footer>
    </main>
  )
}
