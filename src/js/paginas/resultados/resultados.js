import './resultados.css'
import { createIcons, icons } from 'lucide'
import listaDeAnimais from '../../dadosMockados/animais.js'
import { cartaoAnimal, ativarFotos, localDoAnimal, distanciaDoAnimal } from '../cartaoAnimal/cartaoAnimal.js'

const criterios = {
    distancia: { rotulo: "Mais perto", valor: animal => distanciaDoAnimal(animal) },
    idade: { rotulo: "Mais novo", valor: animal => animal.idade }
}

function resultados(app, parametros) {
    const filtros = {
        busca: parametros.get("busca") || "",
        categoria: parametros.get("categoria") || "",
        porte: parametros.get("porte") || "",
        ordem: criterios[parametros.get("ordem")] ? parametros.get("ordem") : "distancia"
    }

    app.innerHTML = `
        <section class="resultados">
            <header class="resultados__topo">
                <a href="#inicio" class="resultados__voltar" aria-label="Voltar para o início"><i data-lucide="chevron-left"></i></a>
                <label class="resultados__campo">
                    <i data-lucide="search"></i>
                    <input type="search" id="filtro-busca" value="${filtros.busca.replaceAll('"', "&quot;")}"
                           placeholder="Nome, bairro ou cidade" aria-label="Buscar animal" autocomplete="off">
                </label>
            </header>

            <div class="resultados__filtros">
                <select id="filtro-categoria" aria-label="Espécie">
                    ${opcoes(["Cães", "Gatos"], filtros.categoria, "Cães e gatos")}
                </select>
                <select id="filtro-porte" aria-label="Porte">
                    ${opcoes(["Pequeno", "Médio", "Grande"], filtros.porte, "Todos os portes")}
                </select>
            </div>

            <div class="resultados__resumo">
                <p id="contagem" class="apoio"></p>
                <div class="resultados__ordem" role="group" aria-label="Ordenar">
                    ${Object.entries(criterios).map(([chave, criterio]) =>
                        `<button type="button" class="resultados__ordem-botao" data-ordem="${chave}">${criterio.rotulo}</button>`).join("")}
                </div>
            </div>

            <ul id="lista-animais" class="lista-animais"></ul>
        </section>`

    mostrarLista(filtros)
    adicionarEvento(filtros)
}

function opcoes(valores, selecionado, rotuloTodos) {
    return `<option value="">${rotuloTodos}</option>` +
        valores.map(valor => `<option ${valor === selecionado ? "selected" : ""}>${valor}</option>`).join("")
}

function semAcento(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

function combina(animal, filtros) {
    const local = localDoAnimal(animal)
    const textoDoAnimal = semAcento(`${animal.nome} ${animal.categoria} ${animal.porte} ${local.nome} ${local.cidade}`)
    return textoDoAnimal.includes(semAcento(filtros.busca.trim()))
        && (filtros.categoria === "" || animal.categoria === filtros.categoria)
        && (filtros.porte === "" || animal.porte === filtros.porte)
}

function mostrarLista(filtros) {
    const valor = criterios[filtros.ordem].valor
    const encontrados = listaDeAnimais
        .filter(animal => combina(animal, filtros))
        .sort((a, b) => valor(a) - valor(b))

    const lista = document.getElementById("lista-animais")
    document.getElementById("contagem").textContent =
        `${encontrados.length} ${encontrados.length === 1 ? "animal" : "animais"}`

    if (encontrados.length === 0) {
        lista.innerHTML = `
            <li class="resultados__vazio">
                <i data-lucide="search-x"></i>
                <h2>Nenhum animal encontrado</h2>
                <p class="apoio">Nenhum animal combina com ${descreverFiltros(filtros)}. Tente outro nome ou tire um filtro.</p>
                <a class="botao" href="#resultados">Ver todos os animais</a>
            </li>`
    } else {
        lista.innerHTML = encontrados.map(cartaoAnimal).join("")
        ativarFotos(lista)
    }

    document.querySelectorAll(".resultados__ordem-botao").forEach(botao =>
        botao.classList.toggle("resultados__ordem-botao--ativo", botao.dataset.ordem === filtros.ordem))
    createIcons({ icons })
    guardarNoEndereco(filtros)
}

function descreverFiltros(filtros) {
    const partes = []
    if (filtros.busca.trim()) partes.push(`"${filtros.busca.trim()}"`)
    if (filtros.categoria) partes.push(filtros.categoria.toLowerCase())
    if (filtros.porte) partes.push(`porte ${filtros.porte.toLowerCase()}`)
    return partes.join(", ") || "a busca"
}

// Atualiza o endereço sem disparar hashchange: o F5 volta para a mesma busca.
function guardarNoEndereco(filtros) {
    const parametros = new URLSearchParams()
    Object.entries(filtros).forEach(([chave, valor]) => {
        if (valor.trim() && !(chave === "ordem" && valor === "distancia")) parametros.set(chave, valor.trim())
    })
    const consulta = parametros.toString()
    history.replaceState(null, "", consulta ? `#resultados?${consulta}` : "#resultados")
}

function adicionarEvento(filtros) {
    document.getElementById("filtro-busca").addEventListener("input", evento => {
        filtros.busca = evento.target.value
        mostrarLista(filtros)
    })
    document.getElementById("filtro-categoria").addEventListener("change", evento => {
        filtros.categoria = evento.target.value
        mostrarLista(filtros)
    })
    document.getElementById("filtro-porte").addEventListener("change", evento => {
        filtros.porte = evento.target.value
        mostrarLista(filtros)
    })
    document.querySelectorAll(".resultados__ordem-botao").forEach(botao =>
        botao.addEventListener("click", () => {
            filtros.ordem = botao.dataset.ordem
            mostrarLista(filtros)
        }))
}

export default {
    url: "#resultados",
    label: "",
    icon: "list",
    pagina: resultados
}
