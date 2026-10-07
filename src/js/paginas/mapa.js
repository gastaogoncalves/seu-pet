import listaDeProdutos from '../dadosMockados/dados.js'
import listaDeUsuarios from '../dadosMockados/usuarios.js'
function mapa(app, id) {
  const produto = listaDeProdutos.find(p => p.id === Number(id))
  if (!produto) { app.innerHTML = "<p>Escolha um animal.</p>"; return }
  const publicador = listaDeUsuarios.find(u => u.id === produto.idUsuario)
  app.innerHTML = `
    <img src="${produto.img}" alt="${produto.nome}">
    <h1>${produto.nome}</h1>
    <p>${produto.porte} · ${produto.idade} ano(s) · ${produto.distancia} m</p>
    <p>Publicado por: ${publicador.nome} · ${publicador.email}</p>
    <section class="mapa-provisorio">Mapa dos animais.</section>`

}
export default { 
  url: '#mapa',
   label: 'mapa',
   icon: "map",
    pagina: mapa 
  };
