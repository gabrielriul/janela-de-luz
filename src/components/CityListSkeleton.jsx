import Card from './ui/Card.jsx'
import Shimmer from './ui/Shimmer.jsx'

// Versão "esqueleto" da lista de cidades, exibida enquanto a API responde.
// Os blocos animados ocupam o lugar do conteúdo que ainda vai chegar.
const QUANTIDADE_DE_CARDS = 3

function CityListSkeleton() {
  // Array.from cria [0, 1, 2] para desenhar a mesma quantidade de cards
  const cards = Array.from({ length: QUANTIDADE_DE_CARDS }, (_, indice) => indice)

  return (
    <section className="section" aria-busy="true">
      <div className="section-heading">
        <Shimmer width={220} height={30} />
        <span className="sr-only" role="status">
          Carregando...
        </span>
      </div>

      <ul className="city-grid">
        {cards.map((indice) => (
          <li key={indice}>
            <Card>
              <div className="city-card">
                <Shimmer width={160} height={24} />
                <Shimmer width={120} height={16} />
                <Shimmer width={100} height={14} />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CityListSkeleton
