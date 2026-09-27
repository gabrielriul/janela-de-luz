import Chip from './ui/Chip.jsx'
import { formatarDiaCurto } from '../utils/formatters.js'

// Nome de cada dia: os dois primeiros ganham "Hoje" e "Amanhã"
function nomeDoDia(dataIso, indice) {
  if (indice === 0) return 'Hoje'
  if (indice === 1) return 'Amanhã'
  return formatarDiaCurto(dataIso)
}

// Fileira de chips para escolher qual dos 7 dias mostrar
function DaySelector({ dias, indiceSelecionado, onSelect }) {
  return (
    <div className="day-selector" role="group" aria-label="Dia da previsão">
      {dias.map((dia, indice) => (
        <Chip key={dia.data} isActive={indice === indiceSelecionado} onClick={() => onSelect(indice)}>
          {nomeDoDia(dia.data, indice)}
        </Chip>
      ))}
    </div>
  )
}

export default DaySelector
