import './ui.css'

// Pílula clicável para filtros e seleção (a versão interativa do Badge).
// isActive: destaca o chip selecionado (fundo escuro, texto menta)
function Chip({ isActive = false, className = '', children, ...props }) {
  const classes = `chip ${isActive ? 'chip--active' : ''} ${className}`.replace(/\s+/g, ' ').trim()

  return (
    <button type="button" className={classes} aria-pressed={isActive} {...props}>
      {children}
    </button>
  )
}

export default Chip
