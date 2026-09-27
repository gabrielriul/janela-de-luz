import { MapPin, Star } from 'lucide-react'
import ContentSection from './ui/ContentSection.jsx'
import { List, ListItem } from './ui/List.jsx'
import { formatarCoordenadas, formatarRegiao } from '../utils/formatters.js'

// Lista das cidades encontradas na busca, no formato de lista agrupada do iOS.
// onSelect: função chamada com a cidade escolhida
// ehFavorita: função que diz se a cidade está nas locações salvas
function CityList({ cidades, onSelect, ehFavorita }) {
  return (
    <ContentSection
      title={`Cidades encontradas (${cidades.length})`}
      subtitle="Selecione a cidade da gravação"
      className="animate-fade-in"
    >
      <List className="city-list">
        {/* map() transforma cada objeto cidade em uma linha da lista; key identifica cada item para o React */}
        {cidades.map((cidade) => (
          <ListItem
            key={cidade.id}
            icon={MapPin}
            label={
              <>
                {cidade.nome}
                {ehFavorita(cidade) && (
                  <Star size={16} fill="currentColor" aria-label="Locação salva" role="img" />
                )}
              </>
            }
            subLabel={formatarRegiao(cidade)}
            value={formatarCoordenadas(cidade.latitude, cidade.longitude)}
            onClick={() => onSelect(cidade)}
          />
        ))}
      </List>
    </ContentSection>
  )
}

export default CityList
