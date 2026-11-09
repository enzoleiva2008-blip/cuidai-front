// Validações feitas no front ANTES de enviar para a API.
// Cada função devolve a mensagem de erro, ou undefined se o valor está ok.

/** Confere se o campo contém algum caractere além de espaços.
 * @example obrigatorio('   ', 'Nome') // 'Nome é obrigatório.'
 */
export function obrigatorio(valor: string, nomeCampo: string): string | undefined {
  return valor.trim() === '' ? `${nomeCampo} é obrigatório.` : undefined
}

/** Remove todos os caracteres que não são números.
 * @example somenteNumeros('CPF 123.456') // '123456'
 */
export function somenteNumeros(valor: string): string {
  return valor.replace(/\D/g, '')
}

/** Valida o preenchimento e os dígitos verificadores de um CPF.
 * @example validarCpf('123') // 'O CPF precisa ter 11 números.'
 */
export function validarCpf(cpf: string): string | undefined {
  const numeros = somenteNumeros(cpf)
  if (numeros === '') return 'CPF é obrigatório.'
  if (numeros.length !== 11) return 'O CPF precisa ter 11 números.'
  if (/^(\d)\1{10}$/.test(numeros)) return 'CPF inválido.'
  if (!digitosCpfConferem(numeros)) return 'CPF inválido. Confira os números.'
  return undefined
}

/** Confere os 2 dígitos verificadores do CPF (regra oficial da Receita). */
function digitosCpfConferem(cpf: string): boolean {
  const calcularDigito = (base: string, pesoInicial: number) => {
    let soma = 0
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (pesoInicial - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  const digito1 = calcularDigito(cpf.slice(0, 9), 10)
  const digito2 = calcularDigito(cpf.slice(0, 10), 11)
  return digito1 === Number(cpf[9]) && digito2 === Number(cpf[10])
}

/** Valida se o Cartão SUS contém exatamente 15 números.
 * @example validarCartaoSus('123') // 'O Cartão SUS precisa ter 15 números.'
 */
export function validarCartaoSus(cartao: string): string | undefined {
  const numeros = somenteNumeros(cartao)
  if (numeros === '') return 'Cartão SUS é obrigatório.'
  if (numeros.length !== 15) return 'O Cartão SUS precisa ter 15 números.'
  return undefined
}

/** Valida se o telefone contém DDD e 8 ou 9 dígitos.
 * @example validarTelefone('123') // 'Informe DDD + número (10 ou 11 dígitos).'
 */
export function validarTelefone(telefone: string): string | undefined {
  const numeros = somenteNumeros(telefone)
  if (numeros === '') return 'Telefone é obrigatório.'
  if (numeros.length < 10 || numeros.length > 11) return 'Informe DDD + número (10 ou 11 dígitos).'
  return undefined
}

/** Valida o formato do e-mail e, opcionalmente, exige seu preenchimento.
 * @example validarEmail('ana@exemplo.com') // undefined (válido)
 */
export function validarEmail(email: string, obrigatorioPreencher = false): string | undefined {
  if (email.trim() === '') return obrigatorioPreencher ? 'E-mail é obrigatório.' : undefined
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : 'Informe um e-mail válido.'
}

/** Exige uma data preenchida e anterior à data atual.
 * @example validarDataPassada('', 'Data') // 'Data é obrigatória.'
 */
export function validarDataPassada(data: string, nomeCampo: string): string | undefined {
  if (data === '') return `${nomeCampo} é obrigatória.`
  return new Date(data) >= new Date() ? `${nomeCampo} deve estar no passado.` : undefined
}

/** Exige uma data e horário preenchidos e posteriores ao momento atual.
 * @example validarDataFutura('') // 'Escolha a data e o horário.'
 */
export function validarDataFutura(dataHora: string): string | undefined {
  if (dataHora === '') return 'Escolha a data e o horário.'
  return new Date(dataHora) <= new Date() ? 'Escolha uma data e horário no futuro.' : undefined
}
