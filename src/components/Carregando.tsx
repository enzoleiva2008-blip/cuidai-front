interface CarregandoProps {
  texto?: string
}

/** Indicador de carregamento enquanto a API responde. */
export function Carregando({ texto = 'Carregando...' }: CarregandoProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-12 text-slate-600">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-marca-600 border-t-transparent" aria-hidden="true" />
      <p>{texto}</p>
      <p className="text-sm text-slate-500">Se o servidor estiver "acordando", pode levar até 1 minuto.</p>
    </div>
  )
}
