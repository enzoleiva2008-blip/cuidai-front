import { Link } from 'react-router-dom'
import { EstadoVazio } from '../components/EstadoVazio'

export default function NaoEncontrada() {
  return (
    <EstadoVazio
      titulo="Página não encontrada"
      descricao="O endereço digitado não existe. Confira o link ou volte para o início."
      acao={<Link to="/" className="font-semibold text-marca-700 underline">Ir para o início</Link>}
    />
  )
}
