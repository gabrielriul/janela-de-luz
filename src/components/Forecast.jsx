import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { CalendarX, CircleAlert } from 'lucide-react'
import ModeSelector from './ModeSelector.jsx'
import BestWindows from './BestWindows.jsx'
import DaySelector from './DaySelector.jsx'
import DaySummary from './DaySummary.jsx'
import HourlyTable from './HourlyTable.jsx'
import ForecastSkeleton, { ChartSkeleton } from './ForecastSkeleton.jsx'
import Button from './ui/Button.jsx'
import ContentSection from './ui/ContentSection.jsx'
import FeedbackPlaceholder from './ui/FeedbackPlaceholder.jsx'
import { usePrevisao } from '../hooks/usePrevisao.js'
import { useArmazenamentoLocal } from '../hooks/useArmazenamentoLocal.js'
import { classificarNota, MODOS } from '../utils/nota.js'
import { avaliarDias, encontrarMelhoresJanelas, encontrarMelhorHora } from '../utils/avaliacao.js'
import { formatarDiaLongo, formatarHorario, formatarNota } from '../utils/formatters.js'

// O gráfico usa a biblioteca Recharts, que é grande. Com lazy, o código dele só é baixado
// quando o gráfico aparece pela primeira vez, e a página inicial carrega mais rápido.
const ScoreChart = lazy(() => import('./ScoreChart.jsx'))

// Previsão da cidade escolhida, em duas seções no padrão ContentSection do design system:
// 1. Melhores janelas: modo de gravação (filtro) e os cards das janelas
// 2. Previsão hora a hora: dias (filtro), melhor horário (destaque), resumo (métricas), gráfico e tabela
function Forecast({ cidade }) {
  const { dias, agora, status, recarregar } = usePrevisao(cidade)
  // O modo escolhido fica salvo no navegador e volta na próxima visita
  const [modoSalvo, setChaveModo] = useArmazenamentoLocal('janela-de-luz:modo', 'externa')
  const chaveModo = MODOS[modoSalvo] ? modoSalvo : 'externa' // ignora um valor salvo inválido
  const [indiceDia, setIndiceDia] = useState(0)
  const [destaque, setDestaque] = useState(null) // janela escolhida nos cards
  const refPrevisao = useRef(null) // referência à seção hora a hora, para rolar a tela até ela

  const modo = MODOS[chaveModo]

  // useMemo guarda o resultado de uma conta e só refaz quando as dependências mudam.
  // Aqui são 168 notas (7 dias x 24 horas): elas só são recalculadas quando chega uma
  // previsão nova ou quando o modo muda. Trocar o dia ou destacar uma janela não refaz a conta.
  const diasAvaliados = useMemo(() => avaliarDias(dias, modo), [dias, modo])

  const melhoresJanelas = useMemo(
    () => encontrarMelhoresJanelas(diasAvaliados, agora),
    [diasAvaliados, agora],
  )

  function handleModeChange(chave) {
    setChaveModo(chave)
    setDestaque(null) // a janela destacada pode não existir no novo modo
  }

  function handleDaySelect(indice) {
    setIndiceDia(indice)
    setDestaque(null)
  }

  function handleWindowSelect(janela) {
    setIndiceDia(janela.indiceDia)
    setDestaque(janela)
    // Rolagem suave, a não ser que a pessoa prefira menos movimento na tela
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    refPrevisao.current?.scrollIntoView({ behavior: menosMovimento ? 'auto' : 'smooth', block: 'start' })
  }

  if (status === 'carregando') {
    return <ForecastSkeleton />
  }

  if (status === 'erro') {
    return (
      <FeedbackPlaceholder
        icon={CircleAlert}
        tone="negative"
        title="Não foi possível carregar a previsão"
        description="Verifique sua conexão com a internet e tente novamente."
      >
        <Button variant="secondary-neutral" compact onClick={recarregar}>
          Tentar novamente
        </Button>
      </FeedbackPlaceholder>
    )
  }

  const dia = diasAvaliados[indiceDia]

  if (!dia) {
    return (
      <FeedbackPlaceholder
        icon={CalendarX}
        title="Não há dados disponíveis"
        description="A previsão desta cidade veio vazia. Tente outra cidade."
      />
    )
  }

  // Só o dia de hoje tem horas que já passaram
  const horaAtual = indiceDia === 0 && agora ? `${agora.slice(0, 13)}:00` : ''
  const melhorHora = encontrarMelhorHora(dia, horaAtual)
  const { rotulo } = classificarNota(melhorHora.nota)

  return (
    <>
      <ContentSection
        title="Melhores janelas para gravar"
        subtitle="As horas seguidas com as maiores notas nos próximos 7 dias"
        filters={<ModeSelector chaveModo={chaveModo} onChange={handleModeChange} />}
        className="animate-fade-in"
      >
        <BestWindows janelas={melhoresJanelas} onSelect={handleWindowSelect} />
      </ContentSection>

      <ContentSection
        ref={refPrevisao}
        title="Previsão hora a hora"
        subtitle={`${formatarDiaLongo(dia.data)} · horários no fuso da cidade`}
        filters={
          <DaySelector dias={diasAvaliados} indiceSelecionado={indiceDia} onSelect={handleDaySelect} />
        }
        titleCard={`Melhor horário do dia · modo ${modo.nome}`}
        contentCard={`Às ${formatarHorario(melhorHora.horario)}, com nota ${formatarNota(melhorHora.nota)} (${rotulo.toLowerCase()})`}
        metrics={<DaySummary dia={dia} janelas={dia.janelas} />}
        className="animate-fade-in"
      >
        {/* Suspense mostra o esqueleto enquanto o código do gráfico é baixado */}
        <Suspense fallback={<ChartSkeleton />}>
          <ScoreChart dia={dia} horaAtual={horaAtual} melhorHora={melhorHora} />
        </Suspense>
        <HourlyTable horas={dia.horas} horaAtual={horaAtual} destaque={destaque} />
      </ContentSection>
    </>
  )
}

export default Forecast
