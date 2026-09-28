import { CircleX } from 'lucide-react'
import Button from './Button.jsx'
import './ui.css'

// Campo de texto: cápsula de 48px no cinza do sistema, com ícone opcional à esquerda.
// icon: um componente de ícone do lucide-react (ex.: Search)
// label: texto exibido acima do campo; sem label, use aria-label
// onClear: mostra o botão de limpar quando há texto
// ref: vai para o <input> (no React 19, ref chega como uma prop comum)
function TextInput({ ref, id, label, icon: Icon, onClear, ...inputProps }) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      )}
      <div className="input">
        {Icon && <Icon size={16} aria-hidden="true" />}
        <input ref={ref} id={id} type="text" {...inputProps} />
        {onClear && inputProps.value && (
          <Button variant="ghost" size="icon" compact onClick={onClear} aria-label="Limpar campo">
            <CircleX size={20} aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default TextInput
