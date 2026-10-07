async function enviar(app) {
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
      <button type="submit">Anunciar animal</button>
    </form>`;
}
export default { 
  url: '#enviar',
   label: 'Enviar',
   icon: "arrow-up-from-line",
    pagina: enviar
   };
