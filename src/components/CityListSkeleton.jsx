import Shimmer from './ui/Shimmer.jsx'

// Versão "esqueleto" da lista de cidades, exibida enquanto a API responde.
// As formas cinza ocupam o lugar exato do conteúdo que ainda vai chegar.
const QUANTIDADE_DE_LINHAS = 3

function CityListSkeleton() {
  // Array.from cria [0, 1, 2] para desenhar a mesma quantidade de linhas
  const linhas = Array.from({ length: QUANTIDADE_DE_LINHAS }, (_, indice) => indice)

  return (
    <section className="content-section" aria-busy="true">
      <span className="sr-only" role="status">
        Carregando...
      </span>
      <div className="section-title">
        <Shimmer width={240} height={25} />
        <Shimmer width={180} height={16} />
      </div>

      <ul className="list">
        {linhas.map((indice) => (
          <li key={indice} className="list__row">
            <Shimmer width={20} height={20} rounded />
            <span className="list__text city-skeleton__texto">
              <Shimmer width={160} height={20} />
              <Shimmer width={110} height={16} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CityListSkeleton
