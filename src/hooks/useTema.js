import { useEffect, useSyncExternalStore } from 'react'
import { useArmazenamentoLocal } from './useArmazenamentoLocal.js'

const CONSULTA_DO_TEMA_ESCURO = '(prefers-color-scheme: dark)'

// Cor da barra do navegador no celular: a mesma do fundo da página em cada tema
const COR_DA_BARRA_DO_NAVEGADOR = { claro: '#f2f2f7', escuro: '#000000' }

// useSyncExternalStore precisa de duas funções: uma que "assina" as mudanças do sistema
// e outra que lê o valor atual
function assinarTemaDoSistema(avisar) {
  const consulta = window.matchMedia(CONSULTA_DO_TEMA_ESCURO)
  consulta.addEventListener('change', avisar)
  return () => consulta.removeEventListener('change', avisar)
}

function sistemaEstaNoEscuro() {
  return window.matchMedia(CONSULTA_DO_TEMA_ESCURO).matches
}

// Tema claro ou escuro do app.
// Sem escolha salva, segue o tema do sistema (e acompanha se ele mudar com o app aberto).
// Quando a pessoa usa o botão da barra, a escolha fica salva no navegador.
// Uso: const { tema, alternarTema } = useTema()   // tema: 'claro' | 'escuro'
export function useTema() {
  const [escolha, setEscolha] = useArmazenamentoLocal('janela-de-luz:tema', null)
  const sistemaEscuro = useSyncExternalStore(assinarTemaDoSistema, sistemaEstaNoEscuro)

  const temEscolhaValida = escolha === 'claro' || escolha === 'escuro'
  const tema = temEscolhaValida ? escolha : sistemaEscuro ? 'escuro' : 'claro'

  // O CSS troca todas as cores pelo atributo data-theme da tag <html> (ver styles/tokens.css)
  useEffect(() => {
    document.documentElement.dataset.theme = tema === 'escuro' ? 'dark' : 'light'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', COR_DA_BARRA_DO_NAVEGADOR[tema])
  }, [tema])

  function alternarTema() {
    setEscolha(tema === 'escuro' ? 'claro' : 'escuro')
  }

  return { tema, alternarTema }
}
