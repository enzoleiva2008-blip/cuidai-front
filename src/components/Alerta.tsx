type Tipo = 'sucesso' | 'erro' | 'info'

interface AlertaProps {
  tipo: Tipo
  titulo?: string
  mensagem: string
}

const ESTILOS: Record<Tipo, string> = {
  sucesso: 'border-green-600 bg-green-50 text-green-900',
  erro: 'border-red-600 bg-red-50 text-red-900',
  info: 'border-marca-600 bg-marca-50 text-marca-900',
}

const ICONES: Record<Tipo, string> = { sucesso: '✅', erro: '⚠️', info: 'ℹ️' }

/** Caixa de mensagem de sucesso, erro ou informação. Leitores de tela anunciam o conteúdo. */
export function Alerta({ tipo, titulo, mensagem }: AlertaProps) {
  return (
    <div role={tipo === 'erro' ? 'alert' : 'status'} className={`flex gap-3 rounded-lg border-l-4 p-4 ${ESTILOS[tipo]}`}>
      <span aria-hidden="true">{ICONES[tipo]}</span>
      <div>
        {titulo && <p className="font-semibold">{titulo}</p>}
        <p>{mensagem}</p>
      </div>
    </div>
  )
}
