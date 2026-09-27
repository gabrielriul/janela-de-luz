import { useArmazenamentoLocal } from './useArmazenamentoLocal.js'

const CHAVE_DOS_FAVORITOS = 'janela-de-luz:favoritos'

// Locações favoritas, salvas no navegador.
// Uso: const { favoritos, ehFavorita, alternarFavorito } = useFavoritos()
export function useFavoritos() {
  const [favoritos, setFavoritos] = useArmazenamentoLocal(CHAVE_DOS_FAVORITOS, [])

  function ehFavorita(cidade) {
    return favoritos.some((favorita) => favorita.id === cidade.id)
  }

  // Salva a cidade se ainda não for favorita; remove se já for.
  // A forma com função (atuais => ...) garante que usamos a lista mais recente.
  function alternarFavorito(cidade) {
    setFavoritos((atuais) =>
      atuais.some((favorita) => favorita.id === cidade.id)
        ? atuais.filter((favorita) => favorita.id !== cidade.id)
        : [cidade, ...atuais],
    )
  }

  return { favoritos, ehFavorita, alternarFavorito }
}
