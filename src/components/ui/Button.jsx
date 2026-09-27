import './ui.css'

// Botão em formato de pílula, com 48px de altura.
// variant: 'primary' (ação principal) | 'secondary' | 'outline'
// As demais props (onClick, type, disabled, aria-label...) vão direto para o <button>.
function Button({ variant = 'primary', className = '', children, ...props }) {
  const classes = `btn btn--${variant} ${className}`.trim()

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
