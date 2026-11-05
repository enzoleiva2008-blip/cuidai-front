import { Link, useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Cartao } from '../components/Cartao'
import { EstadoVazio } from '../components/EstadoVazio'
import { INTEGRANTES } from '../data/conteudo'

/** Rota com parâmetro: /integrantes/:rm */
export default function IntegranteDetalhe() {
  const { rm } = useParams()
  const integrante = INTEGRANTES.find((i) => i.rm === rm)

  if (!integrante) {
    return (
      <EstadoVazio
        titulo="Integrante não encontrado"
        descricao={`Não existe integrante com o RM ${rm}.`}
        acao={<Link to="/integrantes" className="font-semibold text-marca-700 underline">Ver todos os integrantes</Link>}
      />
    )
  }

  return (
    <>
      <Link to="/integrantes" className="font-semibold text-marca-700 underline">← Voltar para integrantes</Link>
      <Cartao className="mt-6 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Avatar nome={integrante.nome} foto={integrante.foto} tamanho="grande" />
        <div>
          <h1 className="text-3xl font-bold text-marca-900">{integrante.nome}</h1>
          <p className="mt-1 text-lg text-slate-600">RM {integrante.rm} · Turma {integrante.turma}</p>
          <p className="mt-2 font-medium text-marca-700">{integrante.papel}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href={integrante.github} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700">
              GitHub
            </a>
            <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="rounded-lg bg-[#0a66c2] px-4 py-2 font-semibold text-white hover:opacity-90">
              LinkedIn
            </a>
          </div>
        </div>
      </Cartao>
    </>
  )
}
