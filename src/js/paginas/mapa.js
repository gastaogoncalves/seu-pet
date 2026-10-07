function mapa(app, produto) {
  if (!produto) { app.innerHTML = "<p>Escolha um animal.</p>"; return }
  app.innerHTML = `
    <img src="${produto.img}" alt="${produto.nome}">
    <h1>${produto.nome}</h1>
    <p>${produto.porte} · ${produto.idade} ano(s) · ${produto.distancia} m</p>
    <section class="mapa-provisorio">Mapa dos mercados: aula 17.</section>`

    location.hash = "#mapa"
}
export default { 
  url: '#mapa',
   label: 'mapa',
   icon: "map",
    pagina: mapa 
  };
