import './ui.css'

// Bloco animado que ocupa o lugar de um conteúdo que ainda está carregando.
// width/height em pixels; full={true} ocupa toda a largura disponível.
function Shimmer({ width, height = 24, full = false }) {
  return (
    <span
      className="shimmer"
      style={{ width: full ? '100%' : width, height }}
      aria-hidden="true"
    />
  )
}

export default Shimmer
