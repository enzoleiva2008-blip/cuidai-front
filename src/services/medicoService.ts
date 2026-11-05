import type { Medico } from '../types'
import { requisicao } from './api'

export function listarMedicos(): Promise<Medico[]> {
  return requisicao<Medico[]>('/medicos')
}
