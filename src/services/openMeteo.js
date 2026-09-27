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
