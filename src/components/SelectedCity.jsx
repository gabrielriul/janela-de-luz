import { Star } from 'lucide-react'
import Card from './ui/Card.jsx'
import Button from './ui/Button.jsx'
import DataList from './ui/DataList.jsx'
import { FlexBetweenLayout } from './ui/Layout.jsx'
import { formatarCoordenadas, formatarInteiro, formatarRegiao } from '../utils/formatters.js'

// Resumo da cidade escolhida: nome, região e os detalhes (coordenadas, altitude e fuso horário)
// onChange: volta para a busca
// ehFavorita / onToggleFavorito: salvar ou remover a cidade das locações salvas
function SelectedCity({ cidade, onChange, ehFavorita, onToggleFavorito }) {
  return (
    <Card gutter="lg" className="selected-city animate-fade-in">
      <FlexBetweenLayout>
        <div className="selected-city__titulo">
          <p className="caption text-secondary">Cidade selecionada</p>
          <h2 className="heading-2">{cidade.nome}</h2>
          <p className="body-sm text-secondary">{formatarRegiao(cidade)}</p>
        </div>

        <div className="selected-city__acoes">
          <Button
            variant={ehFavorita ? 'secondary' : 'secondary-neutral'}
            compact
            onClick={onToggleFavorito}
            aria-pressed={ehFavorita}
          >
            <Star size={16} fill={ehFavorita ? 'currentColor' : 'none'} aria-hidden="true" />
            {ehFavorita ? 'Locação salva' : 'Salvar locação'}
          </Button>
          <Button variant="secondary-neutral" compact onClick={onChange}>
            Trocar cidade
          </Button>
        </div>
      </FlexBetweenLayout>

      {/* Nem toda cidade tem altitude ou fuso cadastrados; itens sem valor não aparecem */}
      <DataList
        data={[
          { title: 'Coordenadas', value: formatarCoordenadas(cidade.latitude, cidade.longitude) },
          {
            title: 'Altitude',
            value: cidade.altitude != null ? `${formatarInteiro(cidade.altitude)} m` : null,
          },
          { title: 'Fuso horário', value: cidade.fusoHorario },
        ]}
      />
    </Card>
  )
}

export default SelectedCity
