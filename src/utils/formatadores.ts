import type { Prioridade, StatusConsulta } from '../types'

/** "2026-11-12T08:00:00" -> "12/11/2026 às 08:00" */
export function formatarDataHora(iso: string): string {
  const [data, hora = ''] = iso.split('T')
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano} às ${hora.slice(0, 5)}`
}

/** "1950-03-12" -> "12/03/1950" */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

/** "40312567801" -> "403.125.678-01" */
export function formatarCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/** "11987654321" -> "(11) 98765-4321" · "1134567890" -> "(11) 3456-7890" */
export function formatarTelefone(telefone: string): string {
  const numeros = telefone.replace(/\D/g, '')
  if (numeros.length === 11) return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  if (numeros.length === 10) return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  return telefone
}

/** "898001234567890" -> "898 0012 3456 7890" */
export function formatarCartaoSus(cartao: string): string {
  return cartao.replace(/\D/g, '').replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
}

export const NOME_PRIORIDADE: Record<Prioridade, string> = {
  1: 'Alta',
  2: 'Média',
  3: 'Normal',
}

export const NOME_STATUS: Record<StatusConsulta, string> = {
  AGENDADA: 'Agendada',
  REALIZADA: 'Realizada',
  FALTOU: 'Faltou',
  CANCELADA: 'Cancelada',
}
