// Nota de gravação (0 a 10) de cada hora, de acordo com o modo de gravação.
//
// Como a nota é calculada:
// 1. Começa em 10.
// 2. Perde pontos pela chance de chuva, pelo vento acima do limite e pelas nuvens.
// 3. Ganha um bônus na golden hour ou na blue hour, se o modo valorizar essa luz.
// 4. Respeita a nota máxima do tipo de luz (ex.: à noite o drone fica com 0).
// 5. Trovoadas limitam a nota a 1; no modo drone, rajadas fortes zeram a nota.
//
// Cada modo usa pesos diferentes, definidos no objeto MODOS abaixo.

import { NOMES_DA_LUZ } from './luz.js'

export const MODOS = {
  externa: {
    nome: 'Externa',
    descricao: 'Vídeo ou foto ao ar livre. Chuva e vento forte, que atrapalha o áudio, derrubam a nota.',
    pesoChuva: 6,
    vento: { limite: 20, maximo: 50, peso: 3 }, // km/h
    rajadaMaxima: null,
    pesoNuvens: 1,
    bonus: { golden: 1, blue: 0.5 },
    notaMaxima: { dia: 10, golden: 10, blue: 10, noite: 2 },
  },
  drone: {
    nome: 'Drone',
    descricao: 'Voo com drone. Vento e rajadas pesam muito, e voos à noite ficam de fora.',
    pesoChuva: 8,
    vento: { limite: 10, maximo: 35, peso: 6 },
    rajadaMaxima: 38, // acima disso o voo não é seguro
    pesoNuvens: 1,
    bonus: { golden: 1, blue: 0 },
    notaMaxima: { dia: 10, golden: 10, blue: 5, noite: 0 },
  },
  golden: {
    nome: 'Golden hour',
    descricao: 'Cenas com luz dourada. Só o nascer e o pôr do sol com céu aberto ganham nota alta.',
    pesoChuva: 6,
    vento: { limite: 25, maximo: 50, peso: 2 },
    rajadaMaxima: null,
    pesoNuvens: 5,
    bonus: { golden: 0, blue: 0 },
    notaMaxima: { dia: 4, golden: 10, blue: 7, noite: 0 },
  },
}

// Mantém o valor entre um mínimo e um máximo
function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo)
}

// Arredonda para uma casa decimal
function arredondar(valor) {
  return Math.round(valor * 10) / 10
}

// Calcula a nota de uma hora. Retorna a nota e a lista de motivos que explicam o resultado.
// hora: objeto vindo da API (probabilidadeChuva, vento, rajadas, nuvens, codigoTempo)
// luz: 'dia' | 'golden' | 'blue' | 'noite'
// modo: um dos objetos de MODOS
export function calcularNota(hora, luz, modo) {
  const motivos = []

  // Chuva: perde proporcionalmente à chance de chuva
  const chanceDeChuva = hora.probabilidadeChuva ?? 0
  const perdaChuva = (chanceDeChuva / 100) * modo.pesoChuva
  if (perdaChuva >= 0.1) {
    motivos.push({ texto: `Chance de chuva de ${chanceDeChuva}%`, valor: -perdaChuva })
  }

  // Vento: só conta o que passar do limite do modo
  const faixaDoVento = modo.vento.maximo - modo.vento.limite
  const excessoDeVento = limitar(hora.vento - modo.vento.limite, 0, faixaDoVento)
  const perdaVento = (excessoDeVento / faixaDoVento) * modo.vento.peso
  if (perdaVento >= 0.1) {
    motivos.push({ texto: `Vento de ${Math.round(hora.vento)} km/h`, valor: -perdaVento })
  }

  // Nuvens: quanto mais encoberto, menor a nota (peso alto no modo golden hour)
  const perdaNuvens = (hora.nuvens / 100) * modo.pesoNuvens
  if (perdaNuvens >= 0.1) {
    motivos.push({ texto: `Céu ${hora.nuvens}% encoberto`, valor: -perdaNuvens })
  }

  // Bônus de luz
  const bonus = modo.bonus[luz] ?? 0
  if (bonus > 0) {
    motivos.push({ texto: NOMES_DA_LUZ[luz], valor: bonus })
  }

  let nota = 10 - perdaChuva - perdaVento - perdaNuvens + bonus

  // Nota máxima para o tipo de luz
  const notaMaxima = modo.notaMaxima[luz]
  if (nota > notaMaxima) {
    nota = notaMaxima
    if (notaMaxima < 10) {
      motivos.push({ texto: `${NOMES_DA_LUZ[luz]}: nota máxima ${notaMaxima} neste modo`, valor: null })
    }
  }

  // Trovoadas (códigos 95 a 99)
  if (hora.codigoTempo >= 95 && nota > 1) {
    nota = 1
    motivos.push({ texto: 'Risco de trovoadas', valor: null })
  }

  // Rajadas acima do limite do modo (usado no drone)
  if (modo.rajadaMaxima && hora.rajadas >= modo.rajadaMaxima) {
    nota = 0
    motivos.push({ texto: `Rajadas de ${Math.round(hora.rajadas)} km/h, acima do seguro`, valor: null })
  }

  return { nota: arredondar(limitar(nota, 0, 10)), motivos }
}

// Traduz a nota em um rótulo e em um tom de cor do design system
export function classificarNota(nota) {
  if (nota >= 8) return { rotulo: 'Ótima', tom: 'dark' }
  if (nota >= 6) return { rotulo: 'Boa', tom: 'green' }
  if (nota >= 4) return { rotulo: 'Regular', tom: 'warning' }
  return { rotulo: 'Ruim', tom: 'negative' }
}
