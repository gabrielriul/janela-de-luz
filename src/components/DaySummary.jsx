import { Moon, Sun, Sunrise, Sunset, Thermometer, Umbrella } from 'lucide-react'
import Metric from './ui/Metric.jsx'
import {
  formatarHorario,
  formatarIntervalo,
  formatarPorcentagem,
  formatarTemperatura,
} from '../utils/formatters.js'

// Resumo do dia escolhido: nascer e pôr do sol, golden e blue hour, temperatura e chuva.
// São as "métricas" da seção: ficam direto sobre a página, sem card.
function DaySummary({ dia, janelas }) {
  const temperaturas = dia.horas.map((hora) => hora.temperatura)
  const chancesDeChuva = dia.horas.map((hora) => hora.probabilidadeChuva ?? 0)

  return (
    <div className="day-summary">
      <Metric icon={Sunrise} label="Nascer do sol" value={formatarHorario(dia.nascerDoSol)} />
      <Metric icon={Sunset} label="Pôr do sol" value={formatarHorario(dia.porDoSol)} />
      <Metric
        icon={Sun}
        label="Golden hour"
        value={[formatarIntervalo(janelas.goldenManha), formatarIntervalo(janelas.goldenTarde)]}
      />
      <Metric
        icon={Moon}
        label="Blue hour"
        value={[formatarIntervalo(janelas.blueManha), formatarIntervalo(janelas.blueTarde)]}
      />
      <Metric
        icon={Thermometer}
        label="Temperatura"
        value={`${formatarTemperatura(Math.min(...temperaturas))} a ${formatarTemperatura(Math.max(...temperaturas))}`}
      />
      <Metric
        icon={Umbrella}
        label="Maior chance de chuva"
        value={formatarPorcentagem(Math.max(...chancesDeChuva))}
      />
    </div>
  )
}

export default DaySummary
