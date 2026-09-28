import './ui.css'

// Botão em cápsula, com rótulo em 17px semibold (15px no compacto).
// variant: 'primary' (a ação principal, uma por tela) | 'secondary' (verde-claro)
//          | 'secondary-neutral' e 'ghost' (cinza do sistema) | 'glass' (flutua sobre o conteúdo)
// size: 'md' (48px, padrão) | 'icon' (só ícone, redondo; use aria-label)
// compact: versão de 36px, para ações ao lado de títulos e dentro de cards
// As demais props (onClick, type, disabled, aria-label...) vão direto para o <button>.
function Button({ variant = 'primary', size = 'md', compact = false, className = '', children, ...props }) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'icon' && 'btn--icon',
    compact && 'btn--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
