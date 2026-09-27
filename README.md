# Janela de Luz

[![CI/CD](https://github.com/gabrielriul/janela-de-luz/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/gabrielriul/janela-de-luz/actions/workflows/ci-cd.yml)

**App publicado:** https://gabrielriul.github.io/janela-de-luz/

Planejador de gravações externas. O usuário busca uma cidade, vê a previsão do tempo hora a hora para os próximos 7 dias e o app calcula uma **nota de gravação** para cada horário, considerando nuvens, chuva, vento e golden hour. As melhores janelas para gravar ficam em destaque.

Projeto 1 da disciplina **Programação Web Fullstack (AS64A)** — UTFPR Cornélio Procópio, 2026/2.

## Escolhas do projeto

| Item | Escolha |
| --- | --- |
| API JSON | [Open-Meteo](https://open-meteo.com/) — Forecast API e Geocoding API (gratuitas, sem chave) |
| Hook do React | `useMemo` — recalcula as notas de gravação só quando a previsão ou o modo de gravação mudam |
| Biblioteca externa | [Recharts](https://recharts.org/) — gráfico hora a hora |
| Stack | React 19 + Vite, JavaScript, CSS |

## Funcionalidades

- [x] Layout base e busca de cidade (interface)
- [ ] Busca de cidades na Geocoding API
- [ ] Previsão hora a hora na Forecast API
- [ ] Nota de gravação por hora com `useMemo` e modos de gravação
- [ ] Gráfico hora a hora com Recharts
- [ ] Locações favoritas salvas no navegador

## Como rodar

Pré-requisito: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Depois é só abrir o endereço que aparecer no terminal (normalmente http://localhost:5173).

## CI/CD

O workflow [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) roda no GitHub Actions:

- **CI** — a cada push ou pull request: `npm ci`, lint com oxlint e build de produção. Se algo quebrar, o commit fica marcado com erro.
- **CD** — a cada push na `main`: o build é publicado automaticamente no GitHub Pages.

## Estrutura

```
.github/workflows/ci-cd.yml   # pipeline de CI/CD
src/
├── components/   # componentes da interface (Header, SearchBar, EmptyState, Footer...)
├── App.jsx       # componente principal: layout e estado da página
├── App.css       # estilos dos componentes
├── index.css     # estilos globais e variáveis de cor
└── main.jsx      # ponto de entrada do React
```

## Uso de IA

Conforme pedido no enunciado, registro aqui como usei IA generativa no desenvolvimento.

| Etapa | Ferramenta | Como foi usada | O que eu revisei / aprendi |
| --- | --- | --- | --- |
| Ideia e planejamento | Claude | Sugestão de ideias de projeto a partir do enunciado e divisão do trabalho em etapas | Escolhi a ideia e defini API, hook e biblioteca |
| Etapa 0 — criação do projeto | Claude | Execução do `create-vite` (template React) e primeiro commit | Instalei o Node.js e as dependências e criei o repositório no GitHub |
| Etapa 1 — layout base | Claude | Geração da estrutura inicial dos componentes e do CSS | Revisão do código; conceitos: componentes, props, estado com `useState`, componente controlado e renderização condicional |
| Versionamento e CI/CD | Claude | Commits no repositório e criação do workflow de CI/CD (GitHub Actions + GitHub Pages) | Ativação do GitHub Pages nas configurações do repositório; conceitos: integração contínua, deploy contínuo e build com Vite |

Os commits feitos com ajuda da IA trazem a linha `Co-Authored-By: Claude` na mensagem.

## Autor

Gabriel Riul — Engenharia da Computação, UTFPR-CP

## Créditos

Dados meteorológicos fornecidos por [Open-Meteo.com](https://open-meteo.com/) sob a licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
