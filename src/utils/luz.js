// Cálculo das janelas de luz de um dia a partir do nascer e do pôr do sol.
// Golden hour: luz dourada, cerca de 1 hora depois do nascer e 1 hora antes do pôr do sol.
// Blue hour: luz azulada, cerca de 30 minutos antes do nascer e depois do pôr do sol.

const DURACAO_GOLDEN_HOUR = 60 // minutos
const DURACAO_BLUE_HOUR = 30 // minutos

// "2026-09-27T06:05" -> 365 (minutos desde a meia-noite)
export function minutosDoDia(horarioIso) {
  const [horas, minutos] = horarioIso.slice(11, 16).split(':').map(Number)
  return horas * 60 + minutos
}

// Devolve os intervalos [início, fim] de cada janela de luz, em minutos desde a meia-noite
export function calcularJanelasDeLuz(nascerDoSol, porDoSol) {
  const nascer = minutosDoDia(nascerDoSol)
  const por = minutosDoDia(porDoSol)

  return {
    nascer,
    por,
    blueManha: [nascer - DURACAO_BLUE_HOUR, nascer],
    goldenManha: [nascer, nascer + DURACAO_GOLDEN_HOUR],
    goldenTarde: [por - DURACAO_GOLDEN_HOUR, por],
    blueTarde: [por, por + DURACAO_BLUE_HOUR],
  }
}

// Quantos minutos do intervalo [inicio, fim) caem dentro de [a, b)
function minutosEmComum(inicio, fim, [a, b]) {
  return Math.max(0, Math.min(fim, b) - Math.max(inicio, a))
}

// Classifica uma hora cheia (ex.: 17:00 às 18:00) de acordo com a luz.
// Se a hora tiver golden e blue hour, vence a janela que ocupa mais minutos dela.
// Retorna 'golden', 'blue', 'dia' ou 'noite'.
export function classificarLuz(horarioIso, janelas) {
  const inicio = minutosDoDia(horarioIso)
  const fim = inicio + 60

  const golden = Math.max(
    minutosEmComum(inicio, fim, janelas.goldenManha),
    minutosEmComum(inicio, fim, janelas.goldenTarde),
  )
  const blue = Math.max(
    minutosEmComum(inicio, fim, janelas.blueManha),
    minutosEmComum(inicio, fim, janelas.blueTarde),
  )

  if (golden > 0 && golden >= blue) return 'golden'
  if (blue > 0) return 'blue'
  return inicio >= janelas.nascer && inicio < janelas.por ? 'dia' : 'noite'
}
