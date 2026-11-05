import type { ButtonHTMLAttributes } from 'react'

type Variante = 'primario' | 'secundario' | 'perigo'

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  carregando?: boolean
}

const ESTILOS: Record<Variante, string> = {
  primario: 'bg-marca-700 text-white hover:bg-marca-800 focus-visible:outline-marca-700',
  secundario: 'bg-white text-marca-800 border border-marca-700 hover:bg-marca-50 focus-visible:outline-marca-700',
  perigo: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',
}

/** Botão padrão do CuidAí, com estado de carregamento. */
export function Botao({ variante = 'primario', carregando = false, disabled, children, className = '', ...props }: BotaoProps) {
  return (
    <button
      {...props}
      disabled={disabled || carregando}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold
        transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60
        ${ESTILOS[variante]} ${className}`}
    >
      {carregando && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      {carregando ? 'Aguarde...' : children}
    </button>
  )
}
