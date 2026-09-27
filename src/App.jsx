import { useEffect, useRef, useState } from 'react'
import { CircleAlert, MapPin, SearchX } from 'lucide-react'
import AppHeader from './components/AppHeader.jsx'
import SearchBar from './components/SearchBar.jsx'
import CityList from './components/CityList.jsx'
import CityListSkeleton from './components/CityListSkeleton.jsx'
import SelectedCity from './components/SelectedCity.jsx'
import SavedLocations from './components/SavedLocations.jsx'
import Forecast from './components/Forecast.jsx'
import Footer from './components/Footer.jsx'
import Button from './components/ui/Button.jsx'
import FeedbackPlaceholder from './components/ui/FeedbackPlaceholder.jsx'
import { MainContentContainer } from './components/ui/Layout.jsx'
import { PageHeader } from './components/ui/PageHeader.jsx'
import { buscarCidades } from './services/openMeteo.js'
import { useFavoritos } from './hooks/useFavoritos.js'
import { useTema } from './hooks/useTema.js'
import { useRolagemDaPagina } from './hooks/useRolagemDaPagina.js'
import './App.css'

const TITULO_DA_PAGINA = 'Encontre a melhor hora para gravar'

// Componente principal: organiza o layout e guarda o estado compartilhado da página
function App() {
  const [ultimoTermo, setUltimoTermo] = useState('')
  const [cidades, setCidades] = useState([])
  // Situação da busca: 'inicial' | 'carregando' | 'sucesso' | 'erro'
  const [status, setStatus] = useState('inicial')
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null)
  const { favoritos, ehFavorita, alternarFavorito } = useFavoritos()
  const { tema, alternarTema } = useTema()

  // A barra do topo acompanha a rolagem: quando o título grande some por baixo dela,
  // o nome da cidade (ou o título da página) aparece no centro da barra
  const refTitulo = useRef(null)
  const { rolou, tituloEscondido } = useRolagemDaPagina(refTitulo)

  // O título da aba do navegador acompanha a cidade escolhida (manipulação do DOM fora do React)
  useEffect(() => {
    document.title = cidadeSelecionada ? `${cidadeSelecionada.nome} · Janela de Luz` : 'Janela de Luz'
  }, [cidadeSelecionada])

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
          <SelectedCity
            cidade={cidadeSelecionada}
            onChange={() => setCidadeSelecionada(null)}
            ehFavorita={ehFavorita(cidadeSelecionada)}
            onToggleFavorito={() => alternarFavorito(cidadeSelecionada)}
          />
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
        <FeedbackPlaceholder
          icon={CircleAlert}
          tone="negative"
          title="Não foi possível buscar as cidades"
          description="Verifique sua conexão com a internet e tente novamente."
        >
          <Button variant="secondary-neutral" compact onClick={() => handleSearch(ultimoTermo)}>
            Tentar novamente
          </Button>
        </FeedbackPlaceholder>
      )
    }

    if (status === 'sucesso' && cidades.length === 0) {
      return (
        <FeedbackPlaceholder
          icon={SearchX}
          title="Nenhuma cidade encontrada"
          description={`Não há resultados para "${ultimoTermo}". Confira a grafia ou tente uma cidade próxima.`}
        />
      )
    }

    if (status === 'sucesso') {
      return <CityList cidades={cidades} onSelect={setCidadeSelecionada} ehFavorita={ehFavorita} />
    }

    return (
      <FeedbackPlaceholder
        icon={MapPin}
        title="Nenhuma cidade selecionada"
        description={
          favoritos.length > 0
            ? 'Busque uma cidade ou escolha uma das locações salvas.'
            : 'Busque uma cidade para ver as melhores horas para gravar nos próximos 7 dias.'
        }
      />
    )
  }

  return (
    <div className="app">
      <AppHeader
        titulo={cidadeSelecionada ? cidadeSelecionada.nome : TITULO_DA_PAGINA}
        rolou={rolou}
        mostrarTitulo={tituloEscondido}
        tema={tema}
        onAlternarTema={alternarTema}
      />

      <MainContentContainer className="page">
        <div className="page__topo">
          <PageHeader subtitle="Planejador de gravações externas" title={TITULO_DA_PAGINA} titleRef={refTitulo}>
            <p>
              Busque uma cidade e veja, hora a hora, como vão estar as nuvens, a chuva, o vento e a luz
              do sol nos próximos 7 dias.
            </p>
          </PageHeader>

          <SearchBar onSearch={handleSearch} carregando={status === 'carregando'} />
        </div>

        {!cidadeSelecionada && (
          <SavedLocations favoritos={favoritos} onSelect={setCidadeSelecionada} />
        )}

        {renderResultado()}
      </MainContentContainer>

      <Footer />
    </div>
  )
}

export default App
