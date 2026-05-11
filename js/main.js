/* =========================================
   PERROTTA FRAGRANCES — Shared Main JS
   ========================================= */

/* --- Header scroll effect --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* --- Mobile nav --- */
function initMobileNav() {
  const toggle  = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Active nav link --- */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Cart badge --- */
function updateCartBadge() {
  const cart  = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  });
}

/* --- Scroll animations (IntersectionObserver) --- */
function initAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* --- Toast notifications --- */
let toastContainer;
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message, icon = '✦') {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* --- SVG Logo mark (PF monogram) --- */
function renderLogoMark(size = 40) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <text x="22" y="62" font-family="'Cormorant Garamond', serif" font-size="52" font-weight="400" fill="url(#goldGrad)" letter-spacing="-4">PF</text>
    <text x="76" y="32" font-size="10" fill="url(#goldGrad)">✦</text>
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#C9A96E"/>
        <stop offset="100%" stop-color="#A67B5B"/>
      </linearGradient>
    </defs>
  </svg>`;
}

/* --- Cart helpers (must be accessible globally) --- */
function getCart() {
  try { return JSON.parse(localStorage.getItem('pf_cart') || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('pf_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, volume, qty = 1) {
  const cart = getCart();
  const key  = `${productId}::${volume}`;
  const idx  = cart.findIndex(i => i.key === key);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    const product = getProductById(productId);
    if (!product) return;
    cart.push({ key, productId, volume, qty, price: product.price, name: product.name, brand: product.brand });
  }
  saveCart(cart);
  showToast(`${getProductById(productId)?.name} adicionado ao carrinho`);
}

function removeFromCart(key) {
  const cart = getCart().filter(i => i.key !== key);
  saveCart(cart);
}

function updateQty(key, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.key === key);
  if (idx > -1) {
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* --- Wishlist --- */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('pf_wishlist') || '[]'); }
  catch { return []; }
}
function saveWishlist(list) { localStorage.setItem('pf_wishlist', JSON.stringify(list)); }
function isWishlisted(id) { return getWishlist().includes(id); }
function toggleWishlist(id) {
  const list = getWishlist();
  const idx  = list.indexOf(id);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast('Removido dos favoritos', '♡');
  } else {
    list.push(id);
    showToast('Adicionado aos favoritos', '♥');
  }
  saveWishlist(list);
  const wishlisted = list.includes(id);
  document.querySelectorAll(`.product-wishlist[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('wishlisted', wishlisted);
    btn.querySelector('svg').setAttribute('fill', wishlisted ? 'var(--rose)' : 'none');
  });
}

/* --- Quick View --- */
let _qvOverlay = null;

function _getQvOverlay() {
  if (!_qvOverlay) {
    _qvOverlay = document.createElement('div');
    _qvOverlay.className = 'qv-overlay';
    _qvOverlay.innerHTML = `
      <div class="qv-panel">
        <button class="qv-close" id="qv-close">✕</button>
        <div class="qv-body" id="qv-body"></div>
      </div>`;
    document.body.appendChild(_qvOverlay);
    _qvOverlay.addEventListener('click', e => { if (e.target === _qvOverlay) closeQuickView(); });
    document.getElementById('qv-close').addEventListener('click', closeQuickView);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuickView(); });
  }
  return _qvOverlay;
}

function openQuickView(productId) {
  const p = getProductById(productId);
  if (!p) return;
  const overlay = _getQvOverlay();
  const body    = document.getElementById('qv-body');

  const wasHtml  = p.wasPrice ? `<span class="price-was" style="font-size:1rem">${formatPrice(p.wasPrice)}</span>` : '';
  const volBtns  = p.volumes.map((v, i) => `<button class="volume-btn${i === 0 ? ' active' : ''}" data-vol="${v}">${v}</button>`).join('');
  const notesHtml = ['top','heart','base'].map(k => {
    const label = k === 'top' ? 'Topo' : k === 'heart' ? 'Coração' : 'Base';
    return `<div class="pyramid-level">
      <span class="pyramid-level-name">${label}</span>
      <div class="pyramid-notes">${p.notes[k].map(n => `<span class="note-tag">${n}</span>`).join('')}</div>
    </div>`;
  }).join('');

  body.innerHTML = `
    <div class="qv-img"><span class="qv-img-icon">✦</span></div>
    <div class="qv-info">
      <p class="product-brand" style="margin-bottom:8px">${p.brand}</p>
      <h2 style="font-family:var(--font-serif);font-size:1.9rem;font-weight:300;color:var(--darker);line-height:1.15;margin-bottom:6px">${p.name}</h2>
      <p class="product-type" style="margin-bottom:16px">${p.type} · ${p.gender} · ${p.family}</p>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
        <span class="stars">${'★'.repeat(Math.floor(p.rating))}</span>
        <span style="font-size:.78rem;color:var(--caramel)">${p.rating} (${p.reviews} avaliações)</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--nude)">
        ${wasHtml}
        <span class="price-current">${formatPrice(p.price)}</span>
      </div>
      <p class="selector-label">Volume</p>
      <div class="volume-options" id="qv-vols" style="margin-bottom:20px">${volBtns}</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn btn-primary btn-full" id="qv-add">Adicionar ao Carrinho</button>
        <a href="product.html?id=${p.id}" class="btn btn-outline btn-full" style="text-align:center">Ver produto completo →</a>
      </div>
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid var(--nude)">
        <p style="font-family:var(--font-serif);font-size:1rem;color:var(--darker);margin-bottom:14px">Pirâmide Olfativa</p>
        <div class="pyramid-levels">${notesHtml}</div>
      </div>
    </div>`;

  body.querySelectorAll('.volume-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      body.querySelectorAll('.volume-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('qv-add').addEventListener('click', () => {
    const vol = body.querySelector('.volume-btn.active')?.dataset.vol || p.volumes[0];
    addToCart(p.id, vol);
    closeQuickView();
  });

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeQuickView() {
  if (!_qvOverlay) return;
  _qvOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- Product card HTML factory --- */
function buildProductCard(product) {
  const badge = product.bestseller
    ? `<span class="product-badge badge-bestseller">Mais Vendido</span>`
    : product.isNew
    ? `<span class="product-badge badge-new">Novidade</span>`
    : '';

  const wasHtml = product.wasPrice
    ? `<span class="was">${formatPrice(product.wasPrice)}</span>`
    : '';

  const wishlisted = isWishlisted(product.id);

  return `
  <div class="product-card" data-id="${product.id}">
    <div class="product-img">
      ${badge}
      <div class="product-img-inner">
        <span class="product-img-icon">✦</span>
        <span class="product-img-brand">${product.brand}</span>
      </div>
      <button class="product-qv-btn" data-qv="${product.id}" aria-label="Ver rápido">Ver Rápido</button>
      <button class="product-wishlist${wishlisted ? ' wishlisted' : ''}" data-id="${product.id}" aria-label="Favoritar">
        <svg viewBox="0 0 24 24" fill="${wishlisted ? 'var(--rose)' : 'none'}" stroke="${wishlisted ? 'var(--rose)' : 'currentColor'}" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="product-info">
      <p class="product-brand">${product.brand}</p>
      <a href="product.html?id=${product.id}">
        <h3 class="product-name">${product.name}</h3>
      </a>
      <p class="product-type">${product.type} · ${product.gender}</p>
      <div class="product-footer">
        <div>
          <p class="product-price">${wasHtml}${formatPrice(product.price)}</p>
          <div class="product-rating">
            <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
            <span>${product.rating} (${product.reviews})</span>
          </div>
        </div>
        <button class="product-add-btn" onclick="addToCart('${product.id}', '${product.volumes[0]}')" aria-label="Adicionar ao carrinho">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

/* --- Scroll to top --- */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --- Page transition + delegated events --- */
function initInteractions() {
  document.addEventListener('click', e => {
    // Wishlist
    const wishlistBtn = e.target.closest('.product-wishlist');
    if (wishlistBtn) { e.preventDefault(); toggleWishlist(wishlistBtn.dataset.id); return; }

    // Quick view
    const qvBtn = e.target.closest('[data-qv]');
    if (qvBtn) { e.preventDefault(); openQuickView(qvBtn.dataset.qv); return; }

    // Page transition
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = href; }, 230);
  });
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  setActiveNav();
  updateCartBadge();
  initAnimations();
  initScrollToTop();
  initInteractions();

  /* Inject logo marks */
  document.querySelectorAll('.logo-mark').forEach(el => {
    el.innerHTML = renderLogoMark(40);
  });
  document.querySelectorAll('.hero-logo').forEach(el => {
    el.innerHTML = renderLogoMark(100);
  });
});
