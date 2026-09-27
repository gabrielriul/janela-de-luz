import Card from './ui/Card.jsx'
import Shimmer from './ui/Shimmer.jsx'
import { ResponsiveGridList } from './ui/Layout.jsx'

// Versão "esqueleto" da previsão, exibida enquanto a API responde.
// Repete a estrutura das duas seções, com formas cinza no lugar do conteúdo.
const QUANTIDADE_DE_JANELAS = 3
const QUANTIDADE_DE_DIAS = 7
const QUANTIDADE_DE_METRICAS = 6

// Cria [0, 1, 2, ...] para desenhar a mesma quantidade de formas
function lista(quantidade) {
  return Array.from({ length: quantidade }, (_, indice) => indice)
}

function ForecastSkeleton() {
  return (
    <>
      <section className="content-section" aria-busy="true">
        <span className="sr-only" role="status">
          Carregando...
        </span>
        <TituloDaSecao />
        <Shimmer width={300} height={40} rounded />
        <ResponsiveGridList cols={{ mobile: 1, tablet: 3 }}>
          {lista(QUANTIDADE_DE_JANELAS).map((indice) => (
            <li key={indice}>
              <Card>
                <Shimmer width={120} height={16} />
                <Shimmer width={90} height={22} />
                <Shimmer width={140} height={16} />
              </Card>
            </li>
          ))}
        </ResponsiveGridList>
      </section>

      <section className="content-section" aria-hidden="true">
        <TituloDaSecao />
        <div className="chip-row chip-row--sem-quebra">
          {lista(QUANTIDADE_DE_DIAS).map((indice) => (
            <Shimmer key={indice} width={96} height={40} rounded />
          ))}
        </div>
        <div className="day-summary">
          {lista(QUANTIDADE_DE_METRICAS).map((indice) => (
            <div key={indice} className="metric">
              <Shimmer width={90} height={16} />
              <Shimmer width={120} height={25} />
            </div>
          ))}
        </div>
        <ChartSkeleton />
      </section>
    </>
  )
}

function TituloDaSecao() {
  return (
    <div className="section-title">
      <Shimmer width={260} height={25} />
      <Shimmer width={200} height={16} />
    </div>
  )
}

// Esqueleto do card do gráfico: também aparece enquanto o código do Recharts é baixado (Suspense)
export function ChartSkeleton() {
  return (
    <Card>
      <Shimmer width={180} height={22} />
      <Shimmer full height={240} />
    </Card>
  )
}

export default ForecastSkeleton
