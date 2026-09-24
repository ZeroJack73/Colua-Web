// Componente Barra de Navegación Inferior Dinámica (5 Opciones con Inicio fijo en el centro)
class BottomNavComponent {
  constructor() {
    this.currentRoute = 'sec_home';
  }

  getSlots() {
    if (window.coluaRepo && window.coluaRepo.getBottomNavSlots) {
      return window.coluaRepo.getBottomNavSlots();
    }
    return [
      { slotIndex: 1, sectionId: "sec_servicios", label: "Servicios", icon: "assets/servicios_digitales.png", slug: "servicios" },
      { slotIndex: 2, sectionId: "sec_agencias", label: "Agencias", icon: "assets/ubicacion.png", slug: "agencias" },
      { slotIndex: 3, sectionId: "sec_home", label: "Inicio", icon: "assets/distintivo_colua.png", slug: "inicio", isFixed: true },
      { slotIndex: 4, sectionId: "sec_beneficios", label: "Beneficios", icon: "assets/beneficios.png", slug: "beneficios" },
      { slotIndex: 5, sectionId: "sec_noticias", label: "Noticias", icon: "assets/noticias_colua.png", slug: "noticias" }
    ];
  }

  render(currentRoute = 'sec_home') {
    this.currentRoute = currentRoute;
    const raw = (currentRoute || 'sec_home').replace(/^#/, '').toLowerCase();
    const isHome = raw === 'sec_home' || raw === 'inicio' || raw === 'home' || raw === '';
    const slots = this.getSlots();

    return `
      <nav class="bottom-nav" id="bottom-nav" aria-label="Navegación Rápida">
        ${slots.map(s => {
          if (s.slotIndex === 3 || s.isFixed) {
            return `
              <div class="bottom-nav-item center-home ${isHome ? 'active' : ''}" data-route="sec_home" data-slot="3" title="Inicio" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_home') : (window.location.hash='#sec_home')">
                <div class="icon-circle">
                  <img src="${s.icon || 'assets/distintivo_colua.png'}" alt="Inicio" style="object-fit: contain; padding: 2px;" onerror="this.src='assets/distintivo_colua.png'" />
                </div>
                <span>${s.label || 'Inicio'}</span>
              </div>
            `;
          }

          const route = s.sectionId || s.slug || 'sec_home';
          const cleanRoute = (s.slug || s.sectionId || '').replace(/^sec_/, '').toLowerCase();
          const isActive = raw === route.toLowerCase() || raw === cleanRoute || raw === `sec_${cleanRoute}`;

          return `
            <div class="bottom-nav-item ${isActive ? 'active' : ''}" data-route="${route}" data-slot="${s.slotIndex}" onclick="window.coluaRouter ? window.coluaRouter.navigate('${route}') : (window.location.hash='#${route}')">
              <img src="${s.icon || 'assets/distintivo_colua.png'}" alt="${s.label}" onerror="this.src='assets/distintivo_colua.png'" />
              <span>${s.label}</span>
            </div>
          `;
        }).join('')}
      </nav>
    `;
  }

  attachEvents() {
    document.querySelectorAll('.bottom-nav-item[data-route]').forEach((item) => {
      item.onclick = () => {
        const route = item.getAttribute('data-route');
        if (window.coluaRouter && window.coluaRouter.navigate) {
          window.coluaRouter.navigate(route);
        } else {
          const clean = route.replace(/^sec_/, '');
          window.location.hash = `#${clean}`;
        }
      };
    });
  }

  updateActive(route) {
    this.currentRoute = route;
    const raw = (route || 'sec_home').replace(/^#/, '').toLowerCase();
    const isHome = raw === 'sec_home' || raw === 'inicio' || raw === 'home' || raw === '';

    document.querySelectorAll('.bottom-nav-item').forEach((item) => {
      const itemRoute = item.getAttribute('data-route');
      const itemSlot = item.getAttribute('data-slot');

      if (itemSlot === '3' && isHome) {
        item.classList.add('active');
      } else if (itemRoute && (itemRoute.toLowerCase() === raw || itemRoute.replace(/^sec_/, '').toLowerCase() === raw.replace(/^sec_/, ''))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  refresh() {
    const root = document.getElementById('bottom-nav');
    if (root && root.parentElement) {
      root.outerHTML = this.render(this.currentRoute);
      this.attachEvents();
    }
  }
}

window.bottomNavComponent = new BottomNavComponent();
