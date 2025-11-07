'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Account, Transaction, FilterValue } from '../types'

/**
 * Returns the appropriate icon for a cryptocurrency symbol
 */
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

/**
 * Formats a number as USD currency
 */
function usd(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

interface MainProps {
  accounts: Account[]
  txs: Transaction[]
  filter: FilterValue
  onFilterChange: (filter: FilterValue) => void
  onSend: () => void
  onReceive: () => void
}

/**
 * Main dashboard component displaying portfolio, accounts, and transactions
 */
export default function Main({ accounts, txs, filter, onFilterChange, onSend, onReceive }: MainProps) {
  const [loading, setLoading] = useState(true)
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries(accounts.map(a => [a.id, a.price]))
  )

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  // Simulate real-time price updates with small random fluctuations
  useEffect(() => {
    const PRICE_UPDATE_INTERVAL = 2800 // 2.8 seconds
    const MAX_PRICE_DRIFT = 0.02 // 2% max change per update
    
    const interval = setInterval(() => {
      setPrices(prev => {
        const newPrices = { ...prev }
        accounts.forEach(a => {
          // Generate random price drift (-1% to +1%)
          const drift = (Math.random() - 0.5) * MAX_PRICE_DRIFT
          newPrices[a.id] = (newPrices[a.id] || a.price) * (1 + drift)
        })
        return newPrices
      })
    }, PRICE_UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [accounts])

  const total = useMemo(() => {
    return accounts.reduce((sum, a) => {
      const price = prices[a.id] || a.price
      return sum + (a.balance * price)
    }, 0)
  }, [accounts, prices])

  const filteredAccounts = useMemo(() => {
    return filter === 'all' ? accounts : accounts.filter(a => a.symbol === filter)
  }, [accounts, filter])

  // Weekly change percentage (client-only to prevent hydration mismatch)
  const [weekly, setWeekly] = useState<string>('0.00')
  
  useEffect(() => {
    // Generate weekly value only on client to avoid hydration mismatch
    // Range: -5% to +5%
    setWeekly((Math.random() * 10 - 5).toFixed(2))
  }, [total])

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
            <div className="muted" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'.12em'}}>Total Portfolio</div>
            {loading ? (
              <SkeletonCard height="48px" width="200px" />
            ) : (
              <div className="big-number" style={{ animation: 'pulseValue 0.6s ease-in-out' }}>{usd(total)}</div>
            )}
            <div className="muted">24h: {(parseFloat(weekly)/4).toFixed(2)}%</div>
            <div className="quick" style={{marginTop:'10px'}}>
              <button className="chip" onClick={onSend}>Send</button>
              <button className="chip" onClick={onReceive}>Receive</button>
              <button className="chip" disabled title="Demo">Swap</button>
              <button className="chip" disabled title="Demo">Buy / Sell</button>
            </div>
            <div className="summary">
              <div className="kpi">
                <div className="muted">Daily PnL</div>
                <div className="v">{usd(total * 0.0063)}</div>
              </div>
              <div className="kpi">
                <div className="muted">Weekly Change</div>
                <div className="v">{(parseFloat(weekly) > 0 ? '+' : '') + weekly}%</div>
              </div>
              <div className="kpi">
                <div className="muted">Monthly Return</div>
                <div className="v">{(parseFloat(weekly) * 4).toFixed(2)}%</div>
              </div>
            </div>
          </div>
          <div className="spark" aria-label="Portfolio chart (demo)">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(124,92,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(124,92,255,0)" />
                </linearGradient>
              </defs>
              <path d="M0 120 L50 110 L100 130 L150 90 L200 100 L250 80 L300 95 L350 70 L400 90 L450 60 L500 80 L550 70 L600 90 L600 160 L0 160 Z" fill="url(#g1)" stroke="rgba(124,92,255,0.6)" strokeWidth="2" />
            </svg>
          </div>
        </section>
        <section className="card">
          <div className="row"><div className="muted">Device</div><div className="v">Ledger Nano™</div></div>
          <div className="row"><div className="muted">Connection</div><div className="v">Successfully</div></div>
          <div className="row"><div className="muted">Installed Apps</div><div className="v">BTC, ETH, SOL</div></div>
          <div style={{marginTop:'10px'}}>
            <div className="muted" style={{marginBottom:'6px'}}>Storage</div>
            <div className="progress"><i></i></div>
          </div>
          <div style={{marginTop:'10px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
            <button className="btn">Connect Device</button>
            <button className="btn">Genuine Check</button>
            <button className="btn ghost">App Manager</button>
          </div>
        </section>
      </div>

      <div className="content">
        <div className="tabs">
          <div className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>All</div>
          <div className={`tab ${filter === 'BTC' ? 'active' : ''}`} onClick={() => onFilterChange('BTC')}>Bitcoin</div>
          <div className={`tab ${filter === 'ETH' ? 'active' : ''}`} onClick={() => onFilterChange('ETH')}>Ethereum</div>
          <div className={`tab ${filter === 'SOL' ? 'active' : ''}`} onClick={() => onFilterChange('SOL')}>Solana</div>
          <div className={`tab ${filter === 'USDT' ? 'active' : ''}`} onClick={() => onFilterChange('USDT')}>USDT</div>
        </div>
        <section className="card">
          <h3>Accounts</h3>
          <table>
            <thead>
              <tr><th style={{width:'34px'}}></th><th>Account</th><th>Balance</th><th>Price</th><th>Value (USD)</th><th></th></tr>
            </thead>
            <tbody>
              {filteredAccounts.map((a, i) => {
                const price = prices[a.id] || a.price
                return (
                  <tr key={a.id} style={{
                    animation: loading ? 'none' : `slideIn 0.4s ease-out ${i * 0.1}s both`,
                    opacity: loading ? 0 : 1
                  }}>
                    <td style={{opacity:0.9}}>{iconFor(a.symbol)}</td>
                    <td>{a.name}</td>
                    <td>{a.balance} {a.symbol}</td>
                    <td>{usd(price)}</td>
                    <td>{usd(a.balance * price)}</td>
                    <td><button className="btn" onClick={onSend}>Send</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        <section className="card">
          <h3>Recent Activity</h3>
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
              {txs.map((tx, i) => (
                <tr key={i} style={{
                  animation: loading ? 'none' : `slideIn 0.4s ease-out ${i * 0.1}s both`,
                  opacity: loading ? 0 : 1
                }}>
                  <td>{tx.t}</td>
                  <td>{tx.acc}</td>
                  <td>{tx.type === 'In' ? <span className="pill buy">In</span> : <span className="pill sell">Out</span>}</td>
                  <td>{tx.amt}</td>
                  <td style={{fontSize:'12px', fontFamily:'monospace'}}>
                    {tx.toAddress ? (
                      <span title={tx.toAddress}>
                        {tx.toAddress.slice(0, 6)}...{tx.toAddress.slice(-4)}
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
        @keyframes pulseValue {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      `}</style>
    </main>
  )
}

