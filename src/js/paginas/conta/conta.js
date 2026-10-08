import './conta.css'
import listaDeAnimais from '../../dadosMockados/animais.js'
import { entrar, sair, usuarioAtual } from '../../sessao/sessao.js'
import { cartaoAnimal, ativarFotos } from '../cartaoAnimal/cartaoAnimal.js'
import { createIcons, icons } from 'lucide'

function conta(app) {
    const usuario = usuarioAtual()
    if (!usuario) {
        mostrarLogin(app)
    } else {
        mostrarConta(app, usuario)
    }
    createIcons({ icons })
}

function mostrarLogin(app) {
    app.innerHTML = `
        <section class="conta">
            <header>
                <h1>Entrar</h1>
                <p class="apoio">Para protetores e ONGs que anunciam animais. Quem só quer adotar não precisa de conta.</p>
            </header>
            <form id="form-login" class="conta__form">
                <label for="email">E-mail</label>
                <input id="email" type="email" autocomplete="username" required>
                <label for="senha">Senha</label>
                <input id="senha" type="password" autocomplete="current-password" minlength="4" required>
                <p id="erro-login" class="conta__erro" role="alert"></p>
                <button type="submit" class="botao botao--principal">Entrar</button>
            </form>
            <p class="conta__dica apoio">Conta de teste: <strong>ana@seupet.com</strong> · senha <strong>1234</strong></p>
            <a href="#inicio" class="conta__sem-cadastro">Continuar sem conta</a>
        </section>`

    document.getElementById("form-login").addEventListener("submit", evento => {
        evento.preventDefault()
        const email = document.getElementById("email").value.trim().toLowerCase()
        const senha = document.getElementById("senha").value
        if (!entrar(email, senha)) {
            document.getElementById("erro-login").textContent = "E-mail ou senha incorretos. Confira e tente de novo."
            document.getElementById("senha").value = ""
            return
        }
        conta(app)
    })
}

function mostrarConta(app, usuario) {
    const meusAnimais = listaDeAnimais.filter(animal => animal.idUsuario === usuario.id)

    app.innerHTML = `
        <section class="conta">
            <header class="conta__perfil">
                <div class="conta__identidade">
                    <h1>${usuario.nome}</h1>
                    <p class="apoio">${usuario.tipo} · ${usuario.cidade}</p>
                    <p class="apoio">${usuario.email} · ${usuario.telefone}</p>
                </div>
                <div class="conta__total">
                    <strong>${meusAnimais.length}</strong>
                    <span>${meusAnimais.length === 1 ? "anúncio" : "anúncios"}</span>
                </div>
            </header>

            <div class="conta__titulo">
                <h2>Meus animais para adoção</h2>
                <a href="#publicar">+ Anunciar</a>
            </div>
            ${meusAnimais.length === 0
                ? `<p class="apoio conta__vazio">Você ainda não anunciou nenhum animal. <a href="#publicar">Anunciar o primeiro</a></p>`
                : `<ul class="lista-animais">${meusAnimais.map(cartaoAnimal).join("")}</ul>`}

            <button id="btn-sair" class="botao"><i data-lucide="log-out"></i> Sair</button>
        </section>`

    ativarFotos(app)
    document.getElementById("btn-sair").addEventListener("click", () => {
        sair()
        conta(app)
    })
}

export default {
    url: "#conta",
    label: "Conta",
    icon: "circle-user-round",
    pagina: conta
}
