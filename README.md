# Seu Pet

> **Projeto em construção.** Este repositório está em desenvolvimento ativo como projeto de estudos (FATEC) e ainda não representa uma versão final.

## Sobre o projeto

O Seu Pet é um aplicativo de adoção de animais, feito a partir do esqueleto do KiOferta para o Desafio 1 da FATEC.

## Tema sorteado

Adoção de animais: protetores anunciam em grupos de mensagem e o anúncio se perde no dia seguinte. O Seu Pet responde: qual animal para adoção está mais perto de mim?

## Integrantes

- Danilo Martins
- Gastão Victor

## Padrão utilizado

O projeto segue uma estrutura simples de **SPA (Single Page Application) em JavaScript puro (vanilla JS)**, sem frameworks como React, Vue ou Angular. Os principais pontos do padrão são:

- **Roteamento por hash**: a navegação entre telas é controlada pelo hash da URL (`#buscar`, `#mapa`, `#enviar`, etc.), interceptado pelo evento `hashchange` em [src/js/main.js](src/js/main.js).
- **Páginas como módulos**: cada tela vive em seu próprio arquivo dentro de [src/js/paginas/](src/js/paginas/) e exporta um objeto com sua `url` e uma função `pagina()` responsável por renderizar o conteúdo dentro do elemento `#app`.
- **Mapa de rotas central**: [src/js/rotas/rotas.js](src/js/rotas/rotas.js) reúne todas as páginas disponíveis em uma lista única, usada tanto pelo roteador quanto pela navbar.
- **Navbar dinâmica**: o componente em [src/js/navbar/navbar.js](src/js/navbar/navbar.js) é montado a partir do mesmo mapa de rotas, evitando duplicação entre navegação e páginas.
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
