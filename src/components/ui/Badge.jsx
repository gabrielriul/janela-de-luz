import './ui.css'

// Etiqueta em cápsula para status e informações curtas. Não é clicável (para isso, use Chip).
// tone: 'green' (padrão) | 'ink' (escura) | 'info' (azul) | 'warning' | 'negative'
// A cor nunca fala sozinha: o texto da etiqueta sempre diz o que ela significa.
// As demais props (title, aria-label...) vão direto para o <span>.
function Badge({ tone = 'green', className = '', children, ...props }) {
  const classes = ['badge', tone !== 'green' && `badge--${tone}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

export default Badge
