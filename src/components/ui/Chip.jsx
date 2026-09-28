import './ui.css'

// Cápsula clicável para filtros e escolhas (a versão interativa do Badge).
// isActive: quando o chip é uma escolha, marca o escolhido (cápsula escura) e informa o
// leitor de tela com aria-pressed. Chips que são só atalhos não passam isActive.
function Chip({ isActive, className = '', children, ...props }) {
  const classes = ['chip', isActive && 'chip--active', className].filter(Boolean).join(' ')

  return (
    <button type="button" className={classes} aria-pressed={isActive} {...props}>
      {children}
    </button>
  )
}

export default Chip
