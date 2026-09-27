import './ui.css'

// Etiqueta em pílula para status e informações curtas. Não é um controle clicável.
// size: 'sm' | 'lg'
// tone: 'green' (padrão) | 'neutral' | 'blue' | 'warning' | 'negative'
function Badge({ size = 'sm', tone = 'green', children }) {
  return <span className={`badge badge--${size} badge--${tone}`}>{children}</span>
}

export default Badge
