import type { SelectHTMLAttributes } from 'react'

interface Opcao {
  valor: string | number
  texto: string
}

interface CampoSelecaoProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  rotulo: string
  opcoes: Opcao[]
  textoVazio?: string
  erro?: string
}

/** Lista de opções (select) com rótulo e mensagem de erro. */
export function CampoSelecao({ id, rotulo, opcoes, textoVazio = 'Selecione...', erro, required, ...props }: CampoSelecaoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-slate-800">
        {rotulo} {required && <span className="text-red-600" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        name={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
        className={`min-h-11 w-full rounded-lg border px-3 py-2 text-slate-900 outline-none transition
          focus:ring-2 focus:ring-marca-600 ${erro ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'}`}
        {...props}
      >
        <option value="">{textoVazio}</option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>
      {erro && <p id={`${id}-erro`} className="text-sm text-red-700">{erro}</p>}
    </div>
  )
}
