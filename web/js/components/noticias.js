// web/js/components/noticias.js - Noticias y Novedades COLUA R.L.

// Iconos Minimalistas SVG Vectoriales
const NEWS_ICONS = {
    search: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    heartOutline: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    heartFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#e42a67" stroke="#e42a67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    share: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
    clock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    verified: `<svg width="14" height="14" viewBox="0 0 24 24" fill="#173789"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.5l-4.2-4.2 1.4-1.4 2.8 2.8 6.4-6.4 1.4 1.4-7.8 7.8z" fill="#173789"/><path d="M10.2 13.7l-2.8-2.8-1.4 1.4 4.2 4.2 7.8-7.8-1.4-1.4-6.4 6.4z" fill="#ffffff"/></svg>`,
    expand: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
    arrowRight: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
    photosCount: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    emptyNews: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>`
};

class NoticiasComponent {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.activeFilter = 'all'; // 'all', 'week', 'month'
        this.searchQuery = '';
        this.likedArticles = new Set(JSON.parse(localStorage.getItem('colua_liked_news') || '[]'));
        this.heroSlideIndex = 0;
        this.cardSlideIndices = {};
    }

    async render(container) {
        container.innerHTML = `
            <div class="clean-subpage-container">
                <header class="clean-subpage-header">
                    <h1 class="clean-subpage-title">Noticias & Comunidad</h1>
                    <p class="clean-subpage-desc">Mantente al día con las últimas actividades, programas comunitarios y comunicados oficiales de COLUA R.L.</p>
                </header>

                <!-- Tarjeta Destacada Superior (Hero Card) -->
                <div id="news-featured-container" style="margin-bottom: 20px;"></div>

                <div>
                    <!-- Barra de Búsqueda y Filtros con Iconos Minimalistas -->
                    <div style="background: white; padding: 14px 18px; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 22px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                        <div style="position: relative; flex: 1; min-width: 250px; display: flex; align-items: center;">
                            <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; pointer-events: none;">
                                ${NEWS_ICONS.search}
                            </span>
                            <input type="text" id="news-search-input" placeholder="Buscar noticias, eventos o comunicados..." 
                                style="width: 100%; padding: 10px 14px 10px 42px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.9rem; outline: none; transition: border-color 0.2s;" />
                        </div>
                        
                        <div class="news-filter-chips" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px;">
                            <button class="filter-chip active" data-filter="all">Todas</button>
                            <button class="filter-chip" data-filter="week">Última semana</button>
                            <button class="filter-chip" data-filter="month">Este mes</button>
                        </div>
                    </div>

                    <!-- Contenedor de Artículos -->
                    <div id="news-grid-container" style="min-height: 250px;">
                        <div style="display: flex; justify-content: center; align-items: center; padding: 40px;">
                            <div class="spinner"></div>
                        </div>
                    </div>

                    <!-- Paginación -->
                    <div id="news-pagination" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 30px; margin-bottom: 20px;"></div>
                </div>
            </div>
        `;

        this.bindEvents(container);
        await this.loadArticles();
    }

    bindEvents(container) {
        const searchInput = container.querySelector('#news-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.currentPage = 1;
                this.applyFilters();
            });
        }

        const filterChips = container.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.activeFilter = chip.dataset.filter;
                this.currentPage = 1;
                this.applyFilters();
            });
        });
    }

    getArticleTimestamp(item) {
        if (!item) return 0;
        if (window.coluaRepository && typeof window.coluaRepository._extractItemDate === 'function') {
            return window.coluaRepository._extractItemDate(item);
        }
        const val = item.publicationDate ?? item.publishedAt ?? item.date ?? item.fecha ?? item.createdAt ?? item.lastModified ?? item.updatedAt;
        if (!val) return 0;
        if (typeof val === 'number') return val < 1e11 ? val * 1000 : val;
        if (typeof val === 'object') {
            if (typeof val.toMillis === 'function') return val.toMillis();
            if (typeof val.seconds === 'number') return val.seconds * 1000 + Math.floor((val.nanoseconds || 0) / 1e6);
            if (typeof val._seconds === 'number') return val._seconds * 1000;
            if (val instanceof Date) return val.getTime();
        }
        if (typeof val === 'string') {
            const trimmed = val.trim();
            if (/^\d+$/.test(trimmed)) {
                const n = parseInt(trimmed, 10);
                return n < 1e11 ? n * 1000 : n;
            }
            const p = Date.parse(trimmed);
            if (!isNaN(p)) return p;
        }
        return 0;
    }

    sortArticlesDesc(list) {
        if (!Array.isArray(list)) return [];
        return list.sort((a, b) => {
            const timeA = this.getArticleTimestamp(a);
            const timeB = this.getArticleTimestamp(b);
            if (timeB !== timeA) return timeB - timeA;
            const crA = a.createdAt || a.lastModified || a.updatedAt || 0;
            const crB = b.createdAt || b.lastModified || b.updatedAt || 0;
            if (crB !== crA) return crB - crA;
            return (b.id || '').localeCompare(a.id || '');
        });
    }

    async loadArticles() {
        try {
            const raw = await window.coluaRepository.getNewsArticles();
            this.articles = this.sortArticlesDesc(raw || []);
            this.applyFilters();
        } catch (error) {
            console.error('Error al cargar noticias:', error);
            const grid = document.getElementById('news-grid-container');
            if (grid) {
                grid.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <p style="color: var(--colua-gray-500); font-size: 1rem;">No se pudieron cargar las noticias en este momento.</p>
                        <button class="btn btn-primary" onclick="window.location.reload()" style="margin-top: 12px;">Reintentar</button>
                    </div>
                `;
            }
        }
    }

    applyFilters() {
        let result = [...this.articles];

        // Filtro por texto
        if (this.searchQuery) {
            result = result.filter(item => {
                const title = (item.title || '').toLowerCase();
                const summary = (item.shortDescription || item.summary || '').toLowerCase();
                const content = (item.description || item.content || '').toLowerCase();
                const tags = (item.tags || '').toLowerCase();
                return title.includes(this.searchQuery) || summary.includes(this.searchQuery) || content.includes(this.searchQuery) || tags.includes(this.searchQuery);
            });
        }

        // Filtro temporal
        if (this.activeFilter !== 'all') {
            const now = Date.now();
            result = result.filter(item => {
                const itemTime = this.getArticleTimestamp(item);
                if (!itemTime) return true;
                const itemDate = new Date(itemTime);
                const nowDate = new Date(now);

                if (this.activeFilter === 'week') {
                    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
                    return itemTime >= sevenDaysAgo;
                } else if (this.activeFilter === 'month') {
                    return itemDate.getMonth() === nowDate.getMonth() && itemDate.getFullYear() === nowDate.getFullYear();
                }
                return true;
            });
        }

        // Orden estricto: la publicación con fecha más reciente encabeza como novedad
        this.filteredArticles = this.sortArticlesDesc(result);
        this.heroSlideIndex = 0;
        this.renderFeaturedAndGrid();
        this.renderPagination();
    }

    // Extrae y normaliza todas las imágenes disponibles de un artículo
    getArticleImages(item) {
        if (!item) return ['assets/noticia_reforestacion.jpg'];
        const images = [];

        // 1. Array de fotos directo
        if (Array.isArray(item.photos)) images.push(...item.photos);
        if (Array.isArray(item.images)) images.push(...item.images);

        // 2. Campo photosJson
        if (item.photosJson && typeof item.photosJson === 'string') {
            const raw = item.photosJson.trim();
            if (raw.startsWith('[') && raw.endsWith(']')) {
                try {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) {
                        parsed.forEach(p => { if (p && typeof p === 'string') images.push(p); });
                    }
                } catch (e) {
                    const matches = raw.match(/(data:image\/[a-zA-Z0-9+]+;base64,[^\s,\]]+|https?:\/\/[^\s,\]]+|[a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|webp))/g);
                    if (matches) matches.forEach(m => images.push(m));
                }
            } else if (raw.includes(',')) {
                raw.split(',').forEach(part => {
                    const p = part.trim();
                    if (p) images.push(p);
                });
            } else if (raw) {
                images.push(raw);
            }
        }

        // 3. imageUrl e imagePath
        if (item.imageUrl) images.push(item.imageUrl);
        if (item.imagePath) images.push(item.imagePath);

        // 4. Resolver y desduplicar
        const resolvedList = [];
        const seen = new Set();

        images.forEach(rawImg => {
            if (!rawImg || typeof rawImg !== 'string') return;
            const trimmed = rawImg.trim();
            if (!trimmed) return;
            const resolved = window.supabaseStorageManager && window.supabaseStorageManager.resolveImageUrl
                ? window.supabaseStorageManager.resolveImageUrl(trimmed, 'assets/noticia_reforestacion.jpg')
                : (trimmed.startsWith('data:') || trimmed.startsWith('http') ? trimmed : `assets/${trimmed}.png`);
            
            if (!seen.has(resolved)) {
                seen.add(resolved);
                resolvedList.push(resolved);
            }
        });

        if (resolvedList.length === 0) {
            resolvedList.push('assets/noticia_reforestacion.jpg');
        }

        return resolvedList;
    }

    resolveNewsImage(item) {
        const list = this.getArticleImages(item);
        return list[0] || 'assets/noticia_reforestacion.jpg';
    }

    formatDisplayDate(item) {
        if (item.date && typeof item.date === 'string' && !item.date.includes('T') && !/^\d+$/.test(item.date)) {
            return item.date;
        }
        const ts = this.getArticleTimestamp(item);
        if (ts > 0) {
            const d = new Date(ts);
            if (!isNaN(d.getTime())) {
                const now = Date.now();
                const diffMs = now - d.getTime();
                const diffSec = Math.floor(diffMs / 1000);
                const diffMin = Math.floor(diffSec / 60);
                const diffHour = Math.floor(diffMin / 60);
                const diffDay = Math.floor(diffHour / 24);

                if (diffDay === 0) {
                    if (diffHour > 0) return `Hace ${diffHour} hora${diffHour > 1 ? 's' : ''}`;
                    if (diffMin > 0) return `Hace ${diffMin} min${diffMin > 1 ? 's' : ''}`;
                    return 'Hace un momento';
                } else if (diffDay === 1) {
                    return 'Ayer';
                } else if (diffDay < 7) {
                    return `Hace ${diffDay} días`;
                } else if (diffDay < 30) {
                    const weeks = Math.floor(diffDay / 7);
                    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
                } else {
                    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
                    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`;
                }
            }
        }
        return 'Reciente';
    }

    renderFeaturedAndGrid() {
        const featuredContainer = document.getElementById('news-featured-container');
        const grid = document.getElementById('news-grid-container');
        if (!grid) return;

        if (this.filteredArticles.length === 0) {
            if (featuredContainer) featuredContainer.innerHTML = '';
            grid.innerHTML = `
                <div style="text-align: center; padding: 50px 20px; background: white; border-radius: 16px; box-shadow: var(--shadow-sm); border: 1px solid #e2e8f0;">
                    <div style="margin-bottom: 12px; display: flex; justify-content: center;">${NEWS_ICONS.emptyNews}</div>
                    <h3 style="color: var(--colua-navy); font-size: 1.15rem; margin-bottom: 6px;">No se encontraron noticias</h3>
                    <p style="color: var(--colua-gray-500); font-size: 0.88rem;">Prueba con otros términos de búsqueda o ajusta los filtros temporales.</p>
                </div>
            `;
            return;
        }

        // La noticia más reciente encabeza la sección con tamaño balanceado
        const isDefaultView = !this.searchQuery && this.activeFilter === 'all' && this.currentPage === 1;
        let featuredItem = null;
        let gridItems = [...this.filteredArticles];

        if (isDefaultView && this.filteredArticles.length > 0) {
            featuredItem = this.filteredArticles[0];
            gridItems = this.filteredArticles.slice(1);
        }

        // Renderizar tarjeta destacada compacta con carrusel si tiene múltiples fotos
        if (featuredContainer) {
            if (featuredItem) {
                featuredContainer.innerHTML = this.createFeaturedHeroCard(featuredItem);
                this.bindFeaturedCardEvents(featuredItem);
            } else {
                featuredContainer.innerHTML = '';
            }
        }

        // Paginación sobre los artículos restantes
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const pageItems = gridItems.slice(startIndex, startIndex + this.itemsPerPage);

        grid.innerHTML = `
            <div class="news-grid-editorial">
                ${pageItems.map(item => this.createArticleCard(item)).join('')}
            </div>
        `;

        // Eventos para cada tarjeta de la cuadrícula
        pageItems.forEach(item => {
            this.bindArticleCardEvents(item);
        });
    }

    createFeaturedHeroCard(item) {
        const isLiked = this.likedArticles.has(item.id);
        const likesCount = (item.likesCount || item.likes || 0) + (isLiked ? 1 : 0);
        const images = this.getArticleImages(item);
        const currentImg = images[this.heroSlideIndex] || images[0];
        const displayDate = this.formatDisplayDate(item);
        const authorName = item.issuerName || 'Cooperativa COLUA';
        const issuerRole = item.issuerRole || 'Oficial';

        let tagsHtml = '';
        if (item.tags) {
            const tagsList = item.tags.split(/\s+/).filter(t => t.startsWith('#'));
            tagsHtml = tagsList.map(t => `<span>${t}</span>`).join(' ');
        } else {
            tagsHtml = `<span>#COLUAInformativa</span> <span>#ComunidadCOLUA</span> <span>#MICOOPE</span>`;
        }

        const primaryTag = (item.tags && item.tags.includes('#')) ? item.tags.split(/\s+/)[0] : '#COLUA';

        // Controles de carrusel si hay más de 1 imagen
        const hasMultiple = images.length > 1;
        const carouselControls = hasMultiple ? `
            <button class="carousel-nav-btn carousel-nav-prev" id="hero-prev-btn" title="Foto anterior">
                ${NEWS_ICONS.chevronLeft}
            </button>
            <button class="carousel-nav-btn carousel-nav-next" id="hero-next-btn" title="Siguiente foto">
                ${NEWS_ICONS.chevronRight}
            </button>
            <div class="carousel-count-badge">
                ${NEWS_ICONS.photosCount} <span>${this.heroSlideIndex + 1} / ${images.length}</span>
            </div>
            <div class="carousel-dots-row">
                ${images.map((_, idx) => `<span class="carousel-dot-indicator ${idx === this.heroSlideIndex ? 'active' : ''}" data-index="${idx}"></span>`).join('')}
            </div>
        ` : '';

        const isReg = this.isUserRegistered();
        const likeTooltip = isReg ? (isLiked ? 'Ya no me gusta' : 'Me gusta') : 'Inicia sesión o regístrate para dar Me Gusta';

        return `
            <article class="news-hero-split-card" id="news-hero-card">
                <!-- Columna Izquierda: Carrusel Fotográfico con soporte de deslizamiento -->
                <div class="news-hero-media-wrapper carousel-wrapper" id="hero-media-wrapper" role="region" aria-label="Galería de imágenes">
                    <img src="${currentImg}" alt="${item.title}" class="news-hero-img carousel-slide-img" id="hero-active-img"
                        onerror="this.onerror=null; this.src='assets/noticia_reforestacion.jpg';" />
                    
                    <div class="news-hero-badges-overlay">
                        <span class="news-pill-featured">NOTICIA DESTACADA</span>
                        <span class="news-pill-hashtag">${primaryTag.toUpperCase()}</span>
                    </div>

                    ${carouselControls}

                    <div class="news-zoom-hint" id="hero-zoom-trigger" title="Presiona para ver en pantalla completa">
                        ${NEWS_ICONS.expand} <span>Ver completa</span>
                    </div>
                </div>

                <!-- Columna Derecha: Contenido Editorial Compacto -->
                <div class="news-hero-content">
                    <div>
                        <!-- Cabecera de Autor Oficial con Insignia de Verificación Minimalista -->
                        <div class="news-author-row">
                            <span>${authorName}</span>
                            <span class="news-verified-badge" title="Canal Oficial Verificado">✓</span>
                        </div>

                        <!-- Metadatos con Iconos Vectoriales -->
                        <div class="news-meta-row">
                            <span style="display: inline-flex; align-items: center;">${NEWS_ICONS.clock}</span>
                            <span>${issuerRole} • ${displayDate}</span>
                        </div>

                        <!-- Título Principal -->
                        <h2 class="news-hero-title" id="hero-title-clickable" title="Ver comunicado completo">
                            ${item.title}
                        </h2>

                        <!-- Cuerpo del Comunicado -->
                        <p class="news-hero-body">
                            ${item.description || item.shortDescription || item.summary || ''}
                        </p>

                        <!-- Hashtags -->
                        <div class="news-hero-hashtags">
                            ${tagsHtml}
                        </div>
                    </div>

                    <!-- Pie de Acciones -->
                    <div class="news-hero-footer">
                        <button class="news-btn-readmore" id="hero-readmore-btn">
                            Leer comunicado completo <span style="display: inline-flex; align-items: center; margin-left: 2px;">${NEWS_ICONS.arrowRight}</span>
                        </button>
                        <div class="news-hero-actions">
                            <button class="news-action-icon-btn ${isLiked ? 'liked' : ''}" id="hero-like-btn" title="${likeTooltip}">
                                <span style="display: inline-flex; align-items: center;">${isLiked ? NEWS_ICONS.heartFilled : NEWS_ICONS.heartOutline}</span>
                                <span class="like-count" style="font-size: 0.8rem; font-weight: 600;">${likesCount}</span>
                            </button>
                            <button class="news-action-icon-btn" id="hero-share-btn" title="Compartir noticia">
                                <span style="display: inline-flex; align-items: center;">${NEWS_ICONS.share}</span>
                                <span style="font-size: 0.8rem; font-weight: 600;">Compartir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    bindFeaturedCardEvents(item) {
        const images = this.getArticleImages(item);
        const openModal = () => this.showArticleModal(item);
        const openLightbox = () => this.openImageLightbox(images, this.heroSlideIndex, item.title);

        const activeImg = document.getElementById('hero-active-img');
        const zoomTrigger = document.getElementById('hero-zoom-trigger');
        const wrapper = document.getElementById('hero-media-wrapper');

        activeImg?.addEventListener('click', openLightbox);
        zoomTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox();
        });

        // Navegación de carrusel
        const prevBtn = document.getElementById('hero-prev-btn');
        const nextBtn = document.getElementById('hero-next-btn');

        const updateHeroSlide = (newIndex) => {
            this.heroSlideIndex = (newIndex + images.length) % images.length;
            const container = document.getElementById('news-featured-container');
            if (container) {
                container.innerHTML = this.createFeaturedHeroCard(item);
                this.bindFeaturedCardEvents(item);
            }
        };

        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            updateHeroSlide(this.heroSlideIndex - 1);
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            updateHeroSlide(this.heroSlideIndex + 1);
        });

        // Indicadores de puntos
        wrapper?.querySelectorAll('.carousel-dot-indicator').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(dot.dataset.index, 10);
                if (!isNaN(idx)) updateHeroSlide(idx);
            });
        });

        // Soporte táctil de deslizamiento (Swipe)
        let touchStartX = 0;
        let touchEndX = 0;
        wrapper?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40 && images.length > 1) {
                if (diff > 0) updateHeroSlide(this.heroSlideIndex + 1); // Swipe left -> Next
                else updateHeroSlide(this.heroSlideIndex - 1); // Swipe right -> Prev
            }
        }, { passive: true });

        document.getElementById('hero-title-clickable')?.addEventListener('click', openModal);
        document.getElementById('hero-readmore-btn')?.addEventListener('click', openModal);

        document.getElementById('hero-like-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLike(item.id);
        });

        document.getElementById('hero-share-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareArticle(item);
        });
    }

    createArticleCard(item) {
        const isLiked = this.likedArticles.has(item.id);
        const likesCount = (item.likesCount || item.likes || 0) + (isLiked ? 1 : 0);
        const images = this.getArticleImages(item);
        const currentIdx = this.cardSlideIndices[item.id] || 0;
        const currentImg = images[currentIdx] || images[0];
        const displayDate = this.formatDisplayDate(item);
        const authorName = item.issuerName || 'Cooperativa COLUA';

        const hasMultiple = images.length > 1;
        const photosBadge = hasMultiple ? `
            <div class="carousel-count-badge">
                ${NEWS_ICONS.photosCount} <span>${currentIdx + 1}/${images.length}</span>
            </div>
            <button class="carousel-nav-btn carousel-nav-prev card-slide-prev" data-id="${item.id}" title="Anterior" style="width: 26px; height: 26px;">
                ${NEWS_ICONS.chevronLeft}
            </button>
            <button class="carousel-nav-btn carousel-nav-next card-slide-next" data-id="${item.id}" title="Siguiente" style="width: 26px; height: 26px;">
                ${NEWS_ICONS.chevronRight}
            </button>
        ` : '';

        const isReg = this.isUserRegistered();
        const likeTooltip = isReg ? (isLiked ? 'Ya no me gusta' : 'Me gusta') : 'Inicia sesión o regístrate para dar Me Gusta';

        return `
            <div id="news-card-${item.id}" class="news-card-editorial">
                <div class="news-card-media carousel-wrapper" id="card-media-${item.id}" title="Presiona para leer o ver imagen completa">
                    <img src="${currentImg}" alt="${item.title}" class="news-card-img card-active-img-${item.id}"
                        onerror="this.onerror=null; this.src='assets/noticia_reforestacion.jpg';" />
                    <span class="badge" style="position: absolute; top: 12px; left: 12px; background: rgba(23, 55, 137, 0.9); color: white; backdrop-filter: blur(4px); font-size: 0.72rem; padding: 3px 9px; border-radius: 12px; z-index: 3;">
                        ${displayDate}
                    </span>

                    ${photosBadge}

                    <div class="news-zoom-hint">
                        ${NEWS_ICONS.expand}
                    </div>
                </div>
                
                <div class="news-card-content-editorial">
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 6px; font-size: 0.78rem; font-weight: 700; color: var(--colua-gray-600);">
                        <span>${authorName}</span>
                        <span class="news-verified-badge" style="width: 14px; height: 14px; font-size: 0.55rem;">✓</span>
                    </div>

                    <h3 class="news-card-title-editorial">
                        ${item.title}
                    </h3>
                    <p class="news-card-body-editorial">
                        ${item.shortDescription || item.description || item.summary || ''}
                    </p>
                </div>

                <div class="news-card-footer-editorial">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="news-like-btn news-action-icon-btn ${isLiked ? 'liked' : ''}" style="padding: 4px 6px;" title="${likeTooltip}">
                            <span style="display: inline-flex; align-items: center;">${isLiked ? NEWS_ICONS.heartFilled : NEWS_ICONS.heartOutline}</span>
                            <span class="like-count" style="font-size: 0.8rem;">${likesCount}</span>
                        </button>
                        <button class="news-share-btn news-action-icon-btn" style="padding: 4px 6px;" title="Compartir">
                            <span style="display: inline-flex; align-items: center;">${NEWS_ICONS.share}</span>
                        </button>
                    </div>
                    <span style="font-size: 0.82rem; font-weight: 700; color: var(--colua-green); display: inline-flex; align-items: center; gap: 4px;">
                        Leer más ${NEWS_ICONS.arrowRight}
                    </span>
                </div>
            </div>
        `;
    }

    bindArticleCardEvents(item) {
        const cardEl = document.getElementById(`news-card-${item.id}`);
        if (!cardEl) return;
        const images = this.getArticleImages(item);

        cardEl.querySelector('.news-card-content-editorial')?.addEventListener('click', () => {
            this.showArticleModal(item);
        });

        // Controles de deslizamiento en tarjeta
        const mediaEl = cardEl.querySelector(`#card-media-${item.id}`);
        const prevBtn = cardEl.querySelector('.card-slide-prev');
        const nextBtn = cardEl.querySelector('.card-slide-next');

        if (images.length > 1) {
            const updateCardSlide = (newIdx) => {
                this.cardSlideIndices[item.id] = (newIdx + images.length) % images.length;
                cardEl.outerHTML = this.createArticleCard(item);
                this.bindArticleCardEvents(item);
            };

            prevBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCardSlide((this.cardSlideIndices[item.id] || 0) - 1);
            });

            nextBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCardSlide((this.cardSlideIndices[item.id] || 0) + 1);
            });

            // Swipe táctil en tarjeta
            let startX = 0;
            mediaEl?.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
            }, { passive: true });

            mediaEl?.addEventListener('touchend', (e) => {
                const diff = startX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) updateCardSlide((this.cardSlideIndices[item.id] || 0) + 1);
                    else updateCardSlide((this.cardSlideIndices[item.id] || 0) - 1);
                }
            }, { passive: true });
        }

        // Al hacer click en la imagen, abrir el modal
        mediaEl?.addEventListener('click', (e) => {
            if (e.target.closest('.carousel-nav-btn')) return;
            this.showArticleModal(item);
        });

        cardEl.querySelector('.news-like-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLike(item.id);
        });

        cardEl.querySelector('.news-share-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareArticle(item);
        });
    }

    renderPagination() {
        const paginationContainer = document.getElementById('news-pagination');
        if (!paginationContainer) return;

        const isDefaultView = !this.searchQuery && this.activeFilter === 'all' && this.currentPage === 1;
        const totalItemsCount = isDefaultView ? Math.max(0, this.filteredArticles.length - 1) : this.filteredArticles.length;
        const totalPages = Math.ceil(totalItemsCount / this.itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.85rem;" ${this.currentPage === 1 ? 'disabled' : ''} id="news-prev-btn">
                ← Anterior
            </button>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-600);">
                Página ${this.currentPage} de ${totalPages}
            </span>
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.85rem;" ${this.currentPage === totalPages ? 'disabled' : ''} id="news-next-btn">
                Siguiente →
            </button>
        `;

        paginationContainer.innerHTML = html;

        document.getElementById('news-prev-btn')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderFeaturedAndGrid();
                this.renderPagination();
                window.scrollTo({ top: 250, behavior: 'smooth' });
            }
        });

        document.getElementById('news-next-btn')?.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderFeaturedAndGrid();
                this.renderPagination();
                window.scrollTo({ top: 250, behavior: 'smooth' });
            }
        });
    }

    isUserRegistered() {
        if (!window.authManager) return false;
        if (typeof window.authManager.isRegistered === 'function') {
            return window.authManager.isRegistered();
        }
        if (typeof window.authManager.isLoggedIn === 'function' && !window.authManager.isLoggedIn()) {
            return false;
        }
        if (typeof window.authManager.isGuest === 'function' && window.authManager.isGuest()) {
            return false;
        }
        const s = window.authManager.getCurrentSession ? window.authManager.getCurrentSession() : null;
        if (!s) return false;
        const role = (s.user_role || s.role || '').toLowerCase();
        const tipo = (s.tipoUsuario || '').toLowerCase();
        return !(role === 'guest' || role === 'invitado' || tipo === 'invitado' || (s.user_id || '').startsWith('guest_'));
    }

    showGuestLikePrompt() {
        if (window.app && typeof window.app.showGuestLikePrompt === 'function') {
            window.app.showGuestLikePrompt('dar "Me Gusta" a las publicaciones');
            return;
        }
        if (window.Swal) {
            Swal.fire({
                title: '¡Únete a COLUA!',
                text: 'Para dar Me Gusta e interactuar con las publicaciones debes estar registrado como asociado.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#173789',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Registrarme',
                cancelButtonText: 'Continuar como invitado'
            }).then((res) => {
                if (res.isConfirmed && window.app) window.app.showRegisterModal();
            });
        }
    }

    toggleLike(articleId) {
        // Bloquear interacción si es un usuario invitado o no registrado
        if (!this.isUserRegistered()) {
            this.showGuestLikePrompt();
            return;
        }

        if (this.likedArticles.has(articleId)) {
            this.likedArticles.delete(articleId);
        } else {
            this.likedArticles.add(articleId);
        }
        localStorage.setItem('colua_liked_news', JSON.stringify(Array.from(this.likedArticles)));
        this.renderFeaturedAndGrid();
    }

    async shareArticle(article) {
        const shareData = {
            title: article.title,
            text: article.shortDescription || article.description || article.title,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    this.copyToClipboard(window.location.href);
                }
            }
        } else {
            this.copyToClipboard(window.location.href);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            window.app.showToast('¡Enlace de noticia copiado al portapapeles!', 'success');
        }).catch(() => {
            window.app.showToast('No se pudo copiar el enlace', 'warning');
        });
    }

    // Visor Lightbox a Pantalla Completa con navegación entre todas las imágenes
    openImageLightbox(images, startIndex = 0, title = '') {
        const imgList = Array.isArray(images) ? images : [images];
        let currentIndex = Math.max(0, Math.min(startIndex, imgList.length - 1));

        const existing = document.getElementById('colua-news-lightbox');
        if (existing) existing.remove();

        const lightboxEl = document.createElement('div');
        lightboxEl.id = 'colua-news-lightbox';
        lightboxEl.className = 'news-lightbox-overlay';

        const updateLightboxView = () => {
            const hasMultiple = imgList.length > 1;
            lightboxEl.innerHTML = `
                <div class="news-lightbox-header">
                    <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                        <span class="news-lightbox-title">${title || 'Fotografía de la Noticia'}</span>
                        ${hasMultiple ? `<span style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px;">${currentIndex + 1} de ${imgList.length}</span>` : ''}
                    </div>
                    <button class="news-lightbox-close-btn" id="lightbox-close-btn" title="Cerrar visor (Escape)">
                        ${NEWS_ICONS.close}
                    </button>
                </div>

                <div class="news-lightbox-image-container" id="lightbox-container-inner">
                    <img src="${imgList[currentIndex]}" alt="${title}" class="news-lightbox-img" id="lightbox-current-img" />
                </div>

                ${hasMultiple ? `
                    <button class="lightbox-nav-btn lightbox-nav-prev" id="lightbox-prev-btn" title="Imagen anterior (Flecha izquierda)">
                        ${NEWS_ICONS.chevronLeft}
                    </button>
                    <button class="lightbox-nav-btn lightbox-nav-next" id="lightbox-next-btn" title="Siguiente imagen (Flecha derecha)">
                        ${NEWS_ICONS.chevronRight}
                    </button>
                ` : ''}
            `;

            document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox);
            document.getElementById('lightbox-prev-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
                updateLightboxView();
            });
            document.getElementById('lightbox-next-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % imgList.length;
                updateLightboxView();
            });
        };

        let historyPushed = true;
        history.pushState({ coluaLightbox: true }, '');

        const closeLightbox = (fromHistory = false) => {
            lightboxEl.style.opacity = '0';
            document.removeEventListener('keydown', keyHandler);
            setTimeout(() => lightboxEl.remove(), 180);
            if (!fromHistory && historyPushed) {
                historyPushed = false;
                if (history.state && history.state.coluaLightbox) {
                    history.back();
                }
            } else {
                historyPushed = false;
            }
        };

        this.closeLightbox = closeLightbox;
        this.closeLightboxFromHistory = () => closeLightbox(true);

        lightboxEl.addEventListener('click', (e) => {
            if (e.target === lightboxEl || e.target.id === 'lightbox-container-inner') {
                closeLightbox();
            }
        });

        // Swipe táctil en Lightbox
        let touchStart = 0;
        lightboxEl.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxEl.addEventListener('touchend', (e) => {
            const diff = touchStart - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 45 && imgList.length > 1) {
                if (diff > 0) currentIndex = (currentIndex + 1) % imgList.length;
                else currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
                updateLightboxView();
            }
        }, { passive: true });

        const keyHandler = (e) => {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft' && imgList.length > 1) {
                currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
                updateLightboxView();
            } else if (e.key === 'ArrowRight' && imgList.length > 1) {
                currentIndex = (currentIndex + 1) % imgList.length;
                updateLightboxView();
            }
        };
        document.addEventListener('keydown', keyHandler);

        document.body.appendChild(lightboxEl);
        updateLightboxView();
    }

    showArticleModal(item) {
        const images = this.getArticleImages(item);
        let modalSlideIndex = 0;
        const displayDate = this.formatDisplayDate(item);
        const authorName = item.issuerName || 'Cooperativa COLUA';
        const hasMultiple = images.length > 1;
        const isLiked = this.likedArticles.has(item.id);
        const likesCount = (item.likesCount || item.likes || 0) + (isLiked ? 1 : 0);
        const isReg = this.isUserRegistered();
        const likeTooltip = isReg ? (isLiked ? 'Ya no me gusta' : 'Me gusta') : 'Inicia sesión o regístrate para dar Me Gusta';

        let tagsHtml = '';
        if (item.tags) {
            const tagsList = item.tags.split(/\s+/).filter(t => t.startsWith('#'));
            tagsHtml = tagsList.map(t => `<span class="badge" style="background: #f1f5f9; color: #173789; font-weight: 600; margin-right: 6px; margin-bottom: 6px;">${t}</span>`).join(' ');
        }

        const renderModalCarousel = (idx) => `
            <div style="position: relative; width: 100%; height: 320px; border-radius: 12px; overflow: hidden; background: #0f172a; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; cursor: zoom-in;" id="modal-carousel-stage" title="Click para ampliar imagen">
                <img src="${images[idx]}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain;"
                    onerror="this.onerror=null; this.src='assets/noticia_reforestacion.jpg';" />

                ${hasMultiple ? `
                    <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.65); color: white; padding: 4px 10px; border-radius: 14px; font-size: 0.75rem; display: flex; align-items: center; gap: 5px; backdrop-filter: blur(4px);">
                        ${NEWS_ICONS.photosCount} <span>${idx + 1} de ${images.length}</span>
                    </div>

                    <button class="carousel-nav-btn carousel-nav-prev" id="modal-prev-btn" title="Foto anterior" style="left: 12px;">
                        ${NEWS_ICONS.chevronLeft}
                    </button>
                    <button class="carousel-nav-btn carousel-nav-next" id="modal-next-btn" title="Foto siguiente" style="right: 12px;">
                        ${NEWS_ICONS.chevronRight}
                    </button>
                ` : ''}
            </div>

            <!-- Tira de Miniaturas si hay múltiples imágenes -->
            ${hasMultiple ? `
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px;" id="modal-thumbnails-strip">
                    ${images.map((src, thumbIdx) => `
                        <div class="modal-thumb-item" data-index="${thumbIdx}" style="flex-shrink: 0; width: 64px; height: 50px; border-radius: 8px; overflow: hidden; border: 2px solid ${thumbIdx === idx ? '#173789' : '#e2e8f0'}; cursor: pointer; transition: border-color 0.2s;">
                            <img src="${src}" style="width: 100%; height: 100%; object-fit: cover;" />
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;

        const modalContent = `
            <div style="max-height: 82vh; overflow-y: auto; padding-right: 4px;" id="modal-body-container">
                <div id="modal-carousel-container">
                    ${renderModalCarousel(modalSlideIndex)}
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 12px; align-items: center; flex-wrap: wrap;">
                    <span class="badge" style="background: var(--colua-navy); color: white; padding: 4px 10px; border-radius: 8px;">${displayDate}</span>
                    <div style="display: flex; align-items: center; gap: 4px; font-size: 0.85rem; font-weight: 700; color: var(--colua-navy);">
                        <span>${authorName}</span>
                        <span class="news-verified-badge" style="width: 15px; height: 15px; font-size: 0.6rem;">✓</span>
                    </div>
                </div>

                <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--colua-navy); margin-bottom: 14px; line-height: 1.35;">
                    ${item.title}
                </h2>

                <div style="font-size: 0.95rem; color: var(--colua-gray-700); line-height: 1.7; white-space: pre-line; margin-bottom: 20px;">
                    ${item.description || item.content || item.shortDescription || 'Información oficial disponible en agencias y canales de atención de COLUA R.L.'}
                </div>

                ${tagsHtml}

                <!-- Pie del modal limpio -->
                <div style="background: var(--colua-gray-50); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <button class="btn btn-outline" style="font-size: 0.85rem;" onclick="app.closeModal()">Cerrar</button>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="btn btn-outline ${isLiked ? 'liked' : ''}" style="font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px; ${isLiked ? 'color:#e42a67;border-color:#e42a67;' : ''}" id="modal-btn-like" title="${likeTooltip}">
                            <span style="display: inline-flex; align-items: center;">${isLiked ? NEWS_ICONS.heartFilled : NEWS_ICONS.heartOutline}</span>
                            <span>${isLiked ? 'Te gusta' : 'Me gusta'}</span>
                            <span style="font-size: 0.78rem; font-weight: 700;">(${likesCount})</span>
                        </button>
                        <button class="btn btn-outline" style="font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;" id="modal-btn-open-lightbox">
                            ${NEWS_ICONS.expand} Ver imagen completa
                        </button>
                        <button class="btn btn-primary" style="font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;" id="modal-btn-share">
                            ${NEWS_ICONS.share} Compartir
                        </button>
                    </div>
                </div>
            </div>
        `;

        window.app.showModal(modalContent);

        // Bind events dentro del modal
        const bindModalCarouselEvents = () => {
            const stage = document.getElementById('modal-carousel-stage');
            const prevBtn = document.getElementById('modal-prev-btn');
            const nextBtn = document.getElementById('modal-next-btn');
            const openLightboxBtn = document.getElementById('modal-btn-open-lightbox');
            const shareBtn = document.getElementById('modal-btn-share');
            const modalLikeBtn = document.getElementById('modal-btn-like');

            modalLikeBtn?.addEventListener('click', () => {
                this.toggleLike(item.id);
                if (this.isUserRegistered()) {
                    const nowLiked = this.likedArticles.has(item.id);
                    const count = (item.likesCount || item.likes || 0) + (nowLiked ? 1 : 0);
                    modalLikeBtn.className = `btn btn-outline ${nowLiked ? 'liked' : ''}`;
                    modalLikeBtn.style.cssText = `font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px; ${nowLiked ? 'color:#e42a67;border-color:#e42a67;' : ''}`;
                    modalLikeBtn.innerHTML = `
                        <span style="display: inline-flex; align-items: center;">${nowLiked ? NEWS_ICONS.heartFilled : NEWS_ICONS.heartOutline}</span>
                        <span>${nowLiked ? 'Te gusta' : 'Me gusta'}</span>
                        <span style="font-size: 0.78rem; font-weight: 700;">(${count})</span>
                    `;
                }
            });

            const updateModalIndex = (newIdx) => {
                modalSlideIndex = (newIdx + images.length) % images.length;
                const container = document.getElementById('modal-carousel-container');
                if (container) {
                    container.innerHTML = renderModalCarousel(modalSlideIndex);
                    bindModalCarouselEvents();
                }
            };

            stage?.addEventListener('click', (e) => {
                if (e.target.closest('.carousel-nav-btn')) return;
                this.openImageLightbox(images, modalSlideIndex, item.title);
            });

            openLightboxBtn?.addEventListener('click', () => {
                this.openImageLightbox(images, modalSlideIndex, item.title);
            });

            shareBtn?.addEventListener('click', () => {
                this.shareArticle(item);
            });

            prevBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateModalIndex(modalSlideIndex - 1);
            });

            nextBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateModalIndex(modalSlideIndex + 1);
            });

            // Miniaturas
            document.querySelectorAll('.modal-thumb-item').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(thumb.dataset.index, 10);
                    if (!isNaN(idx)) updateModalIndex(idx);
                });
            });

            // Swipe en modal
            let touchStartX = 0;
            stage?.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            stage?.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 40 && images.length > 1) {
                    if (diff > 0) updateModalIndex(modalSlideIndex + 1);
                    else updateModalIndex(modalSlideIndex - 1);
                }
            }, { passive: true });
        };

        bindModalCarouselEvents();
    }
}

window.noticiasComponent = new NoticiasComponent();
