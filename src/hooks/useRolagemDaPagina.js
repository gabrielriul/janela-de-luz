import { useEffect, useState } from 'react'

// Altura da barra do topo (a mesma de --header-height em styles/tokens.css)
const ALTURA_DA_BARRA = 64

// Acompanha a rolagem da página para a barra do topo reagir, como no iOS:
// - rolou: a página saiu do topo, então aparece a linha fina e a sombra embaixo da barra
// - tituloEscondido: o título grande (H1) passou por baixo da barra, então ele "sobe" para o centro dela
// refTitulo: referência (useRef) ao H1 da página
export function useRolagemDaPagina(refTitulo) {
  const [estado, setEstado] = useState({ rolou: false, tituloEscondido: false })

  useEffect(() => {
    let quadro = 0

    function medir() {
      quadro = 0
      const titulo = refTitulo.current
      const rolou = window.scrollY > 0
      const tituloEscondido = titulo ? titulo.getBoundingClientRect().bottom <= ALTURA_DA_BARRA : false
      // Só troca o estado quando algo mudou, para não renderizar o app a cada pixel rolado
      setEstado((atual) =>
        atual.rolou === rolou && atual.tituloEscondido === tituloEscondido
          ? atual
          : { rolou, tituloEscondido },
      )
    }

    // requestAnimationFrame junta vários eventos de rolagem em uma medida por quadro de tela
    function agendarMedida() {
      if (!quadro) {
        quadro = requestAnimationFrame(medir)
      }
    }

    agendarMedida() // a página pode abrir já rolada (ex.: ao recarregar)
    window.addEventListener('scroll', agendarMedida, { passive: true })
    window.addEventListener('resize', agendarMedida)

    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', agendarMedida)
      window.removeEventListener('resize', agendarMedida)
    }
  }, [refTitulo])

  return estado
}
