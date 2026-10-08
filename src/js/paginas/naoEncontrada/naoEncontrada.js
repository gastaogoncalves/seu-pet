import './naoEncontrada.css'

function naoEncontrada(app) {
    app.innerHTML = `
        <section class="nao-encontrada">
            <i data-lucide="map-pin-off"></i>
            <p class="nao-encontrada__codigo">404</p>
            <h1>Página não encontrada</h1>
            <p class="apoio">O endereço <strong>${location.hash.replace(/[<>&"]/g, "")}</strong> não existe no Seu Pet.</p>
            <a class="botao botao--principal" href="#inicio">Voltar para o início</a>
        </section>`
}

export default {
    url: '#nao-encontrada',
    label: '',
    icon: "circle-help",
    pagina: naoEncontrada
};
