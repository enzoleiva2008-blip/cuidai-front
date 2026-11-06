import type { Especialidade, Integrante, PerguntaFaq } from '../types'

// Integrantes do grupo. foto é opcional: caminho em /public, ex.: '/fotos/568877.jpg'
export const INTEGRANTES: Integrante[] = [
  {
    rm: '568877',
    nome: 'Enzo Leiva',
    turma: '1TDSPO',
    papel: 'Front-end e integração',
    github: 'https://github.com/enzoleiva2008-blip',
    linkedin: 'https://www.linkedin.com/in/enzo-leiva-varrichio-88ba273a1/',
    foto: '',
  },
  {
    rm: '570878',
    nome: 'Matheus Segura',
    turma: '1TDSPO',
    papel: 'Banco de dados Oracle',
    github: 'https://github.com/MatheuSegura',
    linkedin: 'https://www.linkedin.com/in/matheussegura/',
    foto: '',
  },
  {
    rm: '572369',
    nome: 'Kauã Fiuza',
    turma: '1TDSPO',
    papel: 'Back-end Java',
    github: 'https://github.com/KauaznX',
    linkedin: 'https://www.linkedin.com/in/kau%C3%A3-fiuza-94a039313/',
    foto: '',
  },
  {
    rm: '572499',
    nome: 'Lucas Almeida',
    turma: '1TDSPO',
    papel: 'Python e Inteligência Artificial',
    github: 'https://github.com/LucasAlmeidaOliveira',
    linkedin: 'https://www.linkedin.com/in/lucasalmeidaoliva',
    foto: '',
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
    pergunta: 'Como cancelo uma consulta?',
    resposta:
      'Entre em "Consultas", abra a consulta e toque em "Não vou poder ir · Cancelar". A vaga volta para a fila na hora e outra pessoa pode ser atendida no seu lugar.',
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
