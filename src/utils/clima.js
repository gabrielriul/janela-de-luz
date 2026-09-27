// Tradução dos códigos de tempo da Open-Meteo (padrão WMO) para texto em português.
// Tabela oficial: https://open-meteo.com/en/docs (seção "WMO Weather interpretation codes")
export function descreverTempo(codigo) {
  if (codigo === 0) return 'Céu limpo'
  if (codigo === 1) return 'Poucas nuvens'
  if (codigo === 2) return 'Parcialmente nublado'
  if (codigo === 3) return 'Nublado'
  if (codigo === 45 || codigo === 48) return 'Neblina'
  if (codigo >= 51 && codigo <= 57) return 'Garoa'
  if (codigo >= 61 && codigo <= 67) return 'Chuva'
  if (codigo >= 71 && codigo <= 77) return 'Neve'
  if (codigo >= 80 && codigo <= 82) return 'Pancadas de chuva'
  if (codigo === 85 || codigo === 86) return 'Neve'
  if (codigo >= 95) return 'Trovoadas'
  return 'Sem informação'
}
