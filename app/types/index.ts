/**
 * Type definitions for the Ledger Wallet App
 */

export interface Account {
  id: string
  name: string
  symbol: string
  network: string
  address: string
  balance: number
  price: number
  usd?: number
}

export interface Transaction {
  t: string // timestamp
  acc: string // account name
  type: 'In' | 'Out'
  amt: string // amount
  status: string
  toAddress?: string // recipient address
  token?: string // token symbol (BTC, ETH, SOL, USDT)
  network?: string // network name
  txHash?: string // transaction hash
}

export type CryptoSymbol = 'BTC' | 'ETH' | 'SOL' | 'USDT'
export type FilterValue = 'all' | CryptoSymbol

