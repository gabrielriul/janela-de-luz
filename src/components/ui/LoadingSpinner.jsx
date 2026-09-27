import './ui.css'

// Indicador de carregamento. A cor vem da cor do texto ao redor (currentColor).
// size: 'sm' (16px) | 'lg' (40px)
// O texto "Carregando..." fica sempre disponível para leitores de tela.
function LoadingSpinner({ size = 'sm', message }) {
  return (
    <span role="status" className="spinner-wrapper">
      <span className={`spinner spinner--${size}`} aria-hidden="true" />
      {message ? <span className="body-sm text-muted">{message}</span> : null}
      <span className="sr-only">Carregando...</span>
    </span>
  )
}

export default LoadingSpinner
