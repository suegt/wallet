'use client'

export default function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <span>{message}</span>
    </div>
  )
}

