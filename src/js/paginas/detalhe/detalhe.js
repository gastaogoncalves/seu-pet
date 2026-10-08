import './detalhe.css'
import listaDeAnimais from '../../dadosMockados/animais.js'
import listaDeUsuarios from '../../dadosMockados/usuarios.js'
import { fotoAnimal, ativarFotos, localDoAnimal, formatarKm, formatarIdade } from '../cartaoAnimal/cartaoAnimal.js'

function detalhe(app, parametros) {
    const animal = listaDeAnimais.find(animal => animal.id === Number(parametros.get("id")))

    if (!animal) {
        app.innerHTML = `
            <section class="detalhe detalhe--vazio">
                <i data-lucide="paw-print"></i>
                <h1>Animal não encontrado</h1>
                <p class="apoio">Esse anúncio não existe ou já foi adotado.</p>
                <a class="botao botao--principal" href="#resultados">Ver animais para adoção</a>
            </section>`
        return
    }

    const local = localDoAnimal(animal)
    const publicador = listaDeUsuarios.find(usuario => usuario.id === animal.idUsuario)
    const outrosDoPublicador = listaDeAnimais.filter(outro => outro.idUsuario === publicador.id && outro.id !== animal.id)
    const assunto = encodeURIComponent(`Quero adotar o ${animal.nome} (Seu Pet)`)

    app.innerHTML = `
        <article class="detalhe">
            <a href="#resultados" class="voltar"><i data-lucide="chevron-left"></i> Animais para adoção</a>

            ${fotoAnimal(animal, "detalhe__foto")}

            <header class="detalhe__cabecalho">
                <h1>${animal.nome}</h1>
                <p class="apoio">${animal.categoria === "Gatos" ? "Gato" : "Cão"} · ${animal.sexo} · publicado em ${new Date(animal.publicadoEm + "T12:00").toLocaleDateString("pt-BR")}</p>
            </header>

            <section class="detalhe__decisao" aria-label="Resumo para decidir">
                <div class="detalhe__distancia">
                    <span class="detalhe__rotulo">Distância</span>
                    <strong>${formatarKm(local.distanciaKm)}</strong>
                    <span class="apoio">${local.nome}, ${local.cidade}</span>
                </div>
                <dl class="detalhe__dados">
                    <div><dt>Porte</dt><dd>${animal.porte}</dd></div>
                    <div><dt>Idade</dt><dd>${formatarIdade(animal.idade)}</dd></div>
                </dl>
            </section>

            <ul class="detalhe__selos">
                <li class="${animal.vacinado ? "detalhe__selo--sim" : ""}">${animal.vacinado ? "Vacinado" : "Vacinas pendentes"}</li>
                <li class="${animal.castrado ? "detalhe__selo--sim" : ""}">${animal.castrado ? "Castrado" : "Não castrado"}</li>
            </ul>

            <p>${animal.descricao}</p>

            <section class="detalhe__publicador">
                <h2>Quem está doando</h2>
                <div class="detalhe__pessoa">
                    <i data-lucide="${publicador.tipo.includes("independente") ? "user-round" : "house-heart"}"></i>
                    <div>
                        <p class="detalhe__nome">${publicador.nome}</p>
                        <p class="apoio">${publicador.tipo} · ${publicador.cidade} · ${outrosDoPublicador.length + 1} ${outrosDoPublicador.length === 0 ? "animal" : "animais"} no Seu Pet</p>
                    </div>
                </div>
                <p class="apoio">${publicador.telefone} · ${publicador.email}</p>
            </section>

            <a class="botao botao--principal" href="mailto:${publicador.email}?subject=${assunto}">
                <i data-lucide="heart-handshake"></i> Quero adotar ${animal.nome}
            </a>
        </article>`

    ativarFotos(app)
}

export default {
    url: "#detalhe",
    label: "",
    icon: "paw-print",
    pagina: detalhe
}
