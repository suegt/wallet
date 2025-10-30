'use client'

export default function Topbar({ onSend, onReceive, onTheme }: {
  onSend: () => void
  onReceive: () => void
  onTheme: () => void
}) {
  return (
    <div className="topbar">
      <div className="left">
        <div className="brand">
          <span className="dot"></span> Ledger • Live
        </div>
        <span className="demo-pill" title="This is a demo UI; never use a real seed/private key here.">live-session</span>
      </div>
      <div className="search" role="search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-3.9-3.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <input id="search" placeholder="Search assets, accounts or transactions" />
      </div>
      <div className="right">
        <div className="sync" id="syncBox">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 12a9 9 0 0115.5-6.4M21 12a9 9 0 01-15.5 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg> Syncing
        </div>
        <button className="btn ghost" onClick={onTheme} title="Toggle theme">Theme</button>
        <button className="btn" onClick={onReceive}>Receive</button>
        <button className="btn primary" onClick={onSend}>Send</button>
      </div>
    </div>
  )
}

