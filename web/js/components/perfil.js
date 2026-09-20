// web/js/components/perfil.js - Perfil de Usuario COLUA R.L.

class PerfilComponent {
    constructor() {
        this.user = null;
    }

    async render(container) {
        this.user = authService.getCurrentUser();

        container.innerHTML = `
            <div class="clean-subpage-container" style="max-width: 860px;">
                <header class="clean-subpage-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h1 class="clean-subpage-title">Mi Perfil Cooperativo</h1>
                        <p class="clean-subpage-desc">Gestión de cuenta, credenciales de asociado y carné digital COLUA R.L.</p>
                    </div>
                    <button id="profile-logout-btn" class="clean-btn-card-action" style="width: auto; padding: 6px 14px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Cerrar Sesión
                    </button>
                </header>

                <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0;">
                    ${this.renderProfileBody()}
                </div>
            </div>
        `;

        this.bindEvents(container);
    }

    getRoleBadgeText() {
        const role = this.user ? this.user.role : 'invitado';
        switch (role) {
            case 'superadmin': return 'Super Administrador';
            case 'admin': return 'Administrador';
            case 'asociado': return 'Asociado Activo';
            default: return 'Modo Invitado';
        }
    }

    renderProfileBody() {
        const isGuest = !this.user || this.user.role === 'invitado';

        if (isGuest) {
            return `
                <!-- Vista de Invitado -->
                <div class="card" style="padding: 28px 20px; text-align: center; margin-bottom: 24px; background: white; border-top: 4px solid var(--colua-orange);">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                        <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 60px; height: 60px; object-fit: contain;" />
                    </div>
                    <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 8px;">
                        Bienvenido a COLUA R.L.
                    </h2>
                    <p style="color: var(--colua-gray-600); font-size: 0.9rem; max-width: 480px; margin: 0 auto 20px auto; line-height: 1.5;">
                        Estás explorando en modo consulta. Inicia sesión con tu correo y contraseña o regístrate para visualizar tu carné digital y tus datos cooperativos.
                    </p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button id="profile-login-trigger" class="btn btn-primary" style="padding: 10px 24px; font-weight: 600;">
                            Iniciar Sesión
                        </button>
                        <button id="profile-register-trigger" class="btn btn-outline" style="padding: 10px 24px; font-weight: 600; color: var(--colua-navy); border-color: #cbd5e1;">
                            Registrarse
                        </button>
                    </div>
                </div>

                <!-- Ventajas de Asociarse -->
                <div class="card" style="padding: 24px; background: white; margin-bottom: 24px;">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 16px;">
                        ¿Por qué asociarte a COLUA MICOOPE?
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #eef2ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </div>
                            <div>
                                <strong style="font-size: 0.9rem; color: var(--colua-navy); display: block;">Tus 6 Beneficios Incluidos</strong>
                                <span style="font-size: 0.8rem; color: var(--colua-gray-600);">Renta diaria, sepelio y apoyos médicos.</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #ecfdf5; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            </div>
                            <div>
                                <strong style="font-size: 0.9rem; color: var(--colua-navy); display: block;">Mejores Tasas de Rendimiento</strong>
                                <span style="font-size: 0.8rem; color: var(--colua-gray-600);">En Cuentas de Ahorro y Plazos Fijos.</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #eef2ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <div>
                                <strong style="font-size: 0.9rem; color: var(--colua-navy); display: block;">Seguros con Cobertura</strong>
                                <span style="font-size: 0.8rem; color: var(--colua-gray-600);">Protección familiar y de patrimonio.</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #fef3c7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <div>
                                <strong style="font-size: 0.9rem; color: var(--colua-navy); display: block;">Participación Democrática</strong>
                                <span style="font-size: 0.8rem; color: var(--colua-gray-600);">Voz y voto en asambleas cooperativas.</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Vista de Asociado / Administrador
        const formattedDpi = authService.formatDPI(this.user.dpi || '');
        const memberId = this.user.associateId || '0000000';

        return `
            <!-- Carné Digital de Asociado -->
            <div style="perspective: 1000px; margin-bottom: 24px;">
                <div style="background: linear-gradient(135deg, #0f2252 0%, #173789 60%, #1e45aa 100%); color: white; border-radius: 20px; padding: 24px; box-shadow: 0 12px 28px rgba(23, 55, 137, 0.25); position: relative; overflow: hidden; border: 1.5px solid rgba(255, 204, 0, 0.3);">
                    <!-- Decoración de fondo -->
                    <div style="position: absolute; right: -20px; bottom: -30px; opacity: 0.08; font-size: 12rem; font-weight: 900; pointer-events: none;">
                        COLUA
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 44px; height: 44px; object-fit: contain;" />
                            <div>
                                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.8; font-weight: 600;">
                                    Cooperativa de Ahorro y Crédito
                                </span>
                                <h2 style="font-size: 1.3rem; font-weight: 800; margin: 2px 0 0 0; color: #fff;">
                                    COLUA R.L. <span style="color: var(--colua-gold); font-size: 0.9rem;">MICOOPE</span>
                                </h2>
                            </div>
                        </div>
                        <span class="badge" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-size: 0.75rem;">
                            ${this.user.role === 'superadmin' ? 'SuperAdmin' : this.user.role === 'admin' ? 'Administrador' : 'Asociado'}
                        </span>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <span style="font-size: 0.75rem; opacity: 0.7; text-transform: uppercase; display: block; margin-bottom: 4px;">Nombre del Titular</span>
                        <div style="font-size: 1.25rem; font-weight: 700; letter-spacing: 0.5px;">
                            ${this.user.nombre || 'Asociado COLUA'}
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px;">
                        <div>
                            <span style="font-size: 0.7rem; opacity: 0.7; text-transform: uppercase; display: block;">No. de Asociado</span>
                            <span style="font-family: monospace; font-size: 1.2rem; font-weight: 800; color: var(--colua-gold); letter-spacing: 1.5px;">
                                ${memberId}
                            </span>
                        </div>

                        <div>
                            <span style="font-size: 0.7rem; opacity: 0.7; text-transform: uppercase; display: block;">DPI / CUI</span>
                            <span style="font-family: monospace; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.8px;">
                                ${formattedDpi || 'No registrado'}
                            </span>
                        </div>

                        <div>
                            <button id="copy-member-id-btn" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Copiar ID
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detalles y Configuración de Cuenta -->
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
                    <span>Información Personal</span>
                    <button id="edit-profile-btn" class="btn btn-outline" style="font-size: 0.8rem; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        Editar Datos
                    </button>
                </h3>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                    <div>
                        <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Correo Electrónico:</span>
                        <strong style="font-size: 0.95rem; color: var(--colua-gray-800);">${this.user.email || 'No registrado'}</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Teléfono:</span>
                        <strong style="font-size: 0.95rem; color: var(--colua-gray-800);">${this.user.telefono || 'No registrado'}</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Fecha de Registro:</span>
                        <strong style="font-size: 0.95rem; color: var(--colua-gray-800);">${this.user.fechaCreacion ? new Date(this.user.fechaCreacion).toLocaleDateString() : 'Activo'}</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.78rem; color: var(--colua-gray-500); display: block;">Agencia de Afiliación:</span>
                        <strong style="font-size: 0.95rem; color: var(--colua-gray-800);">${this.user.agenciaPrincipal || 'Central Sololá'}</strong>
                    </div>
                </div>
            </div>

            <!-- Enlace directo al Panel Administrativo si tiene permisos -->
            ${authService.isAdmin() ? `
                <div class="card" style="padding: 20px; background: linear-gradient(135deg, rgba(23, 55, 137, 0.05) 0%, rgba(89, 184, 164, 0.08) 100%); border: 1.5px solid var(--colua-green); margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            Portal de Administración CMS
                        </h4>
                        <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin: 0;">
                            Tienes permisos para gestionar contenidos, pantallas y roles del sistema.
                        </p>
                    </div>
                    <button id="go-to-admin-btn" class="btn btn-primary" style="font-size: 0.9rem; padding: 8px 18px;">
                        Abrir Panel CMS →
                    </button>
                </div>
            ` : ''}
        `;
    }

    bindEvents(container) {
        const logoutBtn = container.querySelector('#profile-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (window.Swal) {
                    const res = await Swal.fire({
                        title: '¿Cerrar Sesión?',
                        text: '¿Estás seguro de que deseas salir de tu cuenta?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#173789',
                        cancelButtonColor: '#64748b',
                        confirmButtonText: 'Sí, cerrar sesión',
                        cancelButtonText: 'Cancelar'
                    });
                    if (!res.isConfirmed) return;
                }
                await authService.logout();
                if (window.Swal) {
                    Swal.fire({
                        title: 'Sesión Finalizada',
                        text: 'Has salido de tu cuenta de forma segura.',
                        icon: 'success',
                        draggable: true,
                        confirmButtonColor: '#173789',
                        timer: 1800,
                        showConfirmButton: false
                    });
                } else {
                    app.showToast('Sesión cerrada correctamente', 'info');
                }
                window.location.hash = '#inicio';
            });
        }

        const guestToMemberBtn = container.querySelector('#guest-to-member-btn');
        if (guestToMemberBtn) {
            guestToMemberBtn.addEventListener('click', () => {
                this.showConvertToMemberModal();
            });
        }

        const loginTrigger = container.querySelector('#profile-login-trigger') || container.querySelector('#guest-login-btn');
        if (loginTrigger) {
            loginTrigger.addEventListener('click', () => {
                app.showLoginModal();
            });
        }

        const registerTrigger = container.querySelector('#profile-register-trigger');
        if (registerTrigger) {
            registerTrigger.addEventListener('click', () => {
                app.showRegisterModal();
            });
        }

        const copyIdBtn = container.querySelector('#copy-member-id-btn');
        if (copyIdBtn) {
            copyIdBtn.addEventListener('click', () => {
                const id = this.user?.associateId || '';
                navigator.clipboard.writeText(id).then(() => {
                    app.showToast(`No. de Asociado ${id} copiado`, 'success');
                });
            });
        }

        const editProfileBtn = container.querySelector('#edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.showEditProfileModal();
            });
        }

        const goToAdminBtn = container.querySelector('#go-to-admin-btn');
        if (goToAdminBtn) {
            goToAdminBtn.addEventListener('click', () => {
                window.location.hash = '#admin';
            });
        }
    }

    showConvertToMemberModal() {
        const modalContent = `
            <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 8px;">
                    Registro de Nuevo Asociado COLUA
                </h3>
                <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin-bottom: 18px;">
                    Ingresa tus datos personales. Se te asignará un número de asociado correlativo oficial de 7 dígitos.
                </p>

                <form id="convert-member-form">
                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Nombre Completo *
                        </label>
                        <input type="text" id="reg-name" required placeholder="Ej: Juan Carlos López Pérez"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            DPI / CUI (13 dígitos) *
                        </label>
                        <input type="text" id="reg-dpi" required maxlength="15" placeholder="Ej: 2541 85963 0701"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Teléfono Celular *
                        </label>
                        <input type="tel" id="reg-phone" required placeholder="Ej: 5544-3322"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Correo Electrónico *
                        </label>
                        <input type="email" id="reg-email" required placeholder="tu.correo@ejemplo.com"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Crear Contraseña (mínimo 6 caracteres) *
                        </label>
                        <input type="password" id="reg-password" required minlength="6" placeholder="••••••••"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="reg-submit-btn">Completar Registro</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalContent);

        const form = document.getElementById('convert-member-form');
        const dpiInput = document.getElementById('reg-dpi');

        if (dpiInput) {
            dpiInput.addEventListener('input', (e) => {
                const raw = e.target.value.replace(/\D/g, '');
                e.target.value = authService.formatDPI(raw);
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('reg-submit-btn');
                btn.disabled = true;
                btn.textContent = 'Registrando...';

                const name = document.getElementById('reg-name').value.trim();
                const dpi = document.getElementById('reg-dpi').value.replace(/\D/g, '');
                const phone = document.getElementById('reg-phone').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const password = document.getElementById('reg-password').value;

                if (!authService.validateDPI(dpi)) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "DPI Inválido",
                            text: "El DPI debe contener exactamente 13 dígitos numéricos.",
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast('El DPI debe contener exactamente 13 dígitos numéricos', 'danger');
                    }
                    btn.disabled = false;
                    btn.textContent = 'Completar Registro';
                    return;
                }

                const result = await authService.registerMember({
                    name,
                    dpi,
                    phone,
                    email,
                    password
                });

                if (result.success) {
                    app.closeModal();
                    if (window.Swal) {
                        Swal.fire({
                            title: "¡Bienvenido Asociado!",
                            text: `Registro completado con éxito. Tu No. de Asociado oficial es ${result.associateId}`,
                            icon: "success",
                            draggable: true,
                            confirmButtonColor: "#173789",
                            confirmButtonText: "Ver mi Carné"
                        });
                    } else {
                        app.showToast(`¡Bienvenido! Tu No. de Asociado es ${result.associateId}`, 'success');
                    }
                    this.render(document.getElementById('main-content'));
                } else {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: result.error || "Error al completar el registro cooperativo.",
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast(result.error || 'Error al completar el registro', 'danger');
                    }
                    btn.disabled = false;
                    btn.textContent = 'Completar Registro';
                }
            });
        }
    }

    showEditProfileModal() {
        const modalContent = `
            <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 16px;">
                    Editar Datos del Perfil
                </h3>

                <form id="edit-profile-form">
                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Nombre Completo
                        </label>
                        <input type="text" id="edit-name" value="${this.user.nombre || ''}" required
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Teléfono
                        </label>
                        <input type="tel" id="edit-phone" value="${this.user.telefono || ''}" required
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalContent);

        const form = document.getElementById('edit-profile-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const newName = document.getElementById('edit-name').value.trim();
                const newPhone = document.getElementById('edit-phone').value.trim();

                this.user.nombre = newName;
                this.user.telefono = newPhone;

                await coluaRepo.saveUserProfile(this.user.uid, this.user);
                app.closeModal();
                if (window.Swal) {
                    Swal.fire({
                        title: "¡Perfil Actualizado!",
                        text: "Tus datos se guardaron correctamente.",
                        icon: "success",
                        draggable: true,
                        confirmButtonColor: "#173789",
                        confirmButtonText: "Aceptar"
                    });
                } else {
                    app.showToast('Perfil actualizado correctamente', 'success');
                }
                this.render(document.getElementById('main-content'));
            });
        }
    }
}

window.perfilComponent = new PerfilComponent();
