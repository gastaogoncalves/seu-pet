import listaDeProdutos from '../dadosMockados/dados.js'
import { entrar, sair, usuarioAtual } from '../sessao/sessao.js'

async function conta(app) {
  const usuario = usuarioAtual()

  if (!usuario) {
    app.innerHTML = `
      <h1>Entrar</h1>
      <form id="form-login">
        <label for="email">E-mail</label>
        <input id="email" type="email" required>
        <label for="senha">Senha</label>
        <input id="senha" type="password" required>
        <p id="erro-login"></p>
        <button type="submit">Entrar</button>
      </form>`

    document.getElementById("form-login").addEventListener("submit", evento => {
      evento.preventDefault()
      const email = document.getElementById("email").value
      const senha = document.getElementById("senha").value
      if (!entrar(email, senha)) {
        document.getElementById("erro-login").textContent = "E-mail ou senha incorretos."
        return
      }
      conta(app)
    })
    return
  }

  const meusAnimais = listaDeProdutos.filter(p => p.idUsuario === usuario.id)

  app.innerHTML = `
    <h1>Minha conta</h1>
    <p>${usuario.nome} · ${usuario.email}</p>
    <h2>Meus animais</h2>
    ${
      meusAnimais.length === 0
        ? "<p>Você ainda não publicou nenhum animal.</p>"
        : `<ul>${meusAnimais.map(p => `<li>${p.nome} · ${p.porte}</li>`).join("")}</ul>`
    }
    <button id="btn-sair">Sair</button>`

  document.getElementById("btn-sair").addEventListener("click", () => {
    sair()
    conta(app)
  })
}
export default { 
  url: '#conta',
   label: 'conta',
   icon: "user-round-arrow-left",
    pagina: conta 
  };
