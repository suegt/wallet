'use client'

export default function Rail({ onManager }: { onManager: () => void }) {
  return (
    <aside className="rail">
      <section className="card">
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'8px',display:'grid',placeItems:'center',background:'rgba(124,92,255,.15)',border:'1px solid rgba(124,92,255,.35)'}}>
            🔌
          </div>
          <div>
            <div style={{fontWeight:700}}>Device Manager</div>
            <div className="muted" style={{fontSize:'12px'}}>Connection & apps</div>
          </div>
        </div>
        <div className="chips" style={{marginTop:'10px'}}>
          <span className="chip2">Genuine check</span>
          <span className="chip2">App install</span>
          <span className="chip2">Firmware</span>
        </div>
      </section>
      <section className="card">
        <div className="muted" style={{marginBottom:'6px'}}>Installed Apps</div>
        <div className="chips">
          <span className="chip2">Bitcoin</span>
          <span className="chip2">Ethereum</span>
          <span className="chip2">Solana</span>
        </div>
        <div className="actions" style={{justifyContent:'flex-start', marginTop:'10px'}}>
          <button className="btn" onClick={onManager}>Manage</button>
        </div>
      </section>
    </aside>
  )
}


