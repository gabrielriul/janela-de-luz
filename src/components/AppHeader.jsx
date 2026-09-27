import { Moon, Sun } from 'lucide-react'
import Button from './ui/Button.jsx'

// Barra do topo: uma faixa de vidro de 64px que fica fixa enquanto a página rola por baixo.
// rolou: a página saiu do topo (aparecem a linha fina e a sombra)
// titulo / mostrarTitulo: quando o título grande some por baixo da barra, ele aparece no centro dela
// tema / onAlternarTema: botão de tema claro e escuro
function AppHeader({ titulo, rolou, mostrarTitulo, tema, onAlternarTema }) {
  const classes = ['app-bar', 'glass', rolou && 'app-bar--rolou', mostrarTitulo && 'app-bar--com-titulo']
    .filter(Boolean)
    .join(' ')
  const escuro = tema === 'escuro'

  return (
    <header className={classes}>
      <div className="app-bar__inner content-gutter">
        <div className="app-bar__marca">
          <Logo />
          <span className="wordmark">Janela de Luz</span>
        </div>

        {/* Só visual: para leitores de tela, o título continua sendo o H1 da página */}
        <p className="app-bar__titulo headline" aria-hidden="true">
          {titulo}
        </p>

        <Button
          variant="ghost"
          size="icon"
          compact
          onClick={onAlternarTema}
          aria-label="Tema escuro"
          aria-pressed={escuro}
          title={escuro ? 'Usar tema claro' : 'Usar tema escuro'}
        >
          {escuro ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </Button>
      </div>
    </header>
  )
}

// Marca em uma cor só (herda a cor do texto, então se ajusta ao tema): um sol nascendo sobre o horizonte
function Logo() {
  return (
    <svg className="app-bar__logo" width="28" height="28" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <path d="M16 38a16 16 0 0 1 32 0z" />
      <rect x="10" y="42" width="44" height="4" rx="2" />
      <rect x="18" y="50" width="28" height="4" rx="2" />
    </svg>
  )
}

export default AppHeader
