import { MapPin } from 'lucide-react'
import Card from './ui/Card.jsx'
import { formatarCoordenadas, formatarRegiao } from '../utils/formatters.js'

// Lista das cidades encontradas na busca. Cada cidade é um card clicável.
// onSelect: função chamada com a cidade escolhida
function CityList({ cidades, onSelect }) {
  return (
    <section className="section animate-fade-in" aria-labelledby="titulo-cidades">
      <div className="section-heading">
        <h2 id="titulo-cidades" className="heading-2">
          Cidades encontradas ({cidades.length})
        </h2>
        <p className="body-sm text-muted">Selecione a cidade da sua gravação</p>
      </div>

      <ul className="city-grid">
        {/* map() transforma cada objeto cidade em um item da lista; key identifica cada item para o React */}
        {cidades.map((cidade) => (
          <li key={cidade.id}>
            <Card as="button" clickable onClick={() => onSelect(cidade)}>
              <div className="city-card">
                <span className="city-card__name">
                  <MapPin size={16} aria-hidden="true" />
                  {cidade.nome}
                </span>
                <span className="body-sm text-muted">{formatarRegiao(cidade)}</span>
                <span className="caption text-muted">
                  {formatarCoordenadas(cidade.latitude, cidade.longitude)}
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CityList
