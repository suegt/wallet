'use client'

import { useState } from 'react'

export default function ManagerModal({ apps, onClose, notify }: {
  apps: string[]
  onClose: () => void
  notify: (msg: string) => void
}) {
  const [appList, setAppList] = useState(apps)

  const handleApply = () => {
    notify('Demo: Apps updated.')
    onClose()
  }

  return (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="mgrTitle" aria-modal="true">
        <h3 id="mgrTitle">App Manager – Demo</h3>
        <div className="form">
          <div className="row2">
            <div className="field">
              <label>Apps</label>
              <div className="chips">
                {appList.map((app, i) => (
                  <span key={i} className="chip2">{app}</span>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Store</label>
              <select className="input">
                <option>Popular</option>
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Solana</option>
              </select>
            </div>
          </div>
          <div className="actions">
            <button className="btn ghost" onClick={onClose}>Close</button>
            <button className="btn primary" onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

