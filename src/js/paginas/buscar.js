import './buscar.css'
function buscar(app){
    app.innerHTML = `
        <div class="container-buscar">
            <h2>Adote um Pet</h2>
            <p class="subtitulo-buscar"> Qual animal você quer adotar?</p>
            <div class="grupo-input">
            <label for="input-busca"><i data-lucide="search" id="icone-busca"></i> </label>
                <input 
                    type="text" 
                    id="input-busca" 
                    placeholder="Nome do animal"
                    aria-label="campo busca de animal"
                >
                <button id="btn-busca"> 
                    <i data-lucide="arrow-right"></i>
                </button>
                
            </div>
            <p class="busca-atencao">Animais disponíveis para adoção perto de você</p>
            <div class="categorias-busca">
                <p>Categoria</p>
                <ul class="categoria-lista">
                    <li class="lista-categoria">
                        Cães
                    </li>
                    <li class="lista-categoria">
                        Gatos
                    </li>
                </ul>
            </div>

        </div>

    `
    adicionarEvento(app)
}

function adicionarEvento(app){
    const botaoBusca = document.getElementById("btn-busca")
    const listaCategoria = document.querySelectorAll(".lista-categoria")
    botaoBusca.addEventListener("click",()=>{
       location.hash = `#produtos?${document.getElementById("input-busca").value.trim()}`
    })
    
    listaCategoria.forEach(item => item.addEventListener("click", ()=>{
        location.hash = `#produtos?${item.textContent.trim()}`
    }))
}

export default {
    url: "#buscar",
    label: "buscar",
    icon: "search",
    pagina: buscar
}