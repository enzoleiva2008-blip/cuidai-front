import { useState } from 'react'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { PERGUNTAS_FAQ } from '../data/conteudo'

export default function Faq() {
  // Guarda qual pergunta está aberta (null = todas fechadas)
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <>
      <CabecalhoPagina titulo="Perguntas frequentes" subtitulo="Tire suas dúvidas sobre o CuidAí." />
      <ul className="flex max-w-3xl flex-col gap-3">
        {PERGUNTAS_FAQ.map((item, indice) => {
          const estaAberta = aberta === indice
          return (
            <li key={item.pergunta} className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-semibold text-marca-900"
                  aria-expanded={estaAberta}
                  aria-controls={`resposta-${indice}`}
                  onClick={() => setAberta(estaAberta ? null : indice)}
                >
                  {item.pergunta}
                  <span aria-hidden="true" className={`text-2xl transition-transform ${estaAberta ? 'rotate-45' : ''}`}>+</span>
                </button>
              </h2>
              {estaAberta && (
                <p id={`resposta-${indice}`} className="px-5 pb-5 text-slate-700">
                  {item.resposta}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
