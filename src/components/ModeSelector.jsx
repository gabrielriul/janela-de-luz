import { Info } from 'lucide-react'
import Chip from './ui/Chip.jsx'
import { MODOS } from '../utils/nota.js'

// Escolha do modo de gravação. Cada modo muda os pesos da nota.
function ModeSelector({ chaveModo, onChange }) {
  return (
    <div className="mode-selector">
      <div className="chip-row" role="group" aria-label="Modo de gravação">
        {/* Object.entries transforma o objeto MODOS em uma lista de [chave, modo] */}
        {Object.entries(MODOS).map(([chave, modo]) => (
          <Chip key={chave} isActive={chave === chaveModo} onClick={() => onChange(chave)}>
            {modo.nome}
          </Chip>
        ))}
      </div>
      <p className="mode-selector__descricao body-sm text-muted">
        <Info size={14} aria-hidden="true" />
        {MODOS[chaveModo].descricao}
      </p>
    </div>
  )
}

export default ModeSelector
