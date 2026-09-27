import './ui.css'

// Container padrão de conteúdo.
// gutter: 'sm' (padrão) | 'lg' | 'none' — define o espaçamento interno.
// clickable: mostra sombra no hover, indicando que o card é interativo.
// as: permite trocar a tag (ex.: as="button" para um card clicável acessível pelo teclado).
function Card({ as: Tag = 'div', gutter = 'sm', clickable = false, className = '', children, ...props }) {
  const classes = `card card--gutter-${gutter} ${clickable ? 'card--clickable' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Card
