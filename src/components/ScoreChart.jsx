import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from './ui/Card.jsx'
import { NOMES_DA_LUZ } from '../utils/luz.js'
import { classificarNota } from '../utils/nota.js'
import {
  formatarHorario,
  formatarJanela,
  formatarNota,
  formatarPorcentagem,
  formatarVelocidade,
} from '../utils/formatters.js'

const NOTA_BOA = 6 // mesma nota mínima das "melhores janelas"
const MARCAS_DO_EIXO_X = [0, 3, 6, 9, 12, 15, 18, 21, 24]
const MARCAS_DO_EIXO_Y = [0, 2, 4, 6, 8, 10]

// Cores do design system (variáveis CSS definidas em index.css)
const COR_NOTA_BOA = 'var(--green-300)'
const COR_NOTA_BAIXA = 'var(--neutral-300)'
const ESTILO_DO_TEXTO_DOS_EIXOS = { fill: 'var(--neutral-500)', fontSize: 12 }

// 18 -> "18h"
function formatarMarcaDeHora(hora) {
  return `${String(hora % 24).padStart(2, '0')}h`
}

// Gráfico de colunas com a nota de cada hora do dia (biblioteca Recharts).
// As horas com nota 6 ou mais ficam em verde; o fundo marca a golden hour e a blue hour.
// A tabela logo abaixo mostra os mesmos números, para quem não enxerga bem o gráfico.
function ScoreChart({ dia, horaAtual = '', nomeDoModo }) {
  // O Recharts recebe uma lista de objetos; "x" posiciona cada coluna no meio da sua hora
  const dados = dia.horas.map((hora, indice) => ({
    x: indice + 0.5,
    nota: hora.nota,
    passada: hora.horario < horaAtual,
    hora,
  }))

  // Melhor hora do dia, ignorando as que já passaram (se ainda sobrar alguma)
  const horasFuturas = dia.horas.filter((hora) => hora.horario >= horaAtual)
  const candidatas = horasFuturas.length > 0 ? horasFuturas : dia.horas
  const melhorHora = candidatas.reduce((melhor, hora) => (hora.nota > melhor.nota ? hora : melhor))
  const { janelas } = dia

  // Converte minutos do dia em posição no eixo x (que vai de 0 a 24 horas)
  const emHoras = (minutos) => minutos / 60

  return (
    <Card>
      <div className="chart-header">
        <h3 className="chart-header__titulo">Nota ao longo do dia</h3>
        <p className="body-sm text-muted">
          Modo {nomeDoModo} · melhor horário às {formatarHorario(melhorHora.horario)}, nota{' '}
          {formatarNota(melhorHora.nota)}
        </p>
      </div>

      <div
        className="chart-area"
        role="img"
        aria-label={`Gráfico de colunas com a nota de gravação de cada hora. Melhor horário às ${formatarHorario(melhorHora.horario)}, com nota ${formatarNota(melhorHora.nota)}. Os valores também estão na tabela abaixo.`}
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid vertical={false} stroke="var(--neutral-200)" />

            {/* Faixas de fundo: golden hour e blue hour (manhã e tarde) */}
            <ReferenceArea
              x1={emHoras(janelas.blueManha[0])}
              x2={emHoras(janelas.blueManha[1])}
              fill="var(--blue-100)"
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.goldenManha[0])}
              x2={emHoras(janelas.goldenManha[1])}
              fill="var(--warning-100)"
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.goldenTarde[0])}
              x2={emHoras(janelas.goldenTarde[1])}
              fill="var(--warning-100)"
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.blueTarde[0])}
              x2={emHoras(janelas.blueTarde[1])}
              fill="var(--blue-100)"
              ifOverflow="hidden"
            />

            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 24]}
              ticks={MARCAS_DO_EIXO_X}
              tickFormatter={formatarMarcaDeHora}
              tick={ESTILO_DO_TEXTO_DOS_EIXOS}
              tickLine={false}
              axisLine={{ stroke: 'var(--neutral-200)' }}
            />
            <YAxis
              domain={[0, 10]}
              ticks={MARCAS_DO_EIXO_Y}
              tick={ESTILO_DO_TEXTO_DOS_EIXOS}
              tickLine={false}
              axisLine={false}
              width={36}
            />

            {/* Linha de referência: a partir dela a hora conta como "boa" */}
            <ReferenceLine y={NOTA_BOA} stroke="var(--neutral-500)" strokeWidth={1} />

            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: 'var(--neutral-150)' }}
              isAnimationActive={false}
            />

            <Bar
              dataKey="nota"
              maxBarSize={24}
              minPointSize={2}
              radius={[4, 4, 0, 0]}
              animationDuration={200}
            >
              {/* Cell define a cor de cada coluna separadamente */}
              {dados.map((item) => (
                <Cell
                  key={item.hora.horario}
                  fill={item.nota >= NOTA_BOA ? COR_NOTA_BOA : COR_NOTA_BAIXA}
                  fillOpacity={item.passada ? 0.35 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="chart-legend caption text-muted">
        <li>
          <span className="chart-legend__marca chart-legend__marca--boa" />
          Nota 6 ou mais
        </li>
        <li>
          <span className="chart-legend__marca chart-legend__marca--baixa" />
          Abaixo de 6
        </li>
        <li>
          <span className="chart-legend__linha" />
          Nota 6
        </li>
        <li>
          <span className="chart-legend__marca chart-legend__marca--golden" />
          Golden hour
        </li>
        <li>
          <span className="chart-legend__marca chart-legend__marca--blue" />
          Blue hour
        </li>
      </ul>
    </Card>
  )
}

// Caixa que aparece ao passar o mouse (ou navegar pelo teclado) sobre uma coluna.
// O Recharts entrega os dados da coluna em "payload".
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const { hora } = payload[0].payload
  const { rotulo } = classificarNota(hora.nota)

  return (
    <div className="chart-tooltip">
      <span className="caption text-muted">
        {formatarJanela(hora.horario, hora.horario)} · {NOMES_DA_LUZ[hora.luz]}
      </span>
      <span className="chart-tooltip__valor">
        <strong>{formatarNota(hora.nota)}</strong> {rotulo}
      </span>
      <span className="caption text-muted">
        Nuvens {formatarPorcentagem(hora.nuvens)} · Chuva {formatarPorcentagem(hora.probabilidadeChuva)}{' '}
        · Vento {formatarVelocidade(hora.vento)}
      </span>
    </div>
  )
}

export default ScoreChart
