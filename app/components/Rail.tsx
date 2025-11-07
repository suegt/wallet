'use client'

import { useState, useEffect } from 'react'

interface DeviceStatus {
  connected: boolean
  device: string
  firmware: string
  battery?: number
  storage: number
  apps: string[]
  lastSync: string
}

export default function Rail({ onManager }: { onManager: () => void }) {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    connected: true,
    device: 'Ledger Nano X',
    firmware: '2.1.0',
    battery: 85,
    storage: 58,
    apps: ['Bitcoin', 'Ethereum', 'Solana'],
    lastSync: '2 min ago'
  })

  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    // Simulate periodic status updates
    const interval = setInterval(() => {
      setDeviceStatus(prev => ({
        ...prev,
        lastSync: 'Just now'
      }))
    }, 120000) // Update every 2 minutes

    return () => clearInterval(interval)
  }, [])

  const handleGenuineCheck = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      // In a real app, this would trigger actual device verification
    }, 2000)
  }

  return (
    <aside className="rail">
      {/* Device Manager Section */}
      <section className="card">
        <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'10px',display:'grid',placeItems:'center',background:'rgba(124,92,255,.15)',border:'1px solid rgba(124,92,255,.35)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12" y2="18"/>
            </svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, fontSize:'15px'}}>Device Manager</div>
            <div className="muted" style={{fontSize:'12px'}}>Connection & apps</div>
          </div>
          <div style={{
            width:'10px',
            height:'10px',
            borderRadius:'50%',
            background: deviceStatus.connected ? '#22c55e' : '#ef4444',
            boxShadow: deviceStatus.connected ? '0 0 8px rgba(34,197,94,0.5)' : 'none'
          }} title={deviceStatus.connected ? 'Connected' : 'Disconnected'}/>
        </div>
        
        <div className="chips" style={{marginTop:'12px'}}>
          <span className="chip2" style={{cursor:'pointer'}} onClick={handleGenuineCheck}>
            {isChecking ? 'Checking...' : 'Genuine check'}
          </span>
          <span className="chip2" style={{cursor:'pointer'}} onClick={onManager}>App install</span>
          <span className="chip2" style={{cursor:'pointer'}}>Firmware</span>
        </div>
      </section>

      {/* Device Status Section */}
      <section className="card">
        <div style={{marginBottom:'14px'}}>
          <div className="muted" style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'8px'}}>Device Status</div>
          <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px'}}>
            <div style={{width:'24px',height:'24px',borderRadius:'6px',display:'grid',placeItems:'center',background:'rgba(40,224,166,.15)',border:'1px solid rgba(40,224,166,.35)'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600, fontSize:'14px'}}>{deviceStatus.device}</div>
              <div className="muted" style={{fontSize:'11px'}}>Firmware {deviceStatus.firmware}</div>
            </div>
          </div>
        </div>

        <div className="row" style={{marginBottom:'10px'}}>
          <div className="muted" style={{fontSize:'12px'}}>Connection</div>
          <div className="v" style={{color: deviceStatus.connected ? '#22c55e' : '#ef4444', fontSize:'12px'}}>
            {deviceStatus.connected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {deviceStatus.battery !== undefined && (
          <div className="row" style={{marginBottom:'10px'}}>
            <div className="muted" style={{fontSize:'12px'}}>Battery</div>
            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <div style={{width:'40px', height:'6px', background:'rgba(255,255,255,0.1)', borderRadius:'3px', overflow:'hidden'}}>
                <div style={{
                  width:`${deviceStatus.battery}%`,
                  height:'100%',
                  background: deviceStatus.battery > 20 ? 'linear-gradient(90deg, #22c55e, #39e0b6)' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                  transition:'width 0.3s ease'
                }}/>
              </div>
              <span className="v" style={{fontSize:'12px'}}>{deviceStatus.battery}%</span>
            </div>
          </div>
        )}

        <div className="row">
          <div className="muted" style={{fontSize:'12px'}}>Last sync</div>
          <div className="v" style={{fontSize:'12px'}}>{deviceStatus.lastSync}</div>
        </div>
      </section>

      {/* Installed Apps Section */}
      <section className="card">
        <div style={{marginBottom:'12px'}}>
          <div className="muted" style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'8px'}}>Installed Apps</div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px'}}>
            <div style={{fontWeight:600, fontSize:'14px'}}>{deviceStatus.apps.length} apps</div>
            <button 
              className="btn ghost" 
              onClick={onManager}
              style={{padding:'4px 8px', fontSize:'11px'}}
            >
              Manage
            </button>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
          {deviceStatus.apps.map((app, i) => (
            <div 
              key={i}
              style={{
                display:'flex',
                alignItems:'center',
                gap:'10px',
                padding:'8px',
                borderRadius:'8px',
                background:'rgba(255,255,255,0.02)',
                border:'1px solid var(--line)',
                cursor:'pointer',
                transition:'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,92,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(124,92,255,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                e.currentTarget.style.borderColor = 'var(--line)'
              }}
            >
              <div style={{width:'24px',height:'24px',borderRadius:'6px',display:'grid',placeItems:'center',background:'rgba(124,92,255,.15)',border:'1px solid rgba(124,92,255,.35)', fontSize:'12px'}}>
                {app === 'Bitcoin' ? '₿' : app === 'Ethereum' ? 'Ξ' : app === 'Solana' ? '◎' : '◉'}
              </div>
              <div style={{flex:1, fontSize:'13px', fontWeight:500}}>{app}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity:0.5}}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Storage Section */}
      <section className="card">
        <div style={{marginBottom:'12px'}}>
          <div className="muted" style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'8px'}}>Storage</div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px'}}>
            <div style={{fontSize:'13px', fontWeight:600}}>{deviceStatus.storage}% used</div>
            <div className="muted" style={{fontSize:'11px'}}>{100 - deviceStatus.storage}% free</div>
          </div>
        </div>
        <div className="progress" style={{height:'10px'}}>
          <i style={{width:`${deviceStatus.storage}%`}}></i>
        </div>
        <div className="muted" style={{fontSize:'11px', marginTop:'8px'}}>
          {deviceStatus.apps.length} apps installed
        </div>
      </section>

      {/* Security Status */}
      <section className="card">
        <div style={{marginBottom:'12px'}}>
          <div className="muted" style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'8px'}}>Security</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'#22c55e'}}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span style={{fontSize:'12px', color:'#22c55e'}}>Genuine device verified</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'#22c55e'}}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span style={{fontSize:'12px', color:'#22c55e'}}>PIN protection enabled</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'#f59e0b'}}>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span style={{fontSize:'12px', color:'#f59e0b'}}>Firmware update available</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="card">
        <div style={{marginBottom:'12px'}}>
          <div className="muted" style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'8px'}}>Quick Actions</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
          <button 
            className="btn" 
            onClick={onManager}
            style={{width:'100%', justifyContent:'center'}}
          >
            Open Manager
          </button>
          <button 
            className="btn ghost" 
            onClick={handleGenuineCheck}
            disabled={isChecking}
            style={{width:'100%', justifyContent:'center'}}
          >
            {isChecking ? 'Verifying...' : 'Verify Device'}
          </button>
        </div>
      </section>
    </aside>
  )
}


