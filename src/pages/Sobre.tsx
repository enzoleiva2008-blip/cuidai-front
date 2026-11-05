import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { Cartao } from '../components/Cartao'

const ODS = [
  { numero: 3, nome: 'Saúde e bem-estar', texto: 'Facilita o acesso à atenção básica e reduz as faltas que tiram vagas de quem precisa.' },
  { numero: 10, nome: 'Redução das desigualdades', texto: 'Prioriza idosos, gestantes e pacientes crônicos e funciona pelo WhatsApp, acessível a quase todos.' },
  { numero: 9, nome: 'Inovação e infraestrutura', texto: 'Leva dados e inteligência artificial para a gestão do serviço público de saúde.' },
]

export default function Sobre() {
  return (
    <>
      <CabecalhoPagina titulo="Sobre o CuidAí" subtitulo="Tecnologia com o cidadão no centro do cuidado." />

      <div className="grid gap-6 md:grid-cols-2">
        <Cartao>
          <h2 className="text-xl font-bold text-marca-900">O problema</h2>
          <p className="mt-2 text-slate-700">
            Marcar consulta na UBS ainda é confuso. O cidadão chega cedo, pega senha e espera horas sem saber quando será atendido.
            Muitos esquecem a consulta marcada semanas antes, e o horário do médico fica vazio enquanto outras pessoas aguardam.
          </p>
        </Cartao>
        <Cartao>
          <h2 className="text-xl font-bold text-marca-900">A solução</h2>
          <p className="mt-2 text-slate-700">
            O CuidAí é um app em que o cidadão agenda a consulta, vê a posição na fila e recebe lembretes por chatbot.
            A UBS usa IA para prever quem pode faltar e quanto tempo de espera haverá, e assim reorganiza a agenda.
          </p>
        </Cartao>
      </div>

      <section className="mt-10" aria-labelledby="titulo-ods">
        <h2 id="titulo-ods" className="text-2xl font-bold text-marca-900">Objetivos de Desenvolvimento Sustentável</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {ODS.map((ods) => (
            <Cartao key={ods.numero}>
              <p className="text-sm font-semibold uppercase text-marca-700">ODS {ods.numero}</p>
              <h3 className="text-lg font-semibold">{ods.nome}</h3>
              <p className="mt-1 text-slate-600">{ods.texto}</p>
            </Cartao>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="titulo-tec">
        <h2 id="titulo-tec" className="text-2xl font-bold text-marca-900">Como foi construído</h2>
        <ul className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
          <li>⚛️ Front-end em React + Vite + TypeScript + Tailwind CSS</li>
          <li>☕ API REST em Java com Spring Boot e JDBC</li>
          <li>🗄️ Banco de dados Oracle</li>
          <li>🤖 Modelos de IA em Python (previsão de faltas e de espera)</li>
        </ul>
      </section>
    </>
  )
}
