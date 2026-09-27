import Card from './ui/Card.jsx'
import Shimmer from './ui/Shimmer.jsx'

// Versão "esqueleto" da previsão, exibida enquanto a API responde
const QUANTIDADE_DE_DIAS = 7
const QUANTIDADE_DE_LINHAS = 6

function ForecastSkeleton() {
  const dias = Array.from({ length: QUANTIDADE_DE_DIAS }, (_, indice) => indice)
  const linhas = Array.from({ length: QUANTIDADE_DE_LINHAS }, (_, indice) => indice)

  return (
    <section className="section" aria-busy="true">
      <div className="section-heading">
        <Shimmer width={200} height={30} />
        <span className="sr-only" role="status">
          Carregando...
        </span>
      </div>

      <div className="chip-row">
        {dias.map((indice) => (
          <Shimmer key={indice} width={88} height={40} />
        ))}
      </div>

      <Card>
        <div className="day-summary">
          {dias.slice(0, 5).map((indice) => (
            <div key={indice} className="metric">
              <Shimmer width={90} height={14} />
              <Shimmer width={120} height={26} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        {linhas.map((indice) => (
          <Shimmer key={indice} full height={18} />
        ))}
      </Card>
    </section>
  )
}

export default ForecastSkeleton
