import './produtos.css'
import listaDeProdutos from '../../dadosMockados/dados.js' 
function produtos(app, categoria) {
  const lista = categoria ? listaDeProdutos.filter(prod => prod.categoria === categoria) : listaDeProdutos
  app.innerHTML = `
    <h1>${categoria ? categoria : "Todos os animais"}</h1>
    ${ 
        lista.length === 0 ? "<p>Nenhum animal nesta categoria.</p>" : lista.map(cartao).join("") 
     }`
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