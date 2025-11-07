'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Account } from '../types'

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
  if (s === 'ADA') return '₳'
  if (s === 'DOT') return '●'
  return '◉'
}

function usd(v: number) {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

interface EarnPageProps {
  accounts: Account[]
  onSend: () => void
  onReceive: () => void
}

/**
 * Earn/Staking page - staking and earning opportunities
 */
export default function EarnPage({ accounts, onSend, onReceive }: EarnPageProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  const stakingOptions = [
    { 
      symbol: 'ETH', 
      name: 'Ethereum Staking', 
      apy: 4.2, 
      minStake: 0.1, 
      status: 'Active',
      type: 'Native Staking',
      description: 'Stake ETH directly on the Ethereum 2.0 network',
      lockup: 'Variable',
      risk: 'Low',
      rewards: '~0.003 ETH/month'
    },
    { 
      symbol: 'SOL', 
      name: 'Solana Staking', 
      apy: 6.8, 
      minStake: 1, 
      status: 'Active',
      type: 'Validator Staking',
      description: 'Delegate SOL to validators and earn rewards',
      lockup: 'None',
      risk: 'Low',
      rewards: '~0.07 SOL/month'
    },
    { 
      symbol: 'ADA', 
      name: 'Cardano Staking', 
      apy: 5.1, 
      minStake: 1, 
      status: 'Available',
      type: 'Pool Staking',
      description: 'Stake ADA in Cardano stake pools',
      lockup: 'None',
      risk: 'Low',
      rewards: '~0.05 ADA/month'
    },
    { 
      symbol: 'DOT', 
      name: 'Polkadot Staking', 
      apy: 12.5, 
      minStake: 10, 
      status: 'Available',
      type: 'Nominated Staking',
      description: 'Nominate validators on Polkadot network',
      lockup: '28 days',
      risk: 'Medium',
      rewards: '~0.125 DOT/month'
    },
    {
      symbol: 'ATOM',
      name: 'Cosmos Staking',
      apy: 18.5,
      minStake: 0.1,
      status: 'Available',
      type: 'Delegation',
      description: 'Delegate ATOM to validators on Cosmos Hub',
      lockup: '21 days',
      risk: 'Medium',
      rewards: '~0.018 ATOM/month'
    },
    {
      symbol: 'MATIC',
      name: 'Polygon Staking',
      apy: 8.2,
      minStake: 1,
      status: 'Available',
      type: 'Validator Staking',
      description: 'Stake MATIC to secure Polygon network',
      lockup: '7 days',
      risk: 'Low',
      rewards: '~0.082 MATIC/month'
    }
  ]

  const stakedAccounts = accounts.filter(a => a.name.includes('Stake') || a.symbol === 'SOL')
  const totalStaked = stakedAccounts.reduce((sum, a) => sum + (a.balance * a.price), 0)
  const estimatedMonthlyRewards = stakedAccounts.reduce((sum, a) => {
    const option = stakingOptions.find(o => o.symbol === a.symbol)
    if (!option) return sum
    const monthlyReward = (a.balance * a.price * option.apy / 100) / 12
    return sum + monthlyReward
  }, 0)

  return (
    <main className="main" style={{
      animation: loading ? 'none' : 'fadeIn 0.5s ease-out',
      opacity: loading ? 0 : 1
    }}>
      <div className="header">
        <section className="card portfolio">
          <div style={{minWidth:'260px'}}>
            <div className="muted" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'.12em'}}>Staking & Earning</div>
            <div className="big-number">{usd(totalStaked)}</div>
            <div className="muted" style={{marginTop:'8px'}}>
              {stakedAccounts.length} staked account{stakedAccounts.length !== 1 ? 's' : ''}
            </div>
            <div className="quick" style={{marginTop:'10px'}}>
              <button className="chip" onClick={onSend}>Send</button>
              <button className="chip" onClick={onReceive}>Receive</button>
              <button className="chip" disabled title="Demo">Stake More</button>
            </div>
            <div className="summary" style={{marginTop:'16px'}}>
              <div className="kpi">
                <div className="muted">Estimated Monthly</div>
                <div className="v" style={{color:'var(--success)'}}>+{usd(estimatedMonthlyRewards)}</div>
              </div>
              <div className="kpi">
                <div className="muted">Total Options</div>
                <div className="v">{stakingOptions.length}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="content">
        {stakedAccounts.length > 0 && (
          <section className="card">
            <h3>Active Staking Positions</h3>
            <table style={{marginTop:'16px'}}>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Staked Amount</th>
                  <th>Value (USD)</th>
                  <th>APY</th>
                  <th>Estimated Monthly</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stakedAccounts.map(a => {
                  const option = stakingOptions.find(o => o.symbol === a.symbol)
                  const monthlyReward = option ? (a.balance * a.price * option.apy / 100) / 12 : 0
                  return (
                    <tr key={a.id}>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <span style={{opacity:0.9, fontSize:'20px'}}>{iconFor(a.symbol)}</span>
                          <div>
                            <div style={{fontWeight:600}}>{a.symbol}</div>
                            <div className="muted" style={{fontSize:'12px'}}>{a.name}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{fontWeight:600}}>{a.balance.toFixed(4)} {a.symbol}</td>
                      <td>{usd(a.balance * a.price)}</td>
                      <td>
                        <span style={{color:'var(--success)', fontWeight:700, fontSize:'16px'}}>
                          {option?.apy.toFixed(1) || 'N/A'}%
                        </span>
                      </td>
                      <td className="muted">{usd(monthlyReward)}</td>
                      <td>
                        <span className="badge" style={{
                          background: 'rgba(34,197,94,0.15)',
                          color: 'var(--success)',
                          borderColor: 'rgba(34,197,94,0.3)',
                          border: '1px solid',
                          borderRadius: '999px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}>
                          Active
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        )}

        <section className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <h3 style={{margin:0}}>Available Staking Options</h3>
            <div className="muted" style={{fontSize:'12px'}}>{stakingOptions.length} protocols available</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'16px', marginTop:'16px'}}>
            {stakingOptions.map((option, i) => (
              <div 
                key={i} 
                className="card" 
                style={{
                  padding:'20px', 
                  border:'1px solid var(--line)',
                  transition:'all 0.2s',
                  animation: loading ? 'none' : `fadeIn 0.5s ease-out ${i * 0.1}s both`,
                  opacity: loading ? 0 : 1
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{
                      width:'48px',
                      height:'48px',
                      borderRadius:'10px',
                      background:'rgba(124,92,255,.15)',
                      border:'1px solid rgba(124,92,255,.35)',
                      display:'grid',
                      placeItems:'center',
                      fontSize:'24px'
                    }}>
                      {iconFor(option.symbol)}
                    </div>
                    <div>
                      <div style={{fontWeight:600, fontSize:'18px', marginBottom:'4px'}}>{option.name}</div>
                      <div className="muted" style={{fontSize:'12px'}}>{option.type}</div>
                    </div>
                  </div>
                  <span className="badge" style={{
                    background: option.status === 'Active' 
                      ? 'rgba(34,197,94,0.15)' 
                      : 'rgba(124,92,255,0.15)',
                    color: option.status === 'Active' 
                      ? 'var(--success)' 
                      : 'var(--brand)',
                    borderColor: option.status === 'Active' 
                      ? 'rgba(34,197,94,0.3)' 
                      : 'rgba(124,92,255,0.3)',
                    border: '1px solid',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}>
                    {option.status}
                  </span>
                </div>
                
                <div className="muted" style={{fontSize:'13px', marginBottom:'16px', lineHeight:'1.5'}}>
                  {option.description}
                </div>

                <div style={{
                  display:'grid',
                  gridTemplateColumns:'1fr 1fr',
                  gap:'12px',
                  padding:'12px',
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:'8px',
                  marginBottom:'16px'
                }}>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>Min. Stake</div>
                    <div style={{fontSize:'13px', fontWeight:600}}>{option.minStake} {option.symbol}</div>
                  </div>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>Lockup</div>
                    <div style={{fontSize:'13px', fontWeight:600}}>{option.lockup}</div>
                  </div>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>Risk</div>
                    <div style={{
                      fontSize:'13px',
                      fontWeight:600,
                      color: option.risk === 'Low' ? 'var(--success)' : option.risk === 'Medium' ? 'var(--warning)' : 'var(--danger)'
                    }}>
                      {option.risk}
                    </div>
                  </div>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>Est. Rewards</div>
                    <div style={{fontSize:'13px', fontWeight:600}}>{option.rewards}</div>
                  </div>
                </div>

                <div style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  paddingTop:'16px',
                  borderTop:'1px solid var(--line)'
                }}>
                  <div>
                    <div className="muted" style={{fontSize:'12px', marginBottom:'4px'}}>APY</div>
                    <div style={{fontSize:'28px', fontWeight:700, color:'var(--success)'}}>{option.apy.toFixed(1)}%</div>
                  </div>
                  <button 
                    className={`btn ${option.status === 'Active' ? 'primary' : ''}`} 
                    disabled={option.status !== 'Active'} 
                    title={option.status === 'Active' ? 'Demo' : 'Coming soon'}
                    style={{padding:'10px 20px'}}
                  >
                    {option.status === 'Active' ? 'Stake Now' : 'Coming Soon'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h3>Yield Farming & DeFi Opportunities</h3>
          <div style={{
            padding:'24px',
            border:'1px dashed var(--line)',
            borderRadius:'8px',
            textAlign:'center',
            marginTop:'16px',
            background:'rgba(124,92,255,0.02)'
          }}>
            <div style={{fontSize:'32px', marginBottom:'12px'}}>🚜</div>
            <div style={{fontWeight:600, fontSize:'16px', marginBottom:'8px'}}>Yield Farming Coming Soon</div>
            <div className="muted" style={{fontSize:'14px', marginBottom:'16px', lineHeight:'1.6'}}>
              Connect to DeFi protocols for additional earning opportunities.<br />
              Access liquidity pools, lending platforms, and yield aggregators.
            </div>
            <button className="btn" disabled title="Demo">
              Explore DeFi Protocols
            </button>
          </div>
        </section>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
