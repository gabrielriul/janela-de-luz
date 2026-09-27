import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { CalendarX, CircleAlert } from 'lucide-react'
import ModeSelector from './ModeSelector.jsx'
import BestWindows from './BestWindows.jsx'
import DaySelector from './DaySelector.jsx'
import DaySummary from './DaySummary.jsx'
import HourlyTable from './HourlyTable.jsx'
import ForecastSkeleton from './ForecastSkeleton.jsx'
import EmptyState from './EmptyState.jsx'
import Button from './ui/Button.jsx'
import Card from './ui/Card.jsx'
import Shimmer from './ui/Shimmer.jsx'
import { usePrevisao } from '../hooks/usePrevisao.js'
import { useArmazenamentoLocal } from '../hooks/useArmazenamentoLocal.js'
import { MODOS } from '../utils/nota.js'
import { avaliarDias, encontrarMelhoresJanelas } from '../utils/avaliacao.js'
import { formatarDiaLongo } from '../utils/formatters.js'

// O gráfico usa a biblioteca Recharts, que é grande. Com lazy, o código dele só é baixado
// quando o gráfico aparece pela primeira vez, e a página inicial carrega mais rápido.
const ScoreChart = lazy(() => import('./ScoreChart.jsx'))

// Previsão da cidade escolhida: modo de gravação, melhores janelas e tabela hora a hora
function Forecast({ cidade }) {
  const { dias, agora, status, recarregar } = usePrevisao(cidade)
  // O modo escolhido fica salvo no navegador e volta na próxima visita
  const [modoSalvo, setChaveModo] = useArmazenamentoLocal('janela-de-luz:modo', 'externa')
  const chaveModo = MODOS[modoSalvo] ? modoSalvo : 'externa' // ignora um valor salvo inválido
  const [indiceDia, setIndiceDia] = useState(0)
  const [destaque, setDestaque] = useState(null) // janela escolhida nos cards
  const refTabela = useRef(null) // referência à seção da tabela, para rolar a tela até ela

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
    refTabela.current?.scrollIntoView({ behavior: menosMovimento ? 'auto' : 'smooth', block: 'start' })
  }

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

  const dia = diasAvaliados[indiceDia]

  if (!dia) {
    return (
      <EmptyState
        icon={CalendarX}
        titulo="Não há dados disponíveis"
        texto="A previsão desta cidade veio vazia. Tente outra cidade."
      />
    )
  }

  // Só o dia de hoje tem horas que já passaram
  const horaAtual = indiceDia === 0 && agora ? `${agora.slice(0, 13)}:00` : ''

  return (
    <>
      <section className="section animate-fade-in" aria-labelledby="titulo-janelas">
        <div className="section-heading">
          <h2 id="titulo-janelas" className="heading-2">
            Melhores janelas para gravar
          </h2>
          <p className="body-sm text-muted">
            As sequências de horas com as maiores notas nos próximos 7 dias. Escolha o modo de
            gravação.
          </p>
        </div>

        <ModeSelector chaveModo={chaveModo} onChange={handleModeChange} />
        <BestWindows janelas={melhoresJanelas} onSelect={handleWindowSelect} />
      </section>

      <section
        ref={refTabela}
        className="section section--scroll-alvo animate-fade-in"
        aria-labelledby="titulo-previsao"
      >
        <div className="section-heading">
          <h2 id="titulo-previsao" className="heading-2">
            Previsão hora a hora
          </h2>
          <p className="body-sm text-muted">
            {formatarDiaLongo(dia.data)} · horários no fuso da cidade · passe o mouse na nota para
            ver o motivo
          </p>
        </div>

        <DaySelector dias={diasAvaliados} indiceSelecionado={indiceDia} onSelect={handleDaySelect} />
        <DaySummary dia={dia} janelas={dia.janelas} />
        {/* Suspense mostra o esqueleto enquanto o código do gráfico é baixado */}
        <Suspense
          fallback={
            <Card>
              <Shimmer full height={280} />
            </Card>
          }
        >
          <ScoreChart dia={dia} horaAtual={horaAtual} nomeDoModo={modo.nome} />
        </Suspense>
        <HourlyTable horas={dia.horas} horaAtual={horaAtual} destaque={destaque} />
      </section>
    </>
  )
}

export default Forecast
