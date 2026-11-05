import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoSelecao } from '../components/CampoSelecao'
import { Carregando } from '../components/Carregando'
import { CartaoConsulta } from '../components/CartaoConsulta'
import { EstadoVazio } from '../components/EstadoVazio'
import { mensagemDeErro } from '../services/api'
import { listarConsultas, ordenarFila } from '../services/consultaService'
import type { Consulta, StatusConsulta } from '../types'
import { NOME_STATUS } from '../utils/formatadores'

type Aba = 'fila' | 'todas'

/** Página da solução: fila inteligente e histórico (GET /consultas). */
export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [aba, setAba] = useState<Aba>('fila')
  const [filtroStatus, setFiltroStatus] = useState<StatusConsulta | ''>('')

  useEffect(() => {
    listarConsultas()
      .then(setConsultas)
      .catch((e) => setErro(mensagemDeErro(e)))
      .finally(() => setCarregando(false))
  }, [])

  const fila = useMemo(() => ordenarFila(consultas), [consultas])
  const filtradas = useMemo(
    () => (filtroStatus ? consultas.filter((c) => c.status === filtroStatus) : consultas),
    [consultas, filtroStatus],
  )

  const estiloAba = (ativa: boolean) =>
    `min-h-11 rounded-lg px-4 py-2 font-semibold transition ${
      ativa ? 'bg-marca-700 text-white' : 'bg-white text-marca-800 border border-slate-300 hover:bg-marca-50'
    }`

  return (
    <>
      <CabecalhoPagina titulo="Consultas e fila" subtitulo="A fila respeita a prioridade: idosos e gestantes primeiro, depois pacientes crônicos, depois os demais." />

      <div role="tablist" aria-label="Visualização" className="mb-6 flex flex-wrap gap-2">
        <button role="tab" type="button" aria-selected={aba === 'fila'} className={estiloAba(aba === 'fila')} onClick={() => setAba('fila')}>
          Fila inteligente ({fila.length})
        </button>
        <button role="tab" type="button" aria-selected={aba === 'todas'} className={estiloAba(aba === 'todas')} onClick={() => setAba('todas')}>
          Todas as consultas ({consultas.length})
        </button>
      </div>

      {carregando && <Carregando texto="Buscando consultas..." />}
      {erro && <Alerta tipo="erro" titulo="Erro ao carregar as consultas" mensagem={erro} />}

      {!carregando && !erro && aba === 'fila' && (
        fila.length === 0 ? (
          <EstadoVazio titulo="Fila vazia" descricao="Não há consultas agendadas no momento."
            acao={<Link to="/agendar" className="font-semibold text-marca-700 underline">Agendar uma consulta</Link>} />
        ) : (
          <ol className="grid gap-4 md:grid-cols-2">
            {fila.map((consulta, indice) => (
              <li key={consulta.id}><CartaoConsulta consulta={consulta} posicao={indice + 1} /></li>
            ))}
          </ol>
        )
      )}

      {!carregando && !erro && aba === 'todas' && (
        <>
          <div className="mb-4 max-w-xs">
            <CampoSelecao id="filtroStatus" rotulo="Filtrar por status" textoVazio="Todos" value={filtroStatus}
              opcoes={(Object.keys(NOME_STATUS) as StatusConsulta[]).map((s) => ({ valor: s, texto: NOME_STATUS[s] }))}
              onChange={(e) => setFiltroStatus(e.target.value as StatusConsulta | '')} />
          </div>
          {filtradas.length === 0 ? (
            <EstadoVazio titulo="Nenhuma consulta encontrada" descricao="Não há consultas com esse status." />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {filtradas.map((consulta) => (
                <li key={consulta.id}><CartaoConsulta consulta={consulta} /></li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}
