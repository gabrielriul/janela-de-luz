import { useId } from 'react'
import Card from './Card.jsx'
import { FlexBetweenLayout } from './Layout.jsx'
import { SectionTitle } from './PageHeader.jsx'
import './ui.css'

// A seção padrão do design system. De cima para baixo:
// título (+ titleExtra à direita) → filters → card de destaque → metrics → children (gráfico, tabela, cards).
// titleCard / contentCard: legenda e frase do card de destaque (verde-claro); sem eles, o card não aparece
// ref: vai para o <section> (usado para rolar a tela até a seção)
function ContentSection({
  ref,
  title,
  subtitle,
  titleExtra,
  filters,
  titleCard,
  contentCard,
  metrics,
  className = '',
  children,
  ...props
}) {
  // useId cria um id único para ligar o título à seção (aria-labelledby)
  const idDoTitulo = useId()

  return (
    <section
      ref={ref}
      className={`content-section ${className}`.trim()}
      aria-labelledby={idDoTitulo}
      {...props}
    >
      <FlexBetweenLayout>
        <SectionTitle id={idDoTitulo} title={title} caption={subtitle} />
        {titleExtra}
      </FlexBetweenLayout>

      {filters && <div className="content-section__filters">{filters}</div>}

      {contentCard && (
        <Card className="card--highlight">
          {titleCard && <span className="caption">{titleCard}</span>}
          <span className="headline">{contentCard}</span>
        </Card>
      )}

      {metrics}

      {children && <div className="content-section__content">{children}</div>}
    </section>
  )
}

export default ContentSection
