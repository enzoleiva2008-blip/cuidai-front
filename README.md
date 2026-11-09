# CuidAí — "Seu cuidado marcado, sem fila."

## Objetivo

O CuidAí é uma CitizenTech para a saúde pública. Pelo celular, o cidadão **agenda consulta na UBS**, acompanha a **fila inteligente**, em que idosos, gestantes e pacientes crônicos têm prioridade, e **cancela quando não puder ir**, liberando a vaga para outra pessoa. Este repositório é o **front-end** do projeto. Ele consome a API REST em Java da disciplina de Domain Driven Design.

Global Solution 2026/2 · Front-End Design Engineering · FIAP 1TDS

## Links

| | |
|---|---|
| 🌐 **Aplicação (Vercel)** | https://cuidai-front.vercel.app |
| 💻 **GitHub** | https://github.com/enzoleiva2008-blip/cuidai-front |
| ☕ **API Java (Render)** | https://cuidai-api.onrender.com · [repositório](https://github.com/enzoleiva2008-blip/cuidai-api) |
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

## Como rodar localmente

Pré-requisito: **Node.js 20 ou mais novo**.

1. Instale as dependências:
	```bash
	npm install
	```
2. Copie `.env.example` para `.env` na raiz do projeto e ajuste a URL da API, se necessário.
3. Inicie o servidor de desenvolvimento:
	```bash
	npm run dev
	```
4. Abra `http://localhost:5173`.
5. Para verificar a compilação de produção, rode:
	```bash
	npm run build
	```

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API Java consumida pelo front-end. Use a URL local durante o desenvolvimento ou a URL publicada no deploy, sem barra no final. | `http://localhost:8080` |

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Enzo Leiva | 568877 | 1TDSPO | [enzoleiva2008-blip](https://github.com/enzoleiva2008-blip) | [LinkedIn](https://www.linkedin.com/in/enzo-leiva-varrichio-88ba273a1/) |
| Matheus Segura | 570878 | 1TDSPO | [MatheuSegura](https://github.com/MatheuSegura) | [LinkedIn](https://www.linkedin.com/in/matheussegura/) |
| Kauã Fiuza | 572369 | 1TDSPO | [KauaznX](https://github.com/KauaznX) | [LinkedIn](https://www.linkedin.com/in/kau%C3%A3-fiuza-94a039313/) |
| Lucas Almeida | 572499 | 1TDSPO | [LucasAlmeidaOliveira](https://github.com/LucasAlmeidaOliveira) | [LinkedIn](https://www.linkedin.com/in/lucasalmeidaoliva) |

## Contato

contato@cuidai.com.br (fictício) · ou pelos perfis dos integrantes acima

## Uso de IA generativa

O código deste projeto foi gerado em grande parte com o Claude (Anthropic), a partir das decisões do grupo. O grupo é responsável por revisar, testar e saber explicar cada parte.
