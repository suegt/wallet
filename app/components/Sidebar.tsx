'use client'

import type { Account } from '../types'

function iconFor(symbol: string) {
  const s = symbol.toUpperCase()
  if (s === 'BTC') return '₿'
  if (s === 'ETH') return (
    <svg width="16" height="16" viewBox="0 0 256 417" fill="currentColor" style={{opacity:0.9}}>
      <path d="M127.9 0l-1.4 4.7v273.5l1.4 1.4 127.9-75.6z"></path>
      <path d="M127.9 0L0 203.9l127.9 75.6V0z" opacity=".6"></path>
      <path d="M127.9 301.6l-.8 1v113.7l.8 2.3 128-179z" opacity=".6"></path>
      <path d="M127.9 418.6V301.6L0 239.6z"></path>
    </svg>
  )
  if (s === 'SOL') return '◎'
  return '◉'
}

function usd(v: number) {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function Sidebar({ accounts, selectedPage, onPageChange, onAddAccount, onSync }: {
  accounts: Account[]
  selectedPage: string
  onPageChange: (page: string) => void
  onAddAccount: () => void
  onSync: () => void
}) {
  return (
    <aside className="sidebar" aria-label="Left navigation">
      <nav className="nav">
        <div className="section-label">Overview</div>
        <div className={`item ${selectedPage === 'portfolio' ? 'active' : ''}`} onClick={() => onPageChange('portfolio')}>
          Portfolio <span className="badge">Dashboard</span>
        </div>
        <div className={`item ${selectedPage === 'accounts' ? 'active' : ''}`} onClick={() => onPageChange('accounts')}>
          Accounts
        </div>
        <div className={`item ${selectedPage === 'discover' ? 'active' : ''}`} onClick={() => onPageChange('discover')}>
          Discover
        </div>
        <div className="section-label">Markets</div>
        <div className={`item ${selectedPage === 'market' ? 'active' : ''}`} onClick={() => onPageChange('market')}>
          Markets <span className="badge">Beta</span>
        </div>
        <div className={`item ${selectedPage === 'earn' ? 'active' : ''}`} onClick={() => onPageChange('earn')}>
          Earn / Staking
        </div>
      </nav>

      <div className="section-label">Accounts</div>
      <div className="accounts">
        {accounts.map(a => (
          <div key={a.id} className="acc">
            <div style={{width:'28px',height:'28px',borderRadius:'8px',display:'grid',placeItems:'center',background:'rgba(124,92,255,.15)',border:'1px solid rgba(124,92,255,.35)'}}>
              {iconFor(a.symbol)}
            </div>
            <div className="meta">
              <div className="name">{a.name}</div>
              <div className="sub">{a.symbol} • {a.balance}</div>
            </div>
            <div style={{marginLeft:'auto',textAlign:'right'}}>
              <div>{usd(a.balance * a.price)}</div>
              <div className="sub" style={{color:'#96a7c2'}}>{a.balance} {a.symbol}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="foot">
        <button className="btn" onClick={onAddAccount}>Add Account</button>
        <button className="btn" onClick={onSync}>Sync Now</button>
      </div>
    </aside>
  )
}

