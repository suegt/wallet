'use client'

import { useState } from 'react'

interface DiscoverPageProps {
  onSend: () => void
  onReceive: () => void
}

/**
 * Discover page - discover new features, apps, and services
 */
export default function DiscoverPage({ onSend, onReceive }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    { 
      title: 'DeFi Integration', 
      desc: 'Connect to decentralized finance protocols and manage your DeFi positions directly from your wallet', 
      icon: '🔗', 
      badge: 'New',
      stats: '50+ protocols',
      category: 'DeFi'
    },
    { 
      title: 'NFT Gallery', 
      desc: 'View, manage, and transfer your NFT collection across multiple blockchains in one place', 
      icon: '🖼️', 
      badge: 'Beta',
      stats: 'Multi-chain',
      category: 'NFT'
    },
    { 
      title: 'DApp Browser', 
      desc: 'Browse and interact with decentralized applications securely with built-in Web3 wallet integration', 
      icon: '🌐', 
      badge: 'Coming Soon',
      stats: 'Q1 2025',
      category: 'Browser'
    },
    { 
      title: 'Staking Dashboard', 
      desc: 'Monitor your staking rewards, validator performance, and earnings across all supported networks', 
      icon: '💰', 
      badge: 'New',
      stats: '6 networks',
      category: 'Staking'
    },
    {
      title: 'Transaction Builder',
      desc: 'Create complex multi-step transactions with gas optimization and batch operations',
      icon: '⚙️',
      badge: 'Beta',
      stats: 'Advanced',
      category: 'Tools'
    },
    {
      title: 'Portfolio Analytics',
      desc: 'Advanced analytics with P&L tracking, tax reports, and comprehensive portfolio insights',
      icon: '📊',
      badge: 'Beta',
      stats: 'Real-time',
      category: 'Analytics'
    }
  ]

  const popularDApps = [
    { 
      name: 'Uniswap', 
      desc: 'Decentralized Exchange', 
      icon: '🦄', 
      category: 'DeFi',
      volume: '$2.1B',
      users: '1.2M',
      chain: 'Ethereum',
      rating: 4.8
    },
    { 
      name: 'OpenSea', 
      desc: 'NFT Marketplace', 
      icon: '🌊', 
      category: 'NFT',
      volume: '$890M',
      users: '890K',
      chain: 'Multi-chain',
      rating: 4.6
    },
    { 
      name: 'Aave', 
      desc: 'Lending Protocol', 
      icon: '👻', 
      category: 'DeFi',
      volume: '$1.5B',
      users: '450K',
      chain: 'Ethereum',
      rating: 4.7
    },
    { 
      name: 'Compound', 
      desc: 'Yield Farming', 
      icon: '🧪', 
      category: 'DeFi',
      volume: '$420M',
      users: '230K',
      chain: 'Ethereum',
      rating: 4.5
    },
    {
      name: 'PancakeSwap',
      desc: 'DEX & Yield Farm',
      icon: '🥞',
      category: 'DeFi',
      volume: '$180M',
      users: '580K',
      chain: 'BNB Chain',
      rating: 4.4
    },
    {
      name: 'Magic Eden',
      desc: 'NFT Marketplace',
      icon: '✨',
      category: 'NFT',
      volume: '$320M',
      users: '210K',
      chain: 'Solana',
      rating: 4.3
    }
  ]

  const filteredDApps = searchQuery 
    ? popularDApps.filter(dapp => 
        dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dapp.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularDApps

  return (
    <main className="main">
      <div className="header">
        <section className="card portfolio">
          <div style={{minWidth:'260px'}}>
            <div className="muted" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'.12em'}}>Discover</div>
            <div className="big-number" style={{fontSize:'32px'}}>Explore & Connect</div>
            <div className="muted" style={{marginTop:'8px'}}>Discover new features, apps, and services in the crypto ecosystem</div>
            <div style={{marginTop:'12px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
              <span className="badge">50+ DApps</span>
              <span className="badge">6 Networks</span>
            </div>
          </div>
        </section>
      </div>

      <div className="content">
        <section className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <h3>Featured Features</h3>
            <div className="muted" style={{fontSize:'12px'}}>{features.length} features available</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'16px', marginTop:'16px'}}>
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="card" 
                style={{
                  padding:'20px', 
                  border:'1px solid var(--line)', 
                  cursor:'pointer', 
                  transition:'all 0.2s',
                  background: 'linear-gradient(135deg, rgba(124,92,255,0.05), rgba(0,0,0,0))'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:'12px'}}>
                  <div style={{fontSize:'32px', marginBottom:'12px'}}>{feature.icon}</div>
                  <span className="badge">{feature.badge}</span>
                </div>
                <h4 style={{margin:0, fontSize:'16px', fontWeight:600, marginBottom:'8px'}}>{feature.title}</h4>
                <div className="muted" style={{fontSize:'13px', marginBottom:'12px', lineHeight:'1.5'}}>{feature.desc}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'12px', borderTop:'1px solid var(--line)'}}>
                  <span className="chip" style={{fontSize:'11px'}}>{feature.category}</span>
                  <span className="muted" style={{fontSize:'11px'}}>{feature.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <h3>Popular DApps</h3>
            <div style={{position:'relative', width:'300px'}}>
              <input 
                type="text" 
                placeholder="Search DApps..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{paddingLeft:'36px', width:'100%'}}
              />
              <svg 
                width="16" 
                height="16" 
                style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', opacity:0.6}}
                viewBox="0 0 24 24" 
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-3.9-3.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'16px', marginTop:'16px'}}>
            {filteredDApps.length > 0 ? filteredDApps.map((dapp, i) => (
              <div 
                key={i} 
                className="card" 
                style={{
                  padding:'20px', 
                  border:'1px solid var(--line)', 
                  cursor:'pointer', 
                  transition:'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{fontSize:'32px'}}>{dapp.icon}</div>
                    <div>
                      <div style={{fontWeight:600, fontSize:'16px', marginBottom:'2px'}}>{dapp.name}</div>
                      <div className="muted" style={{fontSize:'12px'}}>{dapp.desc}</div>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'12px', color:'var(--success)', fontWeight:600}}>★ {dapp.rating}</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:'8px', marginBottom:'12px', flexWrap:'wrap'}}>
                  <span className="chip" style={{fontSize:'11px'}}>{dapp.category}</span>
                  <span className="chip" style={{fontSize:'11px', background:'rgba(124,92,255,0.1)'}}>{dapp.chain}</span>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', paddingTop:'12px', borderTop:'1px solid var(--line)'}}>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>24h Volume</div>
                    <div style={{fontSize:'13px', fontWeight:600}}>{dapp.volume}</div>
                  </div>
                  <div>
                    <div className="muted" style={{fontSize:'11px', marginBottom:'4px'}}>Users</div>
                    <div style={{fontSize:'13px', fontWeight:600}}>{dapp.users}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{gridColumn:'1/-1', textAlign:'center', padding:'40px'}}>
                <div className="muted">No DApps found matching "{searchQuery}"</div>
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <h3>Quick Actions</h3>
          <div className="quick" style={{marginTop:'16px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <button className="btn primary" onClick={onSend}>Send Assets</button>
            <button className="btn primary" onClick={onReceive}>Receive Assets</button>
            <button className="btn" disabled title="Demo">Explore DeFi</button>
            <button className="btn" disabled title="Demo">Browse NFTs</button>
            <button className="btn" disabled title="Demo">Connect Wallet</button>
          </div>
        </section>
      </div>
    </main>
  )
}
