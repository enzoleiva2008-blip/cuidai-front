import { Link } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { Cartao } from '../components/Cartao'
import { INTEGRANTES } from '../data/conteudo'

export default function Integrantes() {
  return (
    <>
      <CabecalhoPagina titulo="Integrantes" subtitulo="Quem construiu o CuidAí. Clique em um integrante para ver os detalhes." />
      <ul className="grid gap-4 sm:grid-cols-2">
        {INTEGRANTES.map((integrante) => (
          <li key={integrante.rm}>
            <Link to={`/integrantes/${integrante.rm}`} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-marca-700">
              <Cartao className="flex items-center gap-4 transition hover:border-marca-600 hover:shadow-md">
                <Avatar nome={integrante.nome} foto={integrante.foto} />
                <div>
                  <p className="text-lg font-semibold">{integrante.nome}</p>
                  <p className="text-slate-600">RM {integrante.rm} · {integrante.turma}</p>
                  <p className="text-sm text-marca-700">{integrante.papel}</p>
                </div>
              </Cartao>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
