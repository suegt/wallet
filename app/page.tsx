'use client'

import { useState } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import AccountsPage from './components/AccountsPage'
import DiscoverPage from './components/DiscoverPage'
import MarketsPage from './components/MarketsPage'
import EarnPage from './components/EarnPage'
import Rail from './components/Rail'
import SendModal from './components/SendModal'
import ReceiveModal from './components/ReceiveModal'
import ManagerModal from './components/ManagerModal'
import Toast from './components/Toast'
import type { Account, Transaction, FilterValue } from './types'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [accounts, setAccounts] = useState<Account[]>([
    { id:'acc-btc-1', name:'BTC – Main', symbol:'BTC', network:'Bitcoin', address:'bc1qxx...demo1', balance: 13.5321, price: 68000 },
    { id:'acc-eth-1', name:'ETH – DeFi', symbol:'ETH', network:'Ethereum', address:'0xabc...def', balance: 2.14, price: 3500 },
    { id:'acc-sol-1', name:'SOL – Stake', symbol:'SOL', network:'Solana', address:'SoL1...demo', balance: 120.5, price: 160 },
  ])
  const [txs, setTxs] = useState<Transaction[]>([
    { t:'2025-10-25 14:22', acc:'BTC – Main', type:'In', amt:'+0.010000 BTC', status:'Confirmed' },
    { t:'2025-10-23 09:10', acc:'ETH – DeFi', type:'Out', amt:'-0.200000 ETH', status:'Pending' },
    { t:'2025-10-22 20:44', acc:'SOL – Stake', type:'In', amt:'+5.000000 SOL', status:'Confirmed' },
    { t:'2025-10-18 11:05', acc:'BTC – Main', type:'Out', amt:'-0.003500 BTC', status:'Confirmed' },
  ])
  const [apps, setApps] = useState(['Bitcoin','Ethereum','Solana'])
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [recvModalOpen, setRecvModalOpen] = useState(false)
  const [mgrModalOpen, setMgrModalOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: '' })
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectedPage, setSelectedPage] = useState('portfolio')

  const notify = (msg: string) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 2600)
  }

  return (
    <div className="app">
      <Topbar 
        onSend={() => setSendModalOpen(true)}
        onReceive={() => setRecvModalOpen(true)}
        onTheme={() => {
          setTheme(theme === 'dark' ? 'midnight' : 'dark')
          notify('Theme changed.')
        }}
      />
      <Sidebar 
        accounts={accounts}
        selectedPage={selectedPage}
        onPageChange={setSelectedPage}
        onAddAccount={() => notify('Account added (demo).')}
        onSync={() => notify('Account synchronization started (demo).')}
      />
      {selectedPage === 'portfolio' && (
        <Main 
          accounts={accounts}
          txs={txs}
          filter={filter}
          onFilterChange={setFilter}
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'accounts' && (
        <AccountsPage 
          accounts={accounts}
          transactions={txs}
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'discover' && (
        <DiscoverPage 
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'market' && (
        <MarketsPage />
      )}
      {selectedPage === 'earn' && (
        <EarnPage 
          accounts={accounts}
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      <Rail onManager={() => setMgrModalOpen(true)} />
      
      {sendModalOpen && (
        <SendModal 
          accounts={accounts}
          onClose={() => setSendModalOpen(false)}
          onSend={(tx: Transaction) => {
            setTxs([tx, ...txs])
            setSendModalOpen(false)
            notify('Transaction signed (demo).')
          }}
        />
      )}
      
      {recvModalOpen && (
        <ReceiveModal 
          accounts={accounts}
          onClose={() => setRecvModalOpen(false)}
          notify={notify}
        />
      )}
      
      {mgrModalOpen && (
        <ManagerModal 
          apps={apps}
          onClose={() => setMgrModalOpen(false)}
          notify={notify}
        />
      )}
      
      <Toast show={toast.show} message={toast.msg} />
    </div>
  )
}

