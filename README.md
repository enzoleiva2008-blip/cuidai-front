# CuidAí — "Seu cuidado marcado, sem fila."

## Objetivo

O CuidAí é uma CitizenTech para a saúde pública. Pelo celular, o cidadão **agenda consulta na UBS**, acompanha a **fila inteligente**, em que idosos, gestantes e pacientes crônicos têm prioridade, e **cancela quando não puder ir**, liberando a vaga para outra pessoa. Este repositório é o **front-end** do projeto. Ele consome a API REST em Java da disciplina de Domain Driven Design.

Global Solution 2026/2 · Front-End Design Engineering · FIAP 1TDS

## Links

| | |
|---|---|
| 🌐 **Aplicação (Vercel)** | _https://cuidai.vercel.app_ ← trocar |
| 💻 **GitHub** | _https://github.com/usuario/cuidai-front_ ← trocar |
| ☕ **API Java (Render)** | _https://cuidai-api.onrender.com_ ← trocar |
| 🎬 **Vídeo (YouTube)** | _link_ ← trocar |

## Tecnologias

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS 4** (plugin oficial `@tailwindcss/vite`)
- **React Router** (SPA com rotas estáticas e dinâmicas)
- **Fetch API** para as requisições HTTP (sem Axios)
- Deploy na **Vercel**

## Estrutura de pastas

```
src/
├── components/   componentes reutilizáveis (Botao, CampoFormulario, CampoSelecao, Alerta,
│                 Carregando, EstadoVazio, Cartao, CartaoConsulta, Etiquetas, Avatar, Layout...)
├── pages/        uma página por rota
├── services/     chamadas à API Java com Fetch (api.ts, cidadaoService, medicoService, consultaService)
├── types/        interfaces TypeScript dos dados da API
├── data/         conteúdo fixo (integrantes, especialidades, FAQ)
├── utils/        validações de formulário e formatação de datas, CPF etc.
├── App.tsx       definição das rotas
└── main.tsx      ponto de entrada
```

## Páginas e rotas

| Rota | Página | Integração com a API |
|---|---|---|
| `/` | Home | — |
| `/sobre` | Sobre | — |
| `/integrantes` | Integrantes | — |
| `/integrantes/:rm` | Detalhe do integrante (**rota com parâmetro**) | — |
| `/faq` | FAQ (acordeão) | — |
| `/contato` | Contato (formulário validado) | — |
| `/cadastro` | Cadastro do cidadão | `POST /cidadaos` |
| `/agendar` | Agendar consulta | `GET /cidadaos`, `GET /medicos`, `POST /cidadaos/{id}/consultas` |
| `/consultas` | Fila inteligente e todas as consultas | `GET /consultas` |
| `/consultas/:id` | Detalhe, posição na fila e cancelamento (**rota com parâmetro**) | `GET /consultas/{id}`, `PUT /consultas/{id}` |

Todas as páginas que usam a API mostram **carregando**, **erro** e **ausência de dados**.

## Como executar

Pré-requisito: **Node.js 20 ou mais novo**.

```bash
npm install
```

Crie um arquivo `.env` na raiz, copiando o `.env.example`, com a URL da API:

```
VITE_API_URL=http://localhost:8080
```

```bash
npm run dev
```

Abra `http://localhost:5173`.

Para gerar a versão de produção: `npm run build`.

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| _preencher_ | _rm_ | 1TDS | _link_ | _link_ |
| _preencher_ | _rm_ | 1TDS | _link_ | _link_ |

## Contato

contato@cuidai.com.br (fictício) · ou pelos perfis dos integrantes acima

## Uso de IA generativa

Usamos o Claude (Anthropic) como apoio na estrutura do projeto e na revisão do código. Todo o código foi revisado, testado e entendido pelo grupo.
