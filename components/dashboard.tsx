'use client'

import { useMemo, useState } from 'react'
import {
  Activity, ArrowUpRight, BarChart3, Bell, Bot, CalendarDays, Check, ChevronDown, CircleHelp, DollarSign,
  FileText, Filter, LayoutDashboard, MapPin, Menu, MessageSquare, MoreHorizontal, Package, PanelLeftClose,
  Plus, Search, Send, Settings, Sparkles, Target, TrendingUp, Users, Wallet, X, Zap, Hexagon,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const navItems = [
  ['Overview', LayoutDashboard], ['Tours', MapPin], ['Venues', Target], ['Bookings', FileText],
  ['Calendar', CalendarDays], ['Finances', Wallet], ['Marketing', Send], ['AI Agents', Bot], ['Analytics', BarChart3],
] as const
const shows = [
  { date: 'SEP 12', city: 'New York', venue: 'The Comedy Cellar', status: 'Confirmed', revenue: '$3,200', color: 'cyan' },
  { date: 'SEP 15', city: 'Boston', venue: 'Laugh Boston', status: 'Confirmed', revenue: '$2,800', color: 'cyan' },
  { date: 'SEP 18', city: 'Chicago', venue: 'The Lincoln Lodge', status: 'Pending', revenue: '$2,400', color: 'amber' },
  { date: 'SEP 21', city: 'Philadelphia', venue: 'Helium Comedy Club', status: 'Negotiating', revenue: '$2,650', color: 'violet' },
]
const agents = [
  ['Booking Agent', 'Researches venues, drafts outreach, and manages follow-ups.', '18 tasks completed', 'Search'],
  ['Route Agent', 'Optimizes city and date sequences around your constraints.', '6 routes analyzed', 'Route'],
  ['Finance Agent', 'Forecasts revenue, expenses, and tour profitability.', '42 forecasts run', 'Forecast'],
  ['Travel Agent', 'Assists with transportation and accommodation planning.', '12 plans created', 'Plan'],
  ['Marketing Agent', 'Creates promotional calendars and campaign ideas.', '8 campaigns drafted', 'Draft'],
  ['Operations Agent', 'Maintains the master timeline and flags conflicts.', '3 conflicts flagged', 'Monitor'],
]

function Status({ children, tone = 'cyan' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status status-${tone}`}><i />{children}</span>
}
function StatCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: any }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><Icon size={16} /></div><strong>{value}</strong><small><TrendingUp size={13} /> {delta}</small></div>
}
function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="section-title"><div><h2>{title}</h2><span>Updated just now</span></div>{action && <button className="text-button">{action} <ArrowUpRight size={14} /></button>}</div>
}
function MiniChart() {
  const points = '0,96 46,82 92,88 138,54 184,62 230,35 276,46 322,20 368,28 414,8'
  return <div className="chart-wrap"><svg viewBox="0 0 420 120" preserveAspectRatio="none" aria-label="Revenue trend chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5de1d0" stopOpacity=".24"/><stop offset="1" stopColor="#5de1d0" stopOpacity="0"/></linearGradient></defs><path d={`M ${points} L 414,120 L 0,120 Z`} fill="url(#fill)"/><polyline points={points} fill="none" stroke="#5de1d0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg><div className="chart-labels"><span>Aug 01</span><span>Aug 15</span><span>Sep 01</span><span>Sep 15</span><span>Oct 01</span></div></div>
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [sidebar, setSidebar] = useState(true)
  const [assistant, setAssistant] = useState(false)
  const [query, setQuery] = useState('')
  const [generated, setGenerated] = useState(false)
  const filteredShows = useMemo(() => shows.filter((s) => `${s.city} ${s.venue}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="app-shell">
    <aside className={`sidebar ${sidebar ? '' : 'collapsed'}`}>
      <div className="brand"><div className="brand-mark" aria-label="DISKAI logo"><Hexagon size={17} strokeWidth={2.6} /><i /></div><div><b>DISKAI</b><small>Tour Operating System</small></div></div>
      <button className="new-tour" onClick={() => setGenerated(true)}><Plus size={16} /> New Tour</button>
      <nav>{navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon size={17} /><span>{label}</span>{label === 'AI Agents' && <em>6</em>}</button>)}</nav>
      <div className="sidebar-bottom"><button><CircleHelp size={17} /> <span>Help center</span></button><button><Settings size={17} /> <span>Settings</span></button><div className="profile"><div className="avatar">AJ</div><div><b>Alex Johnson</b><small>Pro account</small></div><button aria-label="Sign out" onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => window.location.assign('/signin') } })}><MoreHorizontal size={16} /></button></div></div>
    </aside>
    <main className="workspace">
      <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setSidebar(!sidebar)} aria-label="Toggle menu"><Menu size={19} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronDown size={14} /><b>{active}</b></div><div className="top-actions"><label className="search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search anything" /><kbd>⌘ K</kbd></label><button className="icon-button"><Bell size={18} /><i className="notification-dot" /></button><div className="avatar">AJ</div></div></header>
      <div className="page-content">
        {active === 'Overview' ? <>
          <div className="welcome-row"><div><p className="eyebrow">THURSDAY, SEPTEMBER 12, 2024</p><h1>Good morning, Alex</h1><p className="subtitle">Here&apos;s what&apos;s happening across your tours.</p></div><button className="outline-button" onClick={() => setAssistant(true)}><Sparkles size={16} /> Ask DISKAI</button></div>
          <div className="stats-grid"><StatCard label="Active tours" value="3" delta="1 this month" icon={MapPin} /><StatCard label="Confirmed shows" value="18" delta="4 this month" icon={CalendarDays} /><StatCard label="Projected revenue" value="$42,800" delta="12.4% vs. last tour" icon={DollarSign} /><StatCard label="Projected profit" value="$18,420" delta="43.0% margin" icon={TrendingUp} /></div>
          <div className="dashboard-grid"><section className="tour-card panel"><SectionTitle title="Current tour" action="View tour" /><div className="tour-heading"><div><div className="title-with-status"><h3>Summer Comedy Run</h3><Status>Active</Status></div><p>Alex Johnson Comedy · North America</p></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="tour-metrics"><div><b>18</b><span>shows</span></div><div><b>7</b><span>cities</span></div><div><b>$42.8K</b><span>revenue</span></div><div><b>$18.4K</b><span>profit</span></div></div><div className="progress-meta"><span>Tour progress</span><b>61%</b></div><div className="progress"><i style={{ width: '61%' }} /></div><div className="next-show"><div className="date-tile"><b>12</b><span>SEP</span></div><div><small>NEXT SHOW · IN 2 DAYS</small><strong>The Comedy Cellar</strong><span>New York, NY · 8:00 PM</span></div><ArrowUpRight size={17} /></div></section>
          <section className="panel shows-card"><SectionTitle title="Upcoming shows" action="View calendar" /><div className="show-list">{filteredShows.map((show) => <div className="show-row" key={show.venue}><div className="show-date"><b>{show.date.split(' ')[1]}</b><span>{show.date.split(' ')[0]}</span></div><div className="show-info"><strong>{show.venue}</strong><span>{show.city}</span></div><Status tone={show.color}>{show.status}</Status><b className="revenue">{show.revenue}</b><MoreHorizontal size={16} className="row-more" /></div>)}</div></section></div>
          <div className="lower-grid"><section className="panel intelligence"><div className="intel-head"><div className="ai-icon"><Sparkles size={17} /></div><div><h2>DISKAI Intelligence</h2><span>3 recommendations for your tour</span></div><button className="icon-button"><MoreHorizontal size={17} /></button></div>{['Boston → Chicago creates a 7-hour travel gap. Consider moving Chicago to Sep 17.','3 venues haven\'t responded to your outreach. Follow-up recommended today.','Your Chicago show is tracking 24% above expected ticket velocity.'].map((text, i) => <div className="recommendation" key={text}><div className={`rec-number n${i}`}>{i + 1}</div><p>{text}</p><button onClick={() => setAssistant(true)}>{i === 0 ? 'Review recommendation' : i === 1 ? 'Draft follow-ups' : 'View details'} <ArrowUpRight size={13} /></button></div>)}</section><section className="panel finance-preview"><SectionTitle title="Revenue overview" action="View finances" /><div className="finance-total"><div><span>Projected revenue</span><strong>$42,800</strong></div><Status>+12.4%</Status></div><MiniChart /></section></div>
        </> : <WorkspaceView active={active} generated={generated} setGenerated={setGenerated} query={query} />}
      </div>
    </main>
    <button className="ask-fab" onClick={() => setAssistant(true)}><Sparkles size={17} /> Ask DISKAI</button>
    {assistant && <div className="assistant-overlay" onClick={() => setAssistant(false)}><aside className="assistant-panel" onClick={(e) => e.stopPropagation()}><div className="assistant-header"><div><div className="ai-icon"><Sparkles size={16} /></div><div><b>Ask DISKAI</b><span>Tour intelligence, on demand</span></div></div><button className="icon-button" onClick={() => setAssistant(false)}><X size={18} /></button></div><div className="assistant-body"><div className="assistant-welcome"><div className="ai-icon"><Sparkles size={19} /></div><h3>What can I help you with?</h3><p>Ask anything about your tours, venues, bookings, or finances.</p></div><div className="prompt-list">{['Plan a 10-city comedy tour in September.','Which venues should I contact next?','Find gaps in my schedule.','Show me my most profitable cities.'].map((p) => <button key={p} onClick={() => setQuery(p)}>{p}<ArrowUpRight size={14} /></button>)}</div></div><div className="assistant-input"><input placeholder="Ask about your tour..." /><button aria-label="Send"><Send size={16} /></button></div></aside></div>}
  </div>
}

function WorkspaceView({ active, generated, setGenerated, query }: { active: string; generated: boolean; setGenerated: (v: boolean) => void; query: string }) {
  const titles: Record<string, string> = { Tours: 'Your tours', Venues: 'Venue Intelligence', Bookings: 'Booking Pipeline', Calendar: 'Tour calendar', Finances: 'Tour Finances', Marketing: 'Marketing studio', 'AI Agents': 'DISKAI Agents', Analytics: 'Tour analytics' }
  if (active === 'AI Agents') return <><div className="welcome-row"><div><p className="eyebrow">INTELLIGENCE LAYER</p><h1>DISKAI Agents</h1><p className="subtitle">Specialized AI assistants working across your tour.</p></div></div><div className="agent-grid">{agents.map(([name, desc, tasks, action], i) => <div className="agent-card panel" key={name}><div className="agent-icon"><Bot size={19} /></div><div className="title-with-status"><h3>{name}</h3><Status>Active</Status></div><p>{desc}</p><div className="agent-footer"><span><Activity size={13} /> {tasks}</span><button>{action} <ArrowUpRight size={13} /></button></div></div>)}</div></>
  if (active === 'Finances' || active === 'Analytics') return <><div className="welcome-row"><div><p className="eyebrow">PERFORMANCE</p><h1>{titles[active]}</h1><p className="subtitle">Track the signals that move your business forward.</p></div><button className="outline-button"><Filter size={15} /> This tour <ChevronDown size={14} /></button></div><div className="stats-grid"><StatCard label="Revenue" value="$42,800" delta="12.4% vs. forecast" icon={DollarSign} /><StatCard label="Expenses" value="$24,380" delta="4.2% under budget" icon={Wallet} /><StatCard label="Profit margin" value="43.0%" delta="6.8% increase" icon={TrendingUp} /><StatCard label="Ticket velocity" value="78%" delta="On track to sell out" icon={Zap} /></div><section className="panel big-chart"><SectionTitle title="Revenue vs. expenses" action="Export report" /><div className="chart-legend"><span><i className="legend-cyan" /> Revenue</span><span><i className="legend-purple" /> Expenses</span></div><MiniChart /></section></>
  return <><div className="welcome-row"><div><p className="eyebrow">WORKSPACE / {active.toUpperCase()}</p><h1>{titles[active]}</h1><p className="subtitle">Everything you need to keep your tour moving.</p></div><button className="outline-button" onClick={() => setGenerated(!generated)}><Plus size={16} /> {active === 'Tours' ? 'New tour' : 'Add to workspace'}</button></div><section className="panel empty-workspace"><div className="empty-icon"><Package size={22} /></div><h2>{generated ? 'Tour plan ready to review' : `Your ${active.toLowerCase()} workspace`}</h2><p>{generated ? 'DISKAI mapped 4 cities, 6 venues, and a route optimized for your budget.' : 'This view is ready for your live tour data. Explore the Overview to see your command center.'}</p><button className="primary-button" onClick={() => setGenerated(true)}>{generated ? 'Review tour plan' : 'Generate with DISKAI'} <ArrowUpRight size={15} /></button></section></>
}
