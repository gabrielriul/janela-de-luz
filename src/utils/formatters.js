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

// Valores ausentes (a API às vezes envia null) aparecem como travessão
const SEM_VALOR = '—'

// 21.6 -> "22 °C"
export function formatarTemperatura(valor) {
  return valor == null ? SEM_VALOR : `${formatoInteiro.format(valor)} °C`
}

// 35 -> "35%"
export function formatarPorcentagem(valor) {
  return valor == null ? SEM_VALOR : `${formatoInteiro.format(valor)}%`
}

// 12.4 -> "12 km/h"
export function formatarVelocidade(valor) {
  return valor == null ? SEM_VALOR : `${formatoInteiro.format(valor)} km/h`
}

// "2026-09-27T06:05" -> "06:05"
export function formatarHorario(horarioIso) {
  return horarioIso.slice(11, 16)
}

// 365 -> "06:05" (minutos desde a meia-noite)
export function formatarMinutos(totalDeMinutos) {
  const horas = String(Math.floor(totalDeMinutos / 60)).padStart(2, '0')
  const minutos = String(totalDeMinutos % 60).padStart(2, '0')
  return `${horas}:${minutos}`
}

// [365, 425] -> "06:05–07:05"
export function formatarIntervalo([inicio, fim]) {
  return `${formatarMinutos(inicio)}–${formatarMinutos(fim)}`
}

const formatoDiaCurto = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
})

const formatoDiaLongo = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

// "2026-09-30" -> Date local (sem converter fuso, que mudaria o dia)
function criarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

// "2026-09-30" -> "qua., 30/09"
export function formatarDiaCurto(dataIso) {
  return formatoDiaCurto.format(criarData(dataIso))
}

// "2026-09-30" -> "quarta-feira, 30 de setembro"
export function formatarDiaLongo(dataIso) {
  return formatoDiaLongo.format(criarData(dataIso))
}

const formatoNota = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

// 8.46 -> "8,5"
export function formatarNota(nota) {
  return formatoNota.format(nota)
}

// Nome curto de um dia da previsão: os dois primeiros viram "Hoje" e "Amanhã"
export function formatarNomeDoDia(dataIso, indice) {
  if (indice === 0) return 'Hoje'
  if (indice === 1) return 'Amanhã'
  return formatarDiaCurto(dataIso)
}

// Janela de horas cheias: do início da primeira hora ao fim da última
// ("2026-09-27T16:00", "2026-09-27T18:00") -> "16:00–19:00"
export function formatarJanela(inicioIso, ultimaHoraIso) {
  const [horas, minutos] = ultimaHoraIso.slice(11, 16).split(':').map(Number)
  const fim = (horas * 60 + minutos + 60) % (24 * 60)
  return `${formatarHorario(inicioIso)}–${formatarMinutos(fim)}`
}
