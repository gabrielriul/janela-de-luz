import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from 'lucide-react'
import { descreverTempo } from '../utils/clima.js'

// Ícone do tempo a partir do código WMO da Open-Meteo.
// ehDia troca sol por lua nos códigos de céu limpo e poucas nuvens.
function WeatherIcon({ codigo, ehDia = true, size = 16 }) {
  const props = { size, role: 'img', 'aria-label': descreverTempo(codigo) }

  if (codigo === 0) return ehDia ? <Sun {...props} /> : <Moon {...props} />
  if (codigo === 1 || codigo === 2) return ehDia ? <CloudSun {...props} /> : <CloudMoon {...props} />
  if (codigo === 45 || codigo === 48) return <CloudFog {...props} />
  if (codigo >= 51 && codigo <= 57) return <CloudDrizzle {...props} />
  if ((codigo >= 61 && codigo <= 67) || (codigo >= 80 && codigo <= 82)) return <CloudRain {...props} />
  if ((codigo >= 71 && codigo <= 77) || codigo === 85 || codigo === 86) return <CloudSnow {...props} />
  if (codigo >= 95) return <CloudLightning {...props} />
  return <Cloud {...props} />
}

export default WeatherIcon
