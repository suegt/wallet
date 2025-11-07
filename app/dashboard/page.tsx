'use client'

import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import AccountsPage from '../components/AccountsPage'
import DiscoverPage from '../components/DiscoverPage'
import MarketsPage from '../components/MarketsPage'
import EarnPage from '../components/EarnPage'
import Rail from '../components/Rail'
import SendModal from '../components/SendModal'
import ReceiveModal from '../components/ReceiveModal'
import ManagerModal from '../components/ManagerModal'
import Toast from '../components/Toast'
import type { Account, Transaction, FilterValue } from '../types'

// Helper function to format date in local timezone
function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// Initialize with sample transactions in local timezone
function getInitialTransactions(): Transaction[] {
  const now = new Date()
  return [
    { 
      t: formatLocalDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)), // 2 hours ago
      acc:'BTC – Main', 
      type:'In', 
      amt:'+0.010000 BTC', 
      status:'Confirmed' 
    },
    { 
      t: formatLocalDate(new Date(now.getTime() - 24 * 60 * 60 * 1000)), // 1 day ago
      acc:'ETH – DeFi', 
      type:'Out', 
      amt:'-0.200000 ETH', 
      status:'Pending' 
    },
    { 
      t: formatLocalDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
      acc:'SOL – Stake', 
      type:'In', 
      amt:'+5.000000 SOL', 
      status:'Confirmed' 
    },
    { 
      t: formatLocalDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)), // 7 days ago
      acc:'BTC – Main', 
      type:'Out', 
      amt:'-0.003500 BTC', 
      status:'Confirmed' 
    },
  ]
}

/**
 * Dashboard page - Main application interface
 */
export default function Dashboard() {
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([
    { id:'acc-btc-1', name:'BTC – Main', symbol:'BTC', network:'Bitcoin', address:'bc1qxx...demo1', balance: 13.5321, price: 68000 },
    { id:'acc-eth-1', name:'ETH – DeFi', symbol:'ETH', network:'Ethereum', address:'0xabc...def', balance: 2.14, price: 3500 },
    { id:'acc-sol-1', name:'SOL – Stake', symbol:'SOL', network:'Solana', address:'SoL1...demo', balance: 120.5, price: 160 },
    { id:'acc-usdt-1', name:'USDT – Main', symbol:'USDT', network:'Ethereum', address:'0xdef...123', balance: 5000, price: 1.0 },
  ])
  const [txs, setTxs] = useState<Transaction[]>(getInitialTransactions())
  const [apps, setApps] = useState(['Bitcoin','Ethereum','Solana'])
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [recvModalOpen, setRecvModalOpen] = useState(false)
  const [mgrModalOpen, setMgrModalOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: '' })
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectedPage, setSelectedPage] = useState('portfolio')

  useEffect(() => {
    // Simulate initial page load
    setTimeout(() => setLoading(false), 800)
  }, [])

  const handlePageChange = (page: string) => {
    if (page !== selectedPage) {
      setPageLoading(true)
      setTimeout(() => {
        setSelectedPage(page)
        setTimeout(() => setPageLoading(false), 400)
      }, 200)
    }
  }

  const notify = (msg: string) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 2600)
  }

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
        onPageChange={handlePageChange}
        onAddAccount={() => notify('Account added (demo).')}
        onSync={() => notify('Account synchronization started (demo).')}
      />
      
      {/* Loading State */}
      {pageLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          zIndex: 1000,
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

      {selectedPage === 'portfolio' && !pageLoading && (
        <Main 
          accounts={accounts}
          txs={txs}
          filter={filter}
          onFilterChange={setFilter}
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'accounts' && !pageLoading && (
        <AccountsPage 
          accounts={accounts}
          transactions={txs}
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'discover' && !pageLoading && (
        <DiscoverPage 
          onSend={() => setSendModalOpen(true)}
          onReceive={() => setRecvModalOpen(true)}
        />
      )}
      {selectedPage === 'market' && !pageLoading && (
        <MarketsPage         />
      )}
      {selectedPage === 'earn' && !pageLoading && (
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
            // Sort transactions by date (newest first)
            const updatedTxs = [tx, ...txs].sort((a, b) => {
              const dateA = a.t.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:00')
              const dateB = b.t.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:00')
              return new Date(dateB).getTime() - new Date(dateA).getTime()
            })
            setTxs(updatedTxs)
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
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

