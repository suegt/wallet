'use client'

import { useState } from 'react'
import type { Account, Transaction } from '../types'

export default function SendModal({ accounts, onClose, onSend }: {
  accounts: Account[]
  onClose: () => void
  onSend: (tx: Transaction) => void
}) {
  const [from, setFrom] = useState(accounts[0]?.id || '')
  const [network, setNetwork] = useState('Bitcoin')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [fee, setFee] = useState('')

  const handleSend = () => {
    const tx: Transaction = {
      t: new Date().toISOString().slice(0, 16).replace('T', ' '),
      acc: accounts.find(a => a.id === from)?.name || 'BTC – Main',
      type: 'Out',
      amt: `-${amount} BTC`,
      status: 'Pending'
    }
    onSend(tx)
  }

  return (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="sendTitle" aria-modal="true">
        <h3 id="sendTitle">Send – Demo</h3>
        <div className="form">
          <div className="row2">
            <div className="field">
              <label>From Account</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
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
          <div className="field">
            <label>Recipient Address</label>
            <input className="input" value={to} onChange={(e) => setTo(e.target.value)} placeholder="bc1... / 0x... / ..." />
          </div>
          <div className="row2">
            <div className="field">
              <label>Amount</label>
              <input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.001" />
            </div>
            <div className="field">
              <label>Fee (sat/vB, gwei, etc.)</label>
              <input className="input" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="fast: 10" />
            </div>
          </div>
          <div className="actions">
            <button className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={handleSend}>Sign & Broadcast (demo)</button>
          </div>
          <div className="muted" style={{fontSize:'12px'}}>Warning: Demonstration only. Never use a real seed/private key here.</div>
        </div>
      </div>
    </div>
  )
}

