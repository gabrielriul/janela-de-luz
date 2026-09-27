// Comunicação com a API Open-Meteo (https://open-meteo.com/).
// A API é gratuita, não precisa de chave e responde em JSON.

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

// Busca cidades pelo nome e devolve uma lista já no formato usado pelo app.
// Faz uma requisição AJAX com fetch e espera a resposta com async/await.
export async function buscarCidades(nome) {
  const parametros = new URLSearchParams({
    name: nome,
    count: '8', // até 8 resultados
    language: 'pt', // nomes de estados e países em português
    format: 'json',
  })

  const resposta = await fetch(`${GEOCODING_URL}?${parametros}`)

  // fetch só lança erro em falha de rede; um status 4xx/5xx precisa ser tratado aqui
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar cidades`)
  }

  const dados = await resposta.json()

  // Quando nada é encontrado, a API simplesmente não envia o campo "results"
  const resultados = dados.results ?? []

  // Converte os nomes em inglês da API para os nomes usados no app
  return resultados.map((cidade) => ({
    id: cidade.id,
    nome: cidade.name,
    estado: cidade.admin1,
    pais: cidade.country,
    latitude: cidade.latitude,
    longitude: cidade.longitude,
    altitude: cidade.elevation,
    fusoHorario: cidade.timezone,
  }))
}

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// Variáveis pedidas para cada hora da previsão
const VARIAVEIS_POR_HORA = [
  'temperature_2m', // temperatura a 2 m do chão (°C)
  'precipitation_probability', // chance de chuva (%)
  'cloud_cover', // cobertura de nuvens (%)
  'wind_speed_10m', // vento a 10 m (km/h)
  'wind_gusts_10m', // rajadas de vento (km/h)
  'weather_code', // código do tempo (padrão WMO)
  'is_day', // 1 = dia, 0 = noite
]

// Busca a previsão hora a hora dos próximos 7 dias para uma cidade.
// Devolve o horário atual da cidade e os dados agrupados por dia, que é como a tela exibe.
export async function buscarPrevisao({ latitude, longitude }) {
  const parametros = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: VARIAVEIS_POR_HORA.join(','),
    daily: 'sunrise,sunset',
    current: 'temperature_2m', // usado só para saber a hora atual na cidade
    timezone: 'auto', // horários no fuso da própria cidade
    forecast_days: '7',
  })

  const resposta = await fetch(`${FORECAST_URL}?${parametros}`)

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar a previsão`)
  }

  const { hourly, daily, current } = await resposta.json()

  // A API devolve uma lista para cada variável, todas na mesma ordem das horas.
  // Aqui juntamos tudo em um objeto por hora.
  const horas = hourly.time.map((horario, i) => ({
    horario, // ex.: "2026-09-27T06:00"
    data: horario.slice(0, 10), // ex.: "2026-09-27"
    temperatura: hourly.temperature_2m[i],
    probabilidadeChuva: hourly.precipitation_probability[i],
    nuvens: hourly.cloud_cover[i],
    vento: hourly.wind_speed_10m[i],
    rajadas: hourly.wind_gusts_10m[i],
    codigoTempo: hourly.weather_code[i],
    ehDia: hourly.is_day[i] === 1,
  }))

  const dias = daily.time.map((data, i) => ({
    data,
    nascerDoSol: daily.sunrise[i], // ex.: "2026-09-27T06:05"
    porDoSol: daily.sunset[i],
    horas: horas.filter((hora) => hora.data === data),
  }))

  return {
    agora: current.time, // ex.: "2026-09-27T14:45", no fuso da cidade
    dias,
  }
}
