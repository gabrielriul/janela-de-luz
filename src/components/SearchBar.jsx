import { useRef, useState } from 'react'
import { Search } from 'lucide-react'
import TextInput from './ui/TextInput.jsx'
import Button from './ui/Button.jsx'

// Campo de busca de cidade.
// É um "componente controlado": o valor do input fica guardado no estado (useState)
// e o componente pai recebe o texto digitado pela prop onSearch.
function SearchBar({ onSearch, carregando = false }) {
  const [texto, setTexto] = useState('')
  const refCampo = useRef(null) // para devolver o foco ao campo depois de limpar

  function handleSubmit(evento) {
    evento.preventDefault() // evita o recarregamento da página (SPA)
    const termo = texto.trim()
    if (termo) {
      onSearch(termo)
    }
  }

  function handleClear() {
    setTexto('')
    refCampo.current?.focus()
  }

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <TextInput
        ref={refCampo}
        id="busca-cidade"
        icon={Search}
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        onClear={handleClear}
        placeholder="Digite o nome da cidade"
        aria-label="Nome da cidade"
        autoComplete="off"
        enterKeyHint="search"
      />
      <Button type="submit" disabled={!texto.trim() || carregando}>
        {carregando ? 'Buscando...' : 'Buscar'}
      </Button>
    </form>
  )
}

export default SearchBar
