import { useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import EmptyState from './components/EmptyState.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

// Componente principal: organiza o layout e guarda o estado compartilhado da página
function App() {
  // Último termo buscado. Na etapa 2 ele será usado para chamar a API de geocoding.
  const [termoBusca, setTermoBusca] = useState('')

  return (
    <div className="app">
      <Header />

      <main className="conteudo">
        <SearchBar onSearch={setTermoBusca} />

        {/* Renderização condicional: a mensagem muda conforme o estado */}
        {termoBusca ? (
          <EmptyState
            titulo={`Você buscou por "${termoBusca}"`}
            texto="Em breve aqui aparecem as cidades encontradas e a previsão hora a hora."
          />
        ) : (
          <EmptyState
            titulo="Para onde vai a gravação?"
            texto="Busque uma cidade para ver as melhores horas para gravar nos próximos 7 dias."
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
