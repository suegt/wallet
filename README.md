# Ledger Wallet App

A modern, cryptocurrency wallet interface built with Next.js and React. This application demonstrates a Ledger-like wallet interface with real-time portfolio tracking, multi-chain account management, and transaction history.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)

## 🚀 Features

- **Portfolio Dashboard**: Real-time portfolio value tracking with animated price updates
- **Multi-Chain Support**: Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) account management
- **Transaction History**: Complete transaction log with status tracking
- **Send/Receive Modals**: Interactive UI for cryptocurrency transactions
- **Device Manager**: Ledger device connection and app management interface
- **Real-Time Updates**: Simulated live price updates with smooth animations
- **Responsive Design**: Modern, dark-themed UI optimized for desktop
- **Type-Safe**: Full TypeScript implementation with strict type checking

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with JavaScript enabled

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd ledger-wallet-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## 🏃 Getting Started

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## 📁 Project Structure

```
ledger-wallet-app/
├── app/
│   ├── components/          # React components
│   │   ├── Main.tsx        # Main dashboard component
│   │   ├── Topbar.tsx      # Top navigation bar
│   │   ├── Sidebar.tsx     # Side navigation panel
│   │   ├── Rail.tsx        # Right sidebar rail
│   │   ├── SendModal.tsx   # Send transaction modal
│   │   ├── ReceiveModal.tsx # Receive modal
│   │   ├── ManagerModal.tsx # Device manager modal
│   │   └── Toast.tsx       # Toast notification component
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎨 Technologies & Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5.4
- **Styling**: CSS with CSS Variables
- **Fonts**: Google Fonts (Inter)

## 🔧 Key Features Implementation

### Real-Time Price Updates
- Simulated price fluctuations using intervals
- Smooth animations for value changes
- Portfolio value calculation across all accounts

### Account Management
- Filter accounts by cryptocurrency
- Display balances in both native and USD values
- Support for multiple accounts per chain

### Transaction Handling
- Transaction history with status indicators
- Incoming and outgoing transaction types
- Modal-based transaction UI

## 🚀 Deployment

This application is ready to deploy on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

### Vercel Deployment

```bash
npm i -g vercel
vercel
```

## 📝 Notes

⚠️ **Important**: This is a demonstration application. All functionality is simulated for UI/UX purposes only. Never use real private keys or seeds with this application.

## 🎯 Portfolio Highlights

- Modern React/Next.js architecture
- TypeScript for type safety
- Client-side rendering optimizations (SSR/hydration fixes)
- Component-based architecture
- Responsive and accessible UI
- Clean code structure and best practices

## 📄 License

This project is available for portfolio demonstration purposes.

## 👨‍💻 Development

Built with attention to:
- Code quality and maintainability
- Performance optimizations
- User experience
- Modern web standards
- Best practices for Next.js and React

---

**Built with ❤️ using Next.js and React**

