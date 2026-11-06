import { Link } from 'react-router-dom'

/** Rodapé com links rápidos. */
export function Rodape() {
  return (
    <footer className="mt-16 bg-marca-900 text-marca-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">CuidAí</p>
          <p className="mt-1">Seu cuidado marcado, sem fila.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-col gap-1">
            <li><Link className="hover:underline" to="/agendar">Agendar consulta</Link></li>
            <li><Link className="hover:underline" to="/consultas">Consultas e fila</Link></li>
            <li><Link className="hover:underline" to="/faq">Perguntas frequentes</Link></li>
            <li><Link className="hover:underline" to="/contato">Fale conosco</Link></li>
            <li><Link className="hover:underline" to="/integrantes">Quem somos</Link></li>
          </ul>
        </nav>
        <p className="text-sm">
          Global Solution 2026/2 · CitizenTech · FIAP 1TDS
          <br />
          Projeto acadêmico. Dados fictícios.
          <br />© {new Date().getFullYear()} CuidAí
        </p>
      </div>
    </footer>
  )
}
