import { Star } from 'lucide-react'
import Chip from './ui/Chip.jsx'

// Atalhos para as locações favoritas. Um clique abre a previsão da cidade, sem precisar buscar.
function SavedLocations({ favoritos, onSelect }) {
  if (favoritos.length === 0) {
    return null
  }

  return (
    <section className="section animate-fade-in" aria-labelledby="titulo-favoritos">
      <div className="section-heading">
        <h2 id="titulo-favoritos" className="heading-2">
          Locações salvas ({favoritos.length})
        </h2>
        <p className="body-sm text-muted">Selecione uma locação para ver a previsão</p>
      </div>

      <div className="chip-row chip-row--quebra">
        {favoritos.map((cidade) => (
          <Chip key={cidade.id} onClick={() => onSelect(cidade)}>
            <Star size={14} fill="currentColor" aria-hidden="true" />
            {cidade.nome}
            {cidade.estado && <span className="text-muted">{cidade.estado}</span>}
          </Chip>
        ))}
      </div>
    </section>
  )
}

export default SavedLocations
