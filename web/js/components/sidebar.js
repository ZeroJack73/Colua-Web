// Componente Sidebar Drawer Lateral
class SidebarComponent {
  constructor() {
    this.isOpen = false;
  }

  render() {
    const session = window.authManager?.getCurrentSession();
    const isGuest = !session || session.user_role === 'GUEST';
    const userName = session ? session.user_name : 'Invitado';
    const userRoleText = isGuest ? 'Modo Consulta (Invitado)' : `Asociado No. ${session.user_id}`;

    return `
      <div class="drawer-overlay" id="drawer-overlay"></div>
      <aside class="sidebar-drawer" id="sidebar-drawer" aria-label="Menú de Navegación Lateral">
        <div class="drawer-header">
          <div class="drawer-user-info" id="btn-sidebar-profile-header">
            <div class="drawer-user-avatar" style="background: transparent; display: flex; align-items: center; justify-content: center; padding: 0;">
              <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 36px; height: 36px; object-fit: contain;" />
            </div>
            <div class="drawer-user-text">
              <h4>${userName}</h4>
              <span>${userRoleText}</span>
            </div>
          </div>
          <button class="btn-close-drawer" id="btn-close-sidebar" aria-label="Cerrar Menú">✕</button>
        </div>

        <div class="drawer-body">
          <div class="drawer-menu-item" data-route="sec_home">
            <img src="assets/distintivo_colua.png" alt="" style="padding: 2px;" />
            <span>Inicio</span>
          </div>

          <div class="drawer-menu-item" data-route="perfil">
            <img src="assets/perfil.png" alt="" onerror="this.src='assets/ic_person.png'" />
            <span>Mi Perfil</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_ahorros">
            <img src="assets/ahorros.png" alt="" />
            <span>Cuentas de Ahorro</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_creditos">
            <img src="assets/credito.png" alt="" />
            <span>Créditos</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_seguros">
            <img src="assets/seguro.png" alt="" />
            <span>Seguros Columna</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_remesas">
            <img src="assets/remesa.png" alt="" />
            <span>Remesas Familiares</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_servicios">
            <img src="assets/servicios_digitales.png" alt="" />
            <span>Servicios</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_beneficios">
            <img src="assets/beneficios.png" alt="" />
            <span>Beneficios</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_sostenibilidad">
            <img src="assets/sostenibilidad_cooperativa.png" alt="" />
            <span>Sostenibilidad Cooperativa</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_agencias">
            <img src="assets/ubicacion.png" alt="" />
            <span>Red de Agencias</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_noticias">
            <img src="assets/noticias_colua.png" alt="" />
            <span>Noticias y Eventos</span>
          </div>

          <div class="drawer-menu-item" data-route="sec_nosotros">
            <img src="assets/distintivo_colua.png" alt="" style="padding: 2px;" />
            <span>Sobre Nosotros</span>
          </div>

          <div class="drawer-menu-item" data-route="admin" style="font-weight: 700; color: var(--colua-navy);">
            <img src="assets/portal_administrativo.png" alt="" />
            <span>Portal administrativo</span>
          </div>

          <div class="drawer-menu-item" id="btn-sidebar-install" style="color: #059669; font-weight: 600;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Instalar App Web</span>
          </div>

          ${isGuest ? `
            <div class="drawer-menu-item" id="btn-sidebar-login" style="color: var(--colua-navy); font-weight: 600;">
              <img src="assets/perfil.png" alt="" onerror="this.src='assets/ic_person.png'" />
              <span>Iniciar Sesión / Registro</span>
            </div>
          ` : `
            <div class="drawer-menu-item logout" id="btn-sidebar-logout">
              <img src="assets/cerrar.png" alt="" />
              <span>Cerrar Sesión</span>
            </div>
          `}
        </div>
      </aside>
    `;
  }

  open() {
    this.isOpen = true;
    const overlay = document.getElementById('drawer-overlay');
    const drawer = document.getElementById('sidebar-drawer');
    if (overlay && drawer) {
      overlay.classList.add('open');
      drawer.classList.add('open');
    }
    if (!this._historyPushed) {
      this._historyPushed = true;
      history.pushState({ coluaSidebar: true }, '');
    }
  }

  close(fromHistory = false, isNavigating = false) {
    this.isOpen = false;
    const overlay = document.getElementById('drawer-overlay');
    const drawer = document.getElementById('sidebar-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    }
    if (!fromHistory && !isNavigating && this._historyPushed) {
      this._historyPushed = false;
      if (history.state && history.state.coluaSidebar) {
        history.back();
      }
    } else {
      this._historyPushed = false;
    }
  }

  attachEvents() {
    const overlay = document.getElementById('drawer-overlay');
    const btnClose = document.getElementById('btn-close-sidebar');
    const profileHeader = document.getElementById('btn-sidebar-profile-header');
    const btnLogout = document.getElementById('btn-sidebar-logout');
    const btnLogin = document.getElementById('btn-sidebar-login');
    const btnInstall = document.getElementById('btn-sidebar-install');

    if (overlay) overlay.onclick = () => this.close();
    if (btnClose) btnClose.onclick = () => this.close();

    if (btnInstall) {
      btnInstall.onclick = () => {
        this.close(false, true);
        window.app?.promptInstallApp();
      };
    }

    if (profileHeader) {
      profileHeader.onclick = () => {
        this.close(false, true);
        window.coluaRouter?.navigate('perfil');
      };
    }

    // Navegación de items
    document.querySelectorAll('.drawer-menu-item[data-route]').forEach((el) => {
      el.onclick = () => {
        const route = el.getAttribute('data-route');
        this.close(false, true);
        window.coluaRouter?.navigate(route);
      };
    });

    if (btnLogin) {
      btnLogin.onclick = () => {
        this.close(false, true);
        window.app?.showLoginModal();
      };
    }

    if (btnLogout) {
      btnLogout.onclick = () => {
        this.close(false, true);
        if (window.Swal) {
          Swal.fire({
            title: '¿Cerrar Sesión?',
            text: '¿Estás seguro de que deseas salir de tu cuenta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#173789',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
          }).then((res) => {
            if (res.isConfirmed) {
              window.authService?.logout();
              window.app?.showToast('Sesión cerrada correctamente', 'info');
              window.coluaRouter?.navigate('inicio');
            }
          });
        } else {
          window.authService?.logout();
          window.app?.showToast('Sesión cerrada correctamente', 'info');
          window.coluaRouter?.navigate('inicio');
        }
      };
    }
  }
}

window.sidebarComponent = new SidebarComponent();
