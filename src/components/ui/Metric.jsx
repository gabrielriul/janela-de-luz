import './ui.css'

// Um número com rótulo: rótulo pequeno em cinza e, 4px abaixo, o valor em 20px.
// icon: ícone opcional ao lado do rótulo
// value: um texto ou uma lista de textos (um por linha)
function Metric({ icon: Icon, label, value }) {
  const linhas = Array.isArray(value) ? value : [value]

  return (
    <div className="metric">
      <span className="metric__label">
        {Icon && <Icon size={14} aria-hidden="true" />}
        {label}
      </span>
      {linhas.map((linha) => (
        <span key={linha} className="metric__value">
          {linha}
        </span>
      ))}
    </div>
  )
}

export default Metric
