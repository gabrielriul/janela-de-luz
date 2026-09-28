import './ui.css'

// Lista de detalhes em pares rótulo/valor (forma vertical): rótulo cinza em cima, valor embaixo.
// data: lista de { title, value }. Itens sem valor não aparecem.
function DataList({ data }) {
  return (
    <dl className="data-list">
      {data
        .filter((item) => item.value != null && item.value !== '')
        .map((item) => (
          <div key={item.title} className="data-list__item">
            <dt>{item.title}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
    </dl>
  )
}

export default DataList
