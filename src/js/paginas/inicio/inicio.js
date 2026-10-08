import './inicio.css'
import listaDeAnimais from '../../dadosMockados/animais.js'

const categorias = ["Cães", "Gatos"]
const portes = ["Pequeno", "Médio", "Grande"]

function inicio(app) {
    app.innerHTML = `
        <section class="inicio">
            <header class="inicio__marca">
                <i data-lucide="paw-print"></i>
                <span>Seu Pet</span>
            </header>

            <h1 class="inicio__pergunta">Qual animal você quer adotar?</h1>

            <form class="inicio__busca" role="search">
                <label for="input-busca" class="inicio__campo">
                    <i data-lucide="search"></i>
                    <input type="search" id="input-busca" name="busca"
                           placeholder="Nome, bairro ou cidade" autocomplete="off">
                </label>
                <button type="submit" class="inicio__botao" aria-label="Buscar">
                    <i data-lucide="arrow-right"></i>
                </button>
            </form>
            <p class="apoio">${listaDeAnimais.length} animais esperando adoção perto da Fatec Mogi, publicados por protetores e ONGs.</p>

            <section class="inicio__atalhos">
                <h2>Espécie</h2>
                <ul class="inicio__lista">
                    ${categorias.map(categoria => `
                        <li><a class="inicio__atalho" href="#resultados?categoria=${encodeURIComponent(categoria)}">
                            <i data-lucide="${categoria === "Gatos" ? "cat" : "dog"}"></i> ${categoria}
                        </a></li>`).join("")}
                </ul>
                <h2>Porte</h2>
                <ul class="inicio__lista">
                    ${portes.map(porte => `
                        <li><a class="inicio__atalho" href="#resultados?porte=${encodeURIComponent(porte)}">${porte}</a></li>`).join("")}
                </ul>
            </section>

            <footer class="inicio__rodape">
                <p class="apoio">É protetor ou ONG?</p>
                <a class="botao" href="#publicar">Anunciar um animal</a>
            </footer>
        </section>
    `
    adicionarEvento()
}

function adicionarEvento() {
    document.querySelector(".inicio__busca").addEventListener("submit", evento => {
        evento.preventDefault()
        const termo = document.getElementById("input-busca").value.trim()
        location.hash = termo ? `#resultados?busca=${encodeURIComponent(termo)}` : "#resultados"
    })
}

export default {
    url: "#inicio",
    label: "Início",
    icon: "search",
    pagina: inicio
}
