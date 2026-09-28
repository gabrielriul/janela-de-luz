import { CalendarSearch } from 'lucide-react'
import Card from './ui/Card.jsx'
import FeedbackPlaceholder from './ui/FeedbackPlaceholder.jsx'
import { ResponsiveGridList } from './ui/Layout.jsx'
import ScoreBadge from './ScoreBadge.jsx'
import { formatarJanela, formatarNomeDoDia } from '../utils/formatters.js'
import { NOTA_BOA } from '../utils/nota.js'

// Cards com as melhores janelas de gravação da semana.
// onSelect: recebe a janela escolhida (para abrir o dia dela na tabela)
function BestWindows({ janelas, onSelect }) {
  if (janelas.length === 0) {
    return (
      <FeedbackPlaceholder
        icon={CalendarSearch}
        title="Nenhuma janela boa nos próximos 7 dias"
        titleAs="h3"
        description={`Nenhuma sequência de horas chegou à nota ${NOTA_BOA}. Tente outro modo de gravação ou outra cidade.`}
      />
    )
  }

  return (
    <ResponsiveGridList cols={{ mobile: 1, tablet: 3 }}>
      {janelas.map((janela, posicao) => (
        <li key={`${janela.data}-${janela.inicio}`}>
          {/* Card clicável: abre o dia da janela na tabela, com as horas destacadas */}
          <Card as="button" clickable className="window-card" onClick={() => onSelect(janela)}>
            <span className="window-card__topo">
              <span className="caption text-secondary">{posicao + 1}ª melhor janela</span>
              <ScoreBadge nota={janela.notaMedia} mostrarRotulo />
            </span>
            <span className="window-card__corpo">
              <span className="headline">{formatarNomeDoDia(janela.data, janela.indiceDia)}</span>
              <span className="tabular">{formatarJanela(janela.inicio, janela.fim)}</span>
              <span className="caption text-secondary">
                {janela.quantidadeDeHoras} {janela.quantidadeDeHoras === 1 ? 'hora' : 'horas'}
                {janela.temGoldenHour && ' · inclui golden hour'}
              </span>
            </span>
          </Card>
        </li>
      ))}
    </ResponsiveGridList>
  )
}

export default BestWindows
