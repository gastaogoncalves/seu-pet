# Seu Pet

> **Projeto em construção.** Este repositório está em desenvolvimento ativo como projeto de estudos (FATEC) e ainda não representa uma versão final.

## Sobre o projeto

O Seu Pet é um aplicativo de adoção de animais, feito a partir do esqueleto do KiOferta para o Desafio 1 da FATEC.

## Tema sorteado

Adoção de animais: protetores anunciam em grupos de mensagem e o anúncio se perde no dia seguinte.

**A pergunta que o app responde:** qual animal para adoção está mais perto de mim, e ele cabe na minha casa?

## As seis telas

| Rota | Tela | O que faz |
|---|---|---|
| `#inicio` | Início | Busca dominante e atalhos por espécie e porte |
| `#resultados` | Resultados | `filter` por texto + espécie + porte, ordenação por distância ou idade, estado vazio |
| `#detalhe?id=N` | Detalhe | `find` pelo id; distância, porte, idade e quem publicou |
| `#publicar` | Anunciar | Formulário validado pelo HTML, recusa animal repetido, `push` |
| `#conta` | Minha conta | Login, dados do usuário, `filter` dos animais dele, sair |
| qualquer outra | Rota inexistente | O `find` do roteador devolve `undefined` e cai aqui |

Contas de teste (senha `1234`): `ana@seupet.com`, `patas@seupet.com`, `carlos@seupet.com`, `larfeliz@seupet.com`.

O relatório do desafio está em [docs/relatorio.pdf](docs/relatorio.pdf).

## Integrantes

- Danilo Martins
- Gastão Victor

## Padrão utilizado

O projeto segue uma estrutura simples de **SPA (Single Page Application) em JavaScript puro (vanilla JS)**, sem frameworks como React, Vue ou Angular. Os principais pontos do padrão são:

- **Roteamento por hash**: a navegação entre telas é controlada pelo hash da URL (`#inicio`, `#resultados`, `#detalhe`, etc.), interceptado pelo evento `hashchange` em [src/js/main.js](src/js/main.js).
- **Páginas como módulos**: cada tela vive em seu próprio arquivo dentro de [src/js/paginas/](src/js/paginas/) e exporta um objeto com sua `url` e uma função `pagina()` responsável por renderizar o conteúdo dentro do elemento `#app`.
- **Mapa de rotas central**: [src/js/rotas/rotas.js](src/js/rotas/rotas.js) reúne todas as páginas disponíveis em uma lista única, usada tanto pelo roteador quanto pela navbar.
- **Navbar dinâmica**: o componente em [src/js/navbar/navbar.js](src/js/navbar/navbar.js) é montado a partir do mesmo mapa de rotas, evitando duplicação entre navegação e páginas.
- **CSS por componente**: `src/css/` guarda só `tokens.css` (cores, tipografia, espaçamento), `base.css` e `style.css`; cada tela importa o próprio CSS, que mora ao lado do JS dela.
- **Build com Vite**: o [Vite](https://vitejs.dev/) cuida do bundling e do servidor de desenvolvimento, gerando a pasta `dist/` que o Capacitor usa como `webDir` para empacotar o app nativo.

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado LTS mais recente)
- npm (instalado junto com o Node.js)

### Passo a passo

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone https://github.com/gastaogoncalves/seu-pet
   cd seu-pet
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o projeto em modo de desenvolvimento (abre no navegador, com hot reload):

   ```bash
   npm run dev
   ```

4. Para gerar a versão de produção (usada também pelo Capacitor):

   ```bash
   npm run build
   ```

5. Para pré-visualizar o build de produção localmente:

   ```bash
   npm run preview
   ```

### Rodando como app nativo (Capacitor)

Este projeto usa o [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app) como base. Para sincronizar o build web com os projetos nativos (Android/iOS), consulte a [documentação do Capacitor](https://capacitorjs.com/docs) — em resumo, após o `npm run build`, é necessário adicionar a plataforma desejada e sincronizar os arquivos web com o projeto nativo antes de rodar em um emulador ou dispositivo.

## Status

Este é um projeto didático em construção. Funcionalidades, estrutura de pastas e padrões podem mudar conforme o aprendizado avança.
