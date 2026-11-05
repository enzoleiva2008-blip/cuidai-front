import type { AgendamentoRequest, Cidadao, CidadaoRequest, Consulta } from '../types'
import { requisicao } from './api'

export function listarCidadaos(): Promise<Cidadao[]> {
  return requisicao<Cidadao[]>('/cidadaos')
}

export function buscarCidadao(id: number): Promise<Cidadao> {
  return requisicao<Cidadao>(`/cidadaos/${id}`)
}

export function cadastrarCidadao(dados: CidadaoRequest): Promise<Cidadao> {
  return requisicao<Cidadao>('/cidadaos', { method: 'POST', body: JSON.stringify(dados) })
}

/** Rota aninhada do 1:N: consultas de um cidadão */
export function listarConsultasDoCidadao(id: number): Promise<Consulta[]> {
  return requisicao<Consulta[]>(`/cidadaos/${id}/consultas`)
}

/** Rota aninhada do 1:N: agenda uma consulta para o cidadão */
export function agendarConsulta(cidadaoId: number, dados: AgendamentoRequest): Promise<Consulta> {
  return requisicao<Consulta>(`/cidadaos/${cidadaoId}/consultas`, {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}
