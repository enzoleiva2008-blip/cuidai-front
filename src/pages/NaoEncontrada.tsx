import { Botao } from '../components/Botao'
import { EstadoVazio } from '../components/EstadoVazio'

export default function NaoEncontrada() {
  return (
    <EstadoVazio
      titulo="Página não encontrada"
      descricao="Ops! Não encontramos essa página. Confira se o endereço está correto ou volte para a página inicial."
      acao={<Botao to="/">Voltar para o início</Botao>}
    />
  )
}
