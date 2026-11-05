import type { ErroApi } from '../types'

/** URL da API Java. Vem da variável VITE_API_URL (arquivo .env ou painel da Vercel). */
export const API_URL: string = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')

/** Erro de requisição com a mensagem amigável que a API devolveu. */
export class ApiError extends Error {
  status: number
  campos: string[]

  constructor(status: number, mensagem: string, campos: string[] = []) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
    this.campos = campos
  }
}

/**
 * Função base de todas as chamadas HTTP (Fetch API).
 * - Envia e recebe JSON
 * - Converte o JSON de erro da API em ApiError
 * - Trata falha de rede (API fora do ar ou "dormindo" no Render)
 */
export async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: { 'Content-Type': 'application/json', ...opcoes.headers },
    })
  } catch {
    throw new ApiError(
      0,
      'Não foi possível conectar ao servidor. Verifique sua internet ou tente de novo em alguns segundos.',
    )
  }

  if (!resposta.ok) {
    let erro: Partial<ErroApi> = {}
    try {
      erro = await resposta.json()
    } catch {
      // resposta sem corpo JSON
    }
    throw new ApiError(
      resposta.status,
      erro.mensagem ?? `Erro ${resposta.status} ao falar com o servidor.`,
      erro.campos ?? [],
    )
  }

  // 204 No Content não tem corpo
  if (resposta.status === 204) {
    return undefined as T
  }
  return (await resposta.json()) as T
}

/** Mensagem pronta para mostrar na tela a partir de qualquer erro. */
export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof ApiError) {
    return erro.campos.length > 0 ? `${erro.message} ${erro.campos.join(' · ')}` : erro.message
  }
  return 'Algo deu errado. Tente novamente.'
}
