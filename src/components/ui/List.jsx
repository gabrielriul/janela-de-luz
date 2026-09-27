import { ChevronRight } from 'lucide-react'
import './ui.css'

// Lista agrupada no estilo do iOS: um bloco branco com linhas de pelo menos 44px,
// separadas por linhas finas que começam 16px depois da borda.
export function List({ className = '', children, ...props }) {
  return (
    <ul className={`list ${className}`.trim()} {...props}>
      {children}
    </ul>
  )
}

// Uma linha que abre algo: ícone, rótulo, sub-rótulo, valor à direita e a setinha.
// label pode ser texto ou JSX (ex.: nome + ícone de estrela)
export function ListItem({ icon: Icon, label, subLabel, value, onClick }) {
  return (
    <li>
      <button type="button" className="list__row list__row--nav" onClick={onClick}>
        {Icon && <Icon size={20} className="list__icon" aria-hidden="true" />}
        <span className="list__text">
          <span className="list__label">{label}</span>
          {subLabel && <span className="list__sublabel">{subLabel}</span>}
        </span>
        {value && <span className="list__value">{value}</span>}
        <ChevronRight size={16} className="list__chevron" aria-hidden="true" />
      </button>
    </li>
  )
}
