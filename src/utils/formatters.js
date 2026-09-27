// Formatação de números e textos no padrão brasileiro (vírgula decimal, ponto de milhar).
// Todo número exibido no app passa por aqui, em vez de ser formatado direto no componente.

const formatoDecimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })
const formatoInteiro = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })

// 1234.5 -> "1.235"
export function formatarInteiro(valor) {
  return formatoInteiro.format(valor)
}

// -23.1814, -50.6464 -> "23,18° S · 50,65° O"
export function formatarCoordenadas(latitude, longitude) {
  const lat = `${formatoDecimal.format(Math.abs(latitude))}° ${latitude >= 0 ? 'N' : 'S'}`
  const lon = `${formatoDecimal.format(Math.abs(longitude))}° ${longitude >= 0 ? 'L' : 'O'}`
  return `${lat} · ${lon}`
}

// { estado: 'Paraná', pais: 'Brasil' } -> "Paraná, Brasil"
// filter(Boolean) remove partes vazias (algumas cidades não têm estado)
export function formatarRegiao(cidade) {
  return [cidade.estado, cidade.pais].filter(Boolean).join(', ')
}
