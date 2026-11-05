import type { ReactNode } from 'react'

interface EstadoVazioProps {
  titulo: string
  descricao: string
  acao?: ReactNode
}

/** Mensagem exibida quando a API responde sem dados. */
export function EstadoVazio({ titulo, descricao, acao }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-6 py-12 text-center">
      <span className="text-4xl" aria-hidden="true">📭</span>
      <p className="text-lg font-semibold text-slate-800">{titulo}</p>
      <p className="max-w-md text-slate-600">{descricao}</p>
      {acao}
    </div>
  )
}
