# CuidAí — Passo a passo da entrega de Front-End

## Passo 1 — Rodar no computador

1. Instale o **Node.js** (versão LTS) em nodejs.org, se ainda não tiver.
2. Abra a pasta `cuidai-front` no VS Code e, no terminal (Ctrl+'), rode:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env`, copiando o `.env.example`:
   ```
   VITE_API_URL=http://localhost:8080
   ```
   Se a API já estiver no Render, use a URL de lá.
4. Rode:
   ```bash
   npm run dev
   ```
   e abra `http://localhost:5173`.

> ⚠️ Se aparecer erro de CORS no console do navegador, a variável `CORS_ORIGINS` no Render precisa incluir `http://localhost:5173`. Sem essa variável, a API libera qualquer origem.

## Passo 2 — GitHub (⚠️ vale pontos: 5 commits por pessoa, 15 no total)

1. **Uma pessoa** cria o repositório **público** `cuidai-front` no GitHub e envia o projeto:
   ```bash
   git init
   git add .
   git commit -m "Estrutura inicial do projeto"
   git branch -M main
   git remote add origin https://github.com/USUARIO/cuidai-front.git
   git push -u origin main
   ```
2. Essa pessoa adiciona os outros como colaboradores, em **Settings › Collaborators**.
3. **Cada integrante** clona o repositório e faz **pelo menos 5 commits próprios**, com a conta dele. Sugestão de divisão:

| Integrante | Commits sugeridos |
|---|---|
| 1 | dados dos integrantes, fotos, ajustes na Home, textos do Sobre, links do README |
| 2 | ajustes no Cadastro, validações, mensagens, FAQ, rodapé |
| 3 | ajustes no Agendar, na fila, nas cores, no Contato, URLs no README |

O professor olha o histórico. Commits pequenos e com mensagem clara, como "Adiciona fotos dos integrantes", contam mais que um commit gigante.

## Passo 3 — Publicar na Vercel

1. Entre em **vercel.com** com a conta do GitHub.
2. Clique em **Add New › Project** e importe o repositório `cuidai-front`.
3. A Vercel detecta o Vite sozinha. Em **Environment Variables**, adicione:
   - `VITE_API_URL` = `https://SEU-APP.onrender.com`, **sem barra no final**
4. Clique em **Deploy**.
5. Teste a URL publicada: abra `/consultas` **direto pela barra de endereço**. O `vercel.json` já garante que isso funciona.
6. No **Render**, ponha a URL da Vercel na variável `CORS_ORIGINS` da API e faça o redeploy.

## Passo 4 — Vídeos

- **Vídeo do Front (até 3 min):** mostre as páginas, o cadastro, o agendamento, a fila e o cancelamento, e diga que os dados vêm da API Java.
- **Vídeo do Java (até 5 min):** pode ser parecido, mostrando também o Insomnia e explicando a arquitetura.

Os dois vão no YouTube como **não listado**. Coloque os links no README de cada projeto.

## Passo 5 — .zip da entrega (só o representante envia)

```
GS_Front_CuidAi.zip     (até 50 MB)
├── src/
├── public/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── .env.example
└── README.md
```

> ⛔ **NÃO inclua a pasta `node_modules`, porque isso zera a nota.** Também não inclua `dist` nem `.env`.

## Roteiro da apresentação (30 pontos)

1. **Problema e contexto**: a fila na UBS e as faltas.
2. **Solução**: o que o CuidAí faz.
3. **Páginas e navegação**: as 5 institucionais, as 4 da solução e o menu.
4. **Responsividade**: no navegador, aperte F12 › ícone de celular › 390×844, depois 768×1024 e 1440×900.
5. **Menu mobile e formulários ao vivo**: abrir o ☰, enviar o cadastro vazio para mostrar as validações, cadastrar de verdade e mostrar o sucesso, agendar com médico e especialidade que não combinam para mostrar o erro da API, e agendar certo.
6. **Domínio técnico**: cada um explica uma parte, por exemplo `services/api.ts`, as rotas em `App.tsx`, um componente reutilizável, o Tailwind responsivo (`md:`, `lg:`) e as validações.
7. **Todos falam**. A simples presença não conta como participação.

## Checklist final

- [ ] `npm install` e `npm run dev` funcionam do zero
- [ ] O site está na Vercel e abre `/consultas` direto
- [ ] Os dados vêm da API Java publicada, não de mock
- [ ] O repositório é público, com 5+ commits por pessoa e 15+ no total
- [ ] O README tem todas as URLs (GitHub, Vercel, API, YouTube) e os integrantes
- [ ] O vídeo tem até 3 minutos e está como não listado
- [ ] O .zip tem menos de 50 MB e **não tem `node_modules`**
