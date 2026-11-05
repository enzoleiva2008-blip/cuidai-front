interface AvatarProps {
  nome: string
  foto?: string
  tamanho?: 'medio' | 'grande'
}

/** Foto do integrante ou, se não houver, as iniciais do nome. */
export function Avatar({ nome, foto, tamanho = 'medio' }: AvatarProps) {
  const classeTamanho = tamanho === 'grande' ? 'h-32 w-32 text-4xl' : 'h-20 w-20 text-2xl'
  if (foto) {
    return <img src={foto} alt={`Foto de ${nome}`} className={`${classeTamanho} rounded-full object-cover`} />
  }
  const iniciais = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('')
  return (
    <span aria-hidden="true" className={`${classeTamanho} flex items-center justify-center rounded-full bg-marca-700 font-bold text-white`}>
      {iniciais}
    </span>
  )
}
