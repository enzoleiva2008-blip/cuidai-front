import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { para: '/', texto: 'Início' },
  { para: '/agendar', texto: 'Agendar' },
  { para: '/consultas', texto: 'Consultas e fila' },
  { para: '/cadastro', texto: 'Cadastro' },
  { para: '/sobre', texto: 'Sobre' },
  { para: '/integrantes', texto: 'Integrantes' },
  { para: '/faq', texto: 'FAQ' },
  { para: '/contato', texto: 'Contato' },
]

/** Topo do site com menu. No celular, o menu abre pelo botão ☰. */
export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { pathname } = useLocation()

  // Fecha o menu do celular ao trocar de página
  useEffect(() => {
    setMenuAberto(false)
  }, [pathname])

  const estiloLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 font-medium transition ${
      isActive ? 'bg-marca-700 text-white' : 'text-slate-700 hover:bg-marca-50 hover:text-marca-800'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="CuidAí, ir para o início">
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="text-xl font-extrabold text-marca-800">CuidAí</span>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-2xl text-marca-800 hover:bg-marca-50 lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        <nav id="menu-principal" aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex gap-1">
            {LINKS.map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} end={link.para === '/'} className={estiloLink}>
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {menuAberto && (
        <nav aria-label="Menu principal (celular)" className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {LINKS.map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} end={link.para === '/'} className={estiloLink}>
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
