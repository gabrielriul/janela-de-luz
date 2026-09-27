import { useRef } from 'react'
import './ui.css'

// Mudança de passo das setas do teclado
const PASSOS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

// Escolha exclusiva entre 2 e 5 opções, como o controle segmentado do iOS.
// Para mais de 5 opções, use uma fileira de Chip.
// options: lista de { value, label }
// value: a opção escolhida; onChange: recebe o value da nova opção
// label: nome do grupo para leitores de tela
// As demais props (ex.: aria-describedby) vão para o grupo.
function SegmentedControl({ options, value, onChange, label, ...props }) {
  const refsDosBotoes = useRef([])
  const indiceEscolhido = Math.max(
    0,
    options.findIndex((opcao) => opcao.value === value),
  )

  // Como num grupo de botões de rádio: as setas trocam a opção e levam o foco junto
  function handleKeyDown(evento) {
    let proximo
    if (evento.key in PASSOS) {
      proximo = (indiceEscolhido + PASSOS[evento.key] + options.length) % options.length
    } else if (evento.key === 'Home') {
      proximo = 0
    } else if (evento.key === 'End') {
      proximo = options.length - 1
    } else {
      return
    }
    evento.preventDefault()
    onChange(options[proximo].value)
    refsDosBotoes.current[proximo]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="seg"
      // A "pastilha" branca desliza até a opção escolhida: as variáveis dizem quantas opções
      // existem e qual está marcada (o CSS calcula a posição)
      style={{ '--seg-count': options.length, '--seg-index': indiceEscolhido }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="seg__thumb" aria-hidden="true" />
      {options.map((opcao, indice) => {
        const escolhida = indice === indiceEscolhido
        return (
          <button
            key={opcao.value}
            ref={(botao) => {
              refsDosBotoes.current[indice] = botao
            }}
            type="button"
            role="radio"
            aria-checked={escolhida}
            // Só a opção escolhida entra no Tab; as outras são alcançadas pelas setas
            tabIndex={escolhida ? 0 : -1}
            className="seg__item"
            onClick={() => onChange(opcao.value)}
          >
            {opcao.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
