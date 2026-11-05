import { Link } from 'react-router-dom'
import type { Consulta } from '../types'
import { formatarDataHora } from '../utils/formatadores'
import { Cartao } from './Cartao'
import { EtiquetaPrioridade, EtiquetaStatus } from './Etiquetas'

interface CartaoConsultaProps {
  consulta: Consulta
  posicao?: number
}

/** Resumo de uma consulta, com link para o detalhe. Usado na fila e na lista. */
export function CartaoConsulta({ consulta, posicao }: CartaoConsultaProps) {
  return (
    <Link to={`/consultas/${consulta.id}`} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-marca-700">
      <Cartao className="flex h-full gap-4 transition hover:border-marca-600 hover:shadow-md">
        {posicao !== undefined && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-marca-700 text-lg font-bold text-white"
            aria-label={`Posição ${posicao} na fila`}>
            {posicao}º
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">{consulta.nomeCidadao}</p>
          <p className="text-slate-600">{consulta.nomeEspecialidade} · {consulta.nomeMedico}</p>
          <p className="text-slate-600">{formatarDataHora(consulta.dataConsulta)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <EtiquetaStatus status={consulta.status} />
            <EtiquetaPrioridade prioridade={consulta.prioridade} />
          </div>
        </div>
      </Cartao>
    </Link>
  )
}
