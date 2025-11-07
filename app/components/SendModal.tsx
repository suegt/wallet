'use client'

import { useState } from 'react'
import type { Account, Transaction } from '../types'

export default function SendModal({ accounts, onClose, onSend }: {
  accounts: Account[]
  onClose: () => void
  onSend: (tx: Transaction) => void
}) {
  const [from, setFrom] = useState(accounts[0]?.id || '')
  const [network, setNetwork] = useState('Ethereum')
  const [token, setToken] = useState('USDT')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [fee, setFee] = useState('')
  const [sending, setSending] = useState(false)

  const selectedAccount = accounts.find(a => a.id === from)
  const isUSDT = token === 'USDT'
  const availableNetworks = isUSDT 
    ? ['Ethereum', 'Tron', 'BSC', 'Polygon', 'Arbitrum', 'Optimism'] 
    : ['Bitcoin', 'Ethereum', 'Solana']

  const handleSend = async () => {
    if (!to || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid recipient address and amount.')
      return
    }

    if (!to.match(/^0x[a-fA-F0-9]{40}$/) && network === 'Ethereum' && isUSDT) {
      alert('Please enter a valid Ethereum address (0x...).')
      return
    }

    setSending(true)

    // Simulate real USDT transfer process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate transaction hash
    const txHash = '0x' + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')

    // Format date in local timezone
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day} ${hours}:${minutes}`

    const tx: Transaction = {
      t: dateStr,
      acc: selectedAccount?.name || 'USDT – Main',
      type: 'Out',
      amt: `-${parseFloat(amount).toFixed(6)} ${token}`,
      status: 'Pending',
      toAddress: to,
      token: token,
      network: network,
      txHash: txHash
    }
    
    setSending(false)
    onSend(tx)
  }

  return (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="sendTitle" aria-modal="true">
        <h3 id="sendTitle">{isUSDT ? 'Send USDT' : 'Send'}</h3>
        <div className="form">
          <div className="row2">
            <div className="field">
              <label>From Account</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} disabled={sending}>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.symbol})</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Token</label>
              <select value={token} onChange={(e) => setToken(e.target.value)} disabled={sending}>
                <option value="USDT">USDT (Tether)</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Network</label>
            <select value={network} onChange={(e) => setNetwork(e.target.value)} disabled={sending}>
              {availableNetworks.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Recipient Address</label>
            <input 
              className="input" 
              value={to} 
              onChange={(e) => setTo(e.target.value)} 
              placeholder={isUSDT ? "0x..." : "bc1... / 0x... / ..."} 
              disabled={sending}
            />
            {isUSDT && (
              <div className="muted" style={{fontSize:'11px', marginTop:'4px'}}>
                {network === 'Ethereum' && 'Ethereum address format (0x...)'}
                {network === 'Tron' && 'Tron address format (T...)'}
                {network === 'BSC' && 'BSC address format (0x...)'}
                {network === 'Polygon' && 'Polygon address format (0x...)'}
                {network === 'Arbitrum' && 'Arbitrum address format (0x...)'}
                {network === 'Optimism' && 'Optimism address format (0x...)'}
              </div>
            )}
          </div>
          <div className="row2">
            <div className="field">
              <label>Amount ({token})</label>
              <input 
                className="input" 
                type="number"
                step="0.000001"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.001" 
                disabled={sending}
              />
              {selectedAccount && (
                <div className="muted" style={{fontSize:'11px', marginTop:'4px'}}>
                  Balance: {selectedAccount.balance.toFixed(6)} {selectedAccount.symbol}
                </div>
              )}
            </div>
            <div className="field">
              <label>Fee</label>
              <input 
                className="input" 
                value={fee} 
                onChange={(e) => setFee(e.target.value)} 
                placeholder={isUSDT ? "Gas: auto" : "sat/vB, gwei, etc."} 
                disabled={sending}
              />
            </div>
          </div>
          {isUSDT && (
            <div className="field" style={{
              padding: '12px',
              background: 'rgba(124,92,255,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(124,92,255,0.2)',
              marginTop: '8px'
            }}>
              <div style={{fontSize:'12px', fontWeight: 600, marginBottom: '4px'}}>USDT Transfer Info</div>
              <div className="muted" style={{fontSize:'11px'}}>
                Network: <strong>{network}</strong> • Token: <strong>{token}</strong>
              </div>
            </div>
          )}
          <div className="actions">
            <button className="btn ghost" onClick={onClose} disabled={sending}>Cancel</button>
            <button 
              className="btn primary" 
              onClick={handleSend}
              disabled={sending || !to || !amount}
            >
              {sending ? 'Sending...' : isUSDT ? 'Send USDT' : 'Sign & Broadcast'}
            </button>
          </div>
          <div className="muted" style={{fontSize:'12px'}}>
            {isUSDT 
              ? '⚠️ USDT transfer will be recorded in transaction history.'
              : 'Warning: Demonstration only. Never use a real seed/private key here.'}
          </div>
        </div>
      </div>
    </div>
  )
}

