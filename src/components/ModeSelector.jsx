import { useId } from 'react'
import { Info } from 'lucide-react'
import SegmentedControl from './ui/SegmentedControl.jsx'
import { MODOS } from '../utils/nota.js'

// Escolha do modo de gravação (3 opções, então um controle segmentado). Cada modo muda os pesos da nota.
function ModeSelector({ chaveModo, onChange }) {
  const idDaDescricao = useId()
  // Object.entries transforma o objeto MODOS em uma lista de [chave, modo]
  const opcoes = Object.entries(MODOS).map(([chave, modo]) => ({ value: chave, label: modo.nome }))

  return (
    <>
      <SegmentedControl
        label="Modo de gravação"
        options={opcoes}
        value={chaveModo}
        onChange={onChange}
        aria-describedby={idDaDescricao}
      />
      <p id={idDaDescricao} className="mode-description body-sm text-secondary">
        <Info size={16} aria-hidden="true" />
        {MODOS[chaveModo].descricao}
      </p>
    </>
  )
}

export default ModeSelector
