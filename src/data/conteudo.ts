import type { Especialidade, Integrante, PerguntaFaq } from '../types'

// ⚠️ TROCAR pelos dados reais do grupo (nome, RM, links e foto)
export const INTEGRANTES: Integrante[] = [
  {
    rm: '000001',
    nome: 'Integrante 1',
    turma: '1TDS',
    papel: 'Front-end e UX',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    foto: '', // opcional: caminho da foto em /public, ex.: '/fotos/rm000001.jpg'
  },
  {
    rm: '000002',
    nome: 'Integrante 2',
    turma: '1TDS',
    papel: 'Back-end Java',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    foto: '', // opcional: caminho da foto em /public, ex.: '/fotos/rm000001.jpg'
  },
  {
    rm: '000003',
    nome: 'Integrante 3',
    turma: '1TDS',
    papel: 'Banco de dados e IA',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    foto: '', // opcional: caminho da foto em /public, ex.: '/fotos/rm000001.jpg'
  },
]

/** Mesmos códigos da tabela TB_ESPECIALIDADE do banco */
export const ESPECIALIDADES: Especialidade[] = [
  { id: 1, nome: 'Clínica Geral' },
  { id: 2, nome: 'Pediatria' },
  { id: 3, nome: 'Ginecologia e Obstetrícia' },
  { id: 4, nome: 'Cardiologia' },
  { id: 5, nome: 'Dermatologia' },
]

export const PERGUNTAS_FAQ: PerguntaFaq[] = [
  {
    pergunta: 'O CuidAí substitui a UBS?',
    resposta:
      'Não. O CuidAí organiza o agendamento e a fila da sua UBS. O atendimento continua sendo feito pela equipe de saúde da unidade.',
  },
  {
    pergunta: 'Quem tem prioridade na fila?',
    resposta:
      'Pessoas com 60 anos ou mais e gestantes têm prioridade alta. Pessoas com doenças crônicas, como diabetes e hipertensão, têm prioridade média. A prioridade é calculada automaticamente pelo seu cadastro.',
  },
  {
    pergunta: 'Como recebo o lembrete da consulta?',
    resposta:
      'O chatbot do CuidAí envia um lembrete pelo WhatsApp um dia antes. É só responder "1" para confirmar. Se não puder ir, você pode cancelar e liberar o horário para outra pessoa.',
  },
  {
    pergunta: 'Preciso pagar alguma coisa?',
    resposta: 'Não. O CuidAí é gratuito para o cidadão, assim como o atendimento no SUS.',
  },
  {
    pergunta: 'Meus dados ficam protegidos?',
    resposta:
      'Sim. Os dados são usados apenas para agendar e lembrar suas consultas, seguindo a Lei Geral de Proteção de Dados (LGPD).',
  },
  {
    pergunta: 'Como a inteligência artificial é usada?',
    resposta:
      'A IA ajuda a UBS a prever o tempo de espera e quais consultas têm risco de falta. Assim a unidade pode enviar lembretes extras e encaixar quem está na fila.',
  },
]
