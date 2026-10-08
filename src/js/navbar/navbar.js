import './navbar.css'

function navbar(item_menu) {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
    <ul class="navbar">
        ${
            item_menu.filter(menu => menu.label !== "")
            .map(item => `<li>
                            <a href="${item.url}" class="navbar-item" data-url="${item.url}">
                                <i data-lucide="${item.icon}"></i>
                                ${item.label}
                            </a>
                        </li>`)
            .join('')
        }
    </ul>
    `;
}

function marcarAtivo(url) {
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.classList.toggle('navbar-item--ativo', item.dataset.url === url)
    })
}

export { navbar, marcarAtivo };
