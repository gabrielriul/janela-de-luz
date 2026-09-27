import Card from './Card.jsx'
import './ui.css'

// Estado vazio, de erro ou sem resultado ("conteúdo indisponível", no estilo da Apple):
// ícone grande, título, uma dica curta e no máximo uma ação.
// icon: componente de ícone do lucide-react
// tone: 'neutral' (padrão) | 'negative' (erro: ícone vermelho e aviso para leitores de tela)
// titleAs: nível do título (h2 por padrão; h3 quando fica dentro de uma seção)
// children: a ação, como um botão de "Tentar novamente"
function FeedbackPlaceholder({ icon: Icon, tone = 'neutral', title, titleAs: Titulo = 'h2', description, children }) {
  return (
    <Card
      className={`feedback feedback--${tone} animate-fade-in`}
      role={tone === 'negative' ? 'alert' : undefined}
    >
      {Icon && <Icon size={48} className="feedback__icon" aria-hidden="true" />}
      <Titulo className="heading-2 feedback__title">{title}</Titulo>
      {description && <p className="body-sm feedback__description">{description}</p>}
      {children}
    </Card>
  )
}

export default FeedbackPlaceholder
