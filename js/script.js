// Produtos em destaque para a home
const produtosDestaque = [
    { id: 1, nome: "T-shirt Básica", preco: 19.90, categoria: "tshirts", imagem: "images/logo.jpg" },
    { id: 2, nome: "Sandália Praia", preco: 29.90, categoria: "sandalias", imagem: "images/logo.jpg" },
    { id: 3, nome: "Sapatilhas Casuais", preco: 49.90, categoria: "calcados", imagem: "images/logo.jpg" },
    { id: 4, nome: "Chapéu Estilo", preco: 24.90, categoria: "chapeus", imagem: "images/logo.jpg" },
    { id: 5, nome: "Saltos Elegantes", preco: 39.90, categoria: "saltos", imagem: "images/logo.jpg" },
    { id: 6, nome: "Camisa Social", preco: 34.90, categoria: "tshirts", imagem: "images/logo.jpg" },
    { id: 7, nome: "Sandália Festa", preco: 32.90, categoria: "sandalias", imagem: "images/logo.jpg" },
    { id: 8, nome: "Botas Urbanas", preco: 59.90, categoria: "calcados", imagem: "images/logo.jpg" },
    { id: 9, nome: "T-shirt Premium", preco: 24.90, categoria: "tshirts", imagem: "images/logo.jpg" }
];

function formatPrice(value) {
    return value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

function openWhatsApp(productName) {
    const phone = '5511999999999';
    const text = encodeURIComponent('Tenho interesse no produto ' + productName);
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank');
}

function escapeHtmlJs(s) {
    return s.replace(/'/g, "\\'").replace(/\"/g, '\\"');
}

// Renderizar grid de destaque
function renderDestaque() {
    const grid = document.getElementById('destaqueGrid');
    if (!grid) return;
    grid.innerHTML = '';
    produtosDestaque.slice(0, 9).forEach(p => {
        const card = document.createElement('article');
        card.className = 'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group';
        card.innerHTML = `
            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                <img src="${p.imagem}" alt="${p.nome}" class="w-full h-full img-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-4">
                <h4 class="font-medium text-slate-800">${p.nome}</h4>
                <div class="mt-2 flex items-center justify-between">
                    <div class="text-primary font-semibold">${formatPrice(p.preco)}</div>
                    <div class="text-sm text-slate-500 capitalize">${p.categoria}</div>
                </div>
                <div class="mt-4">
                    <button class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-blue-500 text-white text-sm hover:opacity-95 transition" onclick="openWhatsApp('${escapeHtmlJs(p.nome)}')">WhatsApp</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Small helper
const $ = sel => document.querySelector(sel);

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const m = document.getElementById('mobileMenu');
        if (m) m.classList.toggle('hidden');
    });
}

// Year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Sample product data (array)
const products = [
    { id: 1, nome: "T-shirt Básica", preco: 19.90, categoria: "tshirts", imagem: "images/logo.jpg" },
    { id: 2, nome: "Sandália Praia", preco: 29.90, categoria: "sandalias", imagem: "images/logo.jpg" },
    { id: 3, nome: "Sapatilhas Casuais", preco: 49.90, categoria: "calcados", imagem: "images/logo.jpg" },
    { id: 4, nome: "Chapéu Estilo", preco: 24.90, categoria: "chapeus", imagem: "images/logo.jpg" },
    { id: 5, nome: "Saltos Elegantes", preco: 39.90, categoria: "saltos", imagem: "images/logo.jpg" },
    { id: 6, nome: "Camisa Social", preco: 34.90, categoria: "tshirts", imagem: "images/logo.jpg" },
    { id: 7, nome: "Sandália Festa", preco: 32.90, categoria: "sandalias", imagem: "images/logo.jpg" },
    { id: 8, nome: "Botas Urbanas", preco: 59.90, categoria: "calcados", imagem: "images/logo.jpg" }
];

// Derive categories from products
const categories = Array.from(new Set(products.map(p => p.categoria)));

const filtersContainer = document.getElementById('filters');

// Render filter buttons
function renderFilters() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'px-3 py-1 rounded-full text-sm bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition';
    allBtn.textContent = 'Todos';
    allBtn.dataset.cat = 'all';
    allBtn.addEventListener('click', () => applyFilter('all'));
    filtersContainer.appendChild(allBtn);

    categories.forEach(cat => {
        const b = document.createElement('button');
        b.className = 'px-3 py-1 rounded-full text-sm bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition capitalize';
        b.textContent = cat;
        b.dataset.cat = cat;
        b.addEventListener('click', () => applyFilter(cat));
        filtersContainer.appendChild(b);
    });
}

// Render products grid
const productsGrid = document.getElementById('productsGrid');

function renderProducts(list) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    if (list.length === 0) {
        productsGrid.innerHTML = '<div class="col-span-full text-center text-slate-500">Nenhum produto encontrado.</div>';
        return;
    }

    list.forEach(p => {
        const card = document.createElement('article');
        card.className = 'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group';

        card.innerHTML = `
            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                <img src="${p.imagem}" alt="${p.nome}" class="w-full h-full img-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-4">
                <h4 class="font-medium text-slate-800">${p.nome}</h4>
                <div class="mt-2 flex items-center justify-between">
                    <div class="text-primary font-semibold">${formatPrice(p.preco)}</div>
                    <div class="text-sm text-slate-500 capitalize">${p.categoria}</div>
                </div>

                <div class="mt-4 flex gap-2">
                    <button class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-blue-500 text-white text-sm hover:opacity-95 transition" onclick="openWhatsApp('${escapeHtmlJs(p.nome)}')">
                        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 15a2 2 0 0 1-2 2h-3l-3 3v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/></svg>
                        WhatsApp
                    </button>
                    <a class="px-3 py-2 rounded-md border border-gray-200 text-sm hover:bg-gray-100 transition" href="#">Detalhes</a>
                </div>
            </div>
        `;

        productsGrid.appendChild(card);
    });
}

// Basic escaping for JS string injection inside onclick
function escapeHtmlJs(s) {
    return s.replace(/'/g, "\\'").replace(/\"/g, '\\"');
}

// Apply filter with active state toggling
function applyFilter(cat) {
    if (!filtersContainer) return;
    const btns = filtersContainer.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('ring-2','ring-primary'));
    const active = Array.from(btns).find(b => b.dataset.cat === cat);
    if (active) active.classList.add('ring-2','ring-primary');

    if (cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.categoria === cat));
}

// On load
renderDestaque();
if (filtersContainer) {
    renderFilters();
    renderProducts(products.slice(0, 8)); // destaque inicial
    applyFilter('all');
}
window.openWhatsApp = openWhatsApp;
