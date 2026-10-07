import listaDeProdutos from '../dadosMockados/dados.js'
import { usuarioAtual } from '../sessao/sessao.js'

async function enviar(app) {
  const usuario = usuarioAtual()
  if (!usuario) {
    app.innerHTML = `<p>Entre na sua conta para anunciar um animal.</p>
      <a href="#conta">Entrar</a>`
    return
  }

  app.innerHTML = `
    <header><h1>Anunciar animal</h1></header>
 
    <form class="form-oferta">
      <label for="foto">Link da foto</label>
      <input id="foto" name="foto" type="url" required>
      <label for="nome">Nome do animal</label>
      <input id="nome" name="nome" type="text"
             minlength="2" required>
      <label for="idade">Idade (anos)</label>
      <input id="idade" name="idade" type="number"
             min="0" required>
      <label for="categoria">Categoria</label>
      <select id="categoria" name="categoria" required>
        <option value="">Escolha</option>
        <option>Cães</option>
        <option>Gatos</option>
      </select>
      <label for="porte">Porte</label>
      <select id="porte" name="porte" required>
        <option value="">Escolha</option>
        <option>Pequeno</option>
        <option>Médio</option>
        <option>Grande</option>
      </select>
      <p id="aviso"></p>
      <button type="submit">Anunciar animal</button>
    </form>`;

  document.querySelector(".form-oferta").addEventListener("submit", evento => {
    evento.preventDefault()
    const form = evento.target
    const nome = form.nome.value.trim()

    const repetido = listaDeProdutos.find(p =>
      p.idUsuario === usuario.id &&
      p.categoria === form.categoria.value &&
      p.nome.toLowerCase() === nome.toLowerCase()
    )
    if (repetido) {
      document.getElementById("aviso").textContent = "Você já anunciou esse animal."
      return
    }

    const novo = {
      id: Math.max(...listaDeProdutos.map(p => p.id)) + 1,
      img: form.foto.value,
      nome: nome,
      porte: form.porte.value,
      idade: Number(form.idade.value),
      distancia: 0,
      categoria: form.categoria.value,
      idUsuario: usuario.id
    }
    listaDeProdutos.push(novo)
    location.hash = `#mapa?${novo.id}`
  })
}
export default { 
  url: '#enviar',
   label: 'Enviar',
   icon: "arrow-up-from-line",
    pagina: enviar
   };
