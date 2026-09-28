import { Star } from 'lucide-react'
import Chip from './ui/Chip.jsx'
import ContentSection from './ui/ContentSection.jsx'

// Atalhos para as locações favoritas. Um clique abre a previsão da cidade, sem precisar buscar.
function SavedLocations({ favoritos, onSelect }) {
  if (favoritos.length === 0) {
    return null
  }

  return (
    <ContentSection
      title={`Locações salvas (${favoritos.length})`}
      subtitle="Selecione uma locação para ver a previsão"
      className="animate-fade-in"
    >
      <div className="chip-row">
        {favoritos.map((cidade) => (
          <Chip key={cidade.id} onClick={() => onSelect(cidade)}>
            <Star size={16} fill="currentColor" aria-hidden="true" />
            {cidade.nome}
            {cidade.estado && <span className="chip__detail">{cidade.estado}</span>}
          </Chip>
        ))}
      </div>
    </ContentSection>
  )
}

export default SavedLocations
