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
import { classificarNota, NOTA_BOA } from '../utils/nota.js'
import {
  formatarHorario,
  formatarJanela,
  formatarNota,
  formatarPorcentagem,
  formatarVelocidade,
} from '../utils/formatters.js'

const MARCAS_DO_EIXO_X = [0, 3, 6, 9, 12, 15, 18, 21, 24]
const MARCAS_DO_EIXO_Y = [0, 2, 4, 6, 8, 10]

// Tema de gráficos do design system: cores são variáveis CSS, então valem para os dois temas.
// Coluna com nota boa: cor principal dos gráficos. Coluna abaixo da nota boa: cinza (definido em App.css).
const COR_NOTA_BOA = 'var(--chart-primary)'
const COR_NOTA_BAIXA = 'var(--cor-nota-baixa)'
const ESTILO_DO_TEXTO_DOS_EIXOS = { fill: 'var(--neutral-500)', fontSize: 12 }

// 18 -> "18h"
function formatarMarcaDeHora(hora) {
  return `${String(hora % 24).padStart(2, '0')}h`
}

// Gráfico de colunas com a nota de cada hora do dia (biblioteca Recharts).
// As horas com nota boa (NOTA_BOA ou mais) ficam em verde; o fundo marca a golden hour e a blue hour.
// A tabela logo abaixo mostra os mesmos números, para quem não enxerga bem o gráfico.
// melhorHora: a hora de maior nota (calculada no Forecast), usada na descrição para leitores de tela
function ScoreChart({ dia, horaAtual = '', melhorHora }) {
  // O Recharts recebe uma lista de objetos; "x" posiciona cada coluna no meio da sua hora
  const dados = dia.horas.map((hora, indice) => ({
    x: indice + 0.5,
    nota: hora.nota,
    passada: hora.horario < horaAtual,
    hora,
  }))
  const { janelas } = dia

  // Converte minutos do dia em posição no eixo x (que vai de 0 a 24 horas)
  const emHoras = (minutos) => minutos / 60

  return (
    <Card className="score-chart">
      <div className="chart-header">
        <h3 className="headline">Nota ao longo do dia</h3>
        <p className="caption text-secondary">Passe o mouse ou toque nas colunas para ver cada hora</p>
      </div>

      <div
        className="chart-area"
        role="img"
        aria-label={`Gráfico de colunas com a nota de gravação de cada hora. Melhor horário às ${formatarHorario(melhorHora.horario)}, com nota ${formatarNota(melhorHora.nota)}. Os valores também estão na tabela abaixo.`}
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dados} margin={{ top: 8, right: 4, bottom: 0, left: -8 }}>
            {/* Grade: só linhas horizontais finas, na cor do separador */}
            <CartesianGrid vertical={false} stroke="var(--separator)" />

            {/* Faixas de fundo: golden hour e blue hour (manhã e tarde) */}
            <ReferenceArea
              x1={emHoras(janelas.blueManha[0])}
              x2={emHoras(janelas.blueManha[1])}
              fill="var(--blue-100)"
              fillOpacity={1}
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.goldenManha[0])}
              x2={emHoras(janelas.goldenManha[1])}
              fill="var(--warning-100)"
              fillOpacity={1}
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.goldenTarde[0])}
              x2={emHoras(janelas.goldenTarde[1])}
              fill="var(--warning-100)"
              fillOpacity={1}
              ifOverflow="hidden"
            />
            <ReferenceArea
              x1={emHoras(janelas.blueTarde[0])}
              x2={emHoras(janelas.blueTarde[1])}
              fill="var(--blue-100)"
              fillOpacity={1}
              ifOverflow="hidden"
            />

            {/* Eixos sem linha e sem tracinho, só os rótulos de 12px */}
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 24]}
              ticks={MARCAS_DO_EIXO_X}
              tickFormatter={formatarMarcaDeHora}
              tick={ESTILO_DO_TEXTO_DOS_EIXOS}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 10]}
              ticks={MARCAS_DO_EIXO_Y}
              tick={ESTILO_DO_TEXTO_DOS_EIXOS}
              tickLine={false}
              axisLine={false}
              width={36}
            />

            {/* Linha tracejada de referência: a partir dela a hora conta como "boa" */}
            <ReferenceLine
              y={NOTA_BOA}
              stroke="var(--neutral-500)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />

            {/* Faixa verde-clara sob o mouse (cor e opacidade no CSS, que muda com o tema) */}
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ className: 'chart-cursor' }}
              isAnimationActive={false}
            />

            <Bar
              dataKey="nota"
              maxBarSize={24}
              minPointSize={2}
              radius={[4, 4, 0, 0]}
              animationDuration={200}
            >
              {/* Cell define a cor de cada coluna separadamente; horas que já passaram ficam apagadas */}
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

      <ul className="legend-list">
        <li className="legend">
          <i className="legend__swatch" />
          Nota {NOTA_BOA} ou mais
        </li>
        <li className="legend">
          <i className="legend__swatch legend__swatch--baixa" />
          Abaixo de {NOTA_BOA}
        </li>
        <li className="legend">
          <i className="legend__swatch legend__swatch--dashed" />
          Linha da nota {NOTA_BOA}
        </li>
        <li className="legend">
          <i className="legend__swatch legend__swatch--square legend__swatch--golden" />
          Golden hour
        </li>
        <li className="legend">
          <i className="legend__swatch legend__swatch--square legend__swatch--blue" />
          Blue hour
        </li>
      </ul>
    </Card>
  )
}

// Dica que aparece ao passar o mouse (ou tocar) sobre uma coluna. É de vidro porque flutua sobre o gráfico.
// O Recharts entrega os dados da coluna em "payload".
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const { hora } = payload[0].payload
  const { rotulo } = classificarNota(hora.nota)
  const notaBoa = hora.nota >= NOTA_BOA

  return (
    <div className="chart-tip glass">
      <div className="chart-tip__head">
        {formatarJanela(hora.horario, hora.horario)} · {NOMES_DA_LUZ[hora.luz]}
      </div>
      <div className="chart-tip__row">
        <i className={`chart-tip__swatch ${notaBoa ? '' : 'chart-tip__swatch--baixa'}`.trim()} />
        Nota · {rotulo}
        <b>{formatarNota(hora.nota)}</b>
      </div>
      <div className="chart-tip__row">
        <i className="chart-tip__swatch chart-tip__swatch--vazio" />
        Nuvens
        <b>{formatarPorcentagem(hora.nuvens)}</b>
      </div>
      <div className="chart-tip__row">
        <i className="chart-tip__swatch chart-tip__swatch--vazio" />
        Chuva
        <b>{formatarPorcentagem(hora.probabilidadeChuva)}</b>
      </div>
      <div className="chart-tip__row">
        <i className="chart-tip__swatch chart-tip__swatch--vazio" />
        Vento
        <b>{formatarVelocidade(hora.vento)}</b>
      </div>
    </div>
  )
}

export default ScoreChart
