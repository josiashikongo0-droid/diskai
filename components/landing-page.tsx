'use client'

import { FormEvent, useState } from 'react'

const audiences = [
  ['01', 'Independent artists', 'Keep your creative work, touring plans, and next opportunities moving from one clear home.'],
  ['02', 'Musicians & bands', 'Connect releases, rehearsals, bookings, touring and revenue without adding more noise.'],
  ['03', 'Comedians & performers', 'Build a repeatable operating rhythm around shows, relationships and the work behind the scenes.'],
  ['04', 'Tour managers', 'Coordinate routing, travel, advancing, settlement and the details that make a tour move.'],
  ['05', 'Event organisers', 'Create a sharper view of events, talent, timelines and the people making it happen.'],
  ['06', 'Promoters & venues', 'Build better event relationships and keep every moving part visible.'],
  ['07', 'Agencies & managers', 'Bring the moving parts of a roster into a system your whole team can understand.'],
  ['08', 'Service providers', 'Make your expertise easier to discover, manage and connect to the right opportunities.'],
  ['09', 'Partners & sponsors', 'Find clearer ways to support the people and projects shaping entertainment.'],
  ['10', 'The wider industry', 'If entertainment is your work, DISKAI is being shaped with your reality in mind.'],
]

const faqs = [
  ['What is DISKAI?', 'DISKAI is an AI-powered operating system designed for the entertainment industry. It aims to bring career management, touring, events, opportunities and entertainment business tools together in one intelligent platform.'],
  ['Who is DISKAI for?', 'DISKAI is being developed for independent artists, musicians, comedians, performers, tour managers, event organisers, promoters, entertainment agencies and other professionals working in the entertainment industry.'],
  ['Is it free to join the waitlist?', 'Yes. Joining the DISKAI waitlist is completely free. You can register to receive updates and information about early access opportunities.'],
  ['When will early access begin?', 'DISKAI is currently being developed. Early access announcements will be communicated to waitlist members as features become ready for testing. Join the waitlist to stay informed.'],
  ['What features are planned?', 'DISKAI aims to provide an interconnected ecosystem that includes artist and career management, tour management, event operations, revenue insights, professional opportunities and AI-powered tools. Features will be introduced as development progresses.'],
  ['How can I become a founding ambassador?', 'Join the DISKAI waitlist and express your interest in becoming a founding ambassador. Ambassadors will help introduce DISKAI to entertainment professionals, share feedback and contribute to building the community. Invitations will depend on the programme\'s availability and eligibility criteria.'],
]

const professionalCategories = ['Artist / musician', 'Comedian / performer', 'Tour manager', 'Event organiser', 'Promoter', 'Agency / manager', 'Service provider', 'Other']

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [referralUrl, setReferralUrl] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const referral = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('ref') : null
      const response = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, category, country, referral }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setStatus('success')
      setMessage(data.message)
      if (data.referralCode && typeof window !== 'undefined') setReferralUrl(`${window.location.origin}?ref=${data.referralCode}`)
      setEmail('')
      setCategory('')
      setCountry('')
    } catch {
      setStatus('error')
      setMessage('We could not add you right now. Please try again.')
    }
  }

  return (
    <div className={`landing-form-wrap ${compact ? 'landing-form-wrap-compact' : ''}`}>
      <form className="landing-form" onSubmit={submit}>
        <label className="sr-only" htmlFor={compact ? 'waitlist-email-footer' : 'waitlist-email'}>Email address</label>
        <input id={compact ? 'waitlist-email-footer' : 'waitlist-email'} name="email" type="email" required autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} disabled={status === 'loading'} />
        <div className="landing-form-fields"><label><span>What best describes you?</span><select value={category} onChange={(event) => setCategory(event.target.value)} disabled={status === 'loading'}><option value="">Select your role (optional)</option>{professionalCategories.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label><span>Where are you based?</span><input type="text" placeholder="Country (optional)" value={country} onChange={(event) => setCountry(event.target.value)} disabled={status === 'loading'} /></label></div>
        <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Joining…' : 'Join the waitlist'} <span aria-hidden="true">↗</span></button>
      </form>
      <p className={`landing-form-message landing-form-message-${status}`} role={status === 'error' ? 'alert' : 'status'}>{message || 'Free to join · Confirmation email included'}</p>{referralUrl && <div className="referral-share"><span>Your personal referral link</span><button type="button" onClick={() => navigator.clipboard?.writeText(referralUrl)}>Copy link</button></div>}
    </div>
  )
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Preview of the DISKAI platform">
      <div className="product-preview-top"><span className="product-preview-brand">DISKAI / COMMAND</span><span className="product-preview-status"><i /> Private beta concept</span></div>
      <div className="product-preview-grid">
        <div className="product-preview-side"><span className="preview-side-active">Overview</span><span>Touring</span><span>Opportunities</span><span>Revenue</span></div>
        <div className="product-preview-main">
          <div className="preview-welcome"><span>Tuesday, 04 March</span><strong>Your next move, in view.</strong></div>
          <div className="preview-metrics"><div><small>Next show</small><b>Windhoek / 14 MAR</b></div><div><small>Open opportunities</small><b>08</b></div><div><small>Projected revenue</small><b>R 84.2k</b></div></div>
          <div className="preview-chart"><div className="preview-chart-label"><span>Tour momentum</span><small>Last 30 days ↗</small></div><div className="preview-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="landing-page">
      <div className="landing-glow landing-glow-coral" aria-hidden="true" />
      <div className="landing-glow landing-glow-mint" aria-hidden="true" />
      <header className="landing-nav-wrap">
        <nav className="landing-nav" aria-label="Main navigation">
          <a className="landing-brand" href="#top" aria-label="DISKAI home">DISK<span>AI</span></a>
          <div className="landing-links"><a href="#platform">Platform</a><a href="#community">Community</a><a href="#faq">FAQ</a></div>
          <a className="landing-nav-cta" href="#join">Join waitlist <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="landing-hero section-shell" id="top" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="landing-kicker"><span /> Private beta · Namibia to the world</div>
          <h1 id="hero-heading">Your Entire Entertainment Career. <em>One Operating System.</em></h1>
          <p>From touring and career management to events, opportunities and revenue insights, DISKAI brings the entertainment industry together in one intelligent platform.</p>
          <WaitlistForm />
          <div className="hero-trust"><span className="hero-trust-mark">◎</span><span>Join for free. Get product updates and early access opportunities.</span></div>
        </div>
        <div className="hero-visual"><div className="hero-visual-label">A clearer view of what comes next</div><ProductPreview /></div>
      </section>

      <section className="problem-section" aria-labelledby="problem-heading"><div className="section-shell problem-grid"><div className="problem-copy"><div className="landing-kicker"><span /> The problem</div><h2 id="problem-heading">Entertainment is growing.<br /><em>Its infrastructure isn&apos;t.</em></h2><p>The entertainment industry is full of talent, but the systems supporting it are often disconnected, outdated, and difficult to navigate.</p></div><div className="problem-list"><div><span>01</span><b>Too many disconnected tools</b><p>Different platforms for bookings, touring, money, and relationships.</p></div><div><span>02</span><b>Too much manual work</b><p>Important decisions still live in spreadsheets, inboxes, and memory.</p></div><div><span>03</span><b>Too little visibility</b><p>It&apos;s hard to see the whole picture when every part of the career is somewhere else.</p></div></div></div></section>

      <section className="section-shell platform-section" id="platform" aria-labelledby="platform-heading">
        <div className="section-intro"><div className="landing-kicker"><span /> One intelligent platform</div><h2 id="platform-heading">Everything you need.<br /><em>One connected view.</em></h2></div>
        <div className="platform-grid"><article><span>01</span><h3>Career dashboard</h3><p>See your work, relationships, next steps, and signals in one place.</p></article><article><span>02</span><h3>Tour & event operations</h3><p>Make the details behind every show easier to plan, track, and improve.</p></article><article><span>03</span><h3>Revenue insights</h3><p>Build a clearer picture of what is coming in, what is owed, and what is next.</p></article><article><span>04</span><h3>Opportunities & growth</h3><p>Turn the right opportunities into considered, actionable moves.</p></article><article className="platform-wide"><span>05</span><div><h3>AI-powered assistance</h3><p>A thoughtful layer of intelligence for the work that keeps your career moving. Planned capabilities will be introduced as development progresses.</p></div><b aria-hidden="true">↗</b></article></div><div className="demo-strip"><div className="demo-play" aria-hidden="true">▶</div><div><span>Product demonstration · coming soon</span><h3>See how DISKAI brings the work together.</h3><p>This preview will be replaced with a real product demonstration as the platform is ready to share.</p></div></div>
      </section>

      <section className="ecosystem-section" aria-labelledby="ecosystem-heading"><div className="section-shell ecosystem-grid"><div className="ecosystem-orbit" aria-hidden="true"><span className="orbit-core">DISKAI</span><i /><i /><i /><i /><b>People</b><b>Services</b><b>Opportunities</b><b>Technology</b></div><div><div className="landing-kicker"><span /> The DISKAI ecosystem</div><h2 id="ecosystem-heading">One platform.<br /><em>An entire ecosystem.</em></h2><p>DISKAI is designed to bring the people, tools, services and opportunities of entertainment into one connected experience.</p><p>Artists and entertainment professionals should not have to navigate their careers alone. DISKAI aims to connect them with a global network of verified agents, service providers, partners and opportunities.</p><a className="text-cta" href="#join">Join the ecosystem <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="agent-section"><div className="section-shell agent-grid"><div><div className="landing-kicker"><span /> A global network</div><h2>The technology is only half the story.</h2><p>DISKAI is being built alongside the people who make entertainment happen: agents, service providers, partners, venues and organisers across the world.</p></div><div className="agent-pillars"><span>Agents</span><span>Service providers</span><span>Partners</span><span>Opportunities</span><span>Venues</span><span>Organisers</span></div></div></section>

      <section className="audience-section" id="community" aria-labelledby="audience-heading"><div className="section-shell"><div className="section-intro section-intro-light"><div className="landing-kicker"><span /> Built for the entertainment industry</div><h2 id="audience-heading">Built for every<br /><em>side of entertainment.</em></h2><p>Different roles. Different pressures. One ecosystem being shaped around the people doing the work.</p></div><div className="audience-grid">{audiences.map(([number, title, copy]) => <article key={number} className="audience-card"><span>{number}</span><h3>{title}</h3><p>{copy}</p><b aria-hidden="true">↗</b></article>)}</div><a className="text-cta text-cta-light" href="#join">Find your place in DISKAI <span aria-hidden="true">↗</span></a></div></section>

      <section className="section-shell how-section" aria-labelledby="how-heading"><div className="section-intro"><div className="landing-kicker"><span /> How it works</div><h2 id="how-heading">Less scattered.<br /><em>More in control.</em></h2></div><div className="how-grid"><article><strong>01</strong><h3>Create your profile</h3><p>Tell DISKAI what you do, where you work and what you are building toward.</p></article><article><strong>02</strong><h3>Connect your work</h3><p>Bring your projects, shows, opportunities, relationships and operating details into view.</p></article><article><strong>03</strong><h3>Access your tools</h3><p>Use intelligent workflows and connected services to make the work behind your career clearer.</p></article><article><strong>04</strong><h3>Grow your career</h3><p>Move with better context, stronger relationships and a system designed to scale with you.</p></article></div></section>

      <section className="founding-section" aria-labelledby="founding-heading"><div className="section-shell founding-grid"><div><div className="landing-kicker"><span /> Founding Circle</div><h2 id="founding-heading">Help shape what<br /><em>comes next.</em></h2><p>Early supporters will have a closer view of the journey and opportunities to share feedback as DISKAI develops. The programme is designed to recognise meaningful community participation, without promising access or rewards before eligibility is confirmed.</p><a className="text-cta" href="#join">Join the Founding Circle <span aria-hidden="true">↗</span></a></div><div className="reward-list"><div><span>01</span><b>Founding Circle recognition</b><small>1 verified referral</small></div><div><span>02</span><b>Founding Supporter badge</b><small>3 verified referrals</small></div><div><span>03</span><b>Priority beta consideration</b><small>5 verified referrals</small></div><div><span>04</span><b>DISKAI Ambassador status</b><small>10 verified referrals</small></div><div><span>05</span><b>Product feedback sessions</b><small>25 verified referrals</small></div><div><span>06</span><b>Founding Ambassador recognition</b><small>50 verified referrals</small></div></div></div></section>

      <section className="story-section section-shell" aria-labelledby="story-heading"><div className="story-photo" aria-label="Founder photo placeholder"><span>Founder story<br />coming soon</span></div><div className="story-copy"><div className="landing-kicker"><span /> The founders</div><h2 id="story-heading">Two Young Founders.<br /><em>One Global Vision.</em></h2><p>DISKAI was founded by two 17-year-old entrepreneurs from Namibia with an ambitious vision: to transform how the global entertainment industry operates.</p><p>We believe entertainment professionals deserve more than disconnected tools and complicated business processes.</p><p>Artists, musicians, comedians, tour managers and event organisers need a connected ecosystem that supports their careers, bookings, touring, travel and business operations.</p><p>That&apos;s why we&apos;re building DISKAI: an AI-powered entertainment operating system that combines intelligent technology with a global network of agents and service providers.</p><p>Our ambition goes beyond building another entertainment application. We want to create infrastructure that connects the people, opportunities, services and technology powering the entertainment industry.</p><p>We&apos;re starting from Namibia, but our vision is worldwide.</p><p className="story-signoff">DISKAI — Connecting the world of entertainment.</p><a className="text-cta" href="#join">Be part of the journey <span aria-hidden="true">↗</span></a></div></section>

      <section className="beta-section" aria-labelledby="beta-heading"><div className="section-shell beta-inner"><div className="landing-kicker"><span /> Private beta</div><h2 id="beta-heading">Get early access to<br /><em>the future of entertainment.</em></h2><p>Join for free to receive product updates. Selected early users may be invited to test available features and help shape development as the platform grows.</p><a className="button button-light" href="#join">Reserve your place <span aria-hidden="true">↗</span></a></div></section>

      <section className="future-section"><div className="section-shell future-grid"><div><div className="landing-kicker"><span /> The future of entertainment</div><h2>More than an app.<br /><em>Infrastructure.</em></h2></div><div><p>We are not building another disconnected entertainment application. We are building the infrastructure that connects the people, opportunities, services and technology powering the industry.</p><p>Our ambition is global. Our starting point is Namibia. The next chapter is being built with the people who believe entertainment deserves better systems.</p><a className="text-cta" href="#join">Help build what&apos;s next <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="faq-section section-shell" id="faq" aria-labelledby="faq-heading"><div className="section-intro"><div className="landing-kicker"><span /> Questions, answered</div><h2 id="faq-heading">The details matter.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b aria-hidden="true">+</b></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>

      <section className="final-cta section-shell" id="join" aria-labelledby="join-heading"><div className="landing-kicker"><span /> Your next chapter</div><h2 id="join-heading">Put your career<br /><em>in motion.</em></h2><WaitlistForm compact /></section>

      <footer className="landing-footer"><div className="section-shell footer-inner"><div><a className="landing-brand" href="#top">DISK<span>AI</span></a><p>Independent careers, amplified.</p></div><div className="footer-links"><a href="#platform">Platform</a><a href="#community">Community</a><a href="#faq">FAQ</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><div className="footer-note">© 2026 DISKAI<br />Namibia · Global vision</div></div></footer>
    </main>
  )
}
