import { useEffect, useState } from 'react'
import { buscarPrevisao } from '../services/openMeteo.js'

// Hook personalizado: busca a previsão de uma cidade e informa se está carregando ou deu erro.
// Uso: const { dias, status, recarregar } = usePrevisao(cidade)
export function usePrevisao(cidade) {
  const [tentativa, setTentativa] = useState(0) // aumenta para forçar uma nova busca
  const [resposta, setResposta] = useState({ chave: null, dias: [], erro: false })

  // Identifica a busca atual: muda quando a cidade ou a tentativa mudam
  const chave = `${cidade.latitude},${cidade.longitude}#${tentativa}`

  // useEffect sincroniza o componente com algo externo (aqui, a API).
  // Roda depois da renderização e de novo sempre que a chave mudar.
  useEffect(() => {
    // Se uma nova busca começar antes desta responder, a resposta antiga é ignorada
    let ignorar = false

    buscarPrevisao(cidade)
      .then((dias) => {
        if (!ignorar) setResposta({ chave, dias, erro: false })
      })
      .catch((erro) => {
        console.error(erro)
        if (!ignorar) setResposta({ chave, dias: [], erro: true })
      })

    // Função de limpeza: o React chama antes de rodar o efeito de novo ou ao desmontar
    return () => {
      ignorar = true
    }
  }, [cidade, chave])

  // Estado derivado: se a última resposta é de outra busca, a atual ainda está carregando
  let status = 'carregando'
  if (resposta.chave === chave) {
    status = resposta.erro ? 'erro' : 'sucesso'
  }

  function recarregar() {
    setTentativa((valor) => valor + 1)
  }

  return { dias: resposta.dias, status, recarregar }
}
