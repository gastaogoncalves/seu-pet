import './cartaoAnimal.css'
import listaDeLocais from '../../dadosMockados/locais.js'

// O local do animal decide a distância, que é o número que decide a escolha.
function localDoAnimal(animal) {
    return listaDeLocais.find(local => local.id === animal.idLocal)
}

function distanciaDoAnimal(animal) {
    return localDoAnimal(animal).distanciaKm
}

function formatarKm(km) {
    return `${km.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`
}

function formatarIdade(idade) {
    if (idade === 0) return "Filhote"
    return idade === 1 ? "1 ano" : `${idade} anos`
}

// Sem foto (ou sem internet), o ícone da espécie aparece no lugar.
function fotoAnimal(animal, classe) {
    const icone = animal.categoria === "Gatos" ? "cat" : "dog"
    return `<div class="foto-animal ${classe}">
                <i data-lucide="${icone}"></i>
                ${animal.img ? `<img src="${animal.img}" alt="Foto de ${animal.nome}" loading="lazy">` : ""}
            </div>`
}

function ativarFotos(container) {
    container.querySelectorAll('.foto-animal img').forEach(img =>
        img.addEventListener('error', () => img.remove()))
}

function cartaoAnimal(animal) {
    const local = localDoAnimal(animal)
    return `<li>
        <a class="cartao-animal" href="#detalhe?id=${animal.id}">
            ${fotoAnimal(animal, "foto-animal--mini")}
            <div class="cartao-animal__texto">
                <h3 class="cartao-animal__nome">${animal.nome}</h3>
                <p class="cartao-animal__info">${animal.porte} · ${formatarIdade(animal.idade)} · ${animal.sexo}</p>
                <p class="cartao-animal__info">${local.nome}, ${local.cidade}</p>
            </div>
            <div class="cartao-animal__distancia">
                <strong>${formatarKm(local.distanciaKm)}</strong>
                <span>de você</span>
            </div>
        </a>
    </li>`
}

export { cartaoAnimal, fotoAnimal, ativarFotos, localDoAnimal, distanciaDoAnimal, formatarKm, formatarIdade }
