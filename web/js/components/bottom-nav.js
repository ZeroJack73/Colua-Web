// Componente Barra de Navegación Inferior (5 Opciones con Inicio en el centro)
class BottomNavComponent {
  render(currentRoute = 'sec_home') {
    return `
      <nav class="bottom-nav" id="bottom-nav" aria-label="Navegación Rápida">
        <div class="bottom-nav-item ${currentRoute === 'sec_servicios' ? 'active' : ''}" data-route="sec_servicios">
          <img src="assets/servicios_digitales.png" alt="" />
          <span>Servicios</span>
        </div>

        <div class="bottom-nav-item ${currentRoute === 'sec_agencias' ? 'active' : ''}" data-route="sec_agencias">
          <img src="assets/ubicacion.png" alt="" />
          <span>Agencias</span>
        </div>

        <div class="bottom-nav-item center-home ${currentRoute === 'sec_home' || currentRoute === '' ? 'active' : ''}" data-route="sec_home">
          <div class="icon-circle">
            <img src="assets/distintivo_colua.png" alt="Inicio" style="object-fit: contain; padding: 2px;" />
          </div>
          <span>Inicio</span>
        </div>

        <div class="bottom-nav-item ${currentRoute === 'sec_beneficios' ? 'active' : ''}" data-route="sec_beneficios">
          <img src="assets/beneficios.png" alt="" />
          <span>Beneficios</span>
        </div>

        <div class="bottom-nav-item ${currentRoute === 'sec_noticias' ? 'active' : ''}" data-route="sec_noticias">
          <img src="assets/noticias_colua.png" alt="" />
          <span>Noticias</span>
        </div>
      </nav>
    `;
  }

  attachEvents() {
    document.querySelectorAll('.bottom-nav-item[data-route]').forEach((item) => {
      item.onclick = () => {
        const route = item.getAttribute('data-route');
        window.coluaRouter?.navigate(route);
      };
    });
  }

  updateActive(route) {
    document.querySelectorAll('.bottom-nav-item').forEach((item) => {
      const itemRoute = item.getAttribute('data-route');
      if (itemRoute === route || (itemRoute === 'sec_home' && (!route || route === 'home'))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

window.bottomNavComponent = new BottomNavComponent();
