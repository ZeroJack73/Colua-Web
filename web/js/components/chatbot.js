// web/js/components/chatbot.js — Sistema Institucional de Turnos, Tickets y Mesa de Ayuda COLUA MICOOPE

class ChatbotComponent {
    constructor() {
        this.isOpen = false;
        this.currentTab = 'ticket'; // 'ticket', 'mis_tickets', 'faq'
        this.tickets = this.loadTickets();
    }

    loadTickets() {
        try {
            const raw = localStorage.getItem('colua_tickets_history');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    saveTickets() {
        try {
            localStorage.setItem('colua_tickets_history', JSON.stringify(this.tickets));
        } catch (e) {}
    }

    init() {
        let root = document.getElementById('colua-chatbot-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'colua-chatbot-root';
            document.body.appendChild(root);
        }

        root.innerHTML = `
            <!-- Botón Flotante Institucional de Mesa de Ayuda / Turnos -->
            <button id="chatbot-launcher-btn" class="chatbot-floating-btn" title="Mesa de Ayuda y Turnos COLUA MICOOPE" aria-label="Abrir Mesa de Ayuda y Turnos">
                <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 28px; height: 28px; object-fit: contain;" />
                <span class="chatbot-badge-ping"></span>
            </button>

            <!-- Ventana de Mesa de Ayuda y Turnos -->
            <div id="chatbot-window" class="chatbot-window" style="display: none;">
                <!-- Header Institucional -->
                <div class="ticket-modal-header">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 38px; height: 38px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                            <img src="assets/distintivo_colua.png" alt="COLUA" style="width: 28px; height: 28px; object-fit: contain;" />
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: white; letter-spacing: -0.2px;">
                                Mesa de Ayuda & Turnos
                            </h3>
                            <span style="font-size: 0.72rem; color: #fef08a; display: flex; align-items: center; gap: 4px;">
                                <span style="width: 6px; height: 6px; border-radius: 50%; background: #22c55e;"></span>
                                Atención al Asociado COLUA
                            </span>
                        </div>
                    </div>
                    <button id="chatbot-close-btn" class="ticket-close-btn" title="Cerrar ventana">✕</button>
                </div>

                <!-- Tabs de Navegación de la Mesa de Ayuda -->
                <div class="ticket-tabs-bar">
                    <button class="ticket-tab-btn ${this.currentTab === 'ticket' ? 'active' : ''}" data-tab="ticket">
                        Sacar Ticket
                    </button>
                    <button class="ticket-tab-btn ${this.currentTab === 'mis_tickets' ? 'active' : ''}" data-tab="mis_tickets">
                        Mis Turnos (${this.tickets.length})
                    </button>
                    <button class="ticket-tab-btn ${this.currentTab === 'faq' ? 'active' : ''}" data-tab="faq">
                        Consultas
                    </button>
                </div>

                <!-- Contenido Dinámico de la Ventana -->
                <div id="ticket-modal-body" class="ticket-modal-body">
                    ${this.renderActiveTabContent()}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const launcherBtn = document.getElementById('chatbot-launcher-btn');
        const closeBtn = document.getElementById('chatbot-close-btn');

        if (launcherBtn) {
            launcherBtn.onclick = () => this.toggleChat();
        }

        if (closeBtn) {
            closeBtn.onclick = () => this.toggleChat(false);
        }

        // Delegación para pestañas
        const root = document.getElementById('colua-chatbot-root');
        if (root) {
            root.addEventListener('click', (e) => {
                const tabBtn = e.target.closest('.ticket-tab-btn');
                if (tabBtn) {
                    const tab = tabBtn.getAttribute('data-tab');
                    if (tab) this.switchTab(tab);
                }
            });
        }

        this.bindFormEvents();
    }

    bindFormEvents() {
        const form = document.getElementById('colua-ticket-form');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.handleCreateTicket(form);
            };
        }

        const newTicketBtn = document.getElementById('btn-create-another-ticket');
        if (newTicketBtn) {
            newTicketBtn.onclick = () => {
                this.switchTab('ticket');
            };
        }
    }

    toggleChat(open = null) {
        this.isOpen = open !== null ? open : !this.isOpen;
        const windowEl = document.getElementById('chatbot-window');
        if (windowEl) {
            if (this.isOpen) {
                windowEl.style.display = 'flex';
                // Trigger reflow for CSS transition
                windowEl.offsetHeight;
                windowEl.classList.add('open');
                // Precargar datos si el usuario ya inició sesión
                const user = window.authService?.getCurrentUser();
                if (user) {
                    const nameInput = document.getElementById('ticket-nombre');
                    const dpiInput = document.getElementById('ticket-dpi');
                    const phoneInput = document.getElementById('ticket-telefono');
                    if (nameInput && !nameInput.value) nameInput.value = user.nombre || '';
                    if (dpiInput && !dpiInput.value) dpiInput.value = user.dpi || user.associateId || '';
                    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
                }
            } else {
                windowEl.classList.remove('open');
                setTimeout(() => {
                    if (!this.isOpen) windowEl.style.display = 'none';
                }, 220);
            }
        }
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        // Actualizar botones de pestaña
        document.querySelectorAll('.ticket-tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Actualizar cuerpo
        const body = document.getElementById('ticket-modal-body');
        if (body) {
            body.innerHTML = this.renderActiveTabContent();
            this.bindFormEvents();
        }
    }

    renderActiveTabContent() {
        switch (this.currentTab) {
            case 'mis_tickets':
                return this.renderMisTickets();
            case 'faq':
                return this.renderFaq();
            case 'ticket':
            default:
                return this.renderTicketForm();
        }
    }

    renderTicketForm() {
        const user = window.authService?.getCurrentUser();
        const defaultName = user ? user.nombre || '' : '';
        const defaultDpi = user ? (user.dpi || user.associateId || '') : '';
        const defaultPhone = user ? user.phone || '' : '';

        return `
            <div class="ticket-form-wrap" id="ticket-form-container">
                <div class="ticket-form-intro">
                    <p class="ticket-intro-text">
                        Genera tu turno de atención prioritaria para ser asistido por un asesor de COLUA MICOOPE en agencia o vía telefónica.
                    </p>
                </div>

                <!-- Banner de Alerta de Error (oculto por defecto) -->
                <div id="ticket-error-notice" class="ticket-notice-error" style="display: none; align-items: center; gap: 8px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <span id="ticket-error-message">Por favor completa los campos obligatorios.</span>
                </div>

                <form id="colua-ticket-form" novalidate>
                    <div class="ticket-field-group">
                        <label class="ticket-label" for="ticket-nombre">
                            Nombre y Apellido <span class="req-star">*</span>
                        </label>
                        <input type="text" id="ticket-nombre" class="ticket-input" placeholder="Ej: María Tzep Morales" value="${defaultName}" required />
                    </div>

                    <div class="ticket-row-2col">
                        <div class="ticket-field-group">
                            <label class="ticket-label" for="ticket-telefono">
                                Teléfono Celular <span class="req-star">*</span>
                            </label>
                            <input type="tel" id="ticket-telefono" class="ticket-input" placeholder="Ej: 5544-3322" value="${defaultPhone}" required />
                        </div>
                        <div class="ticket-field-group">
                            <label class="ticket-label" for="ticket-dpi">
                                DPI o No. Asociado
                            </label>
                            <input type="text" id="ticket-dpi" class="ticket-input" placeholder="Opcional" value="${defaultDpi}" />
                        </div>
                    </div>

                    <div class="ticket-field-group">
                        <label class="ticket-label" for="ticket-tramite">
                            Tipo de Trámite o Gestión <span class="req-star">*</span>
                        </label>
                        <select id="ticket-tramite" class="ticket-select" required>
                            <option value="">Selecciona el trámite a realizar...</option>
                            <option value="Solicitud de Crédito">Solicitud de Crédito / Financiamiento</option>
                            <option value="Apertura o Consulta de Ahorro">Apertura o Consulta de Cuentas de Ahorro</option>
                            <option value="Cobro de Remesa Familiar">Cobro o Depósito de Remesa</option>
                            <option value="Seguros Columna">Seguros de Vida o Médicos Columna</option>
                            <option value="Tarjeta de Débito y Fri">Tarjeta de Débito MICOOPE / Transferencias</option>
                            <option value="Tus 6 Beneficios Solidarios">Tus 6 Beneficios Solidarios</option>
                            <option value="Atención General y Requisitos">Requisitos para Asociarse / Otro Asunto</option>
                        </select>
                    </div>

                    <div class="ticket-field-group">
                        <label class="ticket-label" for="ticket-agencia">
                            Agencia de Preferencia
                        </label>
                        <select id="ticket-agencia" class="ticket-select">
                            <option value="Sede Central San Juan Argueta, Sololá">Sede Central - San Juan Argueta, Sololá</option>
                            <option value="Agencia Panajachel">Agencia Panajachel, Sololá</option>
                            <option value="Agencia Sololá Centro">Agencia Sololá Centro</option>
                            <option value="Agencia Chichicastenango">Agencia Chichicastenango, Quiché</option>
                            <option value="Agencia Santa Cruz del Quiché">Agencia Santa Cruz del Quiché</option>
                            <option value="Agencia Totonicapán">Agencia Totonicapán</option>
                            <option value="Agencia Mazatenango">Agencia Mazatenango, Suchitepéquez</option>
                            <option value="Atención Telefónica PBX (7795-7795)">Llamada Telefónica por PBX Central</option>
                        </select>
                    </div>

                    <div class="ticket-field-group">
                        <label class="ticket-label" for="ticket-detalle">
                            Detalle o Consulta Breve (Opcional)
                        </label>
                        <textarea id="ticket-detalle" class="ticket-textarea" rows="2" placeholder="Describe brevemente lo que necesitas..."></textarea>
                    </div>

                    <button type="submit" id="btn-submit-ticket" class="ticket-btn-submit">
                        <span class="btn-text">Generar Ticket de Turno</span>
                        <span class="btn-icon">➔</span>
                    </button>
                </form>
            </div>
        `;
    }

    handleCreateTicket(form) {
        const nombreInput = document.getElementById('ticket-nombre');
        const telInput = document.getElementById('ticket-telefono');
        const tramiteInput = document.getElementById('ticket-tramite');
        const dpiInput = document.getElementById('ticket-dpi');
        const agenciaInput = document.getElementById('ticket-agencia');
        const detalleInput = document.getElementById('ticket-detalle');

        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const telefono = telInput ? telInput.value.trim() : '';
        const tramite = tramiteInput ? tramiteInput.value.trim() : '';
        const dpi = dpiInput ? dpiInput.value.trim() : '';
        const agencia = agenciaInput ? agenciaInput.value : 'Sede Central San Juan Argueta, Sololá';
        const detalle = detalleInput ? detalleInput.value.trim() : '';

        // Limpiar errores previos
        [nombreInput, telInput, tramiteInput].forEach(inp => inp && inp.classList.remove('input-field-error'));
        const errorNotice = document.getElementById('ticket-error-notice');
        if (errorNotice) errorNotice.style.display = 'none';

        // Validación con Animación de Error
        let hasError = false;
        let errorMsg = '';

        if (!nombre) {
            nombreInput?.classList.add('input-field-error');
            hasError = true;
            errorMsg = 'Ingresa tu nombre completo.';
        }
        if (!telefono || telefono.replace(/\D/g, '').length < 8) {
            telInput?.classList.add('input-field-error');
            hasError = true;
            errorMsg = errorMsg ? 'Completa los campos obligatorios marcados en rojo.' : 'Ingresa un número de teléfono válido de 8 dígitos.';
        }
        if (!tramite) {
            tramiteInput?.classList.add('input-field-error');
            hasError = true;
            errorMsg = 'Selecciona el tipo de trámite que deseas realizar.';
        }

        if (hasError) {
            this.triggerErrorAnimation(errorMsg);
            return;
        }

        // Generar Ticket Exitoso (Animación de Hecho)
        const correlativoNum = Math.floor(1000 + Math.random() * 9000);
        const ticketCode = `TK-2026-${correlativoNum}`;
        const fechaHora = new Date().toLocaleString('es-GT', { dateStyle: 'short', timeStyle: 'short' });

        const newTicket = {
            id: ticketCode,
            nombre,
            telefono,
            dpi: dpi || 'No indicado',
            tramite,
            agencia,
            detalle,
            fecha: fechaHora,
            estado: 'En Cola de Atención',
            timestamp: Date.now()
        };

        this.tickets.unshift(newTicket);
        this.saveTickets();

        // Alerta SweetAlert2
        if (window.Swal) {
            Swal.fire({
                title: "¡Ticket Generado!",
                text: `Tu turno oficial ${newTicket.id} ha sido registrado para ${newTicket.tramite}.`,
                icon: "success",
                draggable: true,
                confirmButtonColor: "#173789",
                confirmButtonText: "Ver mi Ticket"
            });
        }

        // Mostrar pantalla de éxito "Hecho"
        this.renderTicketSuccess(newTicket);
    }

    triggerErrorAnimation(msg) {
        const container = document.getElementById('ticket-form-container');
        const notice = document.getElementById('ticket-error-notice');
        const msgEl = document.getElementById('ticket-error-message');

        if (notice && msgEl) {
            msgEl.textContent = msg;
            notice.style.display = 'flex';
        }

        if (container) {
            container.classList.remove('colua-shake-animate');
            // Reflow
            void container.offsetWidth;
            container.classList.add('colua-shake-animate');
        }
    }

    renderTicketSuccess(ticket) {
        const body = document.getElementById('ticket-modal-body');
        if (!body) return;

        // Limpiar contador en pestañas
        document.querySelectorAll('.ticket-tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === 'mis_tickets') {
                btn.textContent = `Mis Turnos (${this.tickets.length})`;
            }
        });

        body.innerHTML = `
            <div class="ticket-success-wrap">
                <!-- Checkmark animado SVG -->
                <div class="ticket-success-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h3 class="ticket-success-title">¡Turno Reservado con Éxito!</h3>
                <p class="ticket-success-desc">
                    Hola <strong>${ticket.nombre}</strong>, tu solicitud para <strong>${ticket.tramite}</strong> en <strong>${ticket.agencia}</strong> ha sido agendada en el sistema.
                </p>

                <!-- Tarjeta de Ticket emitido -->
                <div class="ticket-issued-card">
                    <div class="ticket-issued-header">
                        <span>Ticket Oficial de Atención</span>
                        <span class="ticket-live-dot"></span>
                    </div>
                    <div class="ticket-issued-number">${ticket.id}</div>
                    <div class="ticket-issued-meta">
                        <span><strong>Trámite:</strong> ${ticket.tramite}</span>
                        <span><strong>Fecha y Hora:</strong> ${ticket.fecha}</span>
                        <span><strong>Agencia:</strong> ${ticket.agencia}</span>
                    </div>
                    <div class="ticket-issued-footer">
                        Guarda este correlativo para presentar en ventanilla o confirmar por WhatsApp.
                    </div>
                </div>

                <!-- Acciones del Ticket -->
                <div class="ticket-success-actions">
                    <button id="btn-copy-ticket" class="btn btn-outline" style="padding: 8px 14px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copiar Ticket
                    </button>
                    <a href="https://wa.me/50277957795?text=${encodeURIComponent(`Hola COLUA MICOOPE, generé mi ticket de atención ${ticket.id} para ${ticket.tramite} a nombre de ${ticket.nombre}.`)}"
                       target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 8px 14px; font-size: 0.85rem; background: #059669; border-color: #059669; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        Confirmar en WhatsApp
                    </a>
                </div>

                <div style="margin-top: 14px; text-align: center;">
                    <button id="btn-create-another-ticket" class="btn-link" style="font-size: 0.82rem; color: var(--colua-navy); background: none; border: none; cursor: pointer; text-decoration: underline;">
                        + Emitir otro ticket de turno
                    </button>
                </div>
            </div>
        `;

        // Eventos de botones de éxito
        document.getElementById('btn-copy-ticket')?.addEventListener('click', () => {
            navigator.clipboard.writeText(ticket.id).then(() => {
                if (window.Swal) {
                    Swal.fire({
                        title: "¡Copiado!",
                        text: `Ticket ${ticket.id} copiado al portapapeles.`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    window.app?.showToast(`Ticket ${ticket.id} copiado al portapapeles`, 'success');
                }
            });
        });

        document.getElementById('btn-create-another-ticket')?.addEventListener('click', () => {
            this.switchTab('ticket');
        });
    }

    renderMisTickets() {
        if (this.tickets.length === 0) {
            return `
                <div style="text-align: center; padding: 40px 16px;">
                    <div style="width: 52px; height: 52px; border-radius: 50%; background: #eef2ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <h4 style="font-size: 1rem; color: var(--colua-navy); font-weight: 700; margin-bottom: 4px;">
                        No tienes turnos activos
                    </h4>
                    <p style="font-size: 0.82rem; color: var(--colua-gray-600); max-width: 260px; margin: 0 auto 16px auto;">
                        Cuando saques un ticket para créditos, ahorros o agencias, aparecerá listado aquí con su número correlativo.
                    </p>
                    <button class="btn btn-primary" style="padding: 8px 18px; font-size: 0.85rem;" onclick="window.chatbotComponent.switchTab('ticket')">
                        Sacar Ticket Ahora
                    </button>
                </div>
            `;
        }

        const itemsHtml = this.tickets.map(t => `
            <div class="ticket-history-card">
                <div class="ticket-history-header">
                    <strong class="ticket-history-code">${t.id}</strong>
                    <span class="ticket-history-badge"><span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;margin-right:4px;"></span>${t.estado || 'En Espera'}</span>
                </div>
                <div class="ticket-history-body">
                    <div style="font-size: 0.88rem; font-weight: 600; color: #0f172a; margin-bottom: 2px;">
                        ${t.tramite}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">
                        Agencia: ${t.agencia}<br>
                        ${t.nombre} • Tel: ${t.telefono}
                    </div>
                </div>
                <div class="ticket-history-footer">
                    <span>${t.fecha}</span>
                    <button class="btn-copy-history" onclick="navigator.clipboard.writeText('${t.id}'); window.Swal ? Swal.fire({ title: '¡Copiado!', text: 'Ticket ${t.id} copiado', icon: 'success', timer: 1500, showConfirmButton: false }) : window.app?.showToast('Ticket ${t.id} copiado', 'success');">
                        Copiar No.
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div style="padding: 4px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 0 4px;">
                    <span style="font-size: 0.82rem; color: var(--colua-gray-600);">Historial de turnos guardados:</span>
                    <button style="background: none; border: none; color: #dc2626; font-size: 0.75rem; cursor: pointer;" onclick="if(confirm('¿Limpiar historial de tickets?')){ localStorage.removeItem('colua_tickets_history'); window.chatbotComponent.tickets=[]; window.chatbotComponent.switchTab('mis_tickets'); }">
                        Limpiar historial
                    </button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }

    renderFaq() {
        return `
            <div class="ticket-faq-wrap">
                <div style="margin-bottom: 14px;">
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--colua-navy); margin-bottom: 4px;">
                        Consultas Institucionales Frecuentes
                    </h4>
                    <p style="font-size: 0.8rem; color: var(--colua-gray-600); margin: 0;">
                        Información oficial del Sistema COLUA MICOOPE sin intermediarios.
                    </p>
                </div>

                <div class="ticket-faq-accordion">
                    <details class="ticket-faq-item" open>
                        <summary class="ticket-faq-summary">
                            ¿Cuáles son los requisitos para asociarse a COLUA?
                        </summary>
                        <div class="ticket-faq-content">
                            1. Presentar DPI vigente (original y copia).<br>
                            2. Recibo reciente de luz o agua potable.<br>
                            3. Aportación inicial desde <strong>Q50.00</strong>.<br>
                            <em>Al asociarte tienes acceso inmediato a tus 6 Beneficios Solidarios.</em>
                        </div>
                    </details>

                    <details class="ticket-faq-item">
                        <summary class="ticket-faq-summary">
                            ¿Qué tasa de interés ofrece el Ahorro a Plazo Fijo?
                        </summary>
                        <div class="ticket-faq-content">
                            Ofrecemos tasas altamente competitivas de hasta el <strong>7.50% anual</strong>, dependiendo del monto invertido y el plazo pactado (desde 90 días hasta 3 años o más).
                        </div>
                    </details>

                    <details class="ticket-faq-item">
                        <summary class="ticket-faq-summary">
                            ¿Cuáles son los requisitos básicos de crédito?
                        </summary>
                        <div class="ticket-faq-content">
                            • Ser asociado activo o abrir tu cuenta.<br>
                            • DPI y constancia de ingresos o estados de cuenta de negocio.<br>
                            • Recibo de servicios domiciliario.<br>
                            <em>Líneas para comercio, agricultura, consumo y vivienda con seguro de deudor incluido.</em>
                        </div>
                    </details>

                    <details class="ticket-faq-item">
                        <summary class="ticket-faq-summary">
                            Horarios de atención y PBX Oficial
                        </summary>
                        <div class="ticket-faq-content">
                            <strong>PBX Central:</strong> (502) 7795-7795<br>
                            <strong>Horario Agencias:</strong> Lunes a Viernes de 8:00 a 17:00 hrs. Sábados de 8:00 a 12:00 hrs.<br>
                            <strong>Cobertura:</strong> 25 Agencias en Sololá, Quiché, Totonicapán y Suchitepéquez.
                        </div>
                    </details>
                </div>

                <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                    <span style="font-size: 0.8rem; color: #475569; display: block; margin-bottom: 8px;">
                        ¿Necesitas atención personalizada inmediata?
                    </span>
                    <a href="tel:77957795" class="btn btn-outline" style="padding: 6px 14px; font-size: 0.82rem; color: var(--colua-navy); border-color: var(--colua-navy); text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Llamar al PBX: 7795-7795
                    </a>
                </div>
            </div>
        `;
    }
}

window.chatbotComponent = new ChatbotComponent();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.chatbotComponent.init());
} else {
    window.chatbotComponent.init();
}
