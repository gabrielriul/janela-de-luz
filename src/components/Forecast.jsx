import { useState } from 'react'
import { CalendarX, CircleAlert } from 'lucide-react'
import DaySelector from './DaySelector.jsx'
import DaySummary from './DaySummary.jsx'
import HourlyTable from './HourlyTable.jsx'
import ForecastSkeleton from './ForecastSkeleton.jsx'
import EmptyState from './EmptyState.jsx'
import Button from './ui/Button.jsx'
import { usePrevisao } from '../hooks/usePrevisao.js'
import { calcularJanelasDeLuz } from '../utils/luz.js'
import { formatarDiaLongo } from '../utils/formatters.js'

// Previsão hora a hora da cidade escolhida, com seleção de dia
function Forecast({ cidade }) {
  const { dias, status, recarregar } = usePrevisao(cidade)
  const [indiceDia, setIndiceDia] = useState(0)

  if (status === 'carregando') {
    return <ForecastSkeleton />
  }

  if (status === 'erro') {
    return (
      <EmptyState
        icon={CircleAlert}
        tone="negative"
        titulo="Não foi possível carregar a previsão"
        texto="Verifique sua conexão com a internet e tente novamente."
      >
        <Button variant="secondary" onClick={recarregar}>
          Tentar novamente
        </Button>
      </EmptyState>
    )
  }

  const dia = dias[indiceDia]

  if (!dia) {
    return (
      <EmptyState
        icon={CalendarX}
        titulo="Não há dados disponíveis"
        texto="A previsão desta cidade veio vazia. Tente outra cidade."
      />
    )
  }

  const janelas = calcularJanelasDeLuz(dia.nascerDoSol, dia.porDoSol)

  return (
    <section className="section animate-fade-in" aria-labelledby="titulo-previsao">
      <div className="section-heading">
        <h2 id="titulo-previsao" className="heading-2">
          Previsão hora a hora
        </h2>
        <p className="body-sm text-muted">
          {formatarDiaLongo(dia.data)} · horários no fuso da cidade
        </p>
      </div>

      <DaySelector dias={dias} indiceSelecionado={indiceDia} onSelect={setIndiceDia} />
      <DaySummary dia={dia} janelas={janelas} />
      <HourlyTable horas={dia.horas} janelas={janelas} />
    </section>
  )
}

export default Forecast
