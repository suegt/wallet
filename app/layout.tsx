import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ledger Wallet App - Cryptocurrency Portfolio Manager',
  description: 'Modern cryptocurrency wallet interface with multi-chain support. Manage Bitcoin, Ethereum, and Solana accounts with real-time portfolio tracking and transaction history.',
  keywords: ['cryptocurrency', 'wallet', 'bitcoin', 'ethereum', 'solana', 'portfolio', 'ledger', 'blockchain'],
  authors: [{ name: 'Developer' }],
  openGraph: {
    title: 'Ledger Wallet App - Cryptocurrency Portfolio Manager',
    description: 'Modern cryptocurrency wallet interface with multi-chain support and real-time portfolio tracking.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

