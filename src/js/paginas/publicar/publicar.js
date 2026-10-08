import './publicar.css'
import listaDeAnimais from '../../dadosMockados/animais.js'
import listaDeLocais from '../../dadosMockados/locais.js'
import { usuarioAtual } from '../../sessao/sessao.js'

function publicar(app) {
    const usuario = usuarioAtual()
    if (!usuario) {
        app.innerHTML = `
            <section class="publicar publicar--bloqueado">
                <i data-lucide="lock-keyhole"></i>
                <h1>Entre para anunciar</h1>
                <p class="apoio">Só protetores e ONGs com conta publicam animais. Procurar e ver os animais não exige conta.</p>
                <a class="botao botao--principal" href="#conta">Entrar na minha conta</a>
                <a href="#inicio">Continuar procurando</a>
            </section>`
        return
    }

    app.innerHTML = `
        <section class="publicar">
            <header>
                <h1>Anunciar animal</h1>
                <p class="apoio">Publicando como ${usuario.nome}.</p>
            </header>

            <form class="publicar__form" id="form-publicar">
                <label for="nome">Nome do animal</label>
                <input id="nome" name="nome" type="text" minlength="2" maxlength="30" required
                       pattern=".*[A-Za-zÀ-ÿ].*" title="Use pelo menos uma letra">

                <fieldset class="publicar__linha">
                    <legend>Espécie</legend>
                    <label class="publicar__opcao"><input type="radio" name="categoria" value="Cães" required> Cão</label>
                    <label class="publicar__opcao"><input type="radio" name="categoria" value="Gatos"> Gato</label>
                </fieldset>

                <fieldset class="publicar__linha">
                    <legend>Sexo</legend>
                    <label class="publicar__opcao"><input type="radio" name="sexo" value="Macho" required> Macho</label>
                    <label class="publicar__opcao"><input type="radio" name="sexo" value="Fêmea"> Fêmea</label>
                </fieldset>

                <div class="publicar__linha">
                    <div class="publicar__campo">
                        <label for="porte">Porte</label>
                        <select id="porte" name="porte" required>
                            <option value="">Escolha</option>
                            <option>Pequeno</option>
                            <option>Médio</option>
                            <option>Grande</option>
                        </select>
                    </div>
                    <div class="publicar__campo">
                        <label for="idade">Idade (anos)</label>
                        <input id="idade" name="idade" type="number" min="0" max="25" required
                               title="Use 0 para filhotes com menos de um ano">
                    </div>
                </div>

                <label for="local">Onde o animal está</label>
                <select id="local" name="local" required>
                    <option value="">Escolha o bairro</option>
                    ${listaDeLocais.map(local => `<option value="${local.id}">${local.nome}, ${local.cidade}</option>`).join("")}
                </select>

                <label for="descricao">Como ele é</label>
                <input id="descricao" name="descricao" type="text" minlength="10" maxlength="120" required
                       placeholder="Temperamento, cuidados, com quem se dá bem">

                <label for="foto">Link da foto <span class="apoio">(opcional)</span></label>
                <input id="foto" name="foto" type="url" placeholder="https://">

                <fieldset class="publicar__linha">
                    <legend>Saúde</legend>
                    <label class="publicar__opcao"><input type="checkbox" name="vacinado"> Vacinado</label>
                    <label class="publicar__opcao"><input type="checkbox" name="castrado"> Castrado</label>
                </fieldset>

                <p id="aviso" class="publicar__aviso" role="alert"></p>
                <button type="submit" class="botao botao--destaque">Publicar anúncio</button>
            </form>
        </section>`

    document.getElementById("form-publicar").addEventListener("submit", evento => {
        evento.preventDefault()
        const form = evento.target
        const nome = form.nome.value.trim()

        // O mesmo protetor não anuncia duas vezes o mesmo animal.
        const repetido = listaDeAnimais.find(animal =>
            animal.idUsuario === usuario.id &&
            animal.categoria === form.categoria.value &&
            animal.nome.toLowerCase() === nome.toLowerCase()
        )
        if (repetido) {
            document.getElementById("aviso").innerHTML =
                `Você já anunciou ${repetido.nome}. <a href="#detalhe?id=${repetido.id}">Ver o anúncio</a>`
            return
        }

        const novo = {
            id: Math.max(...listaDeAnimais.map(animal => animal.id)) + 1,
            nome: nome,
            categoria: form.categoria.value,
            porte: form.porte.value,
            sexo: form.sexo.value,
            idade: Number(form.idade.value),
            idLocal: Number(form.local.value),
            idUsuario: usuario.id,
            publicadoEm: new Date().toISOString().slice(0, 10),
            vacinado: form.vacinado.checked,
            castrado: form.castrado.checked,
            descricao: form.descricao.value.trim(),
            img: form.foto.value.trim()
        }
        listaDeAnimais.push(novo)
        location.hash = `#detalhe?id=${novo.id}`
    })
}

export default {
    url: "#publicar",
    label: "Anunciar",
    icon: "circle-plus",
    pagina: publicar
}
