// Barra superior com a marca do app
function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Logo />
        <span className="wordmark">Janela de Luz</span>
      </div>
    </header>
  )
}

// Marca em uma cor só (herda a cor do texto): um sol nascendo sobre o horizonte
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <path d="M16 38a16 16 0 0 1 32 0z" />
      <rect x="10" y="42" width="44" height="4" rx="2" />
      <rect x="18" y="50" width="28" height="4" rx="2" />
    </svg>
  )
}

export default Header
