import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { Botao } from '../components/Botao'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoFormulario } from '../components/CampoFormulario'
import { Cartao } from '../components/Cartao'
import { EtiquetaPrioridade } from '../components/Etiquetas'
import { mensagemDeErro } from '../services/api'
import { cadastrarCidadao } from '../services/cidadaoService'
import type { Cidadao } from '../types'
import {
  obrigatorio, somenteNumeros, validarCartaoSus, validarCpf,
  validarDataPassada, validarEmail, validarTelefone,
} from '../utils/validadores'

interface Formulario {
  nome: string
  cpf: string
  cartaoSus: string
  dataNascimento: string
  telefone: string
  email: string
  gestante: boolean
  cronico: boolean
}

type Erros = Partial<Record<keyof Formulario, string>>

const VAZIO: Formulario = {
  nome: '', cpf: '', cartaoSus: '', dataNascimento: '', telefone: '', email: '', gestante: false, cronico: false,
}

/** Página da solução: cadastro do cidadão (POST /cidadaos). */
export default function Cadastro() {
  const [form, setForm] = useState<Formulario>(VAZIO)
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [cadastrado, setCadastrado] = useState<Cidadao | null>(null)

  function alterar<K extends keyof Formulario>(campo: K, valor: Formulario[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function validar(): Erros {
    const todos: Erros = {
      nome: obrigatorio(form.nome, 'Nome'),
      cpf: validarCpf(form.cpf),
      cartaoSus: validarCartaoSus(form.cartaoSus),
      dataNascimento: validarDataPassada(form.dataNascimento, 'Data de nascimento'),
      telefone: validarTelefone(form.telefone),
      email: validarEmail(form.email),
    }
    return Object.fromEntries(Object.entries(todos).filter(([, v]) => v)) as Erros
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setErroApi(null)
    setCadastrado(null)

    const encontrados = validar()
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEnviando(true)
    try {
      const novo = await cadastrarCidadao({
        nome: form.nome.trim(),
        cpf: somenteNumeros(form.cpf),
        cartaoSus: somenteNumeros(form.cartaoSus),
        dataNascimento: form.dataNascimento,
        telefone: somenteNumeros(form.telefone),
        email: form.email.trim() === '' ? null : form.email.trim(),
        gestante: form.gestante,
        cronico: form.cronico,
      })
      setCadastrado(novo)
      setForm(VAZIO)
    } catch (erro) {
      setErroApi(mensagemDeErro(erro))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <CabecalhoPagina titulo="Cadastro do cidadão" subtitulo="Cadastre-se uma vez e agende consultas sempre que precisar. A prioridade na fila é calculada automaticamente." />

      <div className="grid gap-8 lg:grid-cols-3">
        <Cartao className="lg:col-span-2">
          <form noValidate onSubmit={enviar} className="flex flex-col gap-4">
            {erroApi && <Alerta tipo="erro" titulo="Não foi possível cadastrar" mensagem={erroApi} />}
            {Object.keys(erros).length > 0 && <Alerta tipo="erro" mensagem="Corrija os campos destacados." />}

            <CampoFormulario id="nome" rotulo="Nome completo" required value={form.nome} erro={erros.nome}
              onChange={(e) => alterar('nome', e.target.value)} autoComplete="name" maxLength={80} />

            <div className="grid gap-4 md:grid-cols-2">
              <CampoFormulario id="cpf" rotulo="CPF" required inputMode="numeric" value={form.cpf} erro={erros.cpf}
                dica="Só números (11 dígitos)" maxLength={14} onChange={(e) => alterar('cpf', e.target.value)} />
              <CampoFormulario id="cartaoSus" rotulo="Cartão SUS" required inputMode="numeric" value={form.cartaoSus}
                erro={erros.cartaoSus} dica="15 números do cartão" maxLength={18}
                onChange={(e) => alterar('cartaoSus', e.target.value)} />
              <CampoFormulario id="dataNascimento" rotulo="Data de nascimento" type="date" required
                value={form.dataNascimento} erro={erros.dataNascimento}
                onChange={(e) => alterar('dataNascimento', e.target.value)} />
              <CampoFormulario id="telefone" rotulo="Celular (WhatsApp)" type="tel" required inputMode="tel"
                value={form.telefone} erro={erros.telefone} dica="DDD + número, ex.: 11987654321" maxLength={15}
                onChange={(e) => alterar('telefone', e.target.value)} autoComplete="tel" />
            </div>

            <CampoFormulario id="email" rotulo="E-mail (opcional)" type="email" value={form.email} erro={erros.email}
              onChange={(e) => alterar('email', e.target.value)} autoComplete="email" maxLength={100} />

            <fieldset className="flex flex-col gap-2">
              <legend className="font-medium text-slate-800">Condições de saúde (definem a prioridade)</legend>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 accent-marca-700" checked={form.gestante}
                  onChange={(e) => alterar('gestante', e.target.checked)} />
                Estou gestante
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 accent-marca-700" checked={form.cronico}
                  onChange={(e) => alterar('cronico', e.target.checked)} />
                Tenho doença crônica (diabetes, hipertensão etc.)
              </label>
            </fieldset>

            <Botao type="submit" carregando={enviando} className="self-start">Cadastrar</Botao>
          </form>
        </Cartao>

        <div className="flex flex-col gap-4">
          {cadastrado ? (
            <Cartao className="border-green-600">
              <Alerta tipo="sucesso" titulo="Cadastro realizado!" mensagem={`${cadastrado.nome}, seu código é ${cadastrado.id}.`} />
              <p className="mt-4 text-slate-700">Idade: {cadastrado.idade} anos</p>
              <div className="mt-2"><EtiquetaPrioridade prioridade={cadastrado.prioridade} /></div>
              <Link to={`/agendar?cidadao=${cadastrado.id}`}
                className="mt-4 inline-block rounded-lg bg-marca-700 px-5 py-2.5 font-semibold text-white hover:bg-marca-800">
                Agendar consulta agora →
              </Link>
            </Cartao>
          ) : (
            <Cartao>
              <h2 className="text-lg font-bold text-marca-900">Como funciona a prioridade</h2>
              <ul className="mt-3 flex flex-col gap-2 text-slate-700">
                <li><strong>Alta:</strong> 60 anos ou mais, ou gestante</li>
                <li><strong>Média:</strong> doença crônica</li>
                <li><strong>Normal:</strong> demais cidadãos</li>
              </ul>
            </Cartao>
          )}
        </div>
      </div>
    </>
  )
}
