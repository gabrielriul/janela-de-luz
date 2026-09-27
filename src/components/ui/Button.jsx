import './ui.css'

// Botão em formato de pílula.
// variant: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'text'
// size: 'md' | 'icon' | 'text'
// As demais props (onClick, type, disabled, aria-label...) vão direto para o <button>.
function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = `btn btn--${variant} btn--size-${size} ${className}`.trim()

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
