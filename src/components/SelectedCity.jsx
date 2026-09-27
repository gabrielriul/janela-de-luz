import { Clock, MapPin, Mountain } from 'lucide-react'
import Card from './ui/Card.jsx'
import Badge from './ui/Badge.jsx'
import Button from './ui/Button.jsx'
import { formatarCoordenadas, formatarInteiro, formatarRegiao } from '../utils/formatters.js'

// Resumo da cidade escolhida. É aqui que a previsão hora a hora vai entrar na próxima etapa.
// onChange: volta para a lista de cidades
function SelectedCity({ cidade, onChange }) {
  return (
    <Card gutter="lg" className="animate-fade-in">
      <div className="selected-city__header">
        <div className="selected-city__title">
          <span className="caption text-muted">Cidade selecionada</span>
          <h2 className="heading-2">{cidade.nome}</h2>
          <span className="body-sm text-muted">{formatarRegiao(cidade)}</span>
        </div>
        <Button variant="outline" onClick={onChange}>
          Trocar cidade
        </Button>
      </div>

      <div className="badge-row">
        <Badge tone="neutral">
          <MapPin size={14} aria-hidden="true" />
          {formatarCoordenadas(cidade.latitude, cidade.longitude)}
        </Badge>

        {/* Nem toda cidade tem altitude cadastrada; só mostra quando existir */}
        {cidade.altitude != null && (
          <Badge tone="neutral">
            <Mountain size={14} aria-hidden="true" />
            {formatarInteiro(cidade.altitude)} m de altitude
          </Badge>
        )}

        {cidade.fusoHorario && (
          <Badge tone="neutral">
            <Clock size={14} aria-hidden="true" />
            Fuso {cidade.fusoHorario}
          </Badge>
        )}
      </div>

      <p className="body-sm text-muted">A previsão hora a hora desta cidade vai aparecer aqui.</p>
    </Card>
  )
}

export default SelectedCity
