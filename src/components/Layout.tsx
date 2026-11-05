import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Cabecalho } from './Cabecalho'
import { Rodape } from './Rodape'

/** Estrutura comum a todas as páginas: cabeçalho, conteúdo e rodapé. */
export function Layout() {
  const { pathname } = useLocation()

  // Volta ao topo sempre que a página muda
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded focus:bg-white focus:p-2">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}
