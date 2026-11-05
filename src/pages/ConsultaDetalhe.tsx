import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { Botao } from '../components/Botao'
import { Carregando } from '../components/Carregando'
import { Cartao } from '../components/Cartao'
import { EstadoVazio } from '../components/EstadoVazio'
import { EtiquetaPrioridade, EtiquetaStatus } from '../components/Etiquetas'
import { ApiError, mensagemDeErro } from '../services/api'
import { buscarConsulta, cancelarConsulta, listarConsultas, ordenarFila } from '../services/consultaService'
import type { Consulta } from '../types'
import { formatarDataHora } from '../utils/formatadores'

/** Rota com parâmetro: /consultas/:id. Mostra a posição na fila e permite cancelar (PUT). */
export default function ConsultaDetalhe() {
  const { id } = useParams()
  const [consulta, setConsulta] = useState<Consulta | null>(null)
  const [posicao, setPosicao] = useState<number | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [naoEncontrada, setNaoEncontrada] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [confirmando, setConfirmando] = useState(false)
  const [cancelando, setCancelando] = useState(false)
  const [sucesso, setSucesso] = useState<string | null>(null)

  useEffect(() => {
    const codigo = Number(id)
    if (!Number.isInteger(codigo) || codigo <= 0) {
      setNaoEncontrada(true)
      setCarregando(false)
      return
    }
    Promise.all([buscarConsulta(codigo), listarConsultas()])
      .then(([atual, todas]) => {
        setConsulta(atual)
        // Posição entre as consultas agendadas do mesmo médico, no mesmo dia
        const mesmoDia = todas.filter(
          (c) => c.medicoId === atual.medicoId && c.dataConsulta.slice(0, 10) === atual.dataConsulta.slice(0, 10),
        )
        const indice = ordenarFila(mesmoDia).findIndex((c) => c.id === atual.id)
        setPosicao(indice >= 0 ? indice + 1 : null)
      })
      .catch((e) => {
        if (e instanceof ApiError && e.status === 404) setNaoEncontrada(true)
        else setErro(mensagemDeErro(e))
      })
      .finally(() => setCarregando(false))
  }, [id])

  async function cancelar() {
    if (!consulta) return
    setCancelando(true)
    setErro(null)
    try {
      const atualizada = await cancelarConsulta(consulta)
      setConsulta(atualizada)
      setPosicao(null)
      setSucesso('Consulta cancelada. O horário foi liberado para outra pessoa.')
    } catch (e) {
      setErro(mensagemDeErro(e))
    } finally {
      setCancelando(false)
      setConfirmando(false)
    }
  }

  if (carregando) return <Carregando texto="Buscando a consulta..." />
  if (naoEncontrada) {
    return (
      <EstadoVazio titulo="Consulta não encontrada" descricao={`Não existe consulta com o código ${id}.`}
        acao={<Link to="/consultas" className="font-semibold text-marca-700 underline">Ver todas as consultas</Link>} />
    )
  }

  return (
    <>
      <Link to="/consultas" className="font-semibold text-marca-700 underline">← Voltar para consultas</Link>

      <div className="mt-6 flex flex-col gap-4">
        {erro && <Alerta tipo="erro" titulo="Erro" mensagem={erro} />}
        {sucesso && <Alerta tipo="sucesso" mensagem={sucesso} />}
      </div>

      {consulta && (
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          <Cartao className="lg:col-span-2">
            <p className="text-sm text-slate-500">Consulta nº {consulta.id}</p>
            <h1 className="mt-1 text-3xl font-bold text-marca-900">{consulta.nomeEspecialidade}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <EtiquetaStatus status={consulta.status} />
              <EtiquetaPrioridade prioridade={consulta.prioridade} />
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-slate-500">Cidadão</dt><dd className="font-semibold">{consulta.nomeCidadao}</dd></div>
              <div><dt className="text-sm text-slate-500">Médico</dt><dd className="font-semibold">{consulta.nomeMedico}</dd></div>
              <div><dt className="text-sm text-slate-500">Data e horário</dt><dd className="font-semibold">{formatarDataHora(consulta.dataConsulta)}</dd></div>
              <div><dt className="text-sm text-slate-500">Agendada em</dt><dd className="font-semibold">{formatarDataHora(consulta.dataAgendamento)}</dd></div>
              {consulta.esperaMin !== null && (
                <div><dt className="text-sm text-slate-500">Tempo de espera</dt><dd className="font-semibold">{consulta.esperaMin} minutos</dd></div>
              )}
            </dl>

            {consulta.status === 'AGENDADA' && (
              <div className="mt-8 border-t border-slate-200 pt-6">
                {confirmando ? (
                  <div className="flex flex-col gap-3">
                    <p className="font-medium">Tem certeza que deseja cancelar esta consulta?</p>
                    <div className="flex flex-wrap gap-3">
                      <Botao variante="perigo" carregando={cancelando} onClick={cancelar}>Sim, cancelar</Botao>
                      <Botao variante="secundario" disabled={cancelando} onClick={() => setConfirmando(false)}>Não, manter</Botao>
                    </div>
                  </div>
                ) : (
                  <Botao variante="secundario" onClick={() => setConfirmando(true)}>Não vou poder ir · Cancelar</Botao>
                )}
              </div>
            )}
          </Cartao>

          <Cartao className="flex flex-col items-center justify-center text-center">
            {posicao !== null ? (
              <>
                <p className="text-slate-600">Sua posição na fila do dia</p>
                <p className="my-2 text-6xl font-extrabold text-marca-700">{posicao}º</p>
                <p className="text-sm text-slate-500">Considerando a prioridade e o horário das consultas do mesmo médico.</p>
              </>
            ) : (
              <p className="text-slate-600">Esta consulta não está mais na fila.</p>
            )}
          </Cartao>
        </div>
      )}
    </>
  )
}
