import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button.jsx'
import './ui.css'

const PASSO_DA_ROLAGEM = 150 // quantos pixels cada clique na seta rola
const MARGEM_DO_ESMAECIDO = 56 // largura da borda que some aos poucos (igual ao CSS)

// Fileira que rola na horizontal (ex.: chips). A borda que ainda tem conteúdo some aos poucos
// e, em telas maiores com mouse, ganha uma seta de vidro.
// activeIndex: posição do item escolhido; quando muda, a fileira rola até ele ficar visível
// As demais props (role, aria-label...) vão para a fileira que contém os itens.
function OverflowXContainer({ activeIndex, className = '', children, ...props }) {
  const refRolagem = useRef(null)
  const refFileira = useRef(null)
  const [bordas, setBordas] = useState({ inicio: false, fim: false })

  // Descobre se ainda tem conteúdo escondido à esquerda e à direita
  useEffect(() => {
    const rolagem = refRolagem.current

    function medir() {
      const maximo = rolagem.scrollWidth - rolagem.clientWidth
      const inicio = rolagem.scrollLeft > 1
      const fim = rolagem.scrollLeft < maximo - 1
      // Só troca o estado quando algo mudou, para não renderizar a cada pixel rolado
      setBordas((atual) => (atual.inicio === inicio && atual.fim === fim ? atual : { inicio, fim }))
    }

    // O ResizeObserver avisa quando o tamanho da área ou da fileira muda (e uma vez logo no início)
    const observador = new ResizeObserver(medir)
    observador.observe(rolagem)
    observador.observe(refFileira.current)
    rolagem.addEventListener('scroll', medir, { passive: true })

    return () => {
      observador.disconnect()
      rolagem.removeEventListener('scroll', medir)
    }
  }, [])

  // Quando o item escolhido muda (ex.: pelos cards de melhores janelas), rola só na horizontal até ele
  useEffect(() => {
    const rolagem = refRolagem.current
    const item = refFileira.current?.children[activeIndex]
    if (!item) return

    const esquerda = Math.max(0, item.offsetLeft - MARGEM_DO_ESMAECIDO)
    const direita = item.offsetLeft + item.offsetWidth + MARGEM_DO_ESMAECIDO - rolagem.clientWidth
    if (rolagem.scrollLeft > esquerda) {
      rolagem.scrollTo({ left: esquerda, behavior: comportamentoDaRolagem() })
    } else if (rolagem.scrollLeft < direita) {
      rolagem.scrollTo({ left: direita, behavior: comportamentoDaRolagem() })
    }
  }, [activeIndex])

  function rolar(sentido) {
    refRolagem.current.scrollBy({ left: sentido * PASSO_DA_ROLAGEM, behavior: comportamentoDaRolagem() })
  }

  const esmaecido =
    bordas.inicio && bordas.fim ? 'both' : bordas.inicio ? 'start' : bordas.fim ? 'end' : undefined

  return (
    <div className={`overflow-x ${className}`.trim()} data-fade={esmaecido}>
      <div ref={refRolagem} className="overflow-x__scroller">
        <div ref={refFileira} className="overflow-x__row" {...props}>
          {children}
        </div>
      </div>

      {/* As setas são um atalho para o mouse; pelo teclado, o Tab já percorre os itens */}
      <Button
        variant="glass"
        size="icon"
        compact
        className="overflow-x__arrow overflow-x__arrow--start"
        hidden={!bordas.inicio}
        tabIndex={-1}
        aria-label="Rolar para a esquerda"
        onClick={() => rolar(-1)}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </Button>
      <Button
        variant="glass"
        size="icon"
        compact
        className="overflow-x__arrow overflow-x__arrow--end"
        hidden={!bordas.fim}
        tabIndex={-1}
        aria-label="Rolar para a direita"
        onClick={() => rolar(1)}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </Button>
    </div>
  )
}

// Rolagem suave, a não ser que a pessoa prefira menos movimento na tela
function comportamentoDaRolagem() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export default OverflowXContainer
