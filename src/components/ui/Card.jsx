import './ui.css'

// Container padrão de conteúdo: superfície branca sobre a página cinza, raio de 20px, sem borda.
// gutter: 'sm' (24px, padrão) | 'lg' (32px a partir do tablet) | 'none' (tabela ou gráfico encostado na borda)
// clickable: o card sobe no hover. Só card que abre algo pode ser clicável.
// as: troca a tag (ex.: as="button" para um card clicável acessível pelo teclado).
function Card({ as: Tag = 'div', gutter = 'sm', clickable = false, className = '', children, ...props }) {
  const classes = [
    'card',
    gutter === 'lg' && 'card--lg',
    gutter === 'none' && 'card--flush',
    clickable && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Card
