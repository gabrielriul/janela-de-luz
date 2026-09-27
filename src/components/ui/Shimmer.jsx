import './ui.css'

// Forma cinza que ocupa o lugar de um conteúdo que ainda está carregando e pulsa de leve.
// width/height em pixels; full ocupa toda a largura; rounded deixa em cápsula (chips, botões).
function Shimmer({ width, height = 24, full = false, rounded = false }) {
  return (
    <span
      className={`shimmer ${rounded ? 'shimmer--round' : ''}`.trim()}
      style={{ width: full ? '100%' : width, height }}
      aria-hidden="true"
    />
  )
}

export default Shimmer
