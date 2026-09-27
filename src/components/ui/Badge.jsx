import './ui.css'

// Etiqueta em pílula para status e informações curtas. Não é um controle clicável.
// size: 'sm' | 'lg'
// tone: 'green' (padrão) | 'dark' | 'neutral' | 'blue' | 'warning' | 'negative'
// As demais props (title, aria-label...) vão direto para o <span>.
function Badge({ size = 'sm', tone = 'green', children, ...props }) {
  return (
    <span className={`badge badge--${size} badge--${tone}`} {...props}>
      {children}
    </span>
  )
}

export default Badge
