'use client'

import { useState, useEffect, useMemo } from 'react'

interface MarketData {
  symbol: string
  name: string
  price: number
  change24h: number
  change7d: number
  volume: number
  marketCap: number
  rank: number
}

/**
 * Markets page - view cryptocurrency market data
 */
export default function MarketsPage() {
  const [loading, setLoading] = useState(true)
  const [markets, setMarkets] = useState<MarketData[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 68000, change24h: 2.5, change7d: 5.8, volume: 25000000000, marketCap: 1330000000000, rank: 1 },
    { symbol: 'ETH', name: 'Ethereum', price: 3500, change24h: -1.2, change7d: 3.4, volume: 12000000000, marketCap: 420000000000, rank: 2 },
    { symbol: 'SOL', name: 'Solana', price: 160, change24h: 5.8, change7d: 12.3, volume: 2000000000, marketCap: 72000000000, rank: 5 },
    { symbol: 'BNB', name: 'BNB', price: 580, change24h: 0.5, change7d: 2.1, volume: 1500000000, marketCap: 87000000000, rank: 4 },
    { symbol: 'ADA', name: 'Cardano', price: 0.65, change24h: -0.8, change7d: 1.5, volume: 500000000, marketCap: 23000000000, rank: 9 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.2, change24h: 3.2, change7d: 8.7, volume: 400000000, marketCap: 9200000000, rank: 12 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.85, change24h: 1.8, change7d: 4.2, volume: 350000000, marketCap: 7800000000, rank: 14 },
    { symbol: 'AVAX', name: 'Avalanche', price: 38, change24h: -2.1, change7d: 6.5, volume: 280000000, marketCap: 15000000000, rank: 10 },
  ])

  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change24h' | 'marketCap'>('rank')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => {
        const priceChange = (Math.random() - 0.5) * 0.01
        const newPrice = m.price * (1 + priceChange)
        return {
          ...m,
          price: newPrice,
          change24h: m.change24h + (Math.random() - 0.5) * 0.3,
          change7d: m.change7d + (Math.random() - 0.5) * 0.2,
          volume: m.volume * (1 + (Math.random() - 0.5) * 0.05),
          marketCap: newPrice * (m.marketCap / m.price)
        }
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const sortedMarkets = useMemo(() => {
    return [...markets].sort((a, b) => {
      let compare = 0
      switch(sortBy) {
        case 'rank':
          compare = a.rank - b.rank
          break
        case 'price':
          compare = a.price - b.price
          break
        case 'change24h':
          compare = a.change24h - b.change24h
          break
        case 'marketCap':
          compare = a.marketCap - b.marketCap
          break
      }
      return sortOrder === 'asc' ? compare : -compare
    })
  }, [markets, sortBy, sortOrder])

  function usd(v: number) {
    return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
  }

  function formatLarge(v: number) {
    if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
    if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
    return usd(v)
  }

  const topGainers = markets.filter(m => m.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 5)
  const topLosers = markets.filter(m => m.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 5)

  return (
    <main className="main" style={{
      animation: loading ? 'none' : 'fadeIn 0.5s ease-out',
      opacity: loading ? 0 : 1
    }}>
      <div className="header">
        <section className="card portfolio">
          <div style={{minWidth:'260px'}}>
            <div className="muted" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'.12em'}}>Markets</div>
            <div className="big-number" style={{fontSize:'32px'}}>Live Prices</div>
            <div className="muted" style={{marginTop:'8px'}}>Real-time cryptocurrency market data</div>
            <div style={{marginTop:'12px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
              <span className="badge">Beta</span>
              <span className="badge">{markets.length} assets</span>
            </div>
            <div className="summary" style={{marginTop:'16px'}}>
              <div className="kpi">
                <div className="muted">Total Market Cap</div>
                <div className="v">{formatLarge(markets.reduce((sum, m) => sum + m.marketCap, 0))}</div>
              </div>
              <div className="kpi">
                <div className="muted">24h Volume</div>
                <div className="v">{formatLarge(markets.reduce((sum, m) => sum + m.volume, 0))}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="content">
        <section className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexWrap:'wrap', gap:'12px'}}>
            <h3 style={{margin:0}}>Market Overview</h3>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
              <select 
                className="input" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{padding:'6px 12px', fontSize:'13px'}}
              >
                <option value="rank">Sort by Rank</option>
                <option value="price">Sort by Price</option>
                <option value="change24h">Sort by 24h Change</option>
                <option value="marketCap">Sort by Market Cap</option>
              </select>
              <button 
                className="btn ghost" 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                style={{padding:'6px 12px', fontSize:'13px'}}
              >
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
              </button>
            </div>
          </div>
          <table style={{marginTop:'16px'}}>
            <thead>
              <tr>
                <th style={{width:'50px'}}>Rank</th>
                <th>Asset</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>7d Change</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
              </tr>
            </thead>
                  <tbody>
                    {sortedMarkets.map((m, i) => (
                      <tr key={m.symbol} style={{
                        animation: loading ? 'none' : `slideIn 0.4s ease-out ${i * 0.05}s both`,
                        opacity: loading ? 0 : 1
                      }}>
                  <td>
                    <span className="badge" style={{fontSize:'11px', padding:'4px 8px'}}>#{m.rank}</span>
                  </td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <div style={{
                        width:'32px',
                        height:'32px',
                        borderRadius:'6px',
                        background:'rgba(124,92,255,.15)',
                        border:'1px solid rgba(124,92,255,.35)',
                        display:'grid',
                        placeItems:'center',
                        fontSize:'16px',
                        fontWeight:600
                      }}>
                        {m.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div style={{fontWeight:600}}>{m.symbol}</div>
                        <div className="muted" style={{fontSize:'12px'}}>{m.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontWeight:600}}>{usd(m.price)}</td>
                  <td>
                    <span style={{color: m.change24h >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight:600}}>
                      {m.change24h >= 0 ? '+' : ''}{m.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td>
                    <span style={{color: m.change7d >= 0 ? 'var(--success)' : 'var(--danger)', fontSize:'13px'}}>
                      {m.change7d >= 0 ? '+' : ''}{m.change7d.toFixed(2)}%
                    </span>
                  </td>
                  <td className="muted">{formatLarge(m.volume)}</td>
                  <td className="muted" style={{fontWeight:600}}>{formatLarge(m.marketCap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'16px'}}>
          <section className="card">
            <h3>Top Gainers (24h)</h3>
            {topGainers.length > 0 ? (
              <div style={{marginTop:'16px', display:'flex', flexDirection:'column', gap:'8px'}}>
                {topGainers.map(m => (
                  <div 
                    key={m.symbol} 
                    style={{
                      padding:'14px', 
                      border:'1px solid var(--line)', 
                      borderRadius:'8px', 
                      display:'flex', 
                      justifyContent:'space-between',
                      alignItems:'center',
                      transition:'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--success)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                  >
                    <div>
                      <div style={{fontWeight:600, marginBottom:'4px'}}>{m.symbol} - {m.name}</div>
                      <div className="muted" style={{fontSize:'12px'}}>{usd(m.price)}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:'var(--success)', fontWeight:700, fontSize:'18px', marginBottom:'4px'}}>
                        +{m.change24h.toFixed(2)}%
                      </div>
                      <div className="muted" style={{fontSize:'11px'}}>24h</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted" style={{textAlign:'center', padding:'20px'}}>No gainers in the last 24h</div>
            )}
          </section>

          <section className="card">
            <h3>Top Losers (24h)</h3>
            {topLosers.length > 0 ? (
              <div style={{marginTop:'16px', display:'flex', flexDirection:'column', gap:'8px'}}>
                {topLosers.map(m => (
                  <div 
                    key={m.symbol} 
                    style={{
                      padding:'14px', 
                      border:'1px solid var(--line)', 
                      borderRadius:'8px', 
                      display:'flex', 
                      justifyContent:'space-between',
                      alignItems:'center',
                      transition:'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--danger)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                  >
                    <div>
                      <div style={{fontWeight:600, marginBottom:'4px'}}>{m.symbol} - {m.name}</div>
                      <div className="muted" style={{fontSize:'12px'}}>{usd(m.price)}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:'var(--danger)', fontWeight:700, fontSize:'18px', marginBottom:'4px'}}>
                        {m.change24h.toFixed(2)}%
                      </div>
                      <div className="muted" style={{fontSize:'11px'}}>24h</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted" style={{textAlign:'center', padding:'20px'}}>No losers in the last 24h</div>
            )}
          </section>
        </div>
      </div>
      <style>{`
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
