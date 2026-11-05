// Tipos dos dados da API Java do CuidAí (mesmos nomes dos DTOs de resposta)

export type StatusConsulta = 'AGENDADA' | 'REALIZADA' | 'FALTOU' | 'CANCELADA'

/** 1 = Alta (idoso 60+ ou gestante), 2 = Média (crônico), 3 = Normal */
export type Prioridade = 1 | 2 | 3

export interface Cidadao {
  id: number
  nome: string
  cpf: string
  cartaoSus: string
  dataNascimento: string // "AAAA-MM-DD"
  telefone: string
  email: string | null
  gestante: boolean
  cronico: boolean
  idade: number
  prioridade: Prioridade
}

/** Corpo enviado em POST/PUT /cidadaos */
export type CidadaoRequest = Omit<Cidadao, 'id' | 'idade' | 'prioridade'>

export interface Medico {
  id: number
  ubsId: number
  nome: string
  crm: string
  ativo: boolean
}

export interface Consulta {
  id: number
  cidadaoId: number
  nomeCidadao: string
  medicoId: number
  nomeMedico: string
  especialidadeId: number
  nomeEspecialidade: string
  dataAgendamento: string // "AAAA-MM-DDTHH:mm:ss"
  dataConsulta: string
  status: StatusConsulta
  prioridade: Prioridade
  esperaMin: number | null
}

/** Corpo enviado em POST /cidadaos/{id}/consultas */
export interface AgendamentoRequest {
  medicoId: number
  especialidadeId: number
  dataConsulta: string
}

/** Corpo enviado em PUT /consultas/{id} */
export interface ConsultaUpdateRequest extends AgendamentoRequest {
  status: StatusConsulta
  esperaMin: number | null
}

/** JSON de erro padronizado devolvido pela API */
export interface ErroApi {
  timestamp: string
  status: number
  erro: string
  mensagem: string
  caminho: string
  campos: string[] | null
}

/** Dados exibidos na página de integrantes (não vêm da API) */
export interface Integrante {
  rm: string
  nome: string
  turma: string
  papel: string
  github: string
  linkedin: string
  foto: string
}

export interface Especialidade {
  id: number
  nome: string
}

export interface PerguntaFaq {
  pergunta: string
  resposta: string
}
