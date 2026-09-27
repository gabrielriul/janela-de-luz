import Card from './ui/Card.jsx'

// Mensagem exibida quando não há conteúdo para mostrar (estado inicial, sem resultados, erro).
// icon: componente de ícone do lucide-react
// tone: 'default' | 'negative' (vermelho, para erros)
// children: ação opcional, como um botão de "Tentar novamente"
function EmptyState({ icon: Icon, tone = 'default', titulo, texto, children }) {
  return (
    <Card gutter="lg" className="empty-state animate-fade-in">
      {Icon && (
        <span className={`empty-state__icon empty-state__icon--${tone}`}>
          <Icon size={16} aria-hidden="true" />
        </span>
      )}
      <h2 className="heading-2">{titulo}</h2>
      <p className="text-muted">{texto}</p>
      {children}
    </Card>
  )
}

export default EmptyState
