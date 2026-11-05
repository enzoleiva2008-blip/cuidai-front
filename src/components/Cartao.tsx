import type { ReactNode } from 'react'

interface CartaoProps {
  children: ReactNode
  className?: string
}

/** Caixa branca com borda e sombra, usada em listas e destaques. */
export function Cartao({ children, className = '' }: CartaoProps) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>
}
