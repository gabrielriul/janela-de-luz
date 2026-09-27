import Card from './ui/Card.jsx'
import Badge from './ui/Badge.jsx'
import WeatherIcon from './WeatherIcon.jsx'
import { classificarLuz } from '../utils/luz.js'
import { descreverTempo } from '../utils/clima.js'
import {
  formatarHorario,
  formatarPorcentagem,
  formatarTemperatura,
  formatarVelocidade,
} from '../utils/formatters.js'

// Tabela com as 24 horas do dia escolhido
function HourlyTable({ horas, janelas }) {
  return (
    <Card gutter="none" className="hourly-card">
      <div className="table-scroll">
        <table className="hourly-table body-sm">
          <caption className="sr-only">Previsão hora a hora do dia selecionado</caption>
          <thead>
            <tr>
              <th scope="col">Hora</th>
              <th scope="col">Tempo</th>
              <th scope="col">Temperatura</th>
              <th scope="col">Nuvens</th>
              <th scope="col">Chuva</th>
              <th scope="col">Vento</th>
              <th scope="col">Luz</th>
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => {
              const luz = classificarLuz(hora.horario, janelas)

              return (
                <tr key={hora.horario} className={luz === 'noite' ? 'is-night' : undefined}>
                  <th scope="row">{formatarHorario(hora.horario)}</th>
                  <td>
                    <span className="weather-cell">
                      <WeatherIcon codigo={hora.codigoTempo} ehDia={hora.ehDia} />
                      <span className="hide-mobile">{descreverTempo(hora.codigoTempo)}</span>
                    </span>
                  </td>
                  <td>{formatarTemperatura(hora.temperatura)}</td>
                  <td>{formatarPorcentagem(hora.nuvens)}</td>
                  <td>{formatarPorcentagem(hora.probabilidadeChuva)}</td>
                  <td>{formatarVelocidade(hora.vento)}</td>
                  <td>
                    <LightLabel luz={luz} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// Etiqueta da coluna "Luz": golden e blue hour ganham destaque
function LightLabel({ luz }) {
  if (luz === 'golden') return <Badge tone="warning">Golden hour</Badge>
  if (luz === 'blue') return <Badge tone="blue">Blue hour</Badge>
  return <span className="caption text-muted">{luz === 'dia' ? 'Dia' : 'Noite'}</span>
}

export default HourlyTable
