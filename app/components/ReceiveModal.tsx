'use client'

import { useState, useEffect } from 'react'
import type { Account } from '../types'

export default function ReceiveModal({ accounts, onClose, notify }: {
  accounts: Account[]
  onClose: () => void
  notify: (msg: string) => void
}) {
  const [account, setAccount] = useState(accounts[0]?.id || '')
  const [network, setNetwork] = useState('Bitcoin')
  const [address, setAddress] = useState('bc1q-demo-addr-0xDEADBEEF')

  const generateQR = () => {
    const size = 18, cell = 10
    const frag = document.createElement('div')
    frag.style.display = 'grid'
    frag.style.gridTemplateColumns = `repeat(${size}, ${cell}px)`
    frag.style.gap = '1px'
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const d = document.createElement('div')
        const on = Math.random() > 0.6 || (x < 3 && y < 3) || (x > size - 4 && y < 3) || (x < 3 && y > size - 4)
        d.style.width = cell + 'px'
        d.style.height = cell + 'px'
        d.style.background = on ? '#e6eef8' : 'transparent'
        frag.appendChild(d)
      }
    }
    const box = document.getElementById('qrBox')
    if (box) {
      box.innerHTML = ''
      box.appendChild(frag)
    }
  }

  useEffect(() => {
    generateQR()
  }, [])

  const copyAddr = () => {
    navigator.clipboard.writeText(address)
    notify('Address copied to clipboard.')
  }

  const regenAddr = () => {
    const r = Math.random().toString(36).slice(2, 8).toUpperCase()
    const newAddr = `bc1q-demo-${r}-${Date.now().toString(36).slice(-4)}`
    setAddress(newAddr)
    generateQR()
    notify('New receiving address generated (demo).')
  }

  return (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="recvTitle" aria-modal="true">
        <h3 id="recvTitle">Receive – Demo</h3>
        <div className="form">
          <div className="row2">
            <div className="field">
              <label>Account</label>
              <select value={account} onChange={(e) => setAccount(e.target.value)}>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.symbol})</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Network</label>
              <select value={network} onChange={(e) => setNetwork(e.target.value)}>
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Solana</option>
              </select>
            </div>
          </div>
          <div style={{display:'flex', gap:'12px', alignItems:'flex-start', flexWrap:'wrap'}}>
            <div className="qr" id="qrBox" aria-label="QR code (demo)"></div>
            <div className="field" style={{flex:1, minWidth:'220px'}}>
              <label>Receiving Address</label>
              <input className="input" value={address} readOnly />
              <div style={{display:'flex', gap:'8px', marginTop:'8px', flexWrap:'wrap'}}>
                <button className="btn" onClick={copyAddr}>Copy</button>
                <button className="btn ghost" onClick={regenAddr}>New Address</button>
              </div>
              <div className="muted" style={{marginTop:'6px', fontSize:'12px'}}>Always verify the address on your device. Seed/private key never appears here.</div>
            </div>
          </div>
          <div className="actions">
            <button className="btn primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

