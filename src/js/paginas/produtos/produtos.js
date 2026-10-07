import './produtos.css'
import listaDeProdutos from '../../dadosMockados/dados.js' 
function produtos(app, termo) {
  const busca = termo ? termo.toLowerCase() : ""
  const lista = listaDeProdutos.filter(prod =>
    prod.categoria.toLowerCase() === busca || prod.nome.toLowerCase().includes(busca)
  )
  app.innerHTML = `
    <h1>${termo ? termo : "Todos os animais"}</h1>
    <button id="ordem-distancia">Mais perto</button>
    <button id="ordem-idade">Mais novo</button>
    <div id="lista-animais"></div>`
  mostrarLista(app, lista, "distancia")

  document.getElementById("ordem-distancia").addEventListener("click", () => mostrarLista(app, lista, "distancia"))
  document.getElementById("ordem-idade").addEventListener("click", () => mostrarLista(app, lista, "idade"))
}

function mostrarLista(app, lista, criterio) {
  const ordenada = [...lista].sort((a, b) => a[criterio] - b[criterio])
  document.getElementById("lista-animais").innerHTML =
    ordenada.length === 0 ? "<p>Nenhum animal encontrado.</p>" : ordenada.map(cartao).join("")
  adicionarEvento(app)
}

function cartao(produto) {
  return `<div class="produto" data-id="${produto.id}">
            <div class="produto-imagem">
                <img src="${produto.img}" alt="${produto.nome}" class="imagem-produto">
                <h3>${produto.nome}</h3>
            </div>
            <div class="preco-distancia">
                <p class="preco-especial">${produto.porte}</p>
                <p> ${produto.distancia} mt</p>
            </div>
        </div>`
}

function adicionarEvento(app){
document.querySelectorAll(".produto").forEach(card =>
  card.addEventListener("click", () => {
    location.hash = `#mapa?${card.dataset.id}`
  }))
}

export default { 
    url: "#produtos",
    label: "",
    icon: "shopping-basket",
    pagina: produtos
 };