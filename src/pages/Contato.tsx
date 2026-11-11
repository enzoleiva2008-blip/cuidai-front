import { useState, type FormEvent } from 'react'
import { Alerta } from '../components/Alerta'
import { Botao } from '../components/Botao'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoFormulario } from '../components/CampoFormulario'
import { Cartao } from '../components/Cartao'
import { obrigatorio, validarEmail } from '../utils/validadores'

interface DadosContato {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

type Erros = Partial<Record<keyof DadosContato, string>>

const LIMITE_MENSAGEM = 500

const VAZIO: DadosContato = { nome: '', email: '', assunto: '', mensagem: '' }

export default function Contato() {
  const [dados, setDados] = useState<DadosContato>(VAZIO)
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState(false)

  function alterar(campo: keyof DadosContato, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
    setEnviado(false)
  }

  function validar(): Erros {
    const novos: Erros = {
      nome: obrigatorio(dados.nome, 'Nome'),
      email: validarEmail(dados.email, true),
      assunto: obrigatorio(dados.assunto, 'Assunto'),
      mensagem: dados.mensagem.trim().length < 10 ? 'Escreva uma mensagem com pelo menos 10 caracteres.' : undefined,
    }
    return Object.fromEntries(Object.entries(novos).filter(([, v]) => v)) as Erros
  }

  function enviar(evento: FormEvent) {
    evento.preventDefault()
    const encontrados = validar()
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return
    // Projeto acadêmico: a mensagem não é enviada para nenhum servidor.
    setEnviado(true)
    setDados(VAZIO)
  }

  return (
    <>
      <CabecalhoPagina titulo="Contato" subtitulo="Dúvidas, sugestões ou parcerias com UBS e prefeituras? Fale com a gente." />
      <div className="grid gap-8 lg:grid-cols-3">
        <Cartao className="lg:col-span-2">
          <form noValidate onSubmit={enviar} className="flex flex-col gap-4">
            {enviado && <Alerta tipo="sucesso" titulo="Mensagem registrada!" mensagem="Obrigado pelo contato. Responderemos pelo e-mail informado." />}
            {Object.keys(erros).length > 0 && <Alerta tipo="erro" mensagem="Corrija os campos destacados antes de enviar." />}
            <div className="grid gap-4 md:grid-cols-2">
              <CampoFormulario id="nome" rotulo="Nome" required value={dados.nome} erro={erros.nome}
                onChange={(e) => alterar('nome', e.target.value)} autoComplete="name" />
              <CampoFormulario id="email" rotulo="E-mail" type="email" required value={dados.email} erro={erros.email}
                onChange={(e) => alterar('email', e.target.value)} autoComplete="email" />
            </div>
            <CampoFormulario id="assunto" rotulo="Assunto" required value={dados.assunto} erro={erros.assunto}
              onChange={(e) => alterar('assunto', e.target.value)} />
            <div className="flex flex-col gap-1">
              <label htmlFor="mensagem" className="font-medium text-slate-800">
                Mensagem <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <textarea id="mensagem" rows={5} value={dados.mensagem} maxLength={LIMITE_MENSAGEM}
                aria-invalid={erros.mensagem ? true : undefined}
                aria-describedby={erros.mensagem ? 'mensagem-erro mensagem-contador' : 'mensagem-contador'}
                onChange={(e) => alterar('mensagem', e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-marca-600 ${
                  erros.mensagem ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'}`} />
              <p id="mensagem-contador" className="self-end text-sm text-slate-500">
                {dados.mensagem.length}/{LIMITE_MENSAGEM} caracteres
              </p>
              {erros.mensagem && <p id="mensagem-erro" className="text-sm text-red-700">{erros.mensagem}</p>}
            </div>
            <Botao type="submit" className="self-start">Enviar mensagem</Botao>
          </form>
        </Cartao>
        <Cartao>
          <h2 className="text-lg font-bold text-marca-900">Outros canais</h2>
          <ul className="mt-3 flex flex-col gap-2 text-slate-700">
            <li>📧 contato@cuidai.com.br</li>
            <li>💬 WhatsApp: (11) 90000-0000</li>
            <li>📍 FIAP · Av. Paulista, 1106 · São Paulo</li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">Dados de contato fictícios (projeto acadêmico).</p>
        </Cartao>
      </div>
    </>
  )
}
