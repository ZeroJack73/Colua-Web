// web/js/components/admin.js - Portal de Administración CMS COLUA R.L.

// Iconos Planos Minimalistas (SVG)
const ADMIN_ICONS = {
    lock: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    shieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    user: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    key: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-1.5 1.5L14 9m0 0l-1.5 1.5M14 9l2 2m-3.5 3.5L3 21l3-3 1.5-1.5 2-2 1.5-1.5"></path></svg>`,
    eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    eyeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
    screens: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    canvas: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
    sync: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>`,
    users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    audit: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
    arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
};

class AdminComponent {
    constructor() {
        this.activeTab = 'pantallas'; // 'pantallas', 'canvas', 'sync', 'rbac', 'audit'
        this.sections = [];
        this.selectedSectionId = null;
        this.selectedContentItems = [];
        this.selectedItemId = null;
        this.selectedItemBlocks = [];
        this.users = [];
        this.auditLogs = [];
        this.syncStatus = null;
        this.gateStep = 1; // 1 = Clave Universal Obligatoria, 2 = Credenciales Administrativas
        this.universalKeyPassed = false;
    }

    async render(container) {
        // Validación de Permisos y 2-Step Gate
        if (!authService.isAdmin()) {
            this.renderAdminLoginGate(container);
            return;
        }

        container.innerHTML = `
            <div class="admin-panel" style="padding-bottom: 90px; background: #f4f6fa; min-height: 100vh;">
                <!-- Header CMS -->
                <div style="background: linear-gradient(135deg, #0a1931 0%, var(--colua-navy) 100%); color: white; padding: 18px 24px; box-shadow: var(--shadow-md);">
                    <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 36px; height: 36px; object-fit: contain;" />
                            <div>
                                <h1 style="font-size: 1.3rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 8px;">
                                    Panel de Control CMS COLUA
                                    <span class="badge" style="background: var(--colua-gold); color: var(--colua-navy); font-size: 0.7rem; font-weight: 700;">
                                        ${authService.isSuperAdmin() ? 'SUPERADMIN' : (authService.isManager() ? 'MANAGER' : 'ADMIN')}
                                    </span>
                                </h1>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Gestor de Contenidos, Pantallas y Seguridad</span>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button id="cms-exit-btn" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.4); font-size: 0.8rem; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">
                                ${ADMIN_ICONS.externalLink} <span>Ver App Web</span>
                            </button>
                            <button id="cms-logout-btn" class="btn" style="background: rgba(228, 42, 103, 0.2); color: #ff85a1; border: 1px solid rgba(228, 42, 103, 0.4); font-size: 0.8rem; padding: 6px 12px;">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tabs de Navegación del CMS -->
                <div style="background: white; border-bottom: 1px solid var(--colua-gray-200); position: sticky; top: 0; z-index: 100;">
                    <div style="max-width: 1400px; margin: 0 auto; display: flex; gap: 4px; overflow-x: auto; padding: 0 16px;">
                        <button class="cms-tab-btn ${this.activeTab === 'pantallas' ? 'active' : ''}" data-tab="pantallas" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${ADMIN_ICONS.screens} <span>Pantallas y Menús</span>
                        </button>
                        <button class="cms-tab-btn ${this.activeTab === 'canvas' ? 'active' : ''}" data-tab="canvas" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${ADMIN_ICONS.canvas} <span>Editor Canvas</span>
                        </button>
                        <button class="cms-tab-btn ${this.activeTab === 'sync' ? 'active' : ''}" data-tab="sync" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${ADMIN_ICONS.sync} <span>Publicación</span>
                        </button>
                        ${authService.isSuperAdmin() ? `
                            <button class="cms-tab-btn ${this.activeTab === 'rbac' ? 'active' : ''}" data-tab="rbac" style="display: inline-flex; align-items: center; gap: 6px;">
                                ${ADMIN_ICONS.users} <span>Usuarios y Roles</span>
                            </button>
                        ` : ''}
                        <button class="cms-tab-btn ${this.activeTab === 'audit' ? 'active' : ''}" data-tab="audit" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${ADMIN_ICONS.audit} <span>Auditoría</span>
                        </button>
                    </div>
                </div>

                <!-- Cuerpo del CMS -->
                <div class="container" style="max-width: 1400px; margin: 20px auto; padding: 0 16px;">
                    <div id="cms-tab-content">
                        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
                            <div class="spinner"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindGlobalEvents(container);
        await this.loadTabContent();
    }

    renderAdminLoginGate(container) {
        // PASO 1 OBLIGATORIO: Validación de la Clave Universal Institucional
        if (!this.universalKeyPassed || this.gateStep === 1) {
            container.innerHTML = `
                <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
                    <div class="card" style="max-width: 420px; width: 100%; padding: 36px 28px; text-align: center; border-top: 3.5px solid var(--colua-navy); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02); border-radius: 14px;">
                        <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(23, 55, 137, 0.06); border: 1px solid rgba(23, 55, 137, 0.12); color: var(--colua-navy); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">
                            ${ADMIN_ICONS.lock}
                        </div>
                        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 6px;">
                            Portal Administrativo
                        </h2>
                        <p style="font-size: 0.84rem; color: var(--colua-gray-600); margin-bottom: 24px; line-height: 1.45;">
                            Ingresa la Clave Universal de seguridad institucional para continuar.
                        </p>

                        <form id="admin-universal-gate-form">
                            <div class="form-group" style="margin-bottom: 22px; text-align: left;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 6px;">
                                    Clave Universal Institucional
                                </label>
                                <div style="position: relative;">
                                    <input type="password" id="admin-universal-input" required placeholder="••••••••••••••••"
                                        autocomplete="off"
                                        style="width: 100%; padding: 11px 44px 11px 14px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.95rem; letter-spacing: 2px;" />
                                    <button type="button" id="toggle-universal-eye" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex; align-items: center; padding: 4px;">
                                        ${ADMIN_ICONS.eye}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.92rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                                <span>Validar Clave Institucional</span>
                                ${ADMIN_ICONS.arrowRight}
                            </button>
                        </form>

                        <div style="margin-top: 26px; border-top: 1px solid var(--colua-gray-100); padding-top: 16px;">
                            <a href="#inicio" style="font-size: 0.82rem; color: var(--colua-navy); text-decoration: none; font-weight: 600;">
                                ← Volver al Inicio
                            </a>
                        </div>
                    </div>
                </div>
            `;

            const formUniversal = container.querySelector('#admin-universal-gate-form');
            const inputUniversal = container.querySelector('#admin-universal-input');
            const eyeBtn = container.querySelector('#toggle-universal-eye');

            if (eyeBtn && inputUniversal) {
                eyeBtn.addEventListener('click', () => {
                    const isPass = inputUniversal.type === 'password';
                    inputUniversal.type = isPass ? 'text' : 'password';
                    eyeBtn.innerHTML = isPass ? ADMIN_ICONS.eyeOff : ADMIN_ICONS.eye;
                });
            }

            if (formUniversal) {
                formUniversal.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const keyVal = inputUniversal.value.trim();
                    const isMaster = await authService.checkAdminMasterPassword(keyVal);
                    if (isMaster) {
                        this.universalKeyPassed = true;
                        this.gateStep = 2;
                        app.showToast('Clave institucional verificada', 'success');
                        this.renderAdminLoginGate(container);
                    } else {
                        app.showToast('Clave Universal incorrecta. Acceso denegado.', 'danger');
                        inputUniversal.value = '';
                        inputUniversal.focus();
                    }
                });
            }
            return;
        }

        // PASO 2: Identificación con Credenciales Administrativas (Super Admin / Admin / Manager)
        container.innerHTML = `
            <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="card" style="max-width: 420px; width: 100%; padding: 32px 28px; text-align: center; border-top: 3.5px solid var(--colua-navy); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02); border-radius: 14px;">
                    <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.74rem; font-weight: 600; color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px;">
                        ${ADMIN_ICONS.shieldCheck} <span>Filtro de Seguridad Aprobado</span>
                    </div>

                    <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(23, 55, 137, 0.06); border: 1px solid rgba(23, 55, 137, 0.12); color: var(--colua-navy); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
                        ${ADMIN_ICONS.user}
                    </div>
                    <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 6px;">
                        Acceso Administrativo CMS
                    </h2>
                    <p style="font-size: 0.84rem; color: var(--colua-gray-600); margin-bottom: 22px; line-height: 1.45;">
                        Ingresa las credenciales autorizadas correspondientes a tu cuenta.
                    </p>

                    <form id="admin-credentials-gate-form">
                        <div class="form-group" style="margin-bottom: 14px; text-align: left;">
                            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                Correo o Usuario
                            </label>
                            <input type="text" id="admin-user-input" required placeholder="••••••••••••••••"
                                autocomplete="username"
                                style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                        </div>

                        <div class="form-group" style="margin-bottom: 22px; text-align: left;">
                            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                Contraseña
                            </label>
                            <div style="position: relative;">
                                <input type="password" id="admin-pass-input" required placeholder="••••••••••••••••"
                                    autocomplete="current-password"
                                    style="width: 100%; padding: 10px 44px 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem; letter-spacing: 2px;" />
                                <button type="button" id="toggle-pass-eye" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex; align-items: center; padding: 4px;">
                                    ${ADMIN_ICONS.eye}
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.92rem; font-weight: 600;">
                            Ingresar al Panel
                        </button>

                        <div style="margin-top: 14px;">
                            <button type="button" id="btn-back-to-step1" style="background: none; border: none; font-size: 0.8rem; color: var(--colua-gray-500); cursor: pointer; text-decoration: underline;">
                                ← Cambiar Clave Universal
                            </button>
                        </div>
                    </form>

                    <div style="margin-top: 24px; border-top: 1px solid var(--colua-gray-100); padding-top: 16px;">
                        <a href="#inicio" style="font-size: 0.82rem; color: var(--colua-navy); text-decoration: none; font-weight: 600;">
                            ← Volver al Inicio
                        </a>
                    </div>
                </div>
            </div>
        `;

        const formCredentials = container.querySelector('#admin-credentials-gate-form');
        const passInput = container.querySelector('#admin-pass-input');
        const eyeBtn = container.querySelector('#toggle-pass-eye');
        const backBtn = container.querySelector('#btn-back-to-step1');

        if (eyeBtn && passInput) {
            eyeBtn.addEventListener('click', () => {
                const isPass = passInput.type === 'password';
                passInput.type = isPass ? 'text' : 'password';
                eyeBtn.innerHTML = isPass ? ADMIN_ICONS.eyeOff : ADMIN_ICONS.eye;
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.gateStep = 1;
                this.universalKeyPassed = false;
                this.renderAdminLoginGate(container);
            });
        }

        if (formCredentials) {
            formCredentials.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userVal = container.querySelector('#admin-user-input').value.trim();
                const passVal = passInput.value;

                const res = await authService.loginWithEmail(userVal, passVal);
                if (res.success && authService.isAdmin()) {
                    const roleLabel = authService.isSuperAdmin() ? 'Super Administrador' : (authService.isManager() ? 'Manager' : 'Administrador');
                    app.showToast(`Bienvenido al Panel CMS (${roleLabel})`, 'success');
                    this.render(container);
                } else {
                    app.showToast(res.error || 'Credenciales incorrectas o usuario no autorizado', 'danger');
                }
            });
        }
    }

    bindGlobalEvents(container) {
        const tabBtns = container.querySelectorAll('.cms-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeTab = btn.dataset.tab;
                await this.loadTabContent();
            });
        });

        const exitBtn = container.querySelector('#cms-exit-btn');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                window.location.hash = '#inicio';
            });
        }

        const logoutBtn = container.querySelector('#cms-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                authService.currentAdminSession = null;
                app.showToast('Sesión de administración cerrada', 'info');
                this.render(document.getElementById('main-content'));
            });
        }
    }

    async loadTabContent() {
        const contentEl = document.getElementById('cms-tab-content');
        if (!contentEl) return;

        contentEl.innerHTML = `<div style="text-align: center; padding: 40px;"><div class="spinner"></div></div>`;

        try {
            switch (this.activeTab) {
                case 'pantallas':
                    await this.renderTabPantallas(contentEl);
                    break;
                case 'canvas':
                    await this.renderTabCanvas(contentEl);
                    break;
                case 'sync':
                    await this.renderTabSync(contentEl);
                    break;
                case 'rbac':
                    await this.renderTabRBAC(contentEl);
                    break;
                case 'audit':
                    await this.renderTabAudit(contentEl);
                    break;
            }
        } catch (error) {
            console.error('Error cargando pestaña CMS:', error);
            contentEl.innerHTML = `<div class="card" style="padding: 24px; color: red;">Error: ${error.message}</div>`;
        }
    }

    // ==========================================
    // TAB 1: PANTALLAS Y MENÚS
    // ==========================================
    async renderTabPantallas(container) {
        this.sections = await coluaRepo.getSections();

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div>
                    <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 4px 0;">
                        Gestor de Pantallas y Secciones
                    </h2>
                    <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin: 0;">
                        Organiza el orden, visibilidad y ubicación de cada pantalla en el menú lateral, cuadrícula y barra inferior.
                    </p>
                </div>
                <button id="add-new-section-btn" class="btn btn-primary" style="font-size: 0.85rem;">
                    ➕ Crear Nueva Sección
                </button>
            </div>

            <div class="card" style="padding: 0; overflow: hidden; background: white;">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                        <thead style="background: var(--colua-gray-50); border-bottom: 1.5px solid var(--colua-gray-200); color: var(--colua-gray-700);">
                            <tr>
                                <th style="padding: 12px 16px; width: 60px;">Orden</th>
                                <th style="padding: 12px 16px;">Sección / Título</th>
                                <th style="padding: 12px 16px;">Ruta (Slug)</th>
                                <th style="padding: 12px 16px;">Ubicación de Menú</th>
                                <th style="padding: 12px 16px;">Estado</th>
                                <th style="padding: 12px 16px; text-align: right;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.sections.map((sec, idx) => `
                                <tr style="border-bottom: 1px solid var(--colua-gray-100);">
                                    <td style="padding: 12px 16px; font-weight: 700; color: var(--colua-navy);">${sec.orderIndex ?? idx + 1}</td>
                                    <td style="padding: 12px 16px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <span style="font-size: 1.2rem;">${sec.icon || '📄'}</span>
                                            <div>
                                                <strong style="color: var(--colua-navy); display: block;">${sec.title}</strong>
                                                <span style="font-size: 0.75rem; color: var(--colua-gray-500);">${sec.subtitle || 'Sin subtítulo'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="padding: 12px 16px; font-family: monospace; color: var(--colua-gray-600);">#${sec.slug || sec.id}</td>
                                    <td style="padding: 12px 16px;">
                                        <span class="badge" style="background: rgba(23, 55, 137, 0.08); color: var(--colua-navy);">
                                            ${sec.menuPlacement || 'grid_and_drawer'}
                                        </span>
                                    </td>
                                    <td style="padding: 12px 16px;">
                                        <span class="badge" style="background: ${sec.isEnabled !== false ? 'rgba(89, 184, 164, 0.15)' : 'rgba(228, 42, 103, 0.15)'}; color: ${sec.isEnabled !== false ? 'var(--colua-green)' : 'var(--colua-pink)'};">
                                            ${sec.isEnabled !== false ? 'Activo' : 'Oculto'}
                                        </span>
                                    </td>
                                    <td style="padding: 12px 16px; text-align: right;">
                                        <button class="btn btn-outline edit-sec-btn" data-id="${sec.id}" style="padding: 4px 8px; font-size: 0.78rem; margin-right: 4px;">
                                            Editar
                                        </button>
                                        <button class="btn btn-outline edit-canvas-link" data-id="${sec.id}" style="padding: 4px 8px; font-size: 0.78rem; border-color: var(--colua-green); color: var(--colua-green);">
                                            Canvas
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Eventos
        container.querySelector('#add-new-section-btn')?.addEventListener('click', () => {
            this.showEditSectionModal(null);
        });

        container.querySelectorAll('.edit-sec-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sec = this.sections.find(s => s.id === btn.dataset.id);
                if (sec) this.showEditSectionModal(sec);
            });
        });

        container.querySelectorAll('.edit-canvas-link').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectedSectionId = btn.dataset.id;
                this.activeTab = 'canvas';
                const tabBtn = document.querySelector('.cms-tab-btn[data-tab="canvas"]');
                if (tabBtn) tabBtn.click();
            });
        });
    }

    showEditSectionModal(sec) {
        const isNew = !sec;
        const currentData = sec || {
            id: 'seccion_' + Date.now(),
            title: '',
            subtitle: '',
            slug: '',
            icon: '📄',
            colorHex: '#173789',
            menuPlacement: 'grid_and_drawer',
            orderIndex: this.sections.length + 1,
            isEnabled: true
        };

        const modalHtml = `
            <div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 16px;">
                    ${isNew ? 'Nueva Sección' : `Editar Sección: ${currentData.title}`}
                </h3>

                <form id="section-edit-form">
                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Título de la Sección *</label>
                        <input type="text" id="sec-title" value="${currentData.title}" required style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Subtítulo o Descripción Breve</label>
                        <input type="text" id="sec-subtitle" value="${currentData.subtitle || ''}" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Ruta / Slug (#)</label>
                            <input type="text" id="sec-slug" value="${currentData.slug || currentData.id}" required style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Ícono / Emoji</label>
                            <input type="text" id="sec-icon" value="${currentData.icon || '📄'}" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Ubicación en Menús</label>
                            <select id="sec-placement" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem;">
                                <option value="grid_and_drawer" ${currentData.menuPlacement === 'grid_and_drawer' ? 'selected' : ''}>Cuadrícula y Menú Lateral</option>
                                <option value="grid_only" ${currentData.menuPlacement === 'grid_only' ? 'selected' : ''}>Solo Cuadrícula</option>
                                <option value="drawer_only" ${currentData.menuPlacement === 'drawer_only' ? 'selected' : ''}>Solo Menú Lateral</option>
                                <option value="hidden" ${currentData.menuPlacement === 'hidden' ? 'selected' : ''}>Oculto</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Orden Numérico</label>
                            <input type="number" id="sec-order" value="${currentData.orderIndex || 1}" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer;">
                            <input type="checkbox" id="sec-enabled" ${currentData.isEnabled !== false ? 'checked' : ''} style="width: 18px; height: 18px;" />
                            <span>Sección habilitada y visible para usuarios</span>
                        </label>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Sección</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalHtml);

        document.getElementById('section-edit-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const updated = {
                ...currentData,
                title: document.getElementById('sec-title').value.trim(),
                subtitle: document.getElementById('sec-subtitle').value.trim(),
                slug: document.getElementById('sec-slug').value.trim().toLowerCase(),
                icon: document.getElementById('sec-icon').value.trim(),
                menuPlacement: document.getElementById('sec-placement').value,
                orderIndex: parseInt(document.getElementById('sec-order').value) || 1,
                isEnabled: document.getElementById('sec-enabled').checked,
                isDraft: true,
                lastModified: Date.now()
            };

            await coluaRepo.saveSection(updated);
            app.closeModal();
            app.showToast('Sección guardada en borrador', 'success');
            await this.loadTabContent();
        });
    }

    // ==========================================
    // TAB 2: CANVAS Y EDITOR DE CONTENIDOS
    // ==========================================
    async renderTabCanvas(container) {
        this.sections = await coluaRepo.getSections();
        if (!this.selectedSectionId && this.sections.length > 0) {
            this.selectedSectionId = this.sections[0].id;
        }

        this.selectedContentItems = await coluaRepo.getContentItemsBySection(this.selectedSectionId);

        container.innerHTML = `
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <!-- Sidebar de Selección de Sección -->
                <div style="width: 280px; background: white; border-radius: 16px; padding: 16px; box-shadow: var(--shadow-sm); height: fit-content;">
                    <h3 style="font-size: 1rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 12px;">
                        Selecciona Sección
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${this.sections.map(s => `
                            <button class="canvas-sec-select-btn ${s.id === this.selectedSectionId ? 'active' : ''}" data-id="${s.id}"
                                style="text-align: left; padding: 10px 12px; border-radius: 10px; border: 1px solid ${s.id === this.selectedSectionId ? 'var(--colua-navy)' : 'var(--colua-gray-200)'}; background: ${s.id === this.selectedSectionId ? 'rgba(23, 55, 137, 0.08)' : 'white'}; font-weight: ${s.id === this.selectedSectionId ? '700' : '500'}; cursor: pointer;">
                                ${s.icon || '📄'} ${s.title}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Editor Principal Canvas -->
                <div style="flex: 1; min-width: 320px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 2px 0;">
                                Tarjetas y Contenidos de: ${this.sections.find(s => s.id === this.selectedSectionId)?.title || ''}
                            </h2>
                            <span style="font-size: 0.82rem; color: var(--colua-gray-500);">${this.selectedContentItems.length} elementos configurados</span>
                        </div>
                        <button id="add-content-item-btn" class="btn btn-primary" style="font-size: 0.85rem;">
                            ➕ Agregar Tarjeta de Contenido
                        </button>
                    </div>

                    <!-- Lista de Tarjetas del Canvas -->
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        ${this.selectedContentItems.length === 0 ? `
                            <div class="card" style="padding: 40px; text-align: center; background: white;">
                                <p style="color: var(--colua-gray-500); margin-bottom: 14px;">No hay tarjetas registradas en esta sección todavía.</p>
                                <button id="add-content-item-empty-btn" class="btn btn-outline" style="font-size: 0.85rem;">Crear primera tarjeta</button>
                            </div>
                        ` : this.selectedContentItems.map((item, idx) => `
                            <div class="card" style="padding: 16px; background: white; border-left: 4px solid var(--colua-navy);">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                                    <div style="display: flex; gap: 12px; align-items: center;">
                                        <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--colua-gray-100); overflow: hidden; display: flex; align-items: center; justify-content: center;">
                                            ${item.imageUrl ? `<img src="${item.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />` : `<span style="font-size: 1.2rem;">${item.icon || '📄'}</span>`}
                                        </div>
                                        <div>
                                            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 2px 0;">${item.title}</h4>
                                            <span style="font-size: 0.78rem; color: var(--colua-gray-500);">${item.subtitle || item.category || 'General'}</span>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 6px;">
                                        <button class="btn btn-outline edit-item-btn" data-id="${item.id}" style="padding: 4px 8px; font-size: 0.78rem;">Editar</button>
                                        <button class="btn btn-outline manage-blocks-btn" data-id="${item.id}" style="padding: 4px 8px; font-size: 0.78rem; border-color: var(--colua-orange); color: var(--colua-orange);">Bloques</button>
                                        <button class="btn btn-outline delete-item-btn" data-id="${item.id}" style="padding: 4px 8px; font-size: 0.78rem; color: var(--colua-pink); border-color: var(--colua-pink); display: inline-flex; align-items: center;" title="Eliminar">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin: 0 0 10px 0; line-height: 1.4;">${item.description || item.summary || ''}</p>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <span class="badge" style="background: var(--colua-gray-100); color: var(--colua-gray-700); font-size: 0.72rem;">Orden: ${item.orderIndex ?? idx + 1}</span>
                                    <span class="badge" style="background: ${item.isEnabled !== false ? 'rgba(89, 184, 164, 0.15)' : 'rgba(228, 42, 103, 0.15)'}; color: ${item.isEnabled !== false ? 'var(--colua-green)' : 'var(--colua-pink)'}; font-size: 0.72rem;">
                                        ${item.isEnabled !== false ? 'Visible' : 'Oculto'}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Eventos
        container.querySelectorAll('.canvas-sec-select-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                this.selectedSectionId = btn.dataset.id;
                await this.renderTabCanvas(container);
            });
        });

        container.querySelector('#add-content-item-btn')?.addEventListener('click', () => {
            this.showEditItemModal(null);
        });

        container.querySelector('#add-content-item-empty-btn')?.addEventListener('click', () => {
            this.showEditItemModal(null);
        });

        container.querySelectorAll('.edit-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = this.selectedContentItems.find(i => i.id === btn.dataset.id);
                if (item) this.showEditItemModal(item);
            });
        });

        container.querySelectorAll('.manage-blocks-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showBlocksEditorModal(btn.dataset.id);
            });
        });

        container.querySelectorAll('.delete-item-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                let confirmed = false;
                if (window.Swal) {
                    const res = await Swal.fire({
                        title: '¿Eliminar contenido?',
                        text: 'Esta acción no se puede deshacer.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#ef4444',
                        cancelButtonColor: '#64748b',
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar'
                    });
                    confirmed = res.isConfirmed;
                } else {
                    confirmed = confirm('¿Estás seguro de eliminar este contenido?');
                }

                if (confirmed) {
                    await coluaRepo.deleteContentItem(btn.dataset.id);
                    if (window.Swal) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'El contenido ha sido eliminado.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    } else {
                        app.showToast('Contenido eliminado', 'info');
                    }
                    await this.renderTabCanvas(container);
                }
            });
        });
    }

    showEditItemModal(item) {
        const isNew = !item;
        const currentData = item || {
            id: 'item_' + Date.now(),
            sectionId: this.selectedSectionId,
            title: '',
            subtitle: '',
            description: '',
            imageUrl: '',
            icon: '📄',
            orderIndex: this.selectedContentItems.length + 1,
            isEnabled: true
        };

        const modalHtml = `
            <div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 16px;">
                    ${isNew ? 'Nueva Tarjeta de Contenido' : `Editar: ${currentData.title}`}
                </h3>

                <form id="item-edit-form">
                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Título Principal *</label>
                        <input type="text" id="item-title" value="${currentData.title}" required style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Subtítulo / Categoría</label>
                        <input type="text" id="item-subtitle" value="${currentData.subtitle || ''}" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Descripción Detallada</label>
                        <textarea id="item-desc" rows="3" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.88rem;">${currentData.description || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Fecha de Publicación * <span style="font-size: 0.76rem; font-weight: 400; color: var(--colua-gray-500);">(La fecha más reciente encabezará como novedad)</span>
                        </label>
                        <input type="datetime-local" id="item-pub-date" value="${(() => {
                            const raw = currentData.publicationDate || Date.now();
                            const d = new Date(typeof raw === 'number' ? raw : Number(raw) || Date.now());
                            return isNaN(d.getTime()) ? new Date().toISOString().slice(0, 16) : new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
                        })()}" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.9rem;" />
                    </div>

                    <!-- Subida de Imagen a Supabase Storage -->
                    <div class="form-group" style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">Imagen de Portada (Supabase Storage)</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="file" id="item-file-input" accept="image/*" style="font-size: 0.8rem;" />
                            <span id="upload-status" style="font-size: 0.8rem; color: var(--colua-green);"></span>
                        </div>
                        <input type="text" id="item-img-url" value="${currentData.imageUrl || ''}" placeholder="O escribe URL de la imagen" style="width: 100%; padding: 6px 10px; border: 1px solid var(--colua-gray-200); border-radius: 6px; font-size: 0.8rem; margin-top: 6px;" />
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Tarjeta</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalHtml);

        const fileInput = document.getElementById('item-file-input');
        const imgUrlInput = document.getElementById('item-img-url');
        const uploadStatus = document.getElementById('upload-status');

        if (fileInput) {
            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    uploadStatus.textContent = '⏳ Subiendo y optimizando...';
                    const res = await supabaseClient.uploadImage(file, 'imagenes', `item_${Date.now()}`);
                    if (res.success) {
                        imgUrlInput.value = res.url;
                        uploadStatus.textContent = '✅ Subida exitosa';
                    } else {
                        uploadStatus.textContent = '⚠️ Usando respaldo base64';
                        imgUrlInput.value = res.url;
                    }
                }
            });
        }

        document.getElementById('item-edit-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const pubDateInput = document.getElementById('item-pub-date');
            let chosenTimestamp = currentData.publicationDate || Date.now();
            if (pubDateInput && pubDateInput.value) {
                const parsed = new Date(pubDateInput.value).getTime();
                if (!isNaN(parsed)) chosenTimestamp = parsed;
            }

            const updated = {
                ...currentData,
                sectionId: this.selectedSectionId,
                title: document.getElementById('item-title').value.trim(),
                subtitle: document.getElementById('item-subtitle').value.trim(),
                description: document.getElementById('item-desc').value.trim(),
                imageUrl: imgUrlInput.value.trim(),
                publicationDate: chosenTimestamp,
                isDraft: true,
                lastModified: Date.now()
            };

            await coluaRepo.saveContentItem(updated);
            app.closeModal();
            app.showToast('Tarjeta guardada en borrador', 'success');
            await this.loadTabContent();
        });
    }

    async showBlocksEditorModal(itemId) {
        const blocks = await coluaRepo.getContentBlocksByItem(itemId);
        
        const modalHtml = `
            <div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 8px;">
                    Editor de Bloques Atómicos
                </h3>
                <p style="font-size: 0.82rem; color: var(--colua-gray-600); margin-bottom: 16px;">
                    Agrega párrafos, listas de requisitos, alertas y destacados a este elemento.
                </p>

                <div id="blocks-list-container" style="max-height: 50vh; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                    ${blocks.length === 0 ? '<p style="font-size: 0.85rem; color: var(--colua-gray-500); text-align: center;">No hay bloques todavía.</p>' : blocks.map(b => `
                        <div style="background: var(--colua-gray-50); padding: 10px; border-radius: 8px; border: 1px solid var(--colua-gray-200); display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                            <div>
                                <span class="badge" style="background: var(--colua-navy); color: white; font-size: 0.65rem; margin-bottom: 4px;">${b.blockType || 'Párrafo'}</span>
                                <div style="font-size: 0.85rem; color: var(--colua-gray-800);">${b.content || ''}</div>
                            </div>
                            <button class="btn btn-outline del-block-btn" data-id="${b.id}" style="padding: 4px 6px; font-size: 0.75rem; color: red; display: inline-flex; align-items: center;" title="Eliminar bloque">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <!-- Formulario Agregar Bloque -->
                <div style="border-top: 1px solid var(--colua-gray-200); padding-top: 14px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <select id="new-block-type" style="padding: 6px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.82rem;">
                            <option value="paragraph">Párrafo Normal</option>
                            <option value="bullet">Elemento de Lista / Requisito</option>
                            <option value="callout">Nota / Alerta Informativa</option>
                            <option value="highlight">Cifra / Destacado</option>
                        </select>
                    </div>
                    <textarea id="new-block-content" placeholder="Escribe el contenido del bloque..." rows="2" style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem; margin-bottom: 10px;"></textarea>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button class="btn btn-outline" onclick="app.closeModal()" style="font-size: 0.82rem;">Cerrar</button>
                        <button id="add-block-btn" class="btn btn-primary" style="font-size: 0.82rem;">➕ Agregar Bloque</button>
                    </div>
                </div>
            </div>
        `;

        app.showModal(modalHtml);

        document.getElementById('add-block-btn')?.addEventListener('click', async () => {
            const content = document.getElementById('new-block-content').value.trim();
            const blockType = document.getElementById('new-block-type').value;

            if (content) {
                await coluaRepo.saveContentBlock({
                    id: 'block_' + Date.now(),
                    itemId,
                    blockType,
                    content,
                    orderIndex: blocks.length + 1
                });
                app.showToast('Bloque agregado', 'success');
                this.showBlocksEditorModal(itemId);
            }
        });

        document.querySelectorAll('.del-block-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                await coluaRepo.deleteContentBlock(btn.dataset.id);
                this.showBlocksEditorModal(itemId);
            });
        });
    }

    // ==========================================
    // TAB 3: CONTROL DE VERSIONES Y SYNC
    // ==========================================
    async renderTabSync(container) {
        this.syncStatus = await coluaRepo.getSyncStatus();

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="card" style="padding: 24px; margin-bottom: 20px; background: white; border-top: 4px solid var(--colua-green);">
                    <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 8px; display: inline-flex; align-items: center; gap: 8px;">
                        ${ADMIN_ICONS.sync} <span>Publicación y Sincronización en la Nube</span>
                    </h2>
                    <p style="font-size: 0.88rem; color: var(--colua-gray-600); margin-bottom: 20px;">
                        Todos los cambios guardados como borradores deben publicarse para que sean visibles inmediatamente en todas las aplicaciones web y móviles de COLUA R.L.
                    </p>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
                        <div style="background: var(--colua-gray-50); padding: 14px; border-radius: 12px;">
                            <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Versión en Producción:</span>
                            <strong style="font-size: 1.4rem; color: var(--colua-navy);">${this.syncStatus.version}</strong>
                        </div>
                        <div style="background: var(--colua-gray-50); padding: 14px; border-radius: 12px;">
                            <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Cambios Pendientes (Borradores):</span>
                            <strong style="font-size: 1.4rem; color: ${this.syncStatus.draftsCount > 0 ? 'var(--colua-orange)' : 'var(--colua-green)'};">
                                ${this.syncStatus.draftsCount} pendientes
                            </strong>
                        </div>
                        <div style="background: var(--colua-gray-50); padding: 14px; border-radius: 12px;">
                            <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Última Publicación:</span>
                            <strong style="font-size: 0.95rem; color: var(--colua-gray-700);">
                                ${this.syncStatus.lastPublishedAt ? new Date(this.syncStatus.lastPublishedAt).toLocaleString() : 'Reciente'}
                            </strong>
                        </div>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end;">
                        <button id="restore-backup-btn" class="btn btn-outline" style="font-size: 0.9rem;">
                            Revertir a Versión Anterior
                        </button>
                        <button id="publish-cloud-btn" class="btn btn-primary" style="font-size: 0.9rem; padding: 10px 24px;">
                            Publicar Cambios a Producción
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('#publish-cloud-btn')?.addEventListener('click', async () => {
            const btn = container.querySelector('#publish-cloud-btn');
            btn.disabled = true;
            btn.textContent = 'Publicando cambios...';

            const user = authService.getCurrentUser();
            const res = await coluaRepo.publishDraftsToProduction(user?.email || 'admin@colua.com.gt');

            if (res.success) {
                app.showToast(`¡Versión ${res.version} publicada exitosamente!`, 'success');
                await this.loadTabContent();
            } else {
                app.showToast('Error al publicar: ' + res.error, 'danger');
                btn.disabled = false;
                btn.textContent = 'Publicar Cambios a Producción';
            }
        });
    }

    // ==========================================
    // TAB 4: USUARIOS Y ROLES (RBAC)
    // ==========================================
    async renderTabRBAC(container) {
        this.users = await coluaRepo.getAllUsers();
        const isSuper = authService.isSuperAdmin();

        container.innerHTML = `
            ${isSuper ? `
                <!-- Panel Superior para Super Admin: Clave Universal y Autorización de Roles -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    <!-- Card 1: Cambio de Clave Universal Institucional -->
                    <div class="card" style="background: white; border-top: 4px solid var(--colua-gold); padding: 20px; box-shadow: var(--shadow-sm);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 4px 0; display: inline-flex; align-items: center; gap: 6px;">
                                    ${ADMIN_ICONS.key} <span>Clave Universal Institucional</span>
                                </h3>
                                <p style="font-size: 0.78rem; color: var(--colua-gray-600); margin: 0;">
                                    Acceso maestro universal. Cámbiala aquí para invalidar claves anteriores.
                                </p>
                            </div>
                            <span class="badge" style="background: rgba(239, 136, 25, 0.15); color: #b75e00; font-size: 0.7rem; font-weight: 700;">
                                SHA-256
                            </span>
                        </div>

                        <form id="form-change-master-key">
                            <div class="form-group" style="margin-bottom: 10px;">
                                <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                    Clave Universal Actual
                                </label>
                                <input type="password" id="input-curr-master-key" required placeholder="••••••••••••••••"
                                    style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem; letter-spacing: 2px;" />
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Nueva Clave
                                    </label>
                                    <input type="password" id="input-new-master-key" required placeholder="••••••••••••••••"
                                        style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem; letter-spacing: 2px;" />
                                </div>
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Confirmar Clave
                                    </label>
                                    <input type="password" id="input-confirm-master-key" required placeholder="••••••••••••••••"
                                        style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem; letter-spacing: 2px;" />
                                </div>
                            </div>

                            <button type="submit" id="btn-save-master-key" class="btn btn-primary" style="width: 100%; padding: 9px; font-size: 0.84rem; font-weight: 600;">
                                Actualizar Clave Universal
                            </button>
                        </form>
                    </div>

                    <!-- Card 2: Autorizar Nuevo Administrador o Manager -->
                    <div class="card" style="background: white; border-top: 4px solid var(--colua-navy); padding: 20px; box-shadow: var(--shadow-sm);">
                        <div style="margin-bottom: 12px;">
                            <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 4px 0; display: inline-flex; align-items: center; gap: 6px;">
                                ${ADMIN_ICONS.plus} <span>Autorizar Administrador / Manager</span>
                            </h3>
                            <p style="font-size: 0.78rem; color: var(--colua-gray-600); margin: 0;">
                                Otorga credenciales específicas a colaboradores institucionales.
                            </p>
                        </div>

                        <form id="form-add-admin-manager">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Nombre Completo
                                    </label>
                                    <input type="text" id="input-new-admin-name" required placeholder="ej: Lic. Carlos Gómez"
                                        style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem;" />
                                </div>
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Correo Institucional
                                    </label>
                                    <input type="email" id="input-new-admin-email" required placeholder="ej: cgomez@colua.com.gt"
                                        style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem;" />
                                </div>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Rol Asignado
                                    </label>
                                    <select id="select-new-admin-role" style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem;">
                                        <option value="manager">Manager (Contenidos / Medios)</option>
                                        <option value="admin">Administrador (Operativo)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                                        Contraseña Inicial
                                    </label>
                                    <input type="password" id="input-new-admin-pass" required placeholder="••••••••••••••••"
                                        style="width: 100%; padding: 8px 10px; border: 1.5px solid var(--colua-gray-200); border-radius: 8px; font-size: 0.85rem; letter-spacing: 2px;" />
                                </div>
                            </div>

                            <button type="submit" class="btn" style="width: 100%; padding: 9px; font-size: 0.84rem; font-weight: 600; background: var(--colua-navy); color: white; border: none; border-radius: 8px;">
                                Registrar y Autorizar Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            ` : `
                <!-- Aviso para Manager / Admin con permisos operativos -->
                <div class="card" style="background: rgba(23, 55, 137, 0.05); border-left: 4px solid var(--colua-navy); padding: 14px 18px; margin-bottom: 20px;">
                    <span style="font-size: 0.85rem; color: var(--colua-navy); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                        ${ADMIN_ICONS.shieldCheck} <span>Modo Operativo: Tu cuenta posee permisos de gestión de contenidos y auditoría. La Clave Universal Institucional y la asignación de roles están gestionadas exclusivamente por el Super Administrador.</span>
                    </span>
                </div>
            `}

            <!-- Listado y Tabla de Usuarios y Roles -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--colua-navy); margin: 0 0 2px 0;">
                        Control de Accesos Basado en Roles (RBAC)
                    </h2>
                    <span style="font-size: 0.8rem; color: var(--colua-gray-500);">${this.users.length} cuentas registradas en el sistema</span>
                </div>
                <input type="text" id="user-rbac-search" placeholder="Buscar por nombre, correo o DPI..." 
                    style="padding: 8px 14px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.85rem; width: 260px;" />
            </div>

            <div class="card" style="padding: 0; overflow: hidden; background: white; box-shadow: var(--shadow-sm);">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.86rem;">
                        <thead style="background: var(--colua-gray-50); border-bottom: 1.5px solid var(--colua-gray-200); color: var(--colua-gray-700);">
                            <tr>
                                <th style="padding: 12px 16px;">Usuario / Nombre</th>
                                <th style="padding: 12px 16px;">Correo</th>
                                <th style="padding: 12px 16px;">DPI / CUI</th>
                                <th style="padding: 12px 16px;">No. Asociado</th>
                                <th style="padding: 12px 16px;">Rol Asignado</th>
                                <th style="padding: 12px 16px; text-align: right;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="rbac-users-tbody">
                            ${this.renderUserRows(this.users, isSuper)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Formulario Cambio de Clave Universal
        const formChangeKey = container.querySelector('#form-change-master-key');
        if (formChangeKey) {
            formChangeKey.addEventListener('submit', async (e) => {
                e.preventDefault();
                const currKey = container.querySelector('#input-curr-master-key').value.trim();
                const newKey = container.querySelector('#input-new-master-key').value.trim();
                const confirmKey = container.querySelector('#input-confirm-master-key').value.trim();

                const isCurrentValid = await authService.checkAdminMasterPassword(currKey);
                if (!isCurrentValid) {
                    app.showToast('La Clave Universal actual es incorrecta', 'danger');
                    return;
                }

                if (newKey.length < 4) {
                    app.showToast('La nueva clave debe tener al menos 4 caracteres', 'warning');
                    return;
                }

                if (newKey !== confirmKey) {
                    app.showToast('La nueva clave y su confirmación no coinciden', 'danger');
                    return;
                }

                const res = await authService.updateMasterPassword(newKey);
                if (res.success) {
                    app.showToast('¡Clave Universal actualizada exitosamente!', 'success');
                    formChangeKey.reset();
                } else {
                    app.showToast(res.error || 'Error al actualizar clave', 'danger');
                }
            });
        }

        // Formulario Alta Nuevo Admin / Manager
        const formAddAdmin = container.querySelector('#form-add-admin-manager');
        if (formAddAdmin) {
            formAddAdmin.addEventListener('submit', async (e) => {
                e.preventDefault();
                const nombre = container.querySelector('#input-new-admin-name').value.trim();
                const email = container.querySelector('#input-new-admin-email').value.trim();
                const role = container.querySelector('#select-new-admin-role').value;
                const password = container.querySelector('#input-new-admin-pass').value;

                const res = await coluaRepo.addAdminOrManager({ nombre, email, role, password });
                if (res.success) {
                    app.showToast(`¡${role.toUpperCase()} ${nombre} registrado exitosamente!`, 'success');
                    formAddAdmin.reset();
                    this.users = await coluaRepo.getAllUsers();
                    const tbody = document.getElementById('rbac-users-tbody');
                    if (tbody) tbody.innerHTML = this.renderUserRows(this.users, isSuper);
                    this.bindUserRowEvents();
                } else {
                    app.showToast('Error al registrar usuario administrativo', 'danger');
                }
            });
        }

        // Búsqueda de usuarios
        const searchInput = container.querySelector('#user-rbac-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                const filtered = this.users.filter(u => 
                    (u.nombre || '').toLowerCase().includes(q) ||
                    (u.email || '').toLowerCase().includes(q) ||
                    (u.dpi || '').includes(q) ||
                    (u.associateId || '').includes(q)
                );
                const tbody = document.getElementById('rbac-users-tbody');
                if (tbody) tbody.innerHTML = this.renderUserRows(filtered, isSuper);
                this.bindUserRowEvents();
            });
        }

        this.bindUserRowEvents();
    }

    renderUserRows(usersList, isSuper = true) {
        if (usersList.length === 0) {
            return `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--colua-gray-500);">No se encontraron usuarios.</td></tr>`;
        }

        return usersList.map(u => {
            const role = (u.role || 'invitado').toLowerCase();
            const badgeBg = role === 'superadmin' 
                ? 'var(--colua-navy)' 
                : (role === 'admin' 
                    ? 'var(--colua-green)' 
                    : (role === 'manager' 
                        ? '#634794' 
                        : 'var(--colua-gray-200)'));
            const badgeColor = (role === 'superadmin' || role === 'admin' || role === 'manager') ? 'white' : 'var(--colua-gray-800)';

            return `
                <tr style="border-bottom: 1px solid var(--colua-gray-100);">
                    <td style="padding: 12px 16px; font-weight: 600; color: var(--colua-navy);">${u.nombre || 'Sin nombre'}</td>
                    <td style="padding: 12px 16px; color: var(--colua-gray-600); font-size: 0.82rem;">${u.email || 'N/A'}</td>
                    <td style="padding: 12px 16px; font-family: monospace; font-size: 0.82rem;">${u.dpi || 'N/A'}</td>
                    <td style="padding: 12px 16px; font-family: monospace; font-weight: 700; color: var(--colua-navy);">${u.associateId || 'N/A'}</td>
                    <td style="padding: 12px 16px;">
                        <span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.75rem; text-transform: uppercase;">
                            ${role}
                        </span>
                    </td>
                    <td style="padding: 12px 16px; text-align: right;">
                        ${isSuper ? `
                            <select class="change-user-role-select" data-uid="${u.uid || u.id}" style="padding: 5px 8px; border: 1.5px solid var(--colua-gray-300); border-radius: 6px; font-size: 0.78rem;">
                                <option value="invitado" ${role === 'invitado' ? 'selected' : ''}>Invitado</option>
                                <option value="asociado" ${role === 'asociado' ? 'selected' : ''}>Asociado</option>
                                <option value="manager" ${role === 'manager' ? 'selected' : ''}>Manager</option>
                                <option value="admin" ${role === 'admin' ? 'selected' : ''}>Administrador</option>
                                <option value="superadmin" ${role === 'superadmin' ? 'selected' : ''}>SuperAdmin</option>
                            </select>
                        ` : `
                            <span style="font-size: 0.75rem; color: var(--colua-gray-400);">Solo lectura</span>
                        `}
                    </td>
                </tr>
            `;
        }).join('');
    }

    bindUserRowEvents() {
        document.querySelectorAll('.change-user-role-select').forEach(sel => {
            sel.addEventListener('change', async () => {
                const uid = sel.dataset.uid;
                const newRole = sel.value;
                await coluaRepo.updateUserRole(uid, newRole);
                app.showToast(`Rol actualizado a ${newRole}`, 'success');
            });
        });
    }

    // ==========================================
    // TAB 5: REGISTRO DE AUDITORÍA
    // ==========================================
    async renderTabAudit(container) {
        this.auditLogs = await coluaRepo.getAuditLogs(30);

        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 6px; display: inline-flex; align-items: center; gap: 8px;">
                    ${ADMIN_ICONS.audit} <span>Registro de Operaciones y Auditoría</span>
                </h2>
                <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin-bottom: 20px;">
                    Historial cronológico de cambios de configuración, altas, modificaciones y publicaciones.
                </p>

                <div class="card" style="padding: 0; overflow: hidden; background: white;">
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                            <thead style="background: var(--colua-gray-50); border-bottom: 1.5px solid var(--colua-gray-200);">
                                <tr>
                                    <th style="padding: 12px 16px;">Fecha / Hora</th>
                                    <th style="padding: 12px 16px;">Acción</th>
                                    <th style="padding: 12px 16px;">Operador</th>
                                    <th style="padding: 12px 16px;">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.auditLogs.length === 0 ? `
                                    <tr><td colspan="4" style="padding: 30px; text-align: center; color: var(--colua-gray-500);">No hay registros de auditoría aún.</td></tr>
                                ` : this.auditLogs.map(log => `
                                    <tr style="border-bottom: 1px solid var(--colua-gray-100);">
                                        <td style="padding: 10px 16px; color: var(--colua-gray-500); font-size: 0.78rem;">
                                            ${log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Reciente'}
                                        </td>
                                        <td style="padding: 10px 16px;">
                                            <span class="badge" style="background: rgba(23, 55, 137, 0.1); color: var(--colua-navy); font-size: 0.72rem;">
                                                ${log.action || 'Operación'}
                                            </span>
                                        </td>
                                        <td style="padding: 10px 16px; font-weight: 600;">${log.performedBy || 'Sistema'}</td>
                                        <td style="padding: 10px 16px; color: var(--colua-gray-700); font-size: 0.8rem;">
                                            ${typeof log.details === 'object' ? JSON.stringify(log.details) : (log.details || '')}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

window.adminComponent = new AdminComponent();
