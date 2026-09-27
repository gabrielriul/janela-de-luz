// Rodapé com o crédito da API (exigido pela licença da Open-Meteo) e a identificação do projeto
function Footer() {
  return (
    <footer className="footer">
      <span>
        Dados meteorológicos:{' '}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo.com
        </a>{' '}
        (CC BY 4.0)
      </span>
      <span>Projeto 1 · ES47B – Programação Web Fullstack · UTFPR-CP</span>
    </footer>
  )
}

export default Footer
