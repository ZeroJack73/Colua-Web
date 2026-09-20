// web/js/components/agencias.js - Directorio Oficial de Agencias COLUA R.L.

class AgenciasComponent {
    constructor() {
        this.agencies = [];
        this.filteredAgencies = [];
        this.selectedDepartment = 'all';
        this.selectedType = 'all';
        this.searchQuery = '';
        
        // Directorio Oficial COLUA R.L. (25 agencias del folleto oficial institucional)
        this.officialAgencies = [
            // SOLOLÁ (18 agencias)
            { id: "ag_agencia_corporativa", nombre: "Agencia Corporativa", departamento: "Sololá", direccion: "Carretera Interamericana, Km. 138.5 Aldea San Juan Argueta, Sololá.", telefono: "7795-7795", colorHex: "#E42A67", tipo: "AGENCIA" },
            { id: "ag_agencia_central", nombre: "Agencia Central", departamento: "Sololá", direccion: "Camino Principal Aldea San Juan Argueta, Sololá.", telefono: "7795-7722", colorHex: "#EF8819", tipo: "AGENCIA" },
            { id: "ag_plaza_colua_micoope", nombre: "Plaza COLUA MICOOPE", departamento: "Sololá", direccion: "Plaza COLUA 2do. Nivel, 6ta. Avenida 7-47, Zona 2 Sololá.", telefono: "7762-3180 / 7762-3608 / 7762-3257", colorHex: "#EF8819", tipo: "AGENCIA" },
            { id: "ag_el_calvario", nombre: "El Calvario", departamento: "Sololá", direccion: "7ma. Avenida, 6ta. Calle esquina, Zona 2 Barrio El Calvario, Sololá.", telefono: "4931-5495 / 7762-5453", colorHex: "#634794", tipo: "AGENCIA" },
            { id: "ag_san_bartolo", nombre: "San Bartolo", departamento: "Sololá", direccion: "11 Calle 8-04, Zona 2, Barrio San Bartolo, Sololá.", telefono: "7795-7723 / 7762-3984", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_concepcion", nombre: "Concepción", departamento: "Sololá", direccion: "Sector Chuicumes I, Zona 0, Calle Principal Concepción, Sololá.", telefono: "7795-7735", colorHex: "#E42A67", tipo: "AGENCIA" },
            { id: "ag_los_encuentros", nombre: "Los Encuentros", departamento: "Sololá", direccion: "Carretera Interamericana, Caserío Central Aldea Los Encuentros, Sololá.", telefono: "5829-2086", colorHex: "#EF8819", tipo: "AGENCIA" },
            { id: "ag_panajachel", nombre: "Panajachel", departamento: "Sololá", direccion: "0 Avenida, Calle del Estadio, 0-74, Zona 1 Panajachel.", telefono: "7795-7718", colorHex: "#F59E0B", tipo: "AGENCIA" },
            { id: "ag_san_andres_semetabaj", nombre: "San Andrés Semetabaj", departamento: "Sololá", direccion: "Barrio Tzanjuyu, San Andrés Semetabaj.", telefono: "7795-7733", colorHex: "#634794", tipo: "AGENCIA" },
            { id: "ag_santiago_atitlan", nombre: "Santiago Atitlán", departamento: "Sololá", direccion: "3ra. Calle 0-58, Cantón Tzanjuyu, Zona 1 Santiago Atitlán.", telefono: "7795-7720 / 5923-5086", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_san_pedro_la_laguna", nombre: "San Pedro La Laguna", departamento: "Sololá", direccion: "Calle al Embarcadero Chuasanahí, 5-60, Zona 2 San Pedro La Laguna.", telefono: "7721-8061 / 4921-3887", colorHex: "#E42A67", tipo: "AGENCIA" },
            { id: "ag_san_juan_la_laguna", nombre: "San Juan La Laguna", departamento: "Sololá", direccion: "4ta. Avenida Cantón Chuitinamit, Zona 2 San Juan La Laguna.", telefono: "7795-7728", colorHex: "#EF8819", tipo: "AGENCIA" },
            { id: "ag_santa_clara_la_laguna", nombre: "Santa Clara La Laguna", departamento: "Sololá", direccion: "1ra. Avenida, Zona 2 Santa Clara La Laguna.", telefono: "4928-2887 / 7927-1939", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_santa_lucia_utatlan", nombre: "Santa Lucía Utatlán", departamento: "Sololá", direccion: "Avenida Tecún Umán, entre 2da. y 3ra. Calle, Zona 1 Santa Lucía Utatlán.", telefono: "7722-1519", colorHex: "#634794", tipo: "AGENCIA" },
            { id: "ag_el_novillero", nombre: "El Novillero", departamento: "Sololá", direccion: "Calle Principal, Aldea El Novillero, Santa Lucía Utatlán.", telefono: "4928-1377 / 4921-8753", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_nahuala", nombre: "Nahualá", departamento: "Sololá", direccion: "Calle Principal, 1ra. Avenida 2-05, Zona 1 Nahualá.", telefono: "7795-7713", colorHex: "#E42A67", tipo: "AGENCIA" },
            { id: "ag_santa_catarina_ixtahuacan", nombre: "Santa Catarina Ixtahuacán", departamento: "Sololá", direccion: "Barrio Chuijuyup, frente al Mercado Municipal, Santa Catarina Ixtahuacán.", telefono: "7795-7732 / 4921-6226", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_guineales", nombre: "Guineales", departamento: "Sololá", direccion: "Sector Campo, a un costado del Estadio Aldea Guineales, Santa Catarina Ixtahuacán.", telefono: "7795-7731", colorHex: "#EF8819", tipo: "AGENCIA" },
            
            // QUICHÉ (4 agencias)
            { id: "ag_agencia_quiche", nombre: "Quiché", departamento: "Quiché", direccion: "3ra. Avenida 04-35, Zona 1, Santa Cruz del Quiché.", telefono: "7795-7730", colorHex: "#634794", tipo: "AGENCIA" },
            { id: "ag_agencia_chichicastenango", nombre: "Chichicastenango", departamento: "Quiché", direccion: "5ta. Calle, entre 5ta y 6ta. Avenida, Chichicastenango.", telefono: "7795-7719", colorHex: "#59B8A4", tipo: "AGENCIA" },
            { id: "ag_agencia_joyabaj", nombre: "Joyabaj", departamento: "Quiché", direccion: "Calle Principal, Barrio La Libertad, Joyabaj.", telefono: "7795-7715 / 7755-9398", colorHex: "#E42A67", tipo: "AGENCIA" },
            { id: "ag_agencia_zacualpa", nombre: "Zacualpa", departamento: "Quiché", direccion: "1ra. Calle, 2da. Avenida, Zona 1, Zacualpa.", telefono: "5829-3158", colorHex: "#EF8819", tipo: "AGENCIA" },
            
            // TOTONICAPÁN (2 agencias)
            { id: "ag_agencia_la_esperanza", nombre: "La Esperanza", departamento: "Totonicapán", direccion: "Camino Principal, Aldea La Esperanza, Totonicapán.", telefono: "7795-7714", colorHex: "#F59E0B", tipo: "AGENCIA" },
            { id: "ag_agencia_la_concordia", nombre: "La Concordia", departamento: "Totonicapán", direccion: "Calle Principal, Aldea La Concordia, Totonicapán.", telefono: "7795-7724 / 4214-3136", colorHex: "#634794", tipo: "AGENCIA" },
            
            // SUCHITEPÉQUEZ (1 agencia)
            { id: "ag_agencia_santo_tomas_la_union", nombre: "Santo Tomás La Unión", departamento: "Suchitepéquez", direccion: "3ra. Calle, entre 4ta y 5ta. Avenida, Zona 1, Santo Tomás La Unión, Suchitepéquez.", telefono: "7872-8526", colorHex: "#59B8A4", tipo: "AGENCIA" },

            // PUNTOS ADICIONALES (Agentes MICOOPE & Cajeros 5B)
            { id: "ag_agente_super_la_bendicion", nombre: "Agente MICOOPE - Súper La Bendición", departamento: "Sololá", direccion: "Punto Comercial La Bendición, Sololá.", telefono: "7795-7795", colorHex: "#59B8A4", tipo: "AGENTE" },
            { id: "ag_agente_farmacia_el_ahorro", nombre: "Agente MICOOPE - Farmacia El Ahorro", departamento: "Quiché", direccion: "Calle Principal, Santa Cruz del Quiché.", telefono: "7795-7795", colorHex: "#59B8A4", tipo: "AGENTE" },
            { id: "ag_cajero_5b_central", nombre: "Cajero 5B - Sede Central", departamento: "Sololá", direccion: "Sede Central COLUA, San Juan Argueta.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO" },
            { id: "ag_cajero_5b_quiche", nombre: "Cajero 5B - Terminal Quiché", departamento: "Quiché", direccion: "Terminal de Buses, Santa Cruz del Quiché.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO" },
            { id: "ag_cajero_5b_totonicapan", nombre: "Cajero 5B - Totonicapán", departamento: "Totonicapán", direccion: "Parque Central, Totonicapán.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO" }
        ];
    }

    normalizeAgency(raw) {
        return {
            id: raw.id || `ag_${Math.random().toString(36).substring(2, 8)}`,
            nombre: raw.nombre || raw.name || 'Agencia COLUA',
            departamento: raw.departamento || raw.department || 'Sololá',
            direccion: raw.direccion || raw.address || 'Guatemala',
            telefono: raw.telefono || raw.phone || '7795-7795',
            colorHex: raw.colorHex || raw.color || '#59B8A4',
            tipo: (raw.tipo || raw.type || 'AGENCIA').toUpperCase(),
            hours: raw.hours || raw.horario || 'Lunes a Viernes 8:00 - 17:00'
        };
    }

    async render(container) {
        container.innerHTML = `
            <div class="clean-subpage-container">
                <header class="clean-subpage-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
                    <div style="flex: 1; min-width: 280px;">
                        <h1 class="clean-subpage-title">Directorio Oficial de Agencias</h1>
                        <p class="clean-subpage-desc">25 agencias a tu servicio en Sololá, Quiché, Totonicapán y Suchitepéquez. Encuentra tu agencia más cercana con teléfonos y direcciones actualizadas.</p>
                    </div>
                    <img src="assets/colua_edificio.png" alt="Sede Central COLUA" style="width: 72px; height: auto; object-fit: contain; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" />
                </header>

                <div>
                    <!-- Banner PBX y Controles de Búsqueda -->
                    <div style="background: #ffffff; padding: 18px 20px; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                        <!-- Barra superior: Búsqueda y PBX rápido -->
                        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                            <div style="position: relative; flex: 1; min-width: 260px;">
                                <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; pointer-events: none;">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </span>
                                <input type="text" id="agency-search-input" placeholder="Buscar agencia por municipio, dirección o teléfono..." 
                                    style="width: 100%; padding: 10px 14px 10px 40px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 0.92rem; outline: none; transition: border-color 0.2s;" />
                            </div>
                            <a href="tel:77957795" class="clean-btn-card-action" style="padding: 10px 18px; font-size: 0.88rem; border-radius: 10px; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px;">
                                <img src="assets/pbx.png" alt="PBX" style="width: 20px; height: 20px; object-fit: contain;" />
                                <strong>PBX Central: 7795-7795</strong>
                            </a>
                        </div>

                        <!-- Filtros por Departamento -->
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <span style="font-size: 0.82rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Filtrar por Departamento:</span>
                                <span id="agencies-results-count" style="font-size: 0.84rem; color: #64748b; font-weight: 600;">Cargando agencias...</span>
                            </div>
                            <div class="dept-filter-chips" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
                                <button class="filter-chip active" data-dept="all">Todas (25)</button>
                                <button class="filter-chip" data-dept="Sololá">Sololá (18)</button>
                                <button class="filter-chip" data-dept="Quiché">Quiché (4)</button>
                                <button class="filter-chip" data-dept="Totonicapán">Totonicapán (2)</button>
                                <button class="filter-chip" data-dept="Suchitepéquez">Suchitepéquez (1)</button>
                            </div>
                        </div>

                        <!-- Filtros secundarios por tipo -->
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; gap: 8px; overflow-x: auto;">
                            <span style="font-size: 0.78rem; font-weight: 600; color: #64748b; white-space: nowrap;">Tipo de punto:</span>
                            <div class="agency-type-chips" style="display: flex; gap: 6px;">
                                <button class="filter-chip active" data-type="all" style="font-size: 0.8rem; padding: 4px 10px;">Todos los Puntos</button>
                                <button class="filter-chip" data-type="AGENCIA" style="font-size: 0.8rem; padding: 4px 10px;">Agencias Oficiales (25)</button>
                                <button class="filter-chip" data-type="AGENTE" style="font-size: 0.8rem; padding: 4px 10px;">Agentes MICOOPE</button>
                                <button class="filter-chip" data-type="CAJERO" style="font-size: 0.8rem; padding: 4px 10px;">Cajeros 5B</button>
                            </div>
                        </div>
                    </div>

                    <!-- Contenedor Principal de Agencias -->
                    <div id="agencies-grid-container" style="min-height: 300px;">
                        <div style="display: flex; justify-content: center; align-items: center; padding: 60px;">
                            <div class="spinner"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents(container);
        await this.loadAgencies();
    }

    bindEvents(container) {
        const searchInput = container.querySelector('#agency-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.applyFilters();
            });
        }

        const deptChips = container.querySelectorAll('.dept-filter-chips .filter-chip');
        deptChips.forEach(chip => {
            chip.addEventListener('click', () => {
                deptChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.selectedDepartment = chip.getAttribute('data-dept');
                this.applyFilters();
            });
        });

        const typeChips = container.querySelectorAll('.agency-type-chips .filter-chip');
        typeChips.forEach(chip => {
            chip.addEventListener('click', () => {
                typeChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.selectedType = chip.getAttribute('data-type');
                this.applyFilters();
            });
        });
    }

    async loadAgencies() {
        try {
            let loaded = [];
            const repo = window.coluaRepository;
            if (repo) {
                loaded = await repo.getAgencies();
            }
            if (!loaded || loaded.length < 20) {
                loaded = this.officialAgencies;
            }
            this.agencies = loaded.map(item => this.normalizeAgency(item));
        } catch (e) {
            console.error('[Agencias] Error al cargar directorio:', e);
            this.agencies = this.officialAgencies.map(item => this.normalizeAgency(item));
        }

        this.filteredAgencies = [...this.agencies];
        this.renderAgenciesList();
    }

    applyFilters() {
        let result = [...this.agencies];

        // Filtro departamento
        if (this.selectedDepartment !== 'all') {
            result = result.filter(item => 
                (item.departamento || '').toLowerCase() === this.selectedDepartment.toLowerCase()
            );
        }

        // Filtro tipo
        if (this.selectedType !== 'all') {
            result = result.filter(item => 
                (item.tipo || 'AGENCIA').toUpperCase() === this.selectedType.toUpperCase()
            );
        }

        // Filtro búsqueda
        if (this.searchQuery) {
            result = result.filter(item => {
                const name = (item.nombre || '').toLowerCase();
                const addr = (item.direccion || '').toLowerCase();
                const dept = (item.departamento || '').toLowerCase();
                const phone = (item.telefono || '').toLowerCase();
                return name.includes(this.searchQuery) ||
                       addr.includes(this.searchQuery) ||
                       dept.includes(this.searchQuery) ||
                       phone.includes(this.searchQuery);
            });
        }

        this.filteredAgencies = result;
        this.renderAgenciesList();
    }

    renderAgenciesList() {
        const grid = document.getElementById('agencies-grid-container');
        const countLabel = document.getElementById('agencies-results-count');
        if (!grid) return;

        if (countLabel) {
            countLabel.textContent = `Mostrando ${this.filteredAgencies.length} ubicaciones`;
        }

        if (this.filteredAgencies.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; background: white; border-radius: 14px; border: 1px solid #e2e8f0;">
                    <div style="width: 56px; height: 56px; border-radius: 50%; background: #eef2ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <h3 style="color: #0f172a; font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">No se encontraron agencias</h3>
                    <p style="color: #64748b; font-size: 0.88rem;">Intenta con otro término de búsqueda o selecciona "Todas".</p>
                </div>
            `;
            return;
        }

        // Si estamos viendo "Todas" y no hay búsqueda activa, agrupamos por departamento con el encabezado del folleto
        if (this.selectedDepartment === 'all' && !this.searchQuery && this.selectedType === 'all') {
            const depts = [
                { name: 'Sololá', count: 18 },
                { name: 'Quiché', count: 4 },
                { name: 'Totonicapán', count: 2 },
                { name: 'Suchitepéquez', count: 1 }
            ];

            let html = '';
            depts.forEach(d => {
                const deptItems = this.filteredAgencies.filter(a => (a.departamento || '').toLowerCase() === d.name.toLowerCase());
                if (deptItems.length > 0) {
                    html += `
                        <section class="agency-dept-section">
                            <div class="agency-dept-title-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>${d.name.toUpperCase()} (${deptItems.length})</span>
                            </div>
                            <div class="agency-dept-grid">
                                ${deptItems.map(item => this.createAgencyCard(item)).join('')}
                            </div>
                        </section>
                    `;
                }
            });

            // Si hay items extra (ej. cajeros u otros) que no caigan en los 4 principales
            const extraItems = this.filteredAgencies.filter(a => !depts.some(d => d.name.toLowerCase() === (a.departamento || '').toLowerCase()));
            if (extraItems.length > 0) {
                html += `
                    <section class="agency-dept-section">
                        <div class="agency-dept-title-badge" style="background: #173789;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M9 8h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17"/></svg>
                            <span>OTROS PUNTOS DE SERVICIO (${extraItems.length})</span>
                        </div>
                        <div class="agency-dept-grid">
                            ${extraItems.map(item => this.createAgencyCard(item)).join('')}
                        </div>
                    </section>
                `;
            }

            grid.innerHTML = html;
        } else {
            // Vista en rejilla directa cuando hay filtro o búsqueda
            grid.innerHTML = `
                <div class="agency-dept-grid">
                    ${this.filteredAgencies.map(item => this.createAgencyCard(item)).join('')}
                </div>
            `;
        }

        // No copy button needed
    }

    createAgencyCard(agency) {
        const stripeColor = agency.colorHex || '#59B8A4';
        
        // Parsear teléfonos individuales para hacer cada uno un link clickeable
        const phones = (agency.telefono || '7795-7795').split('/').map(p => p.trim()).filter(Boolean);
        const primaryPhone = phones[0] || '7795-7795';
        const primaryCleanPhone = primaryPhone.replace(/[^0-9]/g, '');

        const phoneLinksHtml = phones.map(phone => {
            const clean = phone.replace(/[^0-9]/g, '');
            return `<a href="tel:${clean}" class="agency-flyer-phone-link" title="Llamar a ${agency.nombre}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> ${phone}</a>`;
        }).join('<span style="color: #cbd5e1; margin: 0 2px;">•</span>');

        const mapsQuery = encodeURIComponent(`COLUA ${agency.nombre} ${agency.direccion}`);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

        const isAgencia = agency.tipo === 'AGENCIA';

        return `
            <div class="agency-flyer-card" id="card-${agency.id}">
                <div class="agency-color-stripe" style="background-color: ${stripeColor};"></div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
                        <h3 class="agency-flyer-name">${agency.nombre}</h3>
                        ${!isAgencia ? `
                            <span style="background: #f1f5f9; color: #475569; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">
                                ${agency.tipo === 'AGENTE' ? 'Agente' : 'Cajero 5B'}
                            </span>
                        ` : ''}
                    </div>

                    <div style="display: flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 700; color: #059669; margin-bottom: 6px;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>${agency.departamento}</span>
                    </div>

                    <p class="agency-flyer-address">${agency.direccion}</p>
                </div>

                <div>
                    <div class="agency-flyer-phone-row">
                        ${phoneLinksHtml}
                    </div>

                    <div class="agency-flyer-actions">
                        <a href="tel:${primaryCleanPhone}" class="agency-btn-action agency-btn-call" title="Llamar a ${agency.nombre}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span>Llamar</span>
                        </a>
                        <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="agency-btn-action" title="Ver ubicación en Google Maps">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                            <span>Ver Mapa</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

window.agenciasComponent = new AgenciasComponent();
