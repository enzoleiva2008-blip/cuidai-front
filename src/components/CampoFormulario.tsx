import type { InputHTMLAttributes } from 'react'

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  rotulo: string
  erro?: string
  dica?: string
}

/** Campo de texto com rótulo, dica e mensagem de erro acessíveis. */
export function CampoFormulario({ id, rotulo, erro, dica, required, ...props }: CampoFormularioProps) {
  const idDescricao = erro ? `${id}-erro` : dica ? `${id}-dica` : undefined
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-slate-800">
        {rotulo} {required && <span className="text-red-600" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={idDescricao}
        className={`min-h-11 w-full rounded-lg border px-3 py-2 text-slate-900 outline-none transition
          focus:ring-2 focus:ring-marca-600 ${erro ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'}`}
        {...props}
      />
      {erro ? (
        <p id={`${id}-erro`} className="text-sm text-red-700">{erro}</p>
      ) : (
        dica && <p id={`${id}-dica`} className="text-sm text-slate-500">{dica}</p>
      )}
    </div>
  )
}
