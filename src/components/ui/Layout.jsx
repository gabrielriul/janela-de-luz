import './ui.css'

// Componentes de layout, sem visual próprio.

// Área principal da página: margem lateral de 16px no celular e 80px a partir do tablet,
// com 40px em cima e embaixo.
export function MainContentContainer({ as: Tag = 'main', className = '', children, ...props }) {
  return (
    <Tag className={`content-container ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

// Título de um lado e ações do outro: empilha no celular, vira linha a partir do tablet.
export function FlexBetweenLayout({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`flex-between ${className}`.trim()}>{children}</Tag>
}

// Grade de cards com 16px entre eles. cols diz quantas colunas em cada tamanho de tela:
// { mobile, tablet, desk }. Um tamanho sem valor herda o anterior.
export function ResponsiveGridList({ as: Tag = 'ul', cols = { mobile: 1 }, className = '', children, ...props }) {
  const colunas = {
    '--cols-mobile': cols.mobile,
    '--cols-tablet': cols.tablet,
    '--cols-desk': cols.desk,
  }

  return (
    <Tag className={`grid-list ${className}`.trim()} style={colunas} {...props}>
      {children}
    </Tag>
  )
}
