import { Moon, Sun, Sunrise, Sunset, Thermometer, Umbrella } from 'lucide-react'
import Card from './ui/Card.jsx'
import {
  formatarHorario,
  formatarIntervalo,
  formatarPorcentagem,
  formatarTemperatura,
} from '../utils/formatters.js'

// Resumo do dia escolhido: nascer e pôr do sol, golden e blue hour, temperatura e chuva
function DaySummary({ dia, janelas }) {
  const temperaturas = dia.horas.map((hora) => hora.temperatura)
  const chancesDeChuva = dia.horas.map((hora) => hora.probabilidadeChuva ?? 0)

  return (
    <Card>
      <div className="day-summary">
        <Metrica icon={Sunrise} rotulo="Nascer do sol" valor={formatarHorario(dia.nascerDoSol)} />
        <Metrica icon={Sunset} rotulo="Pôr do sol" valor={formatarHorario(dia.porDoSol)} />
        <Metrica
          icon={Sun}
          rotulo="Golden hour"
          valor={[formatarIntervalo(janelas.goldenManha), formatarIntervalo(janelas.goldenTarde)]}
        />
        <Metrica
          icon={Moon}
          rotulo="Blue hour"
          valor={[formatarIntervalo(janelas.blueManha), formatarIntervalo(janelas.blueTarde)]}
        />
        <Metrica
          icon={Thermometer}
          rotulo="Temperatura"
          valor={`${formatarTemperatura(Math.min(...temperaturas))} a ${formatarTemperatura(Math.max(...temperaturas))}`}
        />
        <Metrica
          icon={Umbrella}
          rotulo="Maior chance de chuva"
          valor={formatarPorcentagem(Math.max(...chancesDeChuva))}
        />
      </div>
    </Card>
  )
}

// Um bloco de rótulo + valor. Fica no mesmo arquivo porque só é usado aqui.
// valor pode ser um texto ou uma lista de textos (um por linha).
function Metrica({ icon: Icon, rotulo, valor }) {
  const linhas = Array.isArray(valor) ? valor : [valor]

  return (
    <div className="metric">
      <span className="metric__label">
        <Icon size={14} aria-hidden="true" />
        {rotulo}
      </span>
      {linhas.map((linha) => (
        <span key={linha} className="metric__value">
          {linha}
        </span>
      ))}
    </div>
  )
}

export default DaySummary
