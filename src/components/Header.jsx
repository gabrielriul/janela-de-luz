// Cabeçalho com a marca do app e uma frase explicando o que ele faz
function Header() {
  return (
    <header className="header">
      <div className="marca">
        <Logo />
        <h1>Janela de Luz</h1>
      </div>
      <p className="header-texto">
        Nuvens, chuva, vento e a luz do sol, hora a hora. Descubra a melhor
        janela para a sua próxima gravação externa.
      </p>
    </header>
  )
}

// Logo desenhado em SVG: um sol nascendo sobre o horizonte
function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="logo-sol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#f08a3c" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#1e222c" />
      <path d="M14 40a18 18 0 0 1 36 0z" fill="url(#logo-sol)" />
      <rect x="8" y="42" width="48" height="4" rx="2" fill="#6d8cff" />
      <rect x="16" y="50" width="32" height="3" rx="1.5" fill="#6d8cff" opacity=".5" />
    </svg>
  )
}

export default Header
