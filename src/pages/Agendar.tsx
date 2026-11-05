import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { Botao } from '../components/Botao'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoFormulario } from '../components/CampoFormulario'
import { CampoSelecao } from '../components/CampoSelecao'
import { Carregando } from '../components/Carregando'
import { Cartao } from '../components/Cartao'
import { EstadoVazio } from '../components/EstadoVazio'
import { ESPECIALIDADES } from '../data/conteudo'
import { mensagemDeErro } from '../services/api'
import { agendarConsulta, listarCidadaos } from '../services/cidadaoService'
import { listarMedicos } from '../services/medicoService'
import type { Cidadao, Consulta, Medico } from '../types'
import { formatarDataHora } from '../utils/formatadores'
import { validarDataFutura } from '../utils/validadores'

// Horários de atendimento: 07:00 até 16:30, de 30 em 30 minutos
const HORARIOS = Array.from({ length: 20 }, (_, i) => {
  const minutos = 7 * 60 + i * 30
  return `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`
})

interface Formulario {
  cidadaoId: string
  especialidadeId: string
  medicoId: string
  data: string
  horario: string
}

type Erros = Partial<Record<keyof Formulario, string>>

/** Página da solução: agendamento (GET /cidadaos, GET /medicos, POST /cidadaos/{id}/consultas). */
export default function Agendar() {
  const [parametros] = useSearchParams()
  const [cidadaos, setCidadaos] = useState<Cidadao[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erroCarga, setErroCarga] = useState<string | null>(null)

  const [form, setForm] = useState<Formulario>({
    cidadaoId: parametros.get('cidadao') ?? '', especialidadeId: '', medicoId: '', data: '', horario: '',
  })
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [agendada, setAgendada] = useState<Consulta | null>(null)

  // Carrega cidadãos e médicos da API ao abrir a página
  useEffect(() => {
    Promise.all([listarCidadaos(), listarMedicos()])
      .then(([listaCidadaos, listaMedicos]) => {
        setCidadaos(listaCidadaos)
        setMedicos(listaMedicos.filter((m) => m.ativo))
      })
      .catch((erro) => setErroCarga(mensagemDeErro(erro)))
      .finally(() => setCarregando(false))
  }, [])

  function alterar(campo: keyof Formulario, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function validar(): Erros {
    const dataHora = form.data && form.horario ? `${form.data}T${form.horario}` : ''
    const todos: Erros = {
      cidadaoId: form.cidadaoId ? undefined : 'Escolha o cidadão.',
      especialidadeId: form.especialidadeId ? undefined : 'Escolha a especialidade.',
      medicoId: form.medicoId ? undefined : 'Escolha o médico.',
      data: form.data ? undefined : 'Escolha o dia.',
      horario: form.horario ? validarDataFutura(dataHora) : 'Escolha o horário.',
    }
    return Object.fromEntries(Object.entries(todos).filter(([, v]) => v)) as Erros
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setErroApi(null)
    setAgendada(null)

    const encontrados = validar()
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEnviando(true)
    try {
      const consulta = await agendarConsulta(Number(form.cidadaoId), {
        medicoId: Number(form.medicoId),
        especialidadeId: Number(form.especialidadeId),
        dataConsulta: `${form.data}T${form.horario}:00`,
      })
      setAgendada(consulta)
    } catch (erro) {
      setErroApi(mensagemDeErro(erro))
    } finally {
      setEnviando(false)
    }
  }

  if (carregando) return <Carregando texto="Carregando cidadãos e médicos..." />
  if (erroCarga) return <Alerta tipo="erro" titulo="Erro ao carregar" mensagem={erroCarga} />
  if (cidadaos.length === 0) {
    return (
      <EstadoVazio
        titulo="Nenhum cidadão cadastrado"
        descricao="Para agendar, primeiro faça o cadastro do cidadão."
        acao={<Link to="/cadastro" className="font-semibold text-marca-700 underline">Ir para o cadastro</Link>}
      />
    )
  }

  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <>
      <CabecalhoPagina titulo="Agendar consulta" subtitulo="Escolha a especialidade, o médico, o dia e o horário. Você recebe o lembrete pelo WhatsApp." />

      <div className="grid gap-8 lg:grid-cols-3">
        <Cartao className="lg:col-span-2">
          <form noValidate onSubmit={enviar} className="flex flex-col gap-4">
            {erroApi && <Alerta tipo="erro" titulo="Não foi possível agendar" mensagem={erroApi} />}

            <CampoSelecao id="cidadaoId" rotulo="Cidadão" required value={form.cidadaoId} erro={erros.cidadaoId}
              opcoes={cidadaos.map((c) => ({ valor: c.id, texto: `${c.nome} (código ${c.id})` }))}
              onChange={(e) => alterar('cidadaoId', e.target.value)} />

            <div className="grid gap-4 md:grid-cols-2">
              <CampoSelecao id="especialidadeId" rotulo="Especialidade" required value={form.especialidadeId}
                erro={erros.especialidadeId} opcoes={ESPECIALIDADES.map((e) => ({ valor: e.id, texto: e.nome }))}
                onChange={(e) => alterar('especialidadeId', e.target.value)} />
              <CampoSelecao id="medicoId" rotulo="Médico" required value={form.medicoId} erro={erros.medicoId}
                opcoes={medicos.map((m) => ({ valor: m.id, texto: `${m.nome} · ${m.crm}` }))}
                onChange={(e) => alterar('medicoId', e.target.value)} />
              <CampoFormulario id="data" rotulo="Dia" type="date" required min={hoje} value={form.data}
                erro={erros.data} onChange={(e) => alterar('data', e.target.value)} />
              <CampoSelecao id="horario" rotulo="Horário" required value={form.horario} erro={erros.horario}
                opcoes={HORARIOS.map((h) => ({ valor: h, texto: h }))}
                onChange={(e) => alterar('horario', e.target.value)} />
            </div>

            <Botao type="submit" carregando={enviando} className="self-start">Confirmar agendamento</Botao>
          </form>
        </Cartao>

        <div>
          {agendada ? (
            <Cartao className="border-green-600">
              <Alerta tipo="sucesso" titulo="Consulta agendada!" mensagem={`${agendada.nomeEspecialidade} com ${agendada.nomeMedico}, em ${formatarDataHora(agendada.dataConsulta)}.`} />
              <Link to={`/consultas/${agendada.id}`}
                className="mt-4 inline-block rounded-lg bg-marca-700 px-5 py-2.5 font-semibold text-white hover:bg-marca-800">
                Ver consulta e posição na fila →
              </Link>
            </Cartao>
          ) : (
            <Cartao>
              <h2 className="text-lg font-bold text-marca-900">Antes de agendar</h2>
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-slate-700">
                <li>Cada médico atende algumas especialidades. Se a combinação não existir, o sistema avisa.</li>
                <li>O mesmo médico não pode ter duas consultas no mesmo horário.</li>
                <li>Ainda não tem cadastro? <Link to="/cadastro" className="font-semibold text-marca-700 underline">Cadastre-se</Link>.</li>
              </ul>
            </Cartao>
          )}
        </div>
      </div>
    </>
  )
}
