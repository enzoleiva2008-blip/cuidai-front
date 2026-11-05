import type { Prioridade, StatusConsulta } from '../types'
import { NOME_PRIORIDADE, NOME_STATUS } from '../utils/formatadores'

const COR_STATUS: Record<StatusConsulta, string> = {
  AGENDADA: 'bg-blue-100 text-blue-900',
  REALIZADA: 'bg-green-100 text-green-900',
  FALTOU: 'bg-amber-100 text-amber-900',
  CANCELADA: 'bg-slate-200 text-slate-800',
}

const COR_PRIORIDADE: Record<Prioridade, string> = {
  1: 'bg-red-100 text-red-900',
  2: 'bg-amber-100 text-amber-900',
  3: 'bg-slate-100 text-slate-800',
}

/** Etiqueta colorida com o status da consulta. */
export function EtiquetaStatus({ status }: { status: StatusConsulta }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${COR_STATUS[status]}`}>
      {NOME_STATUS[status]}
    </span>
  )
}

/** Etiqueta colorida com a prioridade na fila. */
export function EtiquetaPrioridade({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${COR_PRIORIDADE[prioridade]}`}>
      Prioridade {NOME_PRIORIDADE[prioridade]}
    </span>
  )
}
