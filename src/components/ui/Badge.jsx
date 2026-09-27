import './ui.css'

// Etiqueta em pílula para status e informações curtas. Não é um controle clicável.
// tone: 'green' (padrão) | 'dark' | 'neutral' | 'blue' | 'warning' | 'negative'
// As demais props (title, aria-label...) vão direto para o <span>.
function Badge({ tone = 'green', children, ...props }) {
  return (
    <span className={`badge badge--${tone}`} {...props}>
      {children}
    </span>
  )
}

export default Badge
