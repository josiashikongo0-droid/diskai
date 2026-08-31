"use client"

import { useMemo, useState } from "react"
import { BarChart3, Bot, Building2, CalendarDays, ChevronRight, CircleCheck, LayoutDashboard, Menu, Plus, Search, Sparkles, Ticket, Users, X } from "lucide-react"

const nav = [
  ["Overview", LayoutDashboard], ["Tour Planner", CalendarDays], ["Venue Intelligence", Building2], ["Booking CRM", Ticket], ["AI Agents", Bot],
] as const
const venues = [
  { name: "The Roundhouse", city: "London, UK", fit: 94, capacity: "3,300", status: "Verified" },
  { name: "Melkweg", city: "Amsterdam, NL", fit: 91, capacity: "1,500", status: "Verified" },
  { name: "Paradiso", city: "Amsterdam, NL", fit: 88, capacity: "1,500", status: "Verified" },
]
const deals = [
  { name: "The Roundhouse", city: "London", value: "$18,500", stage: "Offer sent" },
  { name: "Gothic Theatre", city: "Denver", value: "$7,200", stage: "Negotiating" },
  { name: "Le Trianon", city: "Paris", value: "$11,000", stage: "New lead" },
]

export default function AppWorkspace() {
  const [active, setActive] = useState("Overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [generated, setGenerated] = useState(false)
  const filteredVenues = useMemo(() => venues.filter((venue) => `${venue.name} ${venue.city}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="workspace-shell">
    <aside className={mobileOpen ? "workspace-sidebar open" : "workspace-sidebar"}>
      <div className="workspace-logo"><span className="workspace-mark"><i /></span><strong>DISKAI</strong><small>TOUR OPERATING SYSTEM</small></div>
      <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X /></button>
      <p className="workspace-label">Workspace</p><div className="workspace-switcher">Alex Morgan <ChevronRight size={14} /></div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? "active" : ""} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon size={16} />{label}</button>)}</nav>
      <div className="workspace-sidebar-foot"><div className="workspace-avatar">AM</div><div><b>Alex Morgan</b><span>Artist manager</span></div></div>
    </aside>
    {mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <main className="workspace-main">
      <header className="workspace-topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button><div className="workspace-breadcrumb">DISKAI <span>/</span> {active}</div><div className="workspace-top-actions"><button className="workspace-icon-button" aria-label="Search"><Search size={17} /></button><button className="workspace-new" onClick={() => setActive("Tour Planner")}><Plus size={15} /> New tour</button></div></header>
      {active === "Overview" && <Overview setActive={setActive} />}
      {active === "Tour Planner" && <Planner generated={generated} setGenerated={setGenerated} />}
      {active === "Venue Intelligence" && <VenueView query={query} setQuery={setQuery} venues={filteredVenues} />}
      {active === "Booking CRM" && <Crm />}
      {active === "AI Agents" && <Agents />}
    </main>
  </div>
}

function Overview({ setActive }: { setActive: (value: string) => void }) { return <section className="workspace-content"><div className="workspace-hero"><div><p className="workspace-eyebrow">MONDAY, SEPTEMBER 1, 2026</p><h1>Good morning, Alex.</h1><p>Here&apos;s what&apos;s moving across your touring business.</p></div><button className="workspace-outline" onClick={() => setActive("Tour Planner")}>Plan a new tour <ChevronRight size={15} /></button></div><div className="metric-grid">{[["Active tours", "3", "+1 this month"], ["Confirmed shows", "18", "+4 this month"], ["Projected revenue", "$142k", "+18.2%"], ["Open opportunities", "27", "8 need attention"]].map(([label, value, detail]) => <div className="metric-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</div><div className="workspace-two-col"><section className="workspace-panel"><div className="panel-heading"><div><p className="workspace-eyebrow">CURRENT TOUR</p><h2>North American Fall Run</h2></div><span className="status-pill"><CircleCheck size={13} /> On track</span></div><div className="route-strip"><div><b>18</b><span>shows</span></div><div><b>12,480</b><span>miles</span></div><div><b>86%</b><span>sell-through</span></div><div><b>+18%</b><span>vs. last tour</span></div></div><div className="progress-line"><span /></div><div className="panel-footer"><span>Next show: The Fillmore · San Francisco · Sep 12</span><button onClick={() => setActive("Tour Planner")}>View tour <ChevronRight size={14} /></button></div></section><section className="workspace-panel agent-summary"><div className="panel-heading"><div><p className="workspace-eyebrow">AI ACTIVITY</p><h2>Working for you</h2></div><Sparkles size={18} /></div>{["Optimizing your September route", "Checking 14 venue availabilities", "Drafting 3 booking follow-ups"].map((text, i) => <div className="activity-row" key={text}><span className={i === 0 ? "activity-dot live" : "activity-dot"} /><span>{text}</span><small>{i === 0 ? "Now" : `${i + 1}m`}</small></div>)}</section></div></section> }

function Planner({ generated, setGenerated }: { generated: boolean, setGenerated: (value: boolean) => void }) { return <section className="workspace-content"><div className="workspace-hero"><div><p className="workspace-eyebrow">TOUR PLANNER · AI WORKSPACE</p><h1>Turn a blank calendar into a smart route.</h1><p>Tell DISKAI what you&apos;re building. It&apos;ll handle the logistics, routing, and venue fit.</p></div></div><div className="planner-layout"><section className="workspace-panel planner-form"><label>Tour name<input defaultValue="September Headline Run" /></label><div className="form-row"><label>Start date<input type="date" defaultValue="2026-09-04" /></label><label>End date<input type="date" defaultValue="2026-09-27" /></label></div><label>Markets to consider<input defaultValue="San Francisco, Los Angeles, Austin, Chicago, New York" /></label><label>What matters most?<textarea defaultValue="Prioritize strong venue fit, efficient routing, and healthy margins." /></label><button className="workspace-primary" onClick={() => setGenerated(true)}><Sparkles size={16} /> Generate with DISKAI</button></section>{generated ? <section className="workspace-panel planner-result"><div className="planner-result-head"><div><p className="workspace-eyebrow">RECOMMENDED ROUTE</p><h2>September Headline Run</h2></div><span className="status-pill"><CircleCheck size={13} /> 92% fit</span></div><p className="planner-reason">DISKAI found a 9-show route that saves 1,840 miles and improves projected margin by 12%.</p>{["San Francisco · Sep 4", "Los Angeles · Sep 6", "Austin · Sep 12", "Chicago · Sep 18", "New York · Sep 25"].map((stop, i) => <div className="route-stop" key={stop}><span>{String(i + 1).padStart(2, "0")}</span><b>{stop}</b><small>{i % 2 ? "Venue match 88%" : "Venue match 94%"}</small></div>)}<button className="workspace-outline">Save route <ChevronRight size={15} /></button></section> : <section className="workspace-panel planner-empty"><Sparkles size={26} /><h2>Your route, intelligently assembled.</h2><p>DISKAI will weigh geography, venue fit, availability, and margins to give you a route worth acting on.</p></section>}</div></section> }

function VenueView({ query, setQuery, venues }: { query: string, setQuery: (value: string) => void, venues: typeof venues }) { return <section className="workspace-content"><div className="workspace-hero"><div><p className="workspace-eyebrow">VENUE INTELLIGENCE</p><h1>Find the rooms that fit.</h1><p>Verified venue data, fit scores, and actionable recommendations in one place.</p></div></div><div className="venue-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search venues or cities..." /></div><button className="filter-button">Capacity <ChevronRight size={14} /></button><button className="filter-button">Fit score <ChevronRight size={14} /></button></div><div className="venue-list">{venues.map((venue) => <div className="venue-row" key={venue.name}><div className="venue-icon"><Building2 size={18} /></div><div className="venue-name"><b>{venue.name}</b><span>{venue.city} · {venue.capacity} capacity</span></div><span className="verified"><CircleCheck size={13} /> {venue.status}</span><div className="fit-score"><strong>{venue.fit}%</strong><span>fit score</span></div><button className="row-arrow" aria-label={`View ${venue.name}`}><ChevronRight /></button></div>)}</div></section> }

function Crm() { return <section className="workspace-content"><div className="workspace-hero"><div><p className="workspace-eyebrow">BOOKING CRM</p><h1>Keep every opportunity moving.</h1><p>A clear view of the conversations, offers, and shows that make your tour happen.</p></div><button className="workspace-primary"><Plus size={15} /> Add opportunity</button></div><div className="kanban">{["New leads", "Negotiating", "Offer sent", "Confirmed"].map((stage) => <div className="kanban-column" key={stage}><div className="kanban-heading"><b>{stage}</b><span>{deals.filter((deal) => deal.stage === stage).length}</span></div>{deals.filter((deal) => deal.stage === stage).map((deal) => <div className="deal-card" key={deal.name}><b>{deal.name}</b><span>{deal.city}</span><strong>{deal.value}</strong><small>Updated today</small></div>)}{!deals.some((deal) => deal.stage === stage) && <div className="kanban-empty">Drop opportunities here</div>}</div>)}</div></section> }

function Agents() { return <section className="workspace-content"><div className="workspace-hero"><div><p className="workspace-eyebrow">INTELLIGENCE LAYER</p><h1>DISKAI is already working.</h1><p>See the decisions being made and the work happening behind every recommendation.</p></div></div><div className="agent-cards">{[["Route Optimizer", "Comparing 24 possible routing combinations", "12 markets analyzed", "live"], ["Venue Scout", "Checking availability with your priority venues", "14 venues checked", "working"], ["Booking Copilot", "Drafting thoughtful follow-ups for open offers", "3 drafts ready", "ready"]].map(([name, task, detail, state]) => <div className="workspace-panel agent-card" key={name}><div className="agent-card-top"><span className="agent-orb"><Bot size={18} /></span><span className={`agent-state ${state}`}>{state}</span></div><h2>{name}</h2><p>{task}</p><div className="agent-card-foot"><span>{detail}</span><ChevronRight size={15} /></div></div>)}</div></section> }
