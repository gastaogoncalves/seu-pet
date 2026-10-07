import listaDeProdutos from '../dadosMockados/dados.js'
function mapa(app, id) {
  const produto = listaDeProdutos.find(p => p.id === Number(id))
  if (!produto) { app.innerHTML = "<p>Escolha um animal.</p>"; return }
  app.innerHTML = `
    <img src="${produto.img}" alt="${produto.nome}">
    <h1>${produto.nome}</h1>
    <p>${produto.porte} · ${produto.idade} ano(s) · ${produto.distancia} m</p>
    <section class="mapa-provisorio">Mapa dos mercados: aula 17.</section>`

}
export default { 
  url: '#mapa',
   label: 'mapa',
   icon: "map",
    pagina: mapa 
  };
