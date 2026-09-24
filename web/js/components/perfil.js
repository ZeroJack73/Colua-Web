// web/js/components/perfil.js - Perfil de Usuario COLUA R.L.

class PerfilComponent {
    constructor() {
        this.user = null;
    }

    async render(container) {
        this.user = authService.getCurrentUser();
        
        // Merge Firebase data and full profile from Firestore/Repository if available
        const fbUser = window.firebaseClient ? window.firebaseClient.getCurrentUser() : null;
        if (this.user) {
            const repo = window.coluaRepo || window.coluaRepository;
            if (repo && typeof repo.obtenerPerfilUsuario === 'function') {
                try {
                    const uid = (fbUser && fbUser.uid) || this.user.uid || this.user.userId;
                    const email = (fbUser && fbUser.email) || this.user.email;
                    const res = await repo.obtenerPerfilUsuario(uid, email);
                    if (res && res.success && res.user) {
                        this.user = {
                            ...this.user,
                            ...res.user,
                            nombre: res.user.nombre || this.user.nombre,
                            telefono: res.user.telefono || res.user.phone || this.user.telefono,
                            phone: res.user.telefono || res.user.phone || this.user.phone,
                            dpi: res.user.dpi || this.user.dpi,
                            associateId: res.user.associateId || res.user.userId || this.user.associateId
                        };
                        authService.saveUserSession(this.user);
                    }
                } catch (e) {
                    console.warn('Error sincronizando perfil con Firestore en render:', e);
                }
            }
            if (fbUser) {
                this.user.email = fbUser.email || this.user.email;
                if (!this.user.nombre || this.user.nombre === 'Asociado') {
                    this.user.nombre = fbUser.displayName || this.user.nombre;
                }
                if (!this.user.telefono) {
                    this.user.telefono = fbUser.phoneNumber || this.user.telefono;
                }
            }
        }

        const isGuest = authService.isGuest();

        const html = `
            <div class="clean-subpage-container" style="max-width: 860px;">
                <header class="clean-subpage-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h1 class="clean-subpage-title">Mi Perfil Cooperativo</h1>
                        <p class="clean-subpage-desc">Gestión de cuenta, credenciales de asociado y carné digital COLUA R.L.</p>
                    </div>
                    ${!isGuest ? `
                    <button id="profile-logout-btn" class="btn btn-primary" style="background: #e11d48; border-color: #e11d48; color: white; width: auto; padding: 8px 16px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Cerrar Sesión
                    </button>
                    ` : ''}
                </header>

                <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0;">
                    ${this.renderProfileBody()}
                </div>
            </div>
        `;

        if (container) {
            container.innerHTML = html;
            this.bindEvents(container);
        }

        return html;
    }

    attachEvents() {
        const container = document.getElementById('app-main') || document;
        this.bindEvents(container);
    }

    getRoleBadgeText() {
        if (authService.isGuest()) return 'Modo Invitado';
        const role = this.user ? (this.user.role || '').toLowerCase() : '';
        switch (role) {
            case 'superadmin': return 'Super Administrador';
            case 'admin': return 'Administrador';
            case 'asociado': return 'Asociado Activo';
            default: return 'Asociado Activo';
        }
    }

    renderProfileBody() {
        const isGuest = authService.isGuest();

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
        let memberId = this.user.associateId || this.user.userId || '';
        if (/^\d{1,7}$/.test(memberId)) {
            memberId = String(memberId).padStart(7, '0');
        } else if (!memberId || memberId.length > 8 || !/^\d+$/.test(memberId)) {
            memberId = authService.generateAssociateId(this.user.email || this.user.uid || 'colua');
            this.user.associateId = memberId;
            authService.saveUserSession(this.user);
        }
        const formattedPhone = this.user.telefono ? (this.user.telefono.startsWith('+502') ? this.user.telefono : `+502 ${this.user.telefono.replace(/\D/g, '')}`) : 'No registrado';
        const userNombre = this.user.nombre || 'Asociado COLUA';
        const verifySig = (window.authService && typeof window.authService.generateVerificationSignature === 'function')
            ? window.authService.generateVerificationSignature(memberId, this.user.email)
            : `colua_${memberId}`;
        const verifyUrl = `${window.location.origin}${window.location.pathname}#verificar?asociado=${encodeURIComponent(memberId)}&nombre=${encodeURIComponent(userNombre)}&auth=${encodeURIComponent(verifySig)}`;
        const qrDataUrl = (window.QRCode && typeof window.QRCode.toDataURL === 'function')
            ? window.QRCode.toDataURL(verifyUrl, 200, '#59B8A4', '#072124')
            : '';

        return `
            <!-- Carné Digital de Asociado Unificado con Sello y Descarga -->
            <div style="perspective: 1000px; margin-bottom: 24px;">
                <div id="colua-carne-card" style="background: linear-gradient(135deg, #091a42 0%, #10296b 55%, #183e98 100%); color: white; border-radius: 20px; padding: 26px 28px; box-shadow: 0 14px 34px rgba(9, 26, 66, 0.35); position: relative; overflow: hidden; border: 1.5px solid rgba(89, 184, 164, 0.45);">
                    <!-- Decoración de fondo -->
                    <div style="position: absolute; right: -20px; bottom: -30px; opacity: 0.06; font-size: 12rem; font-weight: 900; pointer-events: none; user-select: none;">
                        COLUA
                    </div>

                    <!-- Encabezado de Tarjeta -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 12px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 46px; height: 46px; object-fit: contain;" />
                            <div>
                                <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85; font-weight: 600; display: block;">
                                    Cooperativa de Ahorro y Crédito
                                </span>
                                <h2 style="font-size: 1.35rem; font-weight: 800; margin: 2px 0 0 0; color: #fff; letter-spacing: 0.5px;">
                                    COLUA R.L. <span style="color: #fbbf24; font-size: 0.95rem;">MICOOPE</span>
                                </h2>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="badge" style="background: rgba(255,255,255,0.18); backdrop-filter: blur(4px); color: #fff; border: 1px solid rgba(255,255,255,0.35); font-size: 0.75rem; font-weight: 600; padding: 5px 12px; border-radius: 20px;">
                                ${this.user.role === 'superadmin' ? 'SuperAdmin' : this.user.role === 'admin' ? 'Administrador' : 'Asociado Activo'}
                            </span>
                        </div>
                    </div>

                    <!-- Cuerpo de la Tarjeta con Datos y Sello QR estilo Botón -->
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
                        <div style="flex: 1; min-width: 240px;">
                            <!-- Nombre del Titular -->
                            <div style="margin-bottom: 16px;">
                                <span style="font-size: 0.72rem; opacity: 0.75; text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.8px;">Nombre del Titular</span>
                                <div style="font-size: 1.35rem; font-weight: 800; letter-spacing: 0.5px; color: #ffffff; line-height: 1.2;">
                                    ${userNombre}
                                </div>
                            </div>

                            <!-- Datos Principales en Rejilla -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px 18px; border-top: 1px solid rgba(255,255,255,0.18); padding-top: 16px;">
                                <div>
                                    <span style="font-size: 0.7rem; opacity: 0.75; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.5px;">No. de Asociado</span>
                                    <span style="font-family: monospace; font-size: 1.25rem; font-weight: 800; color: #fbbf24; letter-spacing: 1.5px;">
                                        ${memberId}
                                    </span>
                                </div>

                                <div>
                                    <span style="font-size: 0.7rem; opacity: 0.75; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.5px;">Correo Electrónico</span>
                                    <span style="font-size: 0.88rem; font-weight: 600; letter-spacing: 0.3px; color: #ffffff; word-break: break-all;">
                                        ${this.user.email || 'No registrado'}
                                    </span>
                                </div>

                                <div>
                                    <span style="font-size: 0.7rem; opacity: 0.75; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.5px;">Teléfono</span>
                                    <span style="font-family: monospace; font-size: 0.92rem; font-weight: 600; letter-spacing: 0.5px; color: #ffffff;">
                                        ${formattedPhone}
                                    </span>
                                </div>

                                <div>
                                    <span style="font-size: 0.7rem; opacity: 0.75; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.5px;">DPI / CUI</span>
                                    <span style="font-family: monospace; font-size: 0.92rem; font-weight: 600; letter-spacing: 0.8px; color: #ffffff;">
                                        ${formattedDpi || 'Opcional / No registrado'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Sello QR en Color Verde Esmeralda (Estilo Botón) -->
                        <div id="card-qr-box" style="background: rgba(89, 184, 164, 0.22); backdrop-filter: blur(8px); padding: 12px 14px; border-radius: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 16px rgba(89, 184, 164, 0.35); border: 1.5px solid var(--colua-green); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; margin-top: 4px; position: relative; min-width: 116px;" title="Código QR Oficial COLUA - Clic para validar">
                            <!-- Matriz QR en color verde del botón -->
                            <div id="carne-qr-element" style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 8px; overflow: hidden; background: #072124; border: 1px solid rgba(89, 184, 164, 0.5);">
                                ${qrDataUrl ? `<img id="carne-qr-img" src="${qrDataUrl}" alt="QR COLUA R.L." style="width: 100px; height: 100px; display: block;" />` : ''}
                            </div>
                            
                            <div style="margin-top: 6px; font-size: 0.65rem; font-weight: 800; color: var(--colua-green); letter-spacing: 0.8px; text-transform: uppercase; text-align: center;">
                                COLUA R.L.
                            </div>
                        </div>
                    </div>

                    <!-- Botones de Acción Integrados en la Tarjeta -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 16px;">
                        <button id="download-card-btn" style="background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 10px; font-size: 0.82rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Descargar carné oficial como imagen PNG">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Descargar Carné
                        </button>
                        <button id="verify-card-btn" style="background: rgba(89, 184, 164, 0.25); border: 1px solid var(--colua-green); color: white; padding: 8px 16px; border-radius: 10px; font-size: 0.82rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Ver acreditación digital para promociones y beneficios">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Acreditación Digital
                        </button>
                        <button id="change-password-modal-btn" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 10px; font-size: 0.82rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            Cambiar Contraseña
                        </button>
                        <button id="edit-profile-btn" style="background: var(--colua-gold); border: 1px solid #eab308; color: var(--colua-navy); padding: 8px 18px; border-radius: 10px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Editar Datos
                        </button>
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
        let memberId = this.user?.associateId || this.user?.userId || '0000001';
        if (/^\d{1,7}$/.test(memberId)) memberId = String(memberId).padStart(7, '0');
        const userNombre = this.user?.nombre || 'Asociado COLUA';
        const verifyUrl = `${window.location.origin}${window.location.pathname}#verificar?asociado=${memberId}&nombre=${encodeURIComponent(userNombre)}&auth=colua_${memberId}`;

        // Asegurar renderizado del QR si no vino incrustado
        const qrContainer = container.querySelector('#carne-qr-element');
        if (qrContainer && window.QRCode) {
            try {
                if (!qrContainer.querySelector('img') && !qrContainer.querySelector('canvas')) {
                    new window.QRCode(qrContainer, {
                        text: verifyUrl,
                        width: 100,
                        height: 100,
                        colorDark: "#59B8A4",
                        colorLight: "#072124"
                    });
                }
            } catch (qrErr) {
                console.warn('Error renderizando QR en bindEvents:', qrErr);
            }
        }

        // Descargar Carné como Imagen
        const downloadCardBtn = container.querySelector('#download-card-btn');
        if (downloadCardBtn) {
            downloadCardBtn.addEventListener('click', () => {
                this.downloadMembershipCard(memberId, userNombre, verifyUrl);
            });
        }

        // Abrir Acreditación / Verificación Digital
        const verifyCardBtn = container.querySelector('#verify-card-btn');
        const cardQrBox = container.querySelector('#card-qr-box');
        const handleOpenVerify = () => {
            this.showVerificationModal(memberId, userNombre, this.user?.role || 'asociado');
        };
        if (verifyCardBtn) verifyCardBtn.addEventListener('click', handleOpenVerify);
        if (cardQrBox) cardQrBox.addEventListener('click', handleOpenVerify);
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
                    await Swal.fire({
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
                    await new Promise(r => setTimeout(r, 1000));
                }
                
                // Redirigir al inicio y recargar la aplicación para limpiar toda la memoria y estados
                window.location.hash = '#inicio';
                window.location.reload();
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

        const editProfileBtn = container.querySelector('#edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.showEditProfileModal();
            });
        }

        const changePasswordModalBtn = container.querySelector('#change-password-modal-btn');
        if (changePasswordModalBtn) {
            changePasswordModalBtn.addEventListener('click', () => {
                this.showChangePasswordModal();
            });
        }

        const goToAdminBtn = container.querySelector('#go-to-admin-btn');
        if (goToAdminBtn) {
            goToAdminBtn.addEventListener('click', () => {
                window.location.hash = '#admin';
            });
        }
    }

    showChangePasswordModal() {
        const modalContent = `
            <div>
                <div style="text-align: center; margin-bottom: 18px;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: #eef2ff; color: var(--colua-navy); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px auto;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 4px;">
                        Cambiar Contraseña
                    </h3>
                    <p style="font-size: 0.82rem; color: var(--colua-gray-500); margin: 0;">
                        Ingresa tu contraseña actual y define tu nueva clave de acceso.
                    </p>
                </div>

                <form id="change-password-form">
                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Contraseña Actual *
                        </label>
                        <div style="position: relative;">
                            <input type="password" id="current-pass" required placeholder="••••••••••••"
                                style="width: 100%; padding: 10px 42px 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                            <button type="button" class="toggle-pass-btn" data-target="current-pass" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Nueva Contraseña (mínimo 6 caracteres) *
                        </label>
                        <div style="position: relative;">
                            <input type="password" id="new-pass" required minlength="6" placeholder="••••••••••••"
                                style="width: 100%; padding: 10px 42px 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                            <button type="button" class="toggle-pass-btn" data-target="new-pass" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Confirmar Nueva Contraseña *
                        </label>
                        <div style="position: relative;">
                            <input type="password" id="confirm-pass" required minlength="6" placeholder="••••••••••••"
                                style="width: 100%; padding: 10px 42px 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                            <button type="button" class="toggle-pass-btn" data-target="confirm-pass" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="change-pass-submit-btn">Actualizar Contraseña</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalContent);

        // Password visibility toggles
        document.querySelectorAll('.toggle-pass-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (input) {
                    const isPass = input.type === 'password';
                    input.type = isPass ? 'text' : 'password';
                    btn.innerHTML = isPass
                        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
                }
            });
        });

        const form = document.getElementById('change-password-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('change-pass-submit-btn');
                const currentPass = document.getElementById('current-pass').value;
                const newPass = document.getElementById('new-pass').value;
                const confirmPass = document.getElementById('confirm-pass').value;

                if (newPass !== confirmPass) {
                    if (window.Swal) {
                        Swal.fire({
                            title: 'Error de Coincidencia',
                            text: 'Las nuevas contraseñas no coinciden entre sí.',
                            icon: 'error',
                            draggable: true,
                            confirmButtonColor: '#173789'
                        });
                    } else {
                        app.showToast('Las contraseñas no coinciden', 'danger');
                    }
                    return;
                }

                btn.disabled = true;
                btn.textContent = 'Actualizando...';

                const res = await authService.changePassword(currentPass, newPass);
                btn.disabled = false;
                btn.textContent = 'Actualizar Contraseña';

                if (res.success) {
                    app.closeModal();
                    if (window.Swal) {
                        Swal.fire({
                            title: '¡Contraseña Actualizada!',
                            text: 'Tu contraseña de acceso ha sido cambiada exitosamente.',
                            icon: 'success',
                            draggable: true,
                            confirmButtonColor: '#173789',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } else {
                        app.showToast('Contraseña actualizada con éxito', 'success');
                    }
                } else {
                    if (window.Swal) {
                        Swal.fire({
                            title: 'Error al Cambiar Contraseña',
                            text: res.error || 'No se pudo actualizar la contraseña.',
                            icon: 'error',
                            draggable: true,
                            confirmButtonColor: '#173789'
                        });
                    } else {
                        app.showToast(res.error || 'Error al cambiar contraseña', 'danger');
                    }
                }
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
                            DPI / CUI (Opcional)
                        </label>
                        <input type="text" id="reg-dpi" maxlength="15" placeholder="Ej: 2541 85963 0701 (Opcional)"
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
                        <div style="position: relative;">
                            <input type="password" id="reg-password" required minlength="6" placeholder="••••••••"
                                style="width: 100%; padding: 10px 42px 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                            <button type="button" class="toggle-pass-btn" data-target="reg-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--colua-gray-400); display: flex;" title="Mostrar u ocultar contraseña">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="reg-submit-btn">Completar Registro</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalContent);

        // Password toggle
        document.querySelectorAll('.toggle-pass-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (input) {
                    const isPass = input.type === 'password';
                    input.type = isPass ? 'text' : 'password';
                    btn.innerHTML = isPass
                        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
                }
            });
        });

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

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "Correo Obligatorio",
                            text: "El correo electrónico es obligatorio para registrar la cuenta.",
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast('El correo electrónico es obligatorio y debe ser válido', 'danger');
                    }
                    btn.disabled = false;
                    btn.textContent = 'Completar Registro';
                    return;
                }

                if (dpi && !authService.validateDPI(dpi)) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "DPI Inválido",
                            text: "El DPI debe contener exactamente 13 dígitos numéricos si se proporciona.",
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
                            title: "¡Bienvenido a COLUA MICOOPE!",
                            text: "Tu registro se ha completado exitosamente.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                            draggable: true
                        });
                    } else {
                        app.showToast('¡Registro completado exitosamente!', 'success');
                    }
                    this.render(document.getElementById('main-content'));
                } else {
                    const regErr = (result && result.error && !result.error.startsWith('Firebase:') && !result.error.includes('(auth/'))
                        ? result.error
                        : "Error al completar el registro cooperativo.";
                    if (window.Swal) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: regErr,
                            draggable: true,
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast(regErr, 'danger');
                    }
                    btn.disabled = false;
                    btn.textContent = 'Completar Registro';
                }
            });
        }
    }

    showEditProfileModal() {
        // Formateador de Teléfono (+502 XXXXXXXX)
        const formatPhone = (val) => {
            if (!val) return '';
            let digits = val.replace(/\D/g, '');
            if (digits.startsWith('502')) digits = digits.substring(3);
            if (digits.length > 8) digits = digits.substring(0, 8);
            if (digits.length === 0) return '';
            return `+502 ${digits}`;
        };

        const currentName = (this.user.nombre || '').replace(/"/g, '&quot;');
        const currentEmail = (this.user.email || '').replace(/"/g, '&quot;');
        const currentDpi = authService.formatDPI(this.user.dpi || '');
        const currentPhone = formatPhone(this.user.telefono || this.user.phone || '');

        const modalContent = `
            <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 16px;">
                    Editar Datos del Perfil
                </h3>

                <form id="edit-profile-form">
                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Nombre Completo *
                        </label>
                        <input type="text" id="edit-name" value="${currentName}" required placeholder="Ej: Juan Carlos López"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Correo Electrónico *
                        </label>
                        <input type="email" id="edit-email" value="${currentEmail}" required placeholder="usuario@gmail.com"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            DPI / CUI (Opcional)
                        </label>
                        <input type="text" id="edit-dpi" value="${currentDpi}" maxlength="15" placeholder="Ej: 2541 85963 0701 (Opcional)"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                    </div>

                    <div class="form-group" style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--colua-gray-700); margin-bottom: 4px;">
                            Teléfono
                        </label>
                        <input type="tel" id="edit-phone" value="${currentPhone}" required placeholder="+502 00000000"
                            style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--colua-gray-200); border-radius: 10px; font-size: 0.9rem;" />
                        <small style="font-size: 0.75rem; color: var(--colua-gray-500);">Debe incluir el prefijo +502 y 8 dígitos</small>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button type="button" class="btn btn-outline" onclick="app.closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="edit-submit-btn">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        `;

        app.showModal(modalContent);

        const form = document.getElementById('edit-profile-form');
        const phoneInput = document.getElementById('edit-phone');
        const dpiInput = document.getElementById('edit-dpi');

        if (phoneInput) {
            phoneInput.addEventListener('focus', () => {
                if (!phoneInput.value) {
                    phoneInput.value = '+502 ';
                }
            });

            phoneInput.addEventListener('input', (e) => {
                e.target.value = formatPhone(e.target.value);
            });
        }

        if (dpiInput) {
            dpiInput.addEventListener('input', (e) => {
                const raw = e.target.value.replace(/\D/g, '');
                e.target.value = authService.formatDPI(raw);
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('edit-submit-btn');
                
                const newName = document.getElementById('edit-name').value.trim();
                const newEmail = document.getElementById('edit-email').value.trim().toLowerCase();
                const newPhone = document.getElementById('edit-phone').value.trim();
                const newDpi = document.getElementById('edit-dpi').value.replace(/\D/g, '');

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!newEmail || !emailRegex.test(newEmail)) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "Correo Inválido",
                            text: "Ingresa un correo electrónico válido (ej: usuario@gmail.com).",
                            draggable: true,
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast('Correo electrónico inválido.', 'error');
                    }
                    return;
                }

                // Validaciones
                let phoneDigits = newPhone.replace(/\D/g, '');
                if (phoneDigits.length === 8) {
                    phoneDigits = '502' + phoneDigits;
                }
                if (phoneDigits.length !== 11 || !phoneDigits.startsWith('502')) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "Teléfono Inválido",
                            text: "El teléfono debe contener 8 dígitos numéricos válidos.",
                            draggable: true,
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast('El teléfono debe contener 8 dígitos.', 'error');
                    }
                    return;
                }
                const formattedValidPhone = `+502 ${phoneDigits.substring(3)}`;
                
                if (newDpi && newDpi.length !== 13) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: "warning",
                            title: "DPI Inválido",
                            text: "El DPI debe contener exactamente 13 dígitos numéricos si se proporciona.",
                            draggable: true,
                            confirmButtonColor: "#173789"
                        });
                    } else {
                        app.showToast('El DPI debe contener exactamente 13 dígitos si se proporciona.', 'error');
                    }
                    return;
                }

                btn.disabled = true;
                btn.textContent = 'Guardando...';

                this.user.nombre = newName;
                this.user.email = newEmail;
                this.user.telefono = formattedValidPhone;
                this.user.phone = formattedValidPhone;
                this.user.dpi = newDpi;

                // Guardar en sesión local inmediatamente
                authService.saveUserSession(this.user);

                // Guardar en repositorio / Firestore
                const repo = window.coluaRepo || window.coluaRepository;
                if (repo && typeof repo.saveUserProfile === 'function') {
                    try {
                        await repo.saveUserProfile(this.user.uid || this.user.userId, this.user);
                    } catch (err) {
                        console.error('Error guardando en Firestore:', err);
                    }
                }

                app.closeModal();
                if (window.Swal) {
                    Swal.fire({
                        title: "¡Perfil Actualizado!",
                        text: "Tus datos se guardaron correctamente.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        draggable: true
                    });
                } else {
                    app.showToast('Perfil actualizado correctamente', 'success');
                }
                this.render(document.getElementById('main-content'));
            });
        }
    }

    // --- GENERADOR Y DESCARGA DE CARNÉ EN PNG ---
    async downloadMembershipCard(memberId, userNombre, verifyUrl) {
        try {
            if (window.app) window.app.showToast('Generando carné oficial de alta resolución...', 'info');

            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Contexto Canvas no soportado');

            // 1. Fondo con Degradado Azul COLUA
            const grad = ctx.createLinearGradient(0, 0, 1200, 720);
            grad.addColorStop(0, '#0a193c');
            grad.addColorStop(0.55, '#173789');
            grad.addColorStop(1, '#1e45aa');
            ctx.fillStyle = grad;

            const radius = 36;
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(1200 - radius, 0);
            ctx.quadraticCurveTo(1200, 0, 1200, radius);
            ctx.lineTo(1200, 720 - radius);
            ctx.quadraticCurveTo(1200, 720, 1200 - radius, 720);
            ctx.lineTo(radius, 720);
            ctx.quadraticCurveTo(0, 720, 0, 720 - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            ctx.fill();

            // 2. Borde Dorado
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 6;
            ctx.stroke();

            // 3. Marca de agua COLUA
            ctx.save();
            ctx.font = '900 180px Poppins, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.textAlign = 'right';
            ctx.fillText('COLUA', 1180, 580);
            ctx.restore();

            // 4. Encabezado
            ctx.fillStyle = '#ffffff';
            ctx.font = '600 20px Poppins, sans-serif';
            ctx.fillText('COOPERATIVA DE AHORRO Y CRÉDITO', 70, 90);

            ctx.font = '800 42px Poppins, sans-serif';
            ctx.fillText('COLUA R.L.', 70, 140);

            const coluaW = ctx.measureText('COLUA R.L. ').width;
            ctx.fillStyle = '#f59e0b';
            ctx.font = '800 36px Poppins, sans-serif';
            ctx.fillText('MICOOPE', 70 + coluaW, 140);

            // Badge Asociado
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.roundRect(850, 60, 270, 48, 24);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = '700 19px Poppins, sans-serif';
            ctx.textAlign = 'center';
            const roleBadge = this.user?.role === 'superadmin' ? 'SUPERADMIN' : (this.user?.role === 'admin' ? 'ADMINISTRADOR' : 'ASOCIADO ACTIVO');
            ctx.fillText(roleBadge, 985, 92);
            ctx.textAlign = 'left';

            // Línea separadora
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(70, 180);
            ctx.lineTo(1130, 180);
            ctx.stroke();

            // 5. Nombre
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = '600 17px Poppins, sans-serif';
            ctx.fillText('NOMBRE DEL TITULAR', 70, 225);

            ctx.fillStyle = '#ffffff';
            ctx.font = '800 36px Poppins, sans-serif';
            ctx.fillText(userNombre, 70, 270);

            // 6. Datos Rejilla
            // No. de Asociado
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = '600 17px Poppins, sans-serif';
            ctx.fillText('NO. DE ASOCIADO', 70, 345);

            ctx.fillStyle = '#f59e0b';
            ctx.font = '800 36px monospace';
            ctx.fillText(memberId, 70, 390);

            // Correo
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = '600 17px Poppins, sans-serif';
            ctx.fillText('CORREO ELECTRÓNICO', 390, 345);

            ctx.fillStyle = '#ffffff';
            ctx.font = '600 23px Poppins, sans-serif';
            ctx.fillText(this.user?.email || 'No registrado', 390, 390);

            // Teléfono
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = '600 17px Poppins, sans-serif';
            ctx.fillText('TELÉFONO', 70, 465);

            ctx.fillStyle = '#ffffff';
            ctx.font = '600 23px monospace';
            const phoneStr = this.user?.telefono ? (this.user.telefono.startsWith('+502') ? this.user.telefono : `+502 ${this.user.telefono.replace(/\D/g, '')}`) : 'No registrado';
            ctx.fillText(phoneStr, 70, 505);

            // DPI / CUI
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = '600 17px Poppins, sans-serif';
            ctx.fillText('DPI / CUI', 390, 465);

            ctx.fillStyle = '#ffffff';
            ctx.font = '600 23px monospace';
            const dpiStr = authService.formatDPI(this.user?.dpi || '') || 'Opcional / No registrado';
            ctx.fillText(dpiStr, 390, 505);

            // 7. Sello de Acreditación Digital (Estilo Botón Verde Acreditación Digital)
            const qrX = 850;
            const qrY = 220;
            const qrSize = 270;

            // Fondo del Sello en Verde Esmeralda / Teal Oscuro
            ctx.fillStyle = '#072124';
            ctx.beginPath();
            ctx.roundRect(qrX, qrY, qrSize, qrSize + 40, 20);
            ctx.fill();
            
            // Borde exterior verde esmeralda
            ctx.strokeStyle = '#59B8A4';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Borde interior fino
            ctx.strokeStyle = 'rgba(89, 184, 164, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(qrX + 6, qrY + 6, qrSize - 12, qrSize + 28, 14);
            ctx.stroke();

            // Código QR en color verde del botón (#59B8A4)
            if (window.QRCode && typeof window.QRCode.drawToCanvasContext === 'function') {
                window.QRCode.drawToCanvasContext(ctx, verifyUrl, qrX + 25, qrY + 20, 220, '#59B8A4', '#072124');
            }

            // Distintivo inferior
            ctx.fillStyle = '#59B8A4';
            ctx.font = '800 16px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('COLUA R.L.', qrX + (qrSize / 2), qrY + qrSize + 25);
            ctx.textAlign = 'left';

            // 8. Pie de página
            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.font = '500 15px Poppins, sans-serif';
            ctx.fillText('Acreditación Digital Oficial • Sistema MICOOPE Guatemala • Válido para Promociones y Premios', 70, 640);

            // Descarga automática
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `Carne_Digital_COLUA_${memberId}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (window.Swal) {
                Swal.fire({
                    title: "¡Carné Descargado!",
                    text: `Se descargó la imagen oficial del carné con No. de Asociado ${memberId}.`,
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                    draggable: true
                });
            } else if (window.app) {
                window.app.showToast('¡Carné digital descargado exitosamente!', 'success');
            }
        } catch (e) {
            console.error('Error generando imagen de carné:', e);
            if (window.app) window.app.showToast('No se pudo generar la imagen del carné.', 'danger');
        }
    }

    // --- MODAL DE VERIFICACIÓN DE ASOCIADO / BENEFICIOS ---
    showVerificationModal(assocId, name, tipo) {
        const idStr = String(assocId || this.user?.associateId || '0000001').padStart(7, '0');
        const titular = name || this.user?.nombre || 'Asociado COLUA';
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-GT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const modalHtml = `
            <div style="text-align: center; padding: 10px 0;">
                <!-- Animación de Checkmark Verde Vibrante -->
                <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 0 25px rgba(16, 185, 129, 0.45);">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <span style="background: #d1fae5; color: #065f46; font-size: 0.78rem; font-weight: 800; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 8px;">
                    ✓ Verificación Exitosa
                </span>

                <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--colua-navy); margin-bottom: 4px;">
                    ¡ASOCIADO ACTIVO Y VÁLIDO!
                </h3>
                <p style="font-size: 0.85rem; color: var(--colua-gray-600); margin-bottom: 20px;">
                    Acreditación oficial emitida por <strong>Cooperativa COLUA R.L. MICOOPE</strong>
                </p>

                <!-- Tarjeta de Acreditación -->
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 18px 20px; text-align: left; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 12px;">
                        <span style="font-size: 0.78rem; color: var(--colua-gray-500); font-weight: 600;">ESTADO DE LA CUENTA</span>
                        <span style="font-size: 0.82rem; font-weight: 800; color: #059669; background: #ecfdf5; padding: 3px 10px; border-radius: 12px;">ACTIVO Y SOLVENTE</span>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <span style="font-size: 0.72rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block;">Nombre del Titular</span>
                        <span style="font-size: 1.15rem; font-weight: 800; color: var(--colua-navy);">${titular}</span>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <span style="font-size: 0.72rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block;">No. de Asociado</span>
                            <span style="font-size: 1.25rem; font-weight: 800; color: var(--colua-gold); font-family: monospace;">${idStr}</span>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block;">Acceso a Beneficios</span>
                            <span style="font-size: 0.88rem; font-weight: 700; color: #0284c7;">✓ HABILITADO</span>
                        </div>
                    </div>

                    <div style="border-top: 1px dashed #cbd5e1; padding-top: 10px; font-size: 0.75rem; color: #64748b;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                            <span>Fecha de Validación:</span>
                            <strong style="color: #334155;">${dateStr}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Hora de Validación:</span>
                            <strong style="color: #334155;">${timeStr}</strong>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button type="button" class="btn btn-primary" onclick="app.closeModal()" style="padding: 10px 24px; font-weight: 600;">
                        Confirmar y Otorgar Beneficio
                    </button>
                </div>
            </div>
        `;

        if (window.app) window.app.showModal(modalHtml);
    }

    // --- MÉTODO DE SANITIZACIÓN CONTRA INYECCIÓN HTML / DOM-XSS ---
    escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // --- PÁGINA INDEPENDIENTE DE VERIFICACIÓN (Ruta #verificar) ---
    async renderVerificationPage(container) {
        const rawHash = (window.location.hash || '').slice(1);
        const queryIndex = rawHash.indexOf('?');
        const params = new URLSearchParams(queryIndex !== -1 ? rawHash.slice(queryIndex + 1) : '');

        const rawAssocId = params.get('asociado') || '0000001';
        const rawNombre = params.get('nombre') ? decodeURIComponent(params.get('nombre')) : 'Asociado COLUA';
        const authSig = params.get('auth') || '';

        // Sanitización estricta contra XSS
        const assocId = this.escapeHtml(rawAssocId);
        const nombre = this.escapeHtml(rawNombre);
        const safeAuth = this.escapeHtml(authSig);

        const now = new Date();
        const dateStr = this.escapeHtml(now.toLocaleDateString('es-GT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        const timeStr = this.escapeHtml(now.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

        // Validación de autenticidad del token y firma
        const isAuthValid = (window.authService && typeof window.authService.verifyAssociateToken === 'function')
            ? window.authService.verifyAssociateToken(rawAssocId, '', authSig)
            : Boolean(authSig && authSig.startsWith('colua_'));

        let verifiedStatusBadge = isAuthValid 
            ? `<span style="background: #d1fae5; color: #065f46; font-size: 0.84rem; font-weight: 800; padding: 6px 18px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.2px; display: inline-block; margin-bottom: 12px;">✓ Acreditación Oficial Verificada</span>`
            : `<span style="background: #fee2e2; color: #b91c1c; font-size: 0.84rem; font-weight: 800; padding: 6px 18px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.2px; display: inline-block; margin-bottom: 12px;">⚠ Firma Digital No Verificada</span>`;

        let statusAccountText = isAuthValid ? 'ACTIVO Y VIGENTE' : 'VERIFICACIÓN PENDIENTE';
        let statusAccountColor = isAuthValid ? '#059669' : '#d97706';
        let statusAccountBg = isAuthValid ? '#ecfdf5' : '#fffbeb';
        let promoStatusText = isAuthValid ? '✓ VÁLIDO Y APLICABLE' : '⚠ REQUIERE REVISIÓN';
        let promoStatusColor = isAuthValid ? '#0284c7' : '#d97706';

        const html = `
            <div style="max-width: 600px; margin: 30px auto; padding: 0 16px;">
                <div class="card" style="padding: 36px 28px; text-align: center; border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); border: 2px solid ${isAuthValid ? '#10b981' : '#f59e0b'};">
                    <!-- Animación de Checkmark -->
                    <div style="width: 96px; height: 96px; border-radius: 50%; background: ${isAuthValid ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; box-shadow: 0 0 30px ${isAuthValid ? 'rgba(16, 185, 129, 0.45)' : 'rgba(245, 158, 11, 0.45)'};">
                        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
                            ${isAuthValid ? `<polyline points="20 6 9 17 4 12"></polyline>` : `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`}
                        </svg>
                    </div>

                    ${verifiedStatusBadge}

                    <h2 style="font-size: 1.65rem; font-weight: 800; color: var(--colua-navy); margin-bottom: 6px;">
                        ${isAuthValid ? '¡ASOCIADO ACTIVO COLUA!' : 'VALIDACIÓN DE ACREDITACIÓN'}
                    </h2>
                    <p style="font-size: 0.92rem; color: var(--colua-gray-600); margin-bottom: 26px;">
                        ${isAuthValid 
                            ? 'Este asociado se encuentra registrado y acreditado en la plataforma cooperativa <strong>COLUA R.L. MICOOPE</strong>.' 
                            : 'Firma de seguridad recibida. El personal de la cooperativa puede validar el estado en el sistema central.'}
                    </p>

                    <!-- Tarjeta de Detalles Oficiales -->
                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 22px 24px; text-align: left; margin-bottom: 26px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
                            <span style="font-size: 0.8rem; color: var(--colua-gray-500); font-weight: 600;">ESTADO DE ASOCIADO</span>
                            <span style="font-size: 0.85rem; font-weight: 800; color: ${statusAccountColor}; background: ${statusAccountBg}; padding: 4px 12px; border-radius: 14px;">${statusAccountText}</span>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <span style="font-size: 0.74rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Nombre del Titular</span>
                            <span style="font-size: 1.3rem; font-weight: 800; color: var(--colua-navy);">${nombre}</span>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                            <div>
                                <span style="font-size: 0.74rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">No. de Asociado</span>
                                <span style="font-size: 1.35rem; font-weight: 800; color: var(--colua-gold); font-family: monospace;">${assocId}</span>
                            </div>
                            <div>
                                <span style="font-size: 0.74rem; color: var(--colua-gray-500); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Promociones y Premios</span>
                                <span style="font-size: 0.95rem; font-weight: 700; color: ${promoStatusColor};">${promoStatusText}</span>
                            </div>
                        </div>

                        <div style="border-top: 1px dashed #cbd5e1; padding-top: 12px; font-size: 0.8rem; color: #64748b;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <span>Fecha de Validación:</span>
                                <strong style="color: #334155;">${dateStr}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Hora de Validación:</span>
                                <strong style="color: #334155;">${timeStr}</strong>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <a href="#inicio" class="btn btn-primary" style="padding: 12px 28px; font-weight: 600; text-decoration: none;">
                            Ir al Inicio COLUA
                        </a>
                        <a href="#perfil" class="btn btn-outline" style="padding: 12px 24px; font-weight: 600; text-decoration: none;">
                            Ver Mi Perfil
                        </a>
                    </div>
                </div>
            </div>
        `;

        if (container) container.innerHTML = html;
        return html;
    }
}

window.perfilComponent = new PerfilComponent();

