import './ui.css'

// Título da página (título grande do iOS): um subtítulo pequeno em cima e o H1 na fonte da marca.
// titleRef: referência ao H1, usada para saber quando ele passa por baixo da barra do topo
// children: texto de apoio abaixo do título
export function PageHeader({ subtitle, title, titleRef, children }) {
  return (
    <header className="page-header">
      {subtitle && <p className="body-sm text-secondary">{subtitle}</p>}
      <h1 ref={titleRef} className="heading-1">
        {title}
      </h1>
      {children && <div className="page-header__content">{children}</div>}
    </header>
  )
}

// Título de uma seção: H2 e uma linha de legenda embaixo
export function SectionTitle({ as: Tag = 'h2', id, title, caption }) {
  return (
    <div className="section-title">
      <Tag id={id} className="heading-2">
        {title}
      </Tag>
      {caption && <p className="caption text-secondary">{caption}</p>}
    </div>
  )
}
