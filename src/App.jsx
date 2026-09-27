import { useState } from 'react'
import { CircleAlert, MapPin, SearchX } from 'lucide-react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import EmptyState from './components/EmptyState.jsx'
import CityList from './components/CityList.jsx'
import CityListSkeleton from './components/CityListSkeleton.jsx'
import SelectedCity from './components/SelectedCity.jsx'
import Forecast from './components/Forecast.jsx'
import Footer from './components/Footer.jsx'
import Button from './components/ui/Button.jsx'
import { buscarCidades } from './services/openMeteo.js'
import './App.css'

// Componente principal: organiza o layout e guarda o estado compartilhado da página
function App() {
  const [ultimoTermo, setUltimoTermo] = useState('')
  const [cidades, setCidades] = useState([])
  // Situação da busca: 'inicial' | 'carregando' | 'sucesso' | 'erro'
  const [status, setStatus] = useState('inicial')
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null)

  // Chamada quando o usuário envia a busca. É assíncrona porque espera a resposta da API.
  async function handleSearch(termo) {
    setUltimoTermo(termo)
    setCidadeSelecionada(null)
    setStatus('carregando')

    try {
      const resultado = await buscarCidades(termo)
      setCidades(resultado)
      setStatus('sucesso')
    } catch (erro) {
      console.error(erro)
      setCidades([])
      setStatus('erro')
    }
  }

  // Renderização condicional: escolhe o que mostrar de acordo com o estado atual
  function renderResultado() {
    if (cidadeSelecionada) {
      return (
        <>
          <SelectedCity cidade={cidadeSelecionada} onChange={() => setCidadeSelecionada(null)} />
          {/* key: ao trocar de cidade, o React cria um Forecast novo e zera o dia selecionado */}
          <Forecast key={cidadeSelecionada.id} cidade={cidadeSelecionada} />
        </>
      )
    }

    if (status === 'carregando') {
      return <CityListSkeleton />
    }

    if (status === 'erro') {
      return (
        <EmptyState
          icon={CircleAlert}
          tone="negative"
          titulo="Não foi possível buscar as cidades"
          texto="Verifique sua conexão com a internet e tente novamente."
        >
          <Button variant="secondary" onClick={() => handleSearch(ultimoTermo)}>
            Tentar novamente
          </Button>
        </EmptyState>
      )
    }

    if (status === 'sucesso' && cidades.length === 0) {
      return (
        <EmptyState
          icon={SearchX}
          titulo="Nenhuma cidade encontrada"
          texto={`Não há resultados para "${ultimoTermo}". Confira a grafia ou tente uma cidade próxima.`}
        />
      )
    }

    if (status === 'sucesso') {
      return <CityList cidades={cidades} onSelect={setCidadeSelecionada} />
    }

    return (
      <EmptyState
        icon={MapPin}
        titulo="Nenhuma cidade selecionada"
        texto="Busque uma cidade para ver as melhores horas para gravar nos próximos 7 dias."
      />
    )
  }

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

        <SearchBar onSearch={handleSearch} carregando={status === 'carregando'} />

        {renderResultado()}
      </main>

      <Footer />
    </div>
  )
}

export default App
