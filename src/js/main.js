import { createIcons, icons } from 'lucide';
import { mapaderotas } from './rotas/rotas.js'
import { navbar, marcarAtivo } from './navbar/navbar.js'

const app = document.getElementById("app")
navbar(mapaderotas)

function renderizarPagina() {
    const hash = window.location.hash || '#inicio'
    const [url, consulta] = hash.split('?')
    const rota = mapaderotas.find(tela => tela.url === url)
        || mapaderotas.find(tela => tela.url === '#nao-encontrada')
    rota.pagina(app, new URLSearchParams(consulta))
    marcarAtivo(rota.url)
    createIcons({ icons })
    window.scrollTo(0, 0)
}

window.addEventListener("hashchange", renderizarPagina)
renderizarPagina()

