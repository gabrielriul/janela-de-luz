# Janela de Luz

[![Deploy](https://github.com/gabrielriul/janela-de-luz/actions/workflows/deploy.yml/badge.svg)](https://github.com/gabrielriul/janela-de-luz/actions/workflows/deploy.yml)

> **Repositório acadêmico** criado como Projeto 1 da disciplina **ES47B – Programação Web Fullstack – ES71 (2026_02)**, do curso de Engenharia da Computação da Universidade Tecnológica Federal do Paraná (UTFPR), câmpus Cornélio Procópio.
>
> **Professora:** Profª. Drª. Juliana Costa Silva\
> **Aluno:** Gabriel Riul Perissé — RA 2064430

**App publicado:** https://gabrielriul.github.io/janela-de-luz/

## Sobre o projeto

Planejador de gravações externas. O usuário busca uma cidade, vê a previsão do tempo hora a hora para os próximos 7 dias e o app calcula uma **nota de gravação** para cada horário, considerando nuvens, chuva, vento e golden hour. As melhores janelas para gravar ficam em destaque.

O app é uma SPA (Single Page Application) feita em React que consome dados de uma API JSON pública, conforme pedido no enunciado do Projeto 1.

## Escolhas do projeto

| Item | Escolha |
| --- | --- |
| API JSON | [Open-Meteo](https://open-meteo.com/) — Forecast API e Geocoding API (gratuitas, sem chave) |
| Hook do React | `useMemo` — recalcula as notas de gravação só quando a previsão ou o modo de gravação mudam |
| Biblioteca externa | [Recharts](https://recharts.org/) — gráfico hora a hora |
| Stack | React 19 + Vite, JavaScript, CSS |
| Interface | Design system próprio (tema claro, fonte Bricolage Grotesque, controles em formato de pílula) e ícones [Lucide](https://lucide.dev/) (`lucide-react`) |

## Funcionalidades

- [x] Layout base e busca de cidade (interface)
- [x] Busca de cidades na Geocoding API (carregando, sem resultados, erro e seleção da cidade)
- [x] Previsão hora a hora na Forecast API (7 dias, nascer e pôr do sol, golden hour e blue hour)
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

## Fluxo de trabalho

O repositório simula o fluxo usado em equipes de produto:

| Branch | Papel |
| --- | --- |
| `main` | Produção. Só recebe código por Pull Request vindo da `develop`. Cada merge publica o app no GitHub Pages. |
| `develop` | Desenvolvimento. Todas as etapas são commitadas aqui. |

1. O trabalho é feito e commitado na `develop`.
2. Quando uma entrega está pronta, abre-se um Pull Request da `develop` para a `main`, seguindo o [template de PR](.github/pull_request_template.md).
3. O **CI** roda no Pull Request. O merge só acontece com o CI aprovado e depois da revisão.
4. O merge na `main` dispara o **deploy** para o GitHub Pages.

A `main` é protegida por uma regra no GitHub: não aceita push direto nem force push, exige Pull Request e exige o check **Lint e build** aprovado.

Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat`, `fix`, `style`, `docs`, `ci`, `chore`.

## CI/CD

| Workflow | Quando roda | O que faz |
| --- | --- | --- |
| [`ci.yml`](.github/workflows/ci.yml) | Pull Request para a `main` | `npm ci`, lint com oxlint e build de produção |
| [`deploy.yml`](.github/workflows/deploy.yml) | Push na `main` (merge de PR) | Lint, build e publicação no GitHub Pages |

## Estrutura

```
.github/
├── workflows/ci.yml       # CI: lint e build nos Pull Requests para a main
├── workflows/deploy.yml   # CD: deploy no GitHub Pages a cada merge na main
└── pull_request_template.md
src/
├── components/   # componentes da interface (Header, SearchBar, EmptyState, Footer...)
│   └── ui/       # componentes base do design system (Button, Card, Badge, TextInput, Spinner, Shimmer)
├── hooks/        # hooks personalizados (usePrevisao.js)
├── services/     # comunicação com a API (openMeteo.js)
├── utils/        # funções puras: formatação pt-BR, janelas de luz e descrição do tempo
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
| Design system | Claude | Aplicação do meu design system (cores, tipografia, espaçamento, raios) e criação dos componentes base em `components/ui` | Revisão do código; conceitos: variáveis CSS, componentes reutilizáveis com props e variantes, prop `children` |
| Fluxo de branches | Claude | Criação da branch `develop`, separação dos workflows de CI e deploy e template de Pull Request | Definição do fluxo `develop` → PR → `main` e configuração da regra de proteção da `main` no GitHub |
| Etapa 3 — previsão hora a hora | Claude | Integração com a Forecast API, hook `usePrevisao`, seleção de dia, resumo do dia, cálculo de golden/blue hour e tabela hora a hora | Revisão do código e teste no navegador; conceitos: `useEffect` com função de limpeza, hook personalizado, estado derivado, `key` para reiniciar um componente |
| Etapa 2 — busca de cidades | Claude | Integração com a Geocoding API da Open-Meteo, lista de cidades, estados de carregamento, erro e sem resultados | Revisão do código e teste no navegador; conceitos: `fetch` com `async/await`, `try/catch`, estado da requisição, `map` com `key` e renderização condicional |

Os commits feitos com ajuda da IA trazem a linha `Co-Authored-By: Claude` na mensagem.

## Autor

**Gabriel Riul Perissé** — RA 2064430\
Engenharia da Computação — UTFPR, câmpus Cornélio Procópio

Disciplina ES47B – Programação Web Fullstack – ES71 (2026_02), com a Profª. Drª. Juliana Costa Silva.

## Créditos

Dados meteorológicos fornecidos por [Open-Meteo.com](https://open-meteo.com/) sob a licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
