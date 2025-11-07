'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Account, Transaction } from '../types'

function iconFor(symbol: string) {
  const s = symbol.toUpperCase()
  if (s === 'BTC') return '₿'
  if (s === 'ETH') return (
    <svg width="16" height="16" viewBox="0 0 256 417" fill="currentColor" style={{opacity:0.9}} aria-label="Ethereum">
      <path d="M127.9 0l-1.4 4.7v273.5l1.4 1.4 127.9-75.6z"></path>
      <path d="M127.9 0L0 203.9l127.9 75.6V0z" opacity=".6"></path>
      <path d="M127.9 301.6l-.8 1v113.7l.8 2.3 128-179z" opacity=".6"></path>
      <path d="M127.9 418.6V301.6L0 239.6z"></path>
    </svg>
  )
  if (s === 'SOL') return '◎'
  if (s === 'USDT') return '💵'
  return '◉'
}

function usd(v: number) {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

interface AccountsPageProps {
  accounts: Account[]
  transactions: Transaction[]
  onSend: () => void
  onReceive: () => void
}

/**
 * Accounts page - detailed view of all accounts
 */
export default function AccountsPage({ accounts, transactions, onSend, onReceive }: AccountsPageProps) {
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'balance'>('value')
  const [filterBy, setFilterBy] = useState<string>('all')

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  const totalValue = accounts.reduce((sum, a) => sum + (a.balance * a.price), 0)
  const totalAccounts = accounts.length
  const uniqueChains = new Set(accounts.map(a => a.symbol)).size

  const sortedAccounts = useMemo(() => {
    const filtered = filterBy === 'all' 
      ? accounts 
      : accounts.filter(a => a.symbol === filterBy)
    
    return [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'value':
          return (b.balance * b.price) - (a.balance * a.price)
        case 'balance':
          return b.balance - a.balance
        default:
          return 0
      }
    })
  }, [accounts, sortBy, filterBy])

  const getAccountTransactionCount = (accountId: string) => {
    return transactions.filter(tx => tx.acc.includes(accounts.find(a => a.id === accountId)?.name || '')).length
  }

  const getAccountLastActivity = (accountName: string) => {
    const accountTxs = transactions.filter(tx => tx.acc === accountName)
    if (accountTxs.length === 0) return 'No activity'
    const latest = accountTxs[0].t
    // Parse date in format "YYYY-MM-DD HH:mm"
    const dateMatch = latest.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/)
    if (!dateMatch) return latest
    
    const [, year, month, day, hours, minutes] = dateMatch
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes))
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 30) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  // Skeleton loader
  const SkeletonCard = ({ height = '100px', width = '100%' }: { height?: string, width?: string }) => (
    <div style={{
      width,
      height,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
      backgroundSize: '200% 100%',
      borderRadius: '12px',
      animation: 'shimmer 1.5s ease-in-out infinite'
    }} />
  )

  return (
    <main className="main" style={{
      animation: loading ? 'none' : 'fadeIn 0.5s ease-out',
      opacity: loading ? 0 : 1
    }}>
      <div className="header">
        <section className="card portfolio">
          <div style={{minWidth:'260px'}}>
            <div className="muted" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'.12em'}}>Accounts</div>
            <div className="big-number">{usd(totalValue)}</div>
            <div className="muted" style={{marginTop:'8px'}}>
              {totalAccounts} account{totalAccounts !== 1 ? 's' : ''} across {uniqueChains} cryptocurrencies
            </div>
            <div className="quick" style={{marginTop:'10px'}}>
              <button className="chip" onClick={onSend}>Send</button>
              <button className="chip" onClick={onReceive}>Receive</button>
              <button className="chip" disabled title="Demo">Add Account</button>
            </div>
            <div className="summary" style={{marginTop:'16px'}}>
              <div className="kpi">
                <div className="muted">Total Transactions</div>
                <div className="v">{transactions.length}</div>
              </div>
              <div className="kpi">
                <div className="muted">Active Accounts</div>
                <div className="v">{accounts.filter(a => getAccountTransactionCount(a.id) > 0).length}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="content">
        <section className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexWrap:'wrap', gap:'12px'}}>
            <h3 style={{margin:0}}>All Accounts</h3>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
              <select 
                className="input" 
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                style={{padding:'6px 12px', fontSize:'13px'}}
              >
                <option value="all">All Networks</option>
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="SOL">Solana</option>
                <option value="USDT">USDT</option>
              </select>
              <select 
                className="input" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{padding:'6px 12px', fontSize:'13px'}}
              >
                <option value="value">Sort by Value</option>
                <option value="balance">Sort by Balance</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid', gap:'12px', marginTop:'16px'}}>
            {sortedAccounts.map((a, i) => {
              const txCount = getAccountTransactionCount(a.id)
              const lastActivity = getAccountLastActivity(a.name)
              return (
                <div 
                  key={a.id} 
                  className="card" 
                  style={{
                    padding:'20px', 
                    border:'1px solid var(--line)', 
                    display:'flex', 
                    alignItems:'center', 
                    gap:'20px',
                    transition:'all 0.2s',
                    animation: loading ? 'none' : `slideIn 0.4s ease-out ${i * 0.1}s both`,
                    opacity: loading ? 0 : 1
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <div style={{
                    width:'56px',
                    height:'56px',
                    borderRadius:'12px',
                    display:'grid',
                    placeItems:'center',
                    background:'rgba(124,92,255,.15)',
                    border:'1px solid rgba(124,92,255,.35)',
                    flexShrink:0
                  }}>
                    <div style={{fontSize:'24px'}}>{iconFor(a.symbol)}</div>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'6px'}}>
                      <div style={{fontWeight:600, fontSize:'16px'}}>{a.name}</div>
                      <span className="chip" style={{fontSize:'11px', padding:'2px 8px'}}>{a.symbol}</span>
                    </div>
                    <div className="muted" style={{fontSize:'13px', marginBottom:'4px'}}>
                      {a.network} • {a.address}
                    </div>
                    <div style={{display:'flex', gap:'16px', marginTop:'8px', fontSize:'12px'}}>
                      <span className="muted">{txCount} transaction{txCount !== 1 ? 's' : ''}</span>
                      <span className="muted">Last: {lastActivity}</span>
                    </div>
                  </div>
                  <div style={{textAlign:'right', marginLeft:'auto', minWidth:'140px'}}>
                    <div style={{fontWeight:600, fontSize:'18px', marginBottom:'4px'}}>
                      {usd(a.balance * a.price)}
                    </div>
                    <div className="muted" style={{fontSize:'13px', marginBottom:'4px'}}>
                      {a.balance.toFixed(4)} {a.symbol}
                    </div>
                    <div className="muted" style={{fontSize:'11px'}}>
                      {usd(a.price)} per {a.symbol}
                    </div>
                  </div>
                  <div style={{display:'flex', gap:'8px', flexShrink:0}}>
                    <button className="btn" onClick={onSend} style={{padding:'8px 14px', fontSize:'13px'}}>Send</button>
                    <button className="btn" onClick={onReceive} style={{padding:'8px 14px', fontSize:'13px'}}>Receive</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="card" style={{marginTop:'24px'}}>
          <h3 style={{marginBottom:'16px'}}>Transaction History</h3>
          {transactions.length === 0 ? (
            <div style={{textAlign:'center', padding:'40px', color:'var(--muted)'}}>
              No transactions yet
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>To Address</th>
                  <th>Network/Token</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} style={{
                    animation: loading ? 'none' : `slideIn 0.4s ease-out ${i * 0.05}s both`,
                    opacity: loading ? 0 : 1
                  }}>
                    <td>{tx.t}</td>
                    <td>{tx.acc}</td>
                    <td>{tx.type === 'In' ? <span className="pill buy">In</span> : <span className="pill sell">Out</span>}</td>
                    <td>{tx.amt}</td>
                    <td style={{fontSize:'12px', fontFamily:'monospace'}}>
                      {tx.toAddress ? (
                        <span title={tx.toAddress} style={{cursor:'pointer'}}>
                          {tx.toAddress.slice(0, 8)}...{tx.toAddress.slice(-6)}
                        </span>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td style={{fontSize:'12px'}}>
                      {tx.network && tx.token ? (
                        <span>
                          <span style={{fontWeight:600}}>{tx.token}</span>
                          <span className="muted"> • </span>
                          <span className="muted">{tx.network}</span>
                        </span>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 500,
                        background: tx.status === 'Confirmed' 
                          ? 'rgba(34,197,94,0.15)' 
                          : tx.status === 'Pending'
                          ? 'rgba(251,191,36,0.15)'
                          : 'rgba(239,68,68,0.15)',
                        color: tx.status === 'Confirmed'
                          ? '#22c55e'
                          : tx.status === 'Pending'
                          ? '#fbbf24'
                          : '#ef4444'
                      }}>
                        {tx.status}
                      </span>
                      {tx.txHash && (
                        <div style={{marginTop:'4px', fontSize:'10px'}}>
                          <a 
                            href={`https://etherscan.io/tx/${tx.txHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{color:'rgba(124,92,255,0.8)', textDecoration:'none'}}
                            title={tx.txHash}
                          >
                            View on Explorer
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </main>
  )
}
