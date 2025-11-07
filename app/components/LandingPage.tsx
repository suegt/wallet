'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Account } from '../types'

/**
 * Landing Page - Dashboard-style preview with interactive demos
 */
export default function LandingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tabLoading, setTabLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'portfolio' | 'accounts' | 'markets' | 'earn'>('portfolio')
  const [portfolioValue, setPortfolioValue] = useState(1234567)
  const [accounts] = useState<Account[]>([
    { id:'acc-btc-1', name:'BTC – Main', symbol:'BTC', network:'Bitcoin', address:'bc1qxx...demo1', balance: 13.5321, price: 68000 },
    { id:'acc-eth-1', name:'ETH – DeFi', symbol:'ETH', network:'Ethereum', address:'0xabc...def', balance: 2.14, price: 3500 },
    { id:'acc-sol-1', name:'SOL – Stake', symbol:'SOL', network:'Solana', address:'SoL1...demo', balance: 120.5, price: 160 },
  ])

  useEffect(() => {
    // Simulate initial page load
    setTimeout(() => {
      setMounted(true)
      setTimeout(() => setLoading(false), 500)
    }, 800)
    
    // Simulate portfolio value updates
    const interval = setInterval(() => {
      setPortfolioValue(prev => prev + (Math.random() - 0.5) * 10000)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleTabChange = (tab: 'portfolio' | 'accounts' | 'markets' | 'earn') => {
    if (tab !== activeTab) {
      setTabLoading(true)
      setTimeout(() => {
        setActiveTab(tab)
        setTimeout(() => setTabLoading(false), 300)
      }, 200)
    }
  }

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  function usd(v: number) {
    return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  }

  function iconFor(symbol: string) {
    const s = symbol.toUpperCase()
    if (s === 'BTC') return '₿'
    if (s === 'ETH') return 'Ξ'
    if (s === 'SOL') return '◎'
    return '◉'
  }

  const total = accounts.reduce((sum, acc) => sum + (acc.balance * acc.price), 0)

  // Skeleton loader component
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
    <div style={{
      minHeight: '100vh',
      background: '#0b1020',
      color: '#e6eef8',
      overflowX: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(11, 16, 32, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '20px',
          fontWeight: '800',
          letterSpacing: '0.5px',
          cursor: 'pointer'
        }} onClick={handleGetStarted}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(124,92,255,0.3), rgba(57,224,182,0.3))',
            border: '1px solid rgba(124,92,255,0.4)',
            display: 'grid',
            placeItems: 'center',
            fontSize: '20px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <span>Ledger Wallet</span>
        </div>
        <button
          onClick={handleGetStarted}
          style={{
            background: 'linear-gradient(135deg, rgba(124,92,255,0.25), rgba(124,92,255,0.1))',
            border: '1px solid rgba(124,92,255,0.4)',
            color: '#e6eef8',
            padding: '10px 24px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,255,0.35), rgba(124,92,255,0.2))'
            e.currentTarget.style.borderColor = 'rgba(124,92,255,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,255,0.25), rgba(124,92,255,0.1))'
            e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'
          }}
        >
          Launch Dashboard →
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(124,92,255,0.15)',
            border: '1px solid rgba(124,92,255,0.3)',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#c5d4ff',
            marginBottom: '24px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#39e0b6',
              boxShadow: '0 0 10px rgba(57,224,166,0.5)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            Live Demo • Interactive Preview
          </div>
          <h1 style={{
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: '800',
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #e6eef8 0%, #9db1cf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Your Complete Crypto
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #6c5cff 0%, #39e0b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Portfolio Dashboard
            </span>
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#9db1cf',
            margin: '0 0 40px 0',
            lineHeight: '1.6',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Manage Bitcoin, Ethereum, Solana, and more. Track your portfolio, 
            stake assets, explore DeFi—all in one secure interface.
          </p>
        </div>

        {/* Interactive Dashboard Preview */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative'
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: '16px'
          }}>
            {(['portfolio', 'accounts', 'markets', 'earn'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  background: activeTab === tab 
                    ? 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(124,92,255,0.1))'
                    : 'transparent',
                  border: activeTab === tab 
                    ? '1px solid rgba(124,92,255,0.4)'
                    : '1px solid transparent',
                  color: activeTab === tab ? '#e6eef8' : '#9db1cf',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = '#e6eef8'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#9db1cf'
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && !tabLoading && (
            <div style={{
              animation: 'fadeIn 0.4s ease-in-out',
              opacity: tabLoading ? 0 : 1
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '24px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#9db1cf',
                    marginBottom: '12px'
                  }}>
                    Total Portfolio
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg,rgb(228, 228, 228),rgb(255, 255, 255))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '8px',
                    transition: 'all 0.3s ease',
                    animation: mounted ? 'pulseValue 0.6s ease-in-out' : 'none'
                  }}>
                    {loading ? (
                      <SkeletonCard height="40px" width="200px" />
                    ) : (
                      <span key={portfolioValue} style={{ display: 'inline-block' }}>
                        {mounted ? usd(portfolioValue) : '$1,234,567'}
                      </span>
                    )}
                  </div>
                  <div style={{
                    color: '#39e0b6',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '20px'
                  }}>
                    +2.45% (24h)
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      background: 'rgba(124,92,255,0.15)',
                      border: '1px solid rgba(124,92,255,0.3)',
                      color: '#c5d4ff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>Send</button>
                    <button style={{
                      background: 'rgba(124,92,255,0.15)',
                      border: '1px solid rgba(124,92,255,0.3)',
                      color: '#c5d4ff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>Receive</button>
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    height: '120px',
                    borderRadius: '8px',
                    background: 'rgba(124,92,255,0.05)',
                    border: '1px dashed rgba(124,92,255,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <svg width="100%" height="100%" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0}}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="rgba(124,92,255,0.3)" />
                          <stop offset="100%" stopColor="rgba(124,92,255,0)" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0 80 L50 70 L100 75 L150 60 L200 65 L250 50 L300 55 L350 40 L400 50" 
                        fill="url(#chartGrad)" 
                        stroke="rgba(124,92,255,0.5)" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#9db1cf',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Your Assets
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {accounts.map((acc, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.04)',
                      transition: 'all 0.2s',
                      animation: `slideIn 0.4s ease-out ${i * 0.1}s both`,
                      opacity: loading ? 0 : 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,92,255,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(124,92,255,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          background: 'rgba(124,92,255,0.15)',
                          border: '1px solid rgba(124,92,255,0.3)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#6c5cff'
                        }}>
                          {iconFor(acc.symbol)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: '#e6eef8' }}>
                            {acc.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9db1cf' }}>
                            {acc.balance.toFixed(4)} {acc.symbol}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '17px',
                          fontWeight: '700',
                          marginBottom: '4px'
                        }}>
                          {usd(acc.balance * acc.price)}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: i % 2 === 0 ? '#39e0b6' : '#ff5c7a',
                          fontWeight: '600'
                        }}>
                          {i % 2 === 0 ? '+' : ''}{((Math.random() * 4 - 2)).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {tabLoading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid rgba(124,92,255,0.2)',
                borderTop: '3px solid #6c5cff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div style={{ color: '#9db1cf', fontSize: '14px' }}>Loading...</div>
            </div>
          )}

          {/* Accounts Tab */}
          {activeTab === 'accounts' && !tabLoading && (
            <div style={{
              animation: 'fadeIn 0.4s ease-in-out',
              opacity: tabLoading ? 0 : 1
            }}>
              <div style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '16px'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: '#e6eef8'
                }}>
                  All Accounts
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {accounts.map((acc, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.04)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          background: 'rgba(124,92,255,0.15)',
                          border: '1px solid rgba(124,92,255,0.3)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#6c5cff'
                        }}>
                          {iconFor(acc.symbol)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: '#e6eef8' }}>
                            {acc.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9db1cf' }}>
                            {acc.network} • {acc.address}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>
                          {usd(acc.balance * acc.price)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9db1cf' }}>
                          {acc.balance.toFixed(4)} {acc.symbol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Markets Tab */}
          {activeTab === 'markets' && !tabLoading && (
            <div style={{
              animation: 'fadeIn 0.4s ease-in-out',
              opacity: tabLoading ? 0 : 1
            }}>
              <div style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: '#e6eef8'
                }}>
                  Market Overview
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '12px', color: '#9db1cf', fontWeight: '600' }}>Asset</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '12px', color: '#9db1cf', fontWeight: '600' }}>Price</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '12px', color: '#9db1cf', fontWeight: '600' }}>24h Change</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '12px', color: '#9db1cf', fontWeight: '600' }}>Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { symbol: 'BTC', name: 'Bitcoin', price: 68000, change: 2.5, marketCap: '$1.33T' },
                      { symbol: 'ETH', name: 'Ethereum', price: 3500, change: -1.2, marketCap: '$420B' },
                      { symbol: 'SOL', name: 'Solana', price: 160, change: 5.8, marketCap: '$72B' },
                    ].map((m, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              background: 'rgba(124,92,255,0.15)',
                              border: '1px solid rgba(124,92,255,0.3)',
                              display: 'grid',
                              placeItems: 'center',
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#6c5cff'
                            }}>
                              {m.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#e6eef8' }}>{m.symbol}</div>
                              <div style={{ fontSize: '12px', color: '#9db1cf' }}>{m.name}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: 'right', padding: '12px', fontWeight: '600' }}>{usd(m.price)}</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: m.change >= 0 ? '#39e0b6' : '#ff5c7a', fontWeight: '600' }}>
                          {m.change >= 0 ? '+' : ''}{m.change.toFixed(2)}%
                        </td>
                        <td style={{ textAlign: 'right', padding: '12px', color: '#9db1cf', fontWeight: '600' }}>{m.marketCap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Earn Tab */}
          {activeTab === 'earn' && !tabLoading && (
            <div style={{
              animation: 'fadeIn 0.4s ease-in-out',
              opacity: tabLoading ? 0 : 1
            }}>
              <div style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: '#e6eef8'
                }}>
                  Staking Opportunities
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { symbol: 'ETH', name: 'Ethereum Staking', apy: 4.2, status: 'Active' },
                    { symbol: 'SOL', name: 'Solana Staking', apy: 6.8, status: 'Active' },
                    { symbol: 'ADA', name: 'Cardano Staking', apy: 5.1, status: 'Available' },
                    { symbol: 'DOT', name: 'Polkadot Staking', apy: 12.5, status: 'Available' },
                  ].map((option, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.04)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,92,255,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(124,92,255,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: '#e6eef8' }}>
                            {option.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9db1cf' }}>
                            APY: {option.apy}%
                          </div>
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: `1px solid ${option.status === 'Active' ? '#39e0b6' : 'rgba(124,92,255,0.4)'}`,
                          background: option.status === 'Active' 
                            ? 'rgba(57,224,182,0.15)' 
                            : 'rgba(124,92,255,0.1)',
                          color: option.status === 'Active' ? '#39e0b6' : '#c5d4ff',
                          fontSize: '11px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}>
                          {option.status}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #6c5cff, #39e0b6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {option.apy}% APY
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '100px 24px',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, transparent, rgba(124,92,255,0.03))'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '800',
            margin: '0 0 20px 0',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #e6eef8 0%, #9db1cf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Powerful Features
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#9db1cf',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Everything you need to manage your cryptocurrency portfolio effectively
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              ),
              title: 'Hardware Wallet Security',
              desc: 'Your private keys never leave your Ledger device. Maximum security with hardware wallet integration.'
            },
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"/>
                  <line x1="18" y1="20" x2="18" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="16"/>
                </svg>
              ),
              title: 'Real-Time Portfolio Tracking',
              desc: 'Track your assets across multiple chains with live price updates and P&L tracking.'
            },
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="8" r="6"/>
                  <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
                  <path d="M7 6h1v4"/>
                  <path d="M16 16h1v4"/>
                </svg>
              ),
              title: 'Staking & Yield Farming',
              desc: 'Earn passive income by staking your assets. APY up to 18.5% on supported protocols.'
            },
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
              title: 'Multi-Chain Support',
              desc: 'Support for Bitcoin, Ethereum, Solana, Polygon, and 12+ more blockchains.'
            },
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              ),
              title: 'DeFi Integration',
              desc: 'Connect to 50+ DeFi protocols. Trade, lend, borrow, and yield farm—all in one place.'
            },
            {
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              ),
              title: 'Lightning Fast',
              desc: 'Optimized transactions with smart routing and batch operations for maximum efficiency.'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              padding: '32px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              opacity: loading ? 0 : 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,92,255,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(124,92,255,0.05))',
                border: '1px solid rgba(124,92,255,0.3)',
                borderRadius: '12px',
                color: '#6c5cff'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#e6eef8'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#9db1cf',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          padding: '48px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          {[
            { 
              label: 'Supported Networks', 
              value: '12+', 
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              )
            },
            { 
              label: 'DeFi Protocols', 
              value: '50+', 
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              )
            },
            { 
              label: 'Total Assets Tracked', 
              value: '$2.1B+', 
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9z"/>
                  <path d="M11 3L8 9l4 12 4-12-3-6"/>
                </svg>
              )
            },
            { 
              label: 'Active Users', 
              value: '125K+', 
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )
            }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '12px',
                color: '#6c5cff'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                background: 'linear-gradient(135deg,rgb(243, 242, 255),rgb(167, 167, 167))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#9db1cf',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{
        padding: '100px 24px',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, rgba(124,92,255,0.03), transparent)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '800',
            margin: '0 0 20px 0',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #e6eef8 0%, #9db1cf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Perfect For
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#9db1cf',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Whether you're a trader, investor, or DeFi enthusiast
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              ),
              title: 'Portfolio Management',
              desc: 'Track all your crypto assets in one place with real-time valuations and performance metrics.'
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9z"/>
                  <path d="M11 3L8 9l4 12 4-12-3-6"/>
                </svg>
              ),
              title: 'Staking Rewards',
              desc: 'Earn passive income by staking your cryptocurrencies with competitive APY rates.'
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/>
                  <polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              ),
              title: 'DeFi Trading',
              desc: 'Access decentralized exchanges, lending protocols, and yield farming opportunities.'
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              ),
              title: 'Secure Storage',
              desc: 'Store your assets securely with hardware wallet integration and multi-signature support.'
            }
          ].map((useCase, i) => (
            <div key={i} style={{
              padding: '32px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              opacity: loading ? 0 : 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,92,255,0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,92,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(124,92,255,0.05))',
                border: '1px solid rgba(124,92,255,0.3)',
                borderRadius: '12px',
                color: '#6c5cff'
              }}>
                {useCase.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#e6eef8'
              }}>
                {useCase.title}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#9db1cf',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {useCase.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(124,92,255,0.1), rgba(57,224,182,0.05))',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: '800',
            margin: '0 0 24px 0',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #e6eef8 0%, #9db1cf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#9db1cf',
            margin: '0 0 40px 0',
            lineHeight: '1.7'
          }}>
            Launch the full dashboard and start managing your cryptocurrency portfolio today.
            <br />
            No credit card required. Free forever.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,255,0.25), rgba(124,92,255,0.1))',
              border: '1px solid rgba(124,92,255,0.4)',
              color: '#e6eef8',
              padding: '18px 48px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(124,92,255,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,255,0.35), rgba(124,92,255,0.2))'
              e.currentTarget.style.borderColor = 'rgba(124,92,255,0.6)'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,92,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,255,0.25), rgba(124,92,255,0.1))'
              e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,92,255,0.2)'
            }}
          >
            Launch Dashboard Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '13px',
          color: '#6b7a9a',
          margin: '0 0 16px 0'
        }}>
          <strong>Demo Application:</strong> This is a demonstration. 
          Never use real private keys or seeds. All functionality is simulated.
        </p>
        <div style={{
          fontSize: '12px',
          color: '#6b7a9a'
        }}>
          © 2025 Ledger Wallet • Open Source • MIT License
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseValue {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
