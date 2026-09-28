import Chip from './ui/Chip.jsx'
import OverflowXContainer from './ui/OverflowXContainer.jsx'
import { formatarNomeDoDia, formatarNota } from '../utils/formatters.js'

// Fileira de chips para escolher qual dos 7 dias mostrar (7 opções: chips, não controle segmentado).
// Cada chip mostra a melhor nota do dia no modo de gravação atual.
function DaySelector({ dias, indiceSelecionado, onSelect }) {
  return (
    <OverflowXContainer activeIndex={indiceSelecionado} role="group" aria-label="Dia da previsão">
      {dias.map((dia, indice) => (
        <Chip
          key={dia.data}
          isActive={indice === indiceSelecionado}
          onClick={() => onSelect(indice)}
          title={`Melhor nota do dia: ${formatarNota(dia.melhorNota)}`}
        >
          {formatarNomeDoDia(dia.data, indice)}
          <span className="chip__count">
            <span className="sr-only">melhor nota </span>
            {formatarNota(dia.melhorNota)}
          </span>
        </Chip>
      ))}
    </OverflowXContainer>
  )
}

export default DaySelector
