// Mensagem exibida quando ainda não há nada para mostrar.
// Recebe o título e o texto por props, então pode ser reaproveitado em várias situações.
function EmptyState({ titulo, texto }) {
  return (
    <section className="estado-vazio">
      <h2>{titulo}</h2>
      <p>{texto}</p>
    </section>
  )
}

export default EmptyState
