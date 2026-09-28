import { useId, useState } from 'react'
import Card from './ui/Card.jsx'
import Badge from './ui/Badge.jsx'
import ScoreBadge from './ScoreBadge.jsx'
import WeatherIcon from './WeatherIcon.jsx'
import { descreverTempo } from '../utils/clima.js'
import {
  formatarHorario,
  formatarPorcentagem,
  formatarTemperatura,
  formatarVelocidade,
} from '../utils/formatters.js'

// Monta as classes de cada linha: noite, horário que já passou e janela destacada
function classesDaLinha(hora, horaAtual, destaque) {
  const classes = []
  if (hora.luz === 'noite') classes.push('is-night')
  if (hora.horario < horaAtual) classes.push('is-past')
  if (destaque && hora.horario >= destaque.inicio && hora.horario <= destaque.fim) {
    classes.push('is-highlight')
  }
  return classes.join(' ') || undefined
}

// Tabela com as 24 horas do dia escolhido, já com a luz e a nota de cada hora.
// horaAtual: horas antes dela ficam apagadas
// destaque: janela escolhida nos cards de "Melhores janelas" (ou null)
function HourlyTable({ horas, horaAtual = '', destaque = null }) {
  const idDaLegenda = useId()
  // No celular a tabela rola para o lado; a coluna "Hora" fica presa e ganha uma linha fina ao rolar
  const [rolouParaOLado, setRolouParaOLado] = useState(false)

  return (
    <Card gutter="none" className="hourly-card">
      <div
        className={`table-scroll ${rolouParaOLado ? 'is-scrolled' : ''}`.trim()}
        onScroll={(evento) => setRolouParaOLado(evento.currentTarget.scrollLeft > 0)}
        // A área que rola precisa ser alcançável pelo teclado (setas rolam a tabela)
        tabIndex={0}
        role="region"
        aria-labelledby={idDaLegenda}
      >
        <table className="table hourly-table">
          <caption id={idDaLegenda} className="sr-only">
            Previsão hora a hora do dia selecionado
          </caption>
          <thead>
            <tr>
              <th scope="col">Hora</th>
              <th scope="col">Nota</th>
              <th scope="col">Tempo</th>
              <th scope="col" className="num">
                Temperatura
              </th>
              <th scope="col" className="num">
                Nuvens
              </th>
              <th scope="col" className="num">
                Chuva
              </th>
              <th scope="col" className="num">
                Vento
              </th>
              <th scope="col">Luz</th>
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora.horario} className={classesDaLinha(hora, horaAtual, destaque)}>
                <th scope="row" className="tabular">
                  {formatarHorario(hora.horario)}
                </th>
                <td>
                  <ScoreBadge nota={hora.nota} motivos={hora.motivos} />
                </td>
                <td>
                  <span className="weather-cell">
                    <WeatherIcon codigo={hora.codigoTempo} ehDia={hora.ehDia} />
                    <span className="hide-mobile">{descreverTempo(hora.codigoTempo)}</span>
                  </span>
                </td>
                <td className="num">{formatarTemperatura(hora.temperatura)}</td>
                <td className="num">{formatarPorcentagem(hora.nuvens)}</td>
                <td className="num">{formatarPorcentagem(hora.probabilidadeChuva)}</td>
                <td className="num">{formatarVelocidade(hora.vento)}</td>
                <td>
                  <LightLabel luz={hora.luz} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// Etiqueta da coluna "Luz": golden e blue hour ganham destaque
function LightLabel({ luz }) {
  if (luz === 'golden') return <Badge tone="warning">Golden hour</Badge>
  if (luz === 'blue') return <Badge tone="info">Blue hour</Badge>
  return <span className="text-secondary">{luz === 'dia' ? 'Dia' : 'Noite'}</span>
}

export default HourlyTable
