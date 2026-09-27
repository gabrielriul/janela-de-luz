import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
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

      <main className="page">
        <section className="page-intro">
          <h1 className="heading-1">Encontre a melhor hora para gravar</h1>
          <p className="text-muted">
            Busque uma cidade e veja, hora a hora, como vão estar as nuvens, a chuva, o vento e a luz
            do sol nos próximos 7 dias.
          </p>
        </section>

        <SearchBar onSearch={setTermoBusca} />

        {/* Renderização condicional: a mensagem muda conforme o estado */}
        {termoBusca ? (
          <EmptyState
            icon={Search}
            titulo={`Busca por "${termoBusca}"`}
            texto="As cidades encontradas vão aparecer aqui."
          />
        ) : (
          <EmptyState
            icon={MapPin}
            titulo="Nenhuma cidade selecionada"
            texto="Busque uma cidade para ver as melhores horas para gravar nos próximos 7 dias."
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
