import listaDeUsuarios from '../dadosMockados/usuarios.js'

let usuarioLogado = null

function entrar(email, senha) {
    usuarioLogado = listaDeUsuarios.find(u => u.email === email && u.senha === senha) || null
    return usuarioLogado
}

function sair() {
    usuarioLogado = null
}

function usuarioAtual() {
    return usuarioLogado
}

export { entrar, sair, usuarioAtual }
