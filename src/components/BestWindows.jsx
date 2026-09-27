import { CalendarSearch } from 'lucide-react'
import Card from './ui/Card.jsx'
import ScoreBadge from './ScoreBadge.jsx'
import EmptyState from './EmptyState.jsx'
import { formatarJanela, formatarNomeDoDia } from '../utils/formatters.js'

// Cards com as melhores janelas de gravação da semana.
// onSelect: recebe a janela escolhida (para abrir o dia dela na tabela)
function BestWindows({ janelas, onSelect }) {
  if (janelas.length === 0) {
    return (
      <EmptyState
        icon={CalendarSearch}
        titulo="Nenhuma janela boa nos próximos 7 dias"
        texto="Nenhuma sequência de horas chegou à nota 6. Tente outro modo de gravação ou outra cidade."
      />
    )
  }

  return (
    <ul className="window-grid">
      {janelas.map((janela, posicao) => (
        <li key={`${janela.data}-${janela.inicio}`}>
          <Card as="button" clickable onClick={() => onSelect(janela)}>
            <div className="window-card">
              <div className="window-card__topo">
                <span className="caption text-muted">{posicao + 1}ª melhor janela</span>
                <ScoreBadge nota={janela.notaMedia} mostrarRotulo />
              </div>
              <span className="heading-2">{formatarNomeDoDia(janela.data, janela.indiceDia)}</span>
              <span>{formatarJanela(janela.inicio, janela.fim)}</span>
              <span className="caption text-muted">
                {janela.quantidadeDeHoras} {janela.quantidadeDeHoras === 1 ? 'hora' : 'horas'}
                {janela.temGoldenHour && ' · inclui golden hour'}
              </span>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default BestWindows
