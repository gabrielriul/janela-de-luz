// Junta os dados da previsão com a luz e a nota de cada hora,
// e encontra as melhores janelas de gravação da semana.
import { calcularJanelasDeLuz, classificarLuz } from './luz.js'
import { calcularNota } from './nota.js'

const NOTA_MINIMA_DA_JANELA = 6 // a partir de "Boa"
const QUANTIDADE_DE_JANELAS = 3

// Para cada dia: calcula as janelas de luz e, para cada hora, a luz e a nota.
// Esta é a conta "pesada" (7 dias x 24 horas = 168 notas) guardada com useMemo no Forecast.
export function avaliarDias(dias, modo) {
  return dias.map((dia) => {
    const janelas = calcularJanelasDeLuz(dia.nascerDoSol, dia.porDoSol)

    const horas = dia.horas.map((hora) => {
      const luz = classificarLuz(hora.horario, janelas)
      const { nota, motivos } = calcularNota(hora, luz, modo)
      return { ...hora, luz, nota, motivos }
    })

    const melhorNota = Math.max(...horas.map((hora) => hora.nota))

    return { ...dia, janelas, horas, melhorNota }
  })
}

// "2026-09-27T14:45" -> "2026-09-27T14:00" (início da hora atual)
function inicioDaHora(horarioIso) {
  return `${horarioIso.slice(0, 13)}:00`
}

// Procura sequências de horas seguidas com nota boa e devolve as melhores da semana.
// agora: horário atual da cidade; horas que já passaram não entram.
export function encontrarMelhoresJanelas(diasAvaliados, agora) {
  const horaAtual = agora ? inicioDaHora(agora) : ''
  const encontradas = []

  diasAvaliados.forEach((dia, indiceDia) => {
    let sequencia = []

    // Fecha a sequência atual e guarda como uma janela
    function fecharSequencia() {
      if (sequencia.length > 0) {
        const soma = sequencia.reduce((total, hora) => total + hora.nota, 0)
        encontradas.push({
          indiceDia,
          data: dia.data,
          inicio: sequencia[0].horario,
          fim: sequencia[sequencia.length - 1].horario,
          quantidadeDeHoras: sequencia.length,
          notaMedia: Math.round((soma / sequencia.length) * 10) / 10,
          temGoldenHour: sequencia.some((hora) => hora.luz === 'golden'),
        })
      }
      sequencia = []
    }

    dia.horas.forEach((hora) => {
      // Comparar textos ISO funciona como comparar datas ("2026-09-27T09:00" < "2026-09-27T14:00")
      const jaPassou = hora.horario < horaAtual
      if (!jaPassou && hora.nota >= NOTA_MINIMA_DA_JANELA) {
        sequencia.push(hora)
      } else {
        fecharSequencia()
      }
    })

    fecharSequencia()
  })

  // Ordena da maior nota média para a menor; no empate, a janela mais longa vem antes
  return encontradas
    .sort((a, b) => b.notaMedia - a.notaMedia || b.quantidadeDeHoras - a.quantidadeDeHoras)
    .slice(0, QUANTIDADE_DE_JANELAS)
}
