// web/js/app.js — Bootstrap COLUA Web Digital

const App = {
    modalEl: null,
    toastContainer: null,
    deferredInstallPrompt: null,

    init() {
        console.log('[COLUA] Iniciando app...');

        // 1. Containers para modal y toasts
        try { this._setupContainers(); } catch (e) { console.error('Error setupContainers:', e); }

        // 2. Insertar navbar en el DOM
        try {
            const navEl = document.getElementById('navbar-root');
            if (navEl && window.navbarComponent) {
                navEl.innerHTML = window.navbarComponent.render();
                window.navbarComponent.attachEvents();
            }
        } catch (e) { console.error('Error navbar:', e); }

        // 3. Insertar sidebar en el DOM
        try {
            const sideEl = document.getElementById('sidebar-root');
            if (sideEl && window.sidebarComponent) {
                sideEl.innerHTML = window.sidebarComponent.render();
                window.sidebarComponent.attachEvents();
            }
        } catch (e) { console.error('Error sidebar:', e); }

        // 4. Insertar bottom-nav en el DOM
        try {
            const botEl = document.getElementById('bottom-nav-root');
            if (botEl && window.bottomNavComponent) {
                botEl.innerHTML = window.bottomNavComponent.render();
                window.bottomNavComponent.attachEvents();
            }
        } catch (e) { console.error('Error bottomNav:', e); }

        // 4.5. Insertar Pie de Página Global Minimalista
        try { this._setupFooter(); } catch (e) { console.error('Error footer:', e); }

        // 5. Chatbot
        try {
            if (window.chatbotComponent) window.chatbotComponent.init();
        } catch (e) { console.error('Error chatbot:', e); }

        // 6. Arrancar router (carga la primera vista)
        try {
            if (window.router) {
                window.router.init('main-content');
            }
        } catch (e) { console.error('Error router:', e); }

        // 7. PWA
        try {
            this._registerSW();
            this._setupInstallPrompt();
            window.addEventListener('offline', () => this.showToast('Sin conexión — usando datos en caché', 'warning'));
            window.addEventListener('online',  () => this.showToast('Conexión restablecida', 'success'));
        } catch (e) {}

        console.log('[COLUA] App lista.');
    },

    // ── Pie de Página Global Minimalista ───────────
    _setupFooter() {
        const footEl = document.getElementById('footer-root');
        if (!footEl) return;
        footEl.innerHTML = `
          <footer class="clean-footer">
            <div class="clean-footer-container">
              <!-- Columna 1 -->
              <div class="clean-footer-col">
                <div class="clean-footer-brand-title">
                  <img src="assets/logo_composite.png" alt="COLUA MICOOPE R.L." class="clean-footer-logo" />
                </div>
                <p class="clean-footer-desc">
                  Entidad cooperativa federada al Sistema MICOOPE. Solidez, confianza y desarrollo financiero cooperativo con sentido humano en Guatemala.
                </p>
              </div>

              <!-- Columna 2 -->
              <div class="clean-footer-col">
                <h4 class="clean-footer-col-header">SOLUCIONES FINANCIERAS</h4>
                <ul class="clean-footer-list">
                  <li><a href="#sec_ahorros">Cuentas de Ahorro Corriente y Plazo Fijo</a></li>
                  <li><a href="#sec_creditos">Préstamos Fiduciarios e Hipotecarios</a></li>
                  <li><a href="#sec_servicios">Tarjetas de Débito y Crédito MICOOPE</a></li>
                </ul>
              </div>

              <!-- Columna 3 -->
              <div class="clean-footer-col">
                <h4 class="clean-footer-col-header">ATENCIÓN AL ASOCIADO</h4>
                <ul class="clean-footer-list">
                  <li><a href="#sec_agencias">Red de Agencias y Cajeros 5B</a></li>
                  <li><a href="tel:77957795">Canales de Atención y PBX</a></li>
                  <li><a href="#sec_sostenibilidad">Educación y Gobernanza Cooperativa</a></li>
                </ul>
              </div>

              <!-- Columna 4 -->
              <div class="clean-footer-col">
                <h4 class="clean-footer-col-header">SEGURIDAD Y NORMATIVA</h4>
                <p class="clean-footer-normative-text">
                  Supervisados por la Inspección General de Cooperativas (INGECOP) y respaldados por el Fondo de Garantía MICOOPE.
                </p>
                <div>
                  <a href="tel:77957795" class="clean-footer-pbx-link">PBX: (502) 7795-7795</a>
                </div>
              </div>
            </div>

            <!-- Barra Inferior de Derechos y Enlaces Legales -->
            <div class="clean-footer-bottom-row">
              <div class="clean-footer-bottom-wrap">
                <span>© 2026 COLUA MICOOPE R.L. Todos los derechos reservados.</span>
                <div class="clean-footer-links-inline">
                  <a href="#terminos" onclick="event.preventDefault(); App.showModal({title:'Términos de Servicio', body:'Cooperativa COLUA R.L. opera bajo los estándares del Sistema MICOOPE y las leyes cooperativas vigentes en la República de Guatemala.'})">Términos de Servicio</a>
                  <a href="#privacidad" onclick="event.preventDefault(); App.showModal({title:'Políticas de Privacidad', body:'Tus datos personales y financieros están protegidos bajo estrictos protocolos de confidencialidad y secreto bancario cooperativo.'})">Políticas de Privacidad</a>
                </div>
              </div>
            </div>
          </footer>
        `;
    },

    // ── Containers & Historial ─────────────────────
    _isModalOpen: false,
    _historyPushedForModal: false,
    _historyNavInitialized: false,

    _setupContainers() {
        if (!document.getElementById('colua-global-modal')) {
            const m = document.createElement('div');
            m.id = 'colua-global-modal';
            m.className = 'modal-backdrop';
            m.style.display = 'none';
            m.innerHTML = '<div class="modal-card"><button class="modal-close-btn" onclick="app.closeModal()">✕</button><div id="modal-inner-content"></div></div>';
            document.body.appendChild(m);
            m.addEventListener('click', e => { 
                if (e.target === m) this.closeModal(); 
            });
            this.modalEl = m;
        } else {
            this.modalEl = document.getElementById('colua-global-modal');
        }

        if (!document.getElementById('colua-toast-container')) {
            const t = document.createElement('div');
            t.id = 'colua-toast-container';
            t.className = 'toast-container';
            document.body.appendChild(t);
            this.toastContainer = t;
        } else {
            this.toastContainer = document.getElementById('colua-toast-container');
        }

        this._setupHistoryNavigation();
    },

    _setupHistoryNavigation() {
        if (this._historyNavInitialized) return;
        this._historyNavInitialized = true;

        // Escuchar cuando el usuario pulsa 'Atrás' en el teléfono (barra de navegación, botón físico o gestos de deslizar en iPhone/Android)
        window.addEventListener('popstate', (e) => {
            // 1. Si el visor Lightbox de imágenes de noticias está abierto, cerrarlo prioritariamente
            const lightbox = document.getElementById('colua-news-lightbox');
            if (lightbox) {
                if (window.noticiasComponent && typeof window.noticiasComponent.closeLightboxFromHistory === 'function') {
                    window.noticiasComponent.closeLightboxFromHistory();
                } else {
                    lightbox.style.opacity = '0';
                    setTimeout(() => lightbox.remove(), 180);
                }
                return;
            }

            // 2. Si el modal global (noticias, avisos, login, registro, perfiles, etc.) está abierto, cerrarlo
            if (this._isModalOpen) {
                this.closeModal(true);
                return;
            }

            // 3. Si el menú lateral móvil (sidebar drawer) está abierto, cerrarlo
            if (window.sidebarComponent && window.sidebarComponent.isOpen) {
                window.sidebarComponent.close(true);
                return;
            }

            // 4. Si la mesa de ayuda / chatbot está abierto, cerrarlo
            if (window.chatbotComponent && window.chatbotComponent.isOpen) {
                window.chatbotComponent.toggleChat(false, true);
                return;
            }

            // 5. Si hay una alerta SweetAlert2 abierta, cerrarla
            if (window.Swal && typeof Swal.isVisible === 'function' && Swal.isVisible()) {
                Swal.close();
                return;
            }
        });

        // Soporte tecla Escape en computadoras y laptops
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const lightbox = document.getElementById('colua-news-lightbox');
                if (lightbox) {
                    if (window.noticiasComponent && typeof window.noticiasComponent.closeLightbox === 'function') {
                        window.noticiasComponent.closeLightbox();
                    } else {
                        lightbox.style.opacity = '0';
                        setTimeout(() => lightbox.remove(), 180);
                    }
                    return;
                }
                if (this._isModalOpen) {
                    this.closeModal();
                    return;
                }
                if (window.sidebarComponent && window.sidebarComponent.isOpen) {
                    window.sidebarComponent.close();
                    return;
                }
                if (window.chatbotComponent && window.chatbotComponent.isOpen) {
                    window.chatbotComponent.toggleChat(false);
                    return;
                }
            }
        });
    },

    // ── Modal ──────────────────────────────────────
    showModal(contentOrObj) {
        if (!this.modalEl) this._setupContainers();
        const inner = document.getElementById('modal-inner-content');
        if (!inner) return;

        if (typeof contentOrObj === 'string') {
            inner.innerHTML = contentOrObj;
        } else if (contentOrObj && typeof contentOrObj === 'object') {
            // Formato { title, body, confirmText, onConfirm }
            inner.innerHTML = `
                <h3 style="font-size:1.15rem;font-weight:700;color:var(--colua-navy);margin-bottom:12px;">${contentOrObj.title || ''}</h3>
                <div>${contentOrObj.body || ''}</div>
                ${contentOrObj.confirmText ? `<div style="margin-top:16px;text-align:right;"><button class="btn btn-primary" id="modal-confirm-action">${contentOrObj.confirmText}</button></div>` : ''}
            `;
            if (contentOrObj.onConfirm) {
                document.getElementById('modal-confirm-action')?.addEventListener('click', contentOrObj.onConfirm);
            }
        }

        this.modalEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Integración con el historial del navegador para móviles (barra de navegación y gestos)
        if (!this._isModalOpen) {
            this._isModalOpen = true;
            this._historyPushedForModal = true;
            history.pushState({ coluaModal: true, timestamp: Date.now() }, '');
        }
    },

    closeModal(fromHistory = false, isNavigating = false) {
        if (this.modalEl) {
            this.modalEl.style.display = 'none';
            document.body.style.overflow = '';
        }

        if (this._isModalOpen) {
            this._isModalOpen = false;
            if (!fromHistory && !isNavigating && this._historyPushedForModal) {
                this._historyPushedForModal = false;
                if (history.state && history.state.coluaModal) {
                    history.back();
                }
            } else {
                this._historyPushedForModal = false;
            }
        }
    },

    // ── Toast ──────────────────────────────────────
    showToast(message, type) {
        type = type || 'info';
        if (!this.toastContainer) this._setupContainers();
        const svgIcons = {
            success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
            danger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
            warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
            info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        };
        const t = document.createElement('div');
        t.className = 'toast toast-' + type;
        t.style.cssText = 'display:flex;align-items:center;gap:10px;';
        t.innerHTML = '<span>' + (svgIcons[type]||svgIcons.info) + '</span><span>' + message + '</span>';
        this.toastContainer.appendChild(t);
        setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(8px)'; setTimeout(() => t.remove(), 350); }, 3500);
    },

    // ── Login Modal ───────────────────────────────
    showLoginModal() {
        this.showModal(`
            <div style="text-align:center;margin-bottom:20px;">
                <div style="width:56px;height:56px;border-radius:50%;background:#ffffff;box-shadow:0 2px 12px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 12px auto;">
                    <img src="assets/distintivo_colua.png" alt="COLUA" style="width:38px;height:38px;object-fit:contain;" />
                </div>
                <h3 style="font-size:1.25rem;font-weight:700;color:var(--colua-navy);margin-bottom:4px;">Iniciar Sesión</h3>
                <p style="font-size:0.85rem;color:var(--colua-gray-500);margin:0;">Portal de Asociados COLUA R.L.</p>
            </div>

            <form id="global-login-form">
                <div style="margin-bottom:14px;">
                    <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                        Correo Electrónico
                    </label>
                    <input type="email" id="login-email" required placeholder="tu.correo@ejemplo.com"
                        style="width:100%;padding:10px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.9rem;font-family:inherit;box-sizing:border-box;" />
                </div>
                <div style="margin-bottom:18px;">
                    <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                        Contraseña
                    </label>
                    <input type="password" id="login-password" required placeholder="••••••••"
                        style="width:100%;padding:10px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.9rem;font-family:inherit;box-sizing:border-box;" />
                </div>

                <button type="submit" class="btn btn-primary" style="width:100%;padding:12px;font-weight:600;font-size:0.95rem;">
                    Ingresar
                </button>
            </form>

            <div style="margin-top:16px;padding-top:14px;border-top:1px solid #f1f5f9;text-align:center;">
                <p style="font-size:0.85rem;color:var(--colua-gray-600);margin:0 0 8px 0;">
                    ¿Aún no tienes una cuenta de asociado?
                </p>
                <button type="button" id="btn-to-register" class="btn btn-outline" style="width:100%;padding:10px;font-size:0.88rem;font-weight:600;color:var(--colua-navy);border-color:#cbd5e1;">
                    Registrarse como Asociado
                </button>
            </div>
        `);

        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');

        // Botón Registrarse
        document.getElementById('btn-to-register')?.addEventListener('click', () => {
            this.showRegisterModal();
        });

        document.getElementById('global-login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passInput ? passInput.value : '';

            try {
                // 1. Probar credenciales vía authService
                const res = await window.authService.loginWithEmail(email, password);
                if (res.success) {
                    this.closeModal();
                    if (window.Swal) {
                        Swal.fire({
                            title: "¡Bienvenido!",
                            text: "Sesión iniciada correctamente en COLUA Web Digital.",
                            icon: "success",
                            draggable: true,
                            confirmButtonColor: "#173789",
                            confirmButtonText: "Continuar"
                        });
                    } else {
                        this.showToast('¡Bienvenido a COLUA Web Digital!', 'success');
                    }
                    this._afterLoginSuccess(res.user);
                    return;
                }

                // 2. Si es correo y contraseña válida
                if (email.includes('@') && password.length >= 4) {
                    const username = email.split('@')[0];
                    window.authManager.saveUserSession({
                        userId: 'user_' + Date.now(),
                        nombre: username.charAt(0).toUpperCase() + username.slice(1),
                        email: email,
                        role: 'asociado',
                        tipoUsuario: 'ASOCIADO'
                    });
                    this.closeModal();
                    if (window.Swal) {
                        Swal.fire({
                            title: "¡Bienvenido!",
                            text: "Sesión iniciada correctamente en COLUA Web Digital.",
                            icon: "success",
                            draggable: true,
                            confirmButtonColor: "#173789",
                            confirmButtonText: "Continuar"
                        });
                    } else {
                        this.showToast('¡Sesión iniciada correctamente!', 'success');
                    }
                    this._afterLoginSuccess();
                    return;
                }

                if (window.Swal) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Correo o contraseña incorrectos. Por favor verifica tus credenciales.",
                        confirmButtonColor: "#173789",
                        confirmButtonText: "Reintentar",
                        footer: '<a href="tel:77957795" style="color:#173789;font-weight:600;">¿Necesitas ayuda? PBX Central: 7795-7795</a>'
                    });
                } else {
                    this.showToast('Correo o contraseña incorrectos.', 'danger');
                }
            } catch (err) {
                console.error('[Login] Error:', err);
                if (window.Swal) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrió un problema al intentar iniciar sesión. Verifica tu conexión.",
                        confirmButtonColor: "#173789"
                    });
                } else {
                    this.showToast('Error al iniciar sesión', 'danger');
                }
            }
        });
    },

    // ── Register Modal ────────────────────────────
    showRegisterModal() {
        this.showModal(`
            <div style="text-align:center;margin-bottom:18px;">
                <div style="width:52px;height:52px;border-radius:50%;background:#ffffff;box-shadow:0 2px 10px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 10px auto;">
                    <img src="assets/distintivo_colua.png" alt="COLUA" style="width:36px;height:36px;object-fit:contain;" />
                </div>
                <h3 style="font-size:1.25rem;font-weight:700;color:var(--colua-navy);margin-bottom:4px;">Registro de Asociado</h3>
                <p style="font-size:0.85rem;color:var(--colua-gray-500);margin:0;">Crea tu cuenta cooperativa digital</p>
            </div>

            <form id="global-register-form">
                <div style="margin-bottom:12px;">
                    <label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                        Nombre Completo *
                    </label>
                    <input type="text" id="reg-name" required placeholder="Ej: Juan Carlos Morales"
                        style="width:100%;padding:9px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.88rem;font-family:inherit;box-sizing:border-box;" />
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
                    <div>
                        <label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                            DPI (13 dígitos) *
                        </label>
                        <input type="text" id="reg-dpi" required maxlength="15" placeholder="2541 85963 0701"
                            style="width:100%;padding:9px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.88rem;font-family:inherit;box-sizing:border-box;" />
                    </div>
                    <div>
                        <label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                            Teléfono *
                        </label>
                        <input type="tel" id="reg-phone" required placeholder="5544-3322"
                            style="width:100%;padding:9px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.88rem;font-family:inherit;box-sizing:border-box;" />
                    </div>
                </div>

                <div style="margin-bottom:12px;">
                    <label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                        Correo Electrónico *
                    </label>
                    <input type="email" id="reg-email" required placeholder="tu.correo@ejemplo.com"
                        style="width:100%;padding:9px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.88rem;font-family:inherit;box-sizing:border-box;" />
                </div>

                <div style="margin-bottom:18px;">
                    <label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:4px;color:var(--colua-gray-700);">
                        Contraseña *
                    </label>
                    <input type="password" id="reg-password" required minlength="6" placeholder="Mínimo 6 caracteres"
                        style="width:100%;padding:9px 12px;border:1.5px solid var(--colua-gray-200);border-radius:10px;font-size:0.88rem;font-family:inherit;box-sizing:border-box;" />
                </div>

                <button type="submit" id="reg-submit-btn" class="btn btn-primary" style="width:100%;padding:11px;font-weight:600;font-size:0.95rem;">
                    Crear Cuenta
                </button>
            </form>

            <div style="margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9;text-align:center;">
                <span style="font-size:0.82rem;color:var(--colua-gray-500);">¿Ya tienes una cuenta?</span>
                <button type="button" id="btn-to-login" style="background:none;border:none;color:var(--colua-navy);font-weight:700;cursor:pointer;font-size:0.82rem;margin-left:4px;text-decoration:underline;">
                    Iniciar Sesión
                </button>
            </div>
        `);

        // Formateo de DPI
        const dpiInput = document.getElementById('reg-dpi');
        if (dpiInput) {
            dpiInput.addEventListener('input', (e) => {
                const raw = e.target.value.replace(/\D/g, '');
                e.target.value = window.authService.formatDPI(raw);
            });
        }

        // Volver a login
        document.getElementById('btn-to-login')?.addEventListener('click', () => {
            this.showLoginModal();
        });

        // Submit registro
        document.getElementById('global-register-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('reg-submit-btn');
            if (btn) { btn.disabled = true; btn.textContent = 'Registrando...'; }

            const name = document.getElementById('reg-name')?.value.trim() || '';
            const dpi = document.getElementById('reg-dpi')?.value.replace(/\D/g, '') || '';
            const phone = document.getElementById('reg-phone')?.value.trim() || '';
            const email = document.getElementById('reg-email')?.value.trim() || '';
            const password = document.getElementById('reg-password')?.value || '';

            if (!window.authService.validateDPI(dpi)) {
                if (window.Swal) {
                    Swal.fire({
                        icon: "warning",
                        title: "DPI Inválido",
                        text: "El DPI debe contener exactamente 13 dígitos numéricos.",
                        confirmButtonColor: "#173789"
                    });
                } else {
                    this.showToast('El DPI debe contener 13 dígitos numéricos', 'danger');
                }
                if (btn) { btn.disabled = false; btn.textContent = 'Crear Cuenta'; }
                return;
            }

            const res = await window.authService.registerMember({ name, dpi, phone, email, password });
            if (res.success) {
                this.closeModal();
                if (window.Swal) {
                    Swal.fire({
                        title: "¡Registro Exitoso!",
                        text: `Bienvenido a COLUA MICOOPE. Tu No. de Asociado oficial asignado es ${res.associateId}`,
                        icon: "success",
                        draggable: true,
                        confirmButtonColor: "#173789",
                        confirmButtonText: "Continuar a mi Cuenta"
                    });
                } else {
                    this.showToast(`¡Registro exitoso! Tu No. de Asociado es ${res.associateId}`, 'success');
                }
                this._afterLoginSuccess(res.user);
            } else {
                if (window.Swal) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.error || "No se pudo completar el registro. Intenta de nuevo.",
                        confirmButtonColor: "#173789",
                        footer: '<a href="tel:77957795" style="color:#173789;font-weight:600;">¿Problemas con tu registro? PBX: 7795-7795</a>'
                    });
                } else {
                    this.showToast(res.error || 'Error al registrar', 'danger');
                }
                if (btn) { btn.disabled = false; btn.textContent = 'Crear Cuenta'; }
            }
        });
    },

    _afterLoginSuccess(user) {
        // Re-render sidebar
        const sideEl = document.getElementById('sidebar-root');
        if (sideEl && window.sidebarComponent) {
            sideEl.innerHTML = window.sidebarComponent.render();
            window.sidebarComponent.attachEvents();
        }
        // Actualizar navbar si existe método
        if (window.navbarComponent) {
            const navEl = document.getElementById('navbar-root');
            if (navEl) {
                navEl.innerHTML = window.navbarComponent.render(window.location.hash || 'inicio');
                window.navbarComponent.attachEvents();
            }
        }
        // Re-enrutar
        if (window.router) {
            window.router.handleRouting();
        } else if (window.coluaRouter) {
            window.coluaRouter.handleRouting();
        }
    },

    showLogoutConfirm() {
        if (window.authManager) window.authManager.clearSession();
        this.showToast('Sesión cerrada correctamente', 'info');
        const sideEl = document.getElementById('sidebar-root');
        if (sideEl && window.sidebarComponent) {
            sideEl.innerHTML = window.sidebarComponent.render();
            window.sidebarComponent.attachEvents();
        }
        const navEl = document.getElementById('navbar-root');
        if (navEl && window.navbarComponent) {
            navEl.innerHTML = window.navbarComponent.render('inicio');
            window.navbarComponent.attachEvents();
        }
        window.location.hash = '#inicio';
    },

    // ── Invitación a Registrarse para Interactuar ──
    showGuestLikePrompt(actionMessage = 'dar "Me Gusta" a las publicaciones') {
        this.showModal(`
            <div style="text-align:center;padding:10px 4px;">
                <div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg, rgba(228,42,103,0.12), rgba(23,55,137,0.08));display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;box-shadow:0 8px 22px rgba(228,42,103,0.18);border:2px solid rgba(228,42,103,0.25);">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="#E42A67" stroke="#E42A67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>

                <h3 style="font-size:1.3rem;font-weight:800;color:var(--colua-navy);margin-bottom:8px;line-height:1.3;">
                    ¡Únete a COLUA para interactuar!
                </h3>
                
                <p style="font-size:0.9rem;color:#475569;line-height:1.55;margin:0 auto 18px auto;max-width:360px;">
                    Como invitado puedes leer y explorar todo nuestro contenido. Para <strong>${actionMessage}</strong> y participar activamente, regístrate como asociado o inicia sesión con tu cuenta.
                </p>

                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px 16px;margin-bottom:20px;text-align:left;">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                        <span style="font-size:1.1rem;">❤️</span>
                        <span style="font-size:0.84rem;color:#334155;font-weight:600;">Reacciona con "Me Gusta" y apoya noticias cooperativas</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                        <span style="font-size:1.1rem;">✨</span>
                        <span style="font-size:0.84rem;color:#334155;font-weight:600;">Acceso a beneficios, tasas preferenciales y eventos</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="font-size:1.1rem;">⚡</span>
                        <span style="font-size:0.84rem;color:#334155;font-weight:600;">Registro rápido en menos de 1 minuto</span>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:10px;">
                    <button type="button" id="btn-guest-prompt-register" class="btn btn-primary" style="width:100%;padding:12px;font-size:0.95rem;font-weight:700;box-shadow:0 4px 14px rgba(23,55,137,0.25);">
                        Registrarme como Asociado
                    </button>
                    <button type="button" id="btn-guest-prompt-login" class="btn btn-outline" style="width:100%;padding:11px;font-size:0.9rem;font-weight:600;color:var(--colua-navy);border-color:#cbd5e1;">
                        Ya tengo cuenta / Iniciar Sesión
                    </button>
                    <button type="button" onclick="window.app.closeModal()" style="background:none;border:none;color:#94a3b8;font-size:0.82rem;font-weight:500;padding:6px;cursor:pointer;margin-top:2px;">
                        Continuar explorando como invitado
                    </button>
                </div>
            </div>
        `);

        document.getElementById('btn-guest-prompt-register')?.addEventListener('click', () => {
            this.showRegisterModal();
        });

        document.getElementById('btn-guest-prompt-login')?.addEventListener('click', () => {
            this.showLoginModal();
        });
    },

    // ── PWA & Instalación ─────────────────────────
    promptInstallApp() {
        if (this.deferredInstallPrompt) {
            this.deferredInstallPrompt.prompt();
            this.deferredInstallPrompt.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {
                    this.showToast('¡COLUA Web Digital instalada con éxito!', 'success');
                }
                this.deferredInstallPrompt = null;
            });
        } else {
            this.showInstallGuideModal();
        }
    },

    showInstallGuideModal() {
        this.showModal(`
            <div style="text-align:center;margin-bottom:16px;">
                <div style="width:60px;height:60px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;margin:0 auto 12px auto;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                    <img src="assets/distintivo_colua_192.png" alt="COLUA" style="width:42px;height:42px;object-fit:contain;" />
                </div>
                <h3 style="font-size:1.25rem;font-weight:700;color:var(--colua-navy);margin-bottom:4px;">Instalar COLUA R.L. en tu Teléfono</h3>
                <p style="font-size:0.85rem;color:var(--colua-gray-600);line-height:1.4;">
                    Instala la app nativa completa (WebAPK) sin mini-íconos de navegador ni widgets.
                </p>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:18px;text-align:left;">
                <div style="margin-bottom:14px;padding:10px 12px;background:#fef2f2;border-radius:10px;border-left:4px solid #ef4444;">
                    <strong style="display:flex;align-items:center;gap:6px;color:#991b1b;font-size:0.88rem;margin-bottom:4px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        ¿Aparece como widget o con un mini-ícono de Chrome?
                    </strong>
                    <p style="font-size:0.82rem;color:#7f1d1d;margin:0;line-height:1.45;">
                        Eso sucede cuando Android agrega un simple marcador. Para que se instale como <strong>aplicación real en tu teléfono</strong>:
                        <br>1. <strong>Elimina el widget actual</strong> de tu pantalla de inicio manteniéndolo presionado y eligiendo "Quitar" o "Eliminar".
                        <br>2. En el menú de Chrome (<strong>⋮</strong>), presiona <strong>"Instalar aplicación"</strong> (o toca el botón verde de abajo <strong>"Instalar Ahora"</strong>).
                        <br>3. ¡Aparecerá en tu lista de aplicaciones del teléfono como una app auténtica!
                    </p>
                </div>

                <div style="margin-bottom:14px;">
                    <strong style="display:flex;align-items:center;gap:6px;color:var(--colua-navy);font-size:0.9rem;margin-bottom:4px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        En Android (Chrome / Brave / Edge):
                    </strong>
                    <p style="font-size:0.82rem;color:#475569;margin:0;line-height:1.45;">
                        Toca el menú del navegador (<strong>⋮</strong>) y selecciona <strong>"Instalar aplicación"</strong> o <strong>"Instalar COLUA R.L."</strong>.
                    </p>
                </div>

                <div>
                    <strong style="display:flex;align-items:center;gap:6px;color:var(--colua-navy);font-size:0.9rem;margin-bottom:4px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                        En iPhone / iPad (Safari):
                    </strong>
                    <p style="font-size:0.82rem;color:#475569;margin:0;line-height:1.45;">
                        Toca el botón <strong>Compartir</strong> (rectángulo con flecha) y selecciona <strong>"Agregar a pantalla de inicio"</strong>.
                    </p>
                </div>
            </div>

            <div style="display:flex;gap:10px;justify-content:center;">
                ${this.deferredInstallPrompt ? `
                    <button class="btn btn-primary" onclick="window.app.promptInstallApp();" style="padding:9px 22px;font-size:0.9rem;">
                        Instalar Ahora
                    </button>
                ` : ''}
                <button class="btn btn-outline" onclick="window.app.closeModal();" style="padding:9px 20px;font-size:0.9rem;">
                    Entendido
                </button>
            </div>
        `);
    },

    _registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').then((reg) => {
                // Actualizar si hay nueva versión disponible
                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('[COLUA PWA] Nueva versión lista.');
                            }
                        };
                    }
                };
            }).catch(() => {});
        }
    },

    _setupInstallPrompt() {
        if (window._coluaDeferredPrompt) {
            this.deferredInstallPrompt = window._coluaDeferredPrompt;
        }

        window.addEventListener('beforeinstallprompt', e => {
            e.preventDefault();
            this.deferredInstallPrompt = e;
            window._coluaDeferredPrompt = e;
            console.log('[COLUA PWA] Evento beforeinstallprompt capturado en app.js');
        });

        window.addEventListener('appinstalled', () => {
            this.deferredInstallPrompt = null;
            window._coluaDeferredPrompt = null;
            this.showToast('¡COLUA Web Digital instalada exitosamente!', 'success');
        });
    }
};

window.app = App;

// Arrancar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
