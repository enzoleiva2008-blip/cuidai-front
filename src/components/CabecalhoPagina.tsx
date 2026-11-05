interface CabecalhoPaginaProps {
  titulo: string
  subtitulo?: string
}

/** Título padrão do topo de cada página. */
export function CabecalhoPagina({ titulo, subtitulo }: CabecalhoPaginaProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-marca-900 md:text-4xl">{titulo}</h1>
      {subtitulo && <p className="mt-2 max-w-2xl text-lg text-slate-600">{subtitulo}</p>}
    </header>
  )
}
