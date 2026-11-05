import { Link } from 'react-router-dom'
import { Cartao } from '../components/Cartao'

const RECURSOS = [
  { icone: '📅', titulo: 'Agende sem sair de casa', texto: 'Escolha a UBS, a especialidade e o horário pelo celular, sem pegar senha de madrugada.' },
  { icone: '🧓', titulo: 'Fila com prioridade', texto: 'Idosos, gestantes e pacientes crônicos são atendidos primeiro, de forma automática e transparente.' },
  { icone: '💬', titulo: 'Lembrete no WhatsApp', texto: 'O chatbot avisa um dia antes. Se não puder ir, você cancela e libera a vaga para outra pessoa.' },
  { icone: '🤖', titulo: 'IA a favor da UBS', texto: 'A unidade prevê o tempo de espera e quem pode faltar, e organiza a agenda antes do problema acontecer.' },
]

const PASSOS = [
  { numero: '1', titulo: 'Faça seu cadastro', texto: 'Nome, CPF, Cartão SUS e telefone. A prioridade é calculada sozinha.' },
  { numero: '2', titulo: 'Agende a consulta', texto: 'Escolha especialidade, médico, dia e horário.' },
  { numero: '3', titulo: 'Acompanhe a fila', texto: 'Veja sua posição e receba o lembrete antes da consulta.' },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Destaque principal */}
      <section className="grid items-center gap-8 rounded-2xl bg-marca-700 px-6 py-12 text-white md:grid-cols-2 md:px-12">
        <div>
          <p className="font-semibold uppercase tracking-wide text-marca-100">CitizenTech para a saúde pública</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">Seu cuidado marcado, sem fila.</h1>
          <p className="mt-4 text-lg text-marca-50">
            Com o CuidAí você agenda consulta na UBS, acompanha a fila e recebe lembretes. A unidade usa IA para reduzir faltas e tempo de espera.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/agendar" className="rounded-lg bg-white px-6 py-3 text-center font-bold text-marca-800 hover:bg-marca-50">
              Agendar consulta
            </Link>
            <Link to="/consultas" className="rounded-lg border-2 border-white px-6 py-3 text-center font-bold text-white hover:bg-marca-800">
              Ver consultas e fila
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-xl bg-marca-800 p-5">
            <p className="text-3xl font-extrabold">60+</p>
            <p className="text-marca-100">idosos com prioridade</p>
          </div>
          <div className="rounded-xl bg-marca-800 p-5">
            <p className="text-3xl font-extrabold">1 dia</p>
            <p className="text-marca-100">de antecedência no lembrete</p>
          </div>
          <div className="col-span-2 rounded-xl bg-marca-800 p-5">
            <p className="text-3xl font-extrabold">0 senha</p>
            <p className="text-marca-100">para pegar de madrugada na porta da UBS</p>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section aria-labelledby="titulo-recursos">
        <h2 id="titulo-recursos" className="text-2xl font-bold text-marca-900 md:text-3xl">O que o CuidAí faz</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((recurso) => (
            <Cartao key={recurso.titulo}>
              <span className="text-3xl" aria-hidden="true">{recurso.icone}</span>
              <h3 className="mt-2 text-lg font-semibold text-marca-900">{recurso.titulo}</h3>
              <p className="mt-1 text-slate-600">{recurso.texto}</p>
            </Cartao>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="titulo-passos">
        <h2 id="titulo-passos" className="text-2xl font-bold text-marca-900 md:text-3xl">Como funciona</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {PASSOS.map((passo) => (
            <li key={passo.numero}>
              <Cartao className="h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marca-700 text-lg font-bold text-white">
                  {passo.numero}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{passo.titulo}</h3>
                <p className="mt-1 text-slate-600">{passo.texto}</p>
              </Cartao>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link to="/cadastro" className="font-semibold text-marca-700 underline hover:text-marca-900">
            Começar pelo cadastro →
          </Link>
        </div>
      </section>
    </div>
  )
}
