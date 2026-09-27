import { useState } from 'react'

// Campo de busca de cidade.
// É um "componente controlado": o valor do input fica guardado no estado (useState)
// e o componente pai recebe o texto digitado pela prop onSearch.
function SearchBar({ onSearch }) {
  const [texto, setTexto] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault() // evita o recarregamento da página (SPA)
    const termo = texto.trim()
    if (termo) {
      onSearch(termo)
    }
  }

  return (
    <form className="busca" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Digite uma cidade, ex.: Cornélio Procópio"
        aria-label="Nome da cidade"
      />
      <button type="submit" className="botao" disabled={!texto.trim()}>
        Buscar
      </button>
    </form>
  )
}

export default SearchBar
