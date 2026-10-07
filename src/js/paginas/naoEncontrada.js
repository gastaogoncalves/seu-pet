function naoEncontrada(app) {
  app.innerHTML = `
    <h1>Página não encontrada</h1>
    <p>O endereço que você abriu não existe.</p>
    <a href="#buscar">Voltar para o início</a>`
}
export default {
  url: '#nao-encontrada',
  label: '',
  icon: "circle-help",
  pagina: naoEncontrada
};
