import type { Consulta, ConsultaUpdateRequest } from '../types'
import { requisicao } from './api'

export function listarConsultas(): Promise<Consulta[]> {
  return requisicao<Consulta[]>('/consultas')
}

export function buscarConsulta(id: number): Promise<Consulta> {
  return requisicao<Consulta>(`/consultas/${id}`)
}

export function atualizarConsulta(id: number, dados: ConsultaUpdateRequest): Promise<Consulta> {
  return requisicao<Consulta>(`/consultas/${id}`, { method: 'PUT', body: JSON.stringify(dados) })
}

/** Cancela mantendo médico, especialidade e horário (PUT com status CANCELADA). */
export function cancelarConsulta(consulta: Consulta): Promise<Consulta> {
  return atualizarConsulta(consulta.id, {
    medicoId: consulta.medicoId,
    especialidadeId: consulta.especialidadeId,
    dataConsulta: consulta.dataConsulta,
    status: 'CANCELADA',
    esperaMin: null,
  })
}

/**
 * Fila inteligente: consultas AGENDADAS ordenadas por prioridade (1 primeiro)
 * e, empatando, pelo horário.
 */
export function ordenarFila(consultas: Consulta[]): Consulta[] {
  return consultas
    .filter((c) => c.status === 'AGENDADA')
    .sort((a, b) => a.prioridade - b.prioridade || a.dataConsulta.localeCompare(b.dataConsulta))
}
