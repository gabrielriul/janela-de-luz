import Badge from './ui/Badge.jsx'
import { classificarNota } from '../utils/nota.js'
import { formatarNota } from '../utils/formatters.js'

// Transforma a lista de motivos em um texto para a dica (title) da etiqueta
function explicarMotivos(motivos) {
  return motivos
    .map(({ texto, valor }) => {
      if (valor == null) return texto
      const sinal = valor > 0 ? '+' : '−'
      return `${texto} (${sinal}${formatarNota(Math.abs(valor))})`
    })
    .join('\n')
}

// Nota de gravação em uma etiqueta com o tom da classificação (Ótima, Boa, Regular, Ruim).
// motivos: opcional; quando existe, aparece ao passar o mouse sobre a nota.
function ScoreBadge({ nota, motivos = [], mostrarRotulo = false }) {
  const { rotulo, tom } = classificarNota(nota)
  const dica = motivos.length > 0 ? explicarMotivos(motivos) : rotulo

  return (
    <Badge tone={tom} title={dica} aria-label={`Nota ${formatarNota(nota)}, ${rotulo}`}>
      {formatarNota(nota)}
      {mostrarRotulo && ` · ${rotulo}`}
    </Badge>
  )
}

export default ScoreBadge
