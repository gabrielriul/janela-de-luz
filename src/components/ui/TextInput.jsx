import './ui.css'

// Campo de texto em formato de pílula, com ícone opcional à esquerda.
// icon: um componente de ícone do lucide-react (ex.: Search).
// label: texto exibido acima do campo; sem label, use aria-label.
function TextInput({ id, label, icon: Icon, ...inputProps }) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="body-sm">
          {label}
        </label>
      )}
      <div className="text-input">
        {Icon && <Icon size={16} aria-hidden="true" />}
        <input id={id} type="text" {...inputProps} />
      </div>
    </div>
  )
}

export default TextInput
