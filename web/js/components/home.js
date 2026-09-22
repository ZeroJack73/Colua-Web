// web/js/components/home.js — Portal Corporativo Minimalista COLUA MICOOPE

class HomeComponent {
  async render() {
    let sections = [];
    try {
      if (window.coluaRepository) {
        const allSec = await window.coluaRepository.getAllSections();
        sections = allSec.filter(s => s.id !== 'sec_home' && s.slug !== 'home' && s.isVisible !== false && s.isEnabled !== false && s.menuPlacement !== 'hidden' && s.id !== 'sec_comunidad' && s.slug !== 'comunidad');
      }
    } catch (e) {
      console.error('Error cargando secciones dinámicas en Home:', e);
    }

    const iconMap = {
      'inicio': 'assets/distintivo_colua.png',
      'ahorros': 'assets/ahorros.png',
      'credito': 'assets/credito.png',
      'seguro': 'assets/seguro.png',
      'remesa': 'assets/remesa.png',
      'ubicacion': 'assets/ubicacion.png',
      'servicios_digitales': 'assets/servicios_digitales.png',
      'beneficios': 'assets/beneficios.png',
      'noticias_colua': 'assets/noticias.png',
      'public_service': 'assets/distintivo_colua.png',
      'sostenibilidad_cooperativa': 'assets/sostenibilidad_cooperativa.png',
      'sec_ahorros': 'assets/ahorros.png',
      'sec_creditos': 'assets/credito.png',
      'sec_seguros': 'assets/seguro.png',
      'sec_remesas': 'assets/remesa.png',
      'sec_agencias': 'assets/ubicacion.png',
      'sec_servicios': 'assets/servicios_digitales.png',
      'sec_beneficios': 'assets/beneficios.png',
      'sec_noticias': 'assets/noticias.png',
      'sec_nosotros': 'assets/distintivo_colua.png',
      'sec_sostenibilidad': 'assets/sostenibilidad_cooperativa.png'
    };

    if (!sections || sections.length === 0) {
      sections = [
        { id: "sec_ahorros", title: "Cuentas de Ahorro", description: "Aportaciones, Ahorro Infantil y Planes Programados.", iconName: "ahorros" },
        { id: "sec_creditos", title: "Créditos", description: "Productivo, Consumo, Vivienda y Vehículo con tasas justas.", iconName: "credito" },
        { id: "sec_seguros", title: "Seguros Columna", description: "Protección de vida, gastos médicos y coberturas solidarias.", iconName: "seguro" },
        { id: "sec_remesas", title: "Remesas Familiares", description: "Recibe directo a tu cuenta con beneficio de repatriación.", iconName: "remesa" },
        { id: "sec_beneficios", title: "Tus 6 Beneficios", description: "Hospitalización, seguro de ahorrantes y beneficio de oro.", iconName: "beneficios" },
        { id: "sec_agencias", title: "Agencias & PBX", description: "25 agencias en Sololá, Quiché, Totonicapán y Suchitepéquez.", iconName: "ubicacion" },
        { id: "sec_noticias", title: "Noticias & Novedades", description: "Comunicados oficiales, jornadas y convocatorias.", iconName: "noticias_colua" },
        { id: "sec_sostenibilidad", title: "Sostenibilidad & Formación", description: "Becas educativas, talleres y centros de innovación.", iconName: "sostenibilidad_cooperativa" },
        { id: "sec_nosotros", title: "Nosotros", description: "Valores cooperativos, historia y propósito visionario.", iconName: "public_service" }
      ];
    }

    return `
      <div class="clean-page-container">
        
        <!-- ==============================================
             1. HERO MINIMALISTA: CABECERA INSTITUCIONAL
             ============================================== -->
        <header class="clean-hero-header">
          <h1 class="clean-hero-title">
            Hola, bienvenido a <span class="brand-blue-accent">COLUA MICOOPE</span>
          </h1>
          <p class="clean-hero-subtitle">
            El lado humano de los ahorros y créditos cooperativos. Selecciona un área para comenzar tu gestión.
          </p>
        </header>

        <!-- ==============================================
             2. CUADRÍCULA DINÁMICA DE SECCIONES DE GESTIÓN
             ============================================== -->
        <section class="clean-cards-grid" aria-label="Áreas de Gestión Cooperativa">
          ${sections.map(s => {
            const iconImg = s.imageUrl || iconMap[s.id] || iconMap[s.iconName] || 'assets/distintivo_colua.png';
            return `
              <div class="clean-item-card" onclick="window.coluaRouter.navigate('${s.id}')" role="button" tabindex="0" title="Ver ${s.title}">
                <div class="clean-card-top-row">
                  <div class="clean-card-icon-box">
                    ${iconImg.startsWith('assets/') || iconImg.startsWith('http') || iconImg.startsWith('data:') ? `
                      <img src="${iconImg}" alt="${s.title}" class="clean-card-icon-img" onerror="this.src='assets/distintivo_colua.png'" />
                    ` : `
                      <span style="font-size:1.5rem;">${s.icon || '📄'}</span>
                    `}
                  </div>
                  <span class="clean-card-arrow-icon">→</span>
                </div>
                <div class="clean-card-info-bottom">
                  <h3 class="clean-card-title-text">${s.title}</h3>
                  <p class="clean-card-desc-text">${s.description || s.subtitle || ''}</p>
                </div>
              </div>
            `;
          }).join('')}
        </section>

        <!-- ==============================================
             3. BANNERS DE ATENCIÓN Y BANCA DIGITAL
             ============================================== -->
        <section class="clean-banners-container">
          <!-- Banner Blanco: Atención Telefónica -->
          <div class="clean-banner-white-card">
            <div class="clean-banner-phone-icon">
              <img src="assets/pbx.png" alt="PBX" />
            </div>
            <div class="clean-banner-white-info">
              <span class="clean-banner-tag-blue">ATENCIÓN TELEFÓNICA</span>
              <a href="tel:77957795" class="clean-banner-pbx-number">PBX: (502) 7795-7795</a>
              <span class="clean-banner-pbx-hours">Lunes a viernes de 8:00 a 17:00 | Sábados de 8:00 a 12:00 hrs.</span>
            </div>
          </div>

          <!-- Banner Dark Navy: Canal Digital Seguro -->
          <a href="https://micoopeenlinea.com.gt" target="_blank" rel="noopener noreferrer" class="clean-banner-dark-card" title="Ingresar a MICOOPE en Línea">
            <div class="clean-banner-dark-left">
              <div class="clean-banner-dark-icon">
                <img src="assets/micoope_enlinea.png" alt="MICOOPE en Línea" />
              </div>
              <div class="clean-banner-white-info">
                <span class="clean-banner-dark-tag">CANAL DIGITAL SEGURO</span>
                <h4 class="clean-banner-dark-title">Ingresar a MICOOPE en Línea</h4>
              </div>
            </div>
            <span class="clean-banner-dark-arrow">→</span>
          </a>
        </section>

        <!-- ==============================================
             4. SELLOS DE SUPERVISIÓN Y CONFIANZA
             ============================================== -->
        <div class="clean-trust-strip-row">
          <div class="clean-trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Entidad supervisada por la Inspección General de Cooperativas (INGECOP)</span>
          </div>
          <div class="clean-trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Fondo de Garantía MICOOPE</span>
          </div>
        </div>

        <!-- ==============================================
             5. SIMULADOR FINANCIERO MINIMALISTA
             ============================================== -->
        <section class="clean-simulator-wrapper" id="simulador-financiero">
          <div style="margin-bottom:1.5rem;">
            <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin-bottom:0.25rem;">Calcula tu Cuota o Rendimiento</h2>
            <p style="font-size:0.88rem;color:#64748b;">Simula tu préstamo o inversión a plazo fijo con tasas competitivas y transparentes.</p>
          </div>

          <div class="clean-sim-tabs">
            <button class="clean-sim-tab-btn active" id="sim-tab-credito">Simulador de Crédito</button>
            <button class="clean-sim-tab-btn" id="sim-tab-ahorro">Simulador de Ahorro Plazo Fijo</button>
          </div>

          <!-- Panel 1: Crédito -->
          <div id="sim-panel-credito">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:2rem;align-items:center;">
              <div>
                <div style="margin-bottom:1.25rem;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                    <label style="font-size:0.88rem;font-weight:600;color:#334155;">Monto a Solicitar</label>
                    <span id="disp-credito-monto" style="font-size:0.95rem;font-weight:700;color:#2563eb;">Q 25,000</span>
                  </div>
                  <input type="range" id="range-credito-monto" min="1000" max="150000" step="1000" value="25000" style="width:100%;accent-color:#2563eb;" />
                  <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#94a3b8;margin-top:2px;">
                    <span>Q 1,000</span><span>Q 150,000</span>
                  </div>
                </div>

                <div style="margin-bottom:1.25rem;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                    <label style="font-size:0.88rem;font-weight:600;color:#334155;">Plazo del Crédito</label>
                    <span id="disp-credito-plazo" style="font-size:0.95rem;font-weight:700;color:#2563eb;">24 Meses</span>
                  </div>
                  <input type="range" id="range-credito-plazo" min="6" max="60" step="6" value="24" style="width:100%;accent-color:#2563eb;" />
                  <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#94a3b8;margin-top:2px;">
                    <span>6 Meses</span><span>60 Meses</span>
                  </div>
                </div>

                <div>
                  <label style="font-size:0.88rem;font-weight:600;color:#334155;display:block;margin-bottom:0.4rem;">Destino</label>
                  <select id="select-credito-destino" style="width:100%;padding:0.6rem 0.8rem;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:0.88rem;background:#ffffff;color:#0f172a;">
                    <option value="1.25">Crédito Productivo / Capital de Trabajo</option>
                    <option value="1.20">Crédito para Vivienda</option>
                    <option value="1.35">Crédito de Consumo / Personal</option>
                    <option value="1.30">Credi Vehículo Nuevo o Usado</option>
                  </select>
                </div>
              </div>

              <!-- Resultado -->
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;text-align:center;">
                <span style="font-size:0.78rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Cuota Mensual Nivelada</span>
                <div id="calc-credito-cuota" style="font-size:2rem;font-weight:800;color:#0f172a;margin:0.5rem 0 1rem;">Q 1,354.17</div>
                <div style="font-size:0.82rem;color:#64748b;display:flex;flex-direction:column;gap:0.4rem;text-align:left;border-top:1px solid #e2e8f0;padding-top:0.75rem;margin-bottom:1.25rem;">
                  <div style="display:flex;justify-content:space-between;"><span>Capital:</span><strong id="calc-credito-monto-res" style="color:#0f172a;">Q 25,000.00</strong></div>
                  <div style="display:flex;justify-content:space-between;"><span>Plazo:</span><strong id="calc-credito-plazo-res" style="color:#0f172a;">24 meses</strong></div>
                  <div style="display:flex;justify-content:space-between;"><span>Póliza de Deudores:</span><strong style="color:#2563eb;">Incluida</strong></div>
                </div>
                <button class="clean-btn-card-action" onclick="window.coluaRouter.navigate('sec_creditos')" style="background:#2563eb;color:#ffffff;border-color:#2563eb;">
                  Solicitar este Crédito
                </button>
              </div>
            </div>
          </div>

          <!-- Panel 2: Ahorro Plazo Fijo -->
          <div id="sim-panel-ahorro" style="display:none;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:2rem;align-items:center;">
              <div>
                <div style="margin-bottom:1.25rem;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                    <label style="font-size:0.88rem;font-weight:600;color:#334155;">Monto de Inversión</label>
                    <span id="disp-ahorro-monto" style="font-size:0.95rem;font-weight:700;color:#2563eb;">Q 10,000</span>
                  </div>
                  <input type="range" id="range-ahorro-monto" min="1000" max="250000" step="1000" value="10000" style="width:100%;accent-color:#2563eb;" />
                  <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#94a3b8;margin-top:2px;">
                    <span>Q 1,000</span><span>Q 250,000</span>
                  </div>
                </div>

                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                    <label style="font-size:0.88rem;font-weight:600;color:#334155;">Plazo de la Inversión</label>
                    <span id="disp-ahorro-plazo" style="font-size:0.95rem;font-weight:700;color:#2563eb;">365 Días (1 Año)</span>
                  </div>
                  <input type="range" id="range-ahorro-plazo" min="90" max="1095" step="90" value="365" style="width:100%;accent-color:#2563eb;" />
                  <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#94a3b8;margin-top:2px;">
                    <span>90 Días</span><span>3 Años</span>
                  </div>
                </div>
              </div>

              <!-- Resultado Ahorro -->
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;text-align:center;">
                <span style="font-size:0.78rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Ganancia Estimada en Intereses</span>
                <div id="calc-ahorro-ganancia" style="font-size:2rem;font-weight:800;color:#0f172a;margin:0.5rem 0 1rem;">Q 650.00</div>
                <div style="font-size:0.82rem;color:#64748b;display:flex;flex-direction:column;gap:0.4rem;text-align:left;border-top:1px solid #e2e8f0;padding-top:0.75rem;margin-bottom:1.25rem;">
                  <div style="display:flex;justify-content:space-between;"><span>Capital al Vencimiento:</span><strong id="calc-ahorro-total" style="color:#0f172a;">Q 10,650.00</strong></div>
                  <div style="display:flex;justify-content:space-between;"><span>Tasa Preferencial:</span><strong id="calc-ahorro-tasa" style="color:#2563eb;">6.50% Anual</strong></div>
                  <div style="display:flex;justify-content:space-between;"><span>Garantía:</span><strong style="color:#0f172a;">Respaldo MICOOPE</strong></div>
                </div>
                <button class="clean-btn-card-action" onclick="window.coluaRouter.navigate('sec_ahorros')" style="background:#2563eb;color:#ffffff;border-color:#2563eb;">
                  Abrir Cuenta a Plazo Fijo
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    `;
  }

  attachEvents() {
    this.initSimulatorEvents();
  }

  // Lógica del Simulador Financiero en Vivo
  initSimulatorEvents() {
    const tabCredito = document.getElementById('sim-tab-credito');
    const tabAhorro = document.getElementById('sim-tab-ahorro');
    const panelCredito = document.getElementById('sim-panel-credito');
    const panelAhorro = document.getElementById('sim-panel-ahorro');

    if (tabCredito && tabAhorro) {
      tabCredito.onclick = () => {
        tabCredito.classList.add('active');
        tabAhorro.classList.remove('active');
        if (panelCredito) panelCredito.style.display = 'block';
        if (panelAhorro) panelAhorro.style.display = 'none';
      };

      tabAhorro.onclick = () => {
        tabAhorro.classList.add('active');
        tabCredito.classList.remove('active');
        if (panelAhorro) panelAhorro.style.display = 'block';
        if (panelCredito) panelCredito.style.display = 'none';
      };
    }

    // Controles de Crédito
    const rangeMonto = document.getElementById('range-credito-monto');
    const rangePlazo = document.getElementById('range-credito-plazo');
    const selectDestino = document.getElementById('select-credito-destino');

    const updateCredito = () => {
      if (!rangeMonto || !rangePlazo) return;
      const monto = parseFloat(rangeMonto.value);
      const meses = parseInt(rangePlazo.value);
      const tasaMensual = selectDestino ? parseFloat(selectDestino.value) / 100 : 0.0125;

      // Fórmula francesa cuota nivelada
      const cuota = monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -meses)));

      const dispMonto = document.getElementById('disp-credito-monto');
      const dispPlazo = document.getElementById('disp-credito-plazo');
      const calcCuota = document.getElementById('calc-credito-cuota');
      const calcMontoRes = document.getElementById('calc-credito-monto-res');
      const calcPlazoRes = document.getElementById('calc-credito-plazo-res');

      if (dispMonto) dispMonto.innerText = `Q ${monto.toLocaleString('es-GT')}`;
      if (dispPlazo) dispPlazo.innerText = `${meses} Meses (${(meses/12).toFixed(1)} Años)`;
      if (calcCuota) calcCuota.innerText = `Q ${cuota.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      if (calcMontoRes) calcMontoRes.innerText = `Q ${monto.toLocaleString('es-GT')}.00`;
      if (calcPlazoRes) calcPlazoRes.innerText = `${meses} meses`;
    };

    if (rangeMonto) rangeMonto.oninput = updateCredito;
    if (rangePlazo) rangePlazo.oninput = updateCredito;
    if (selectDestino) selectDestino.onchange = updateCredito;

    // Controles de Ahorro Plazo Fijo
    const rangeAhorroMonto = document.getElementById('range-ahorro-monto');
    const rangeAhorroPlazo = document.getElementById('range-ahorro-plazo');

    const updateAhorro = () => {
      if (!rangeAhorroMonto || !rangeAhorroPlazo) return;
      const monto = parseFloat(rangeAhorroMonto.value);
      const dias = parseInt(rangeAhorroPlazo.value);

      let tasaAnual = 0.055;
      if (dias >= 365) tasaAnual = 0.065;
      if (dias >= 730) tasaAnual = 0.075;

      const ganancia = monto * (tasaAnual * (dias / 365));
      const total = monto + ganancia;

      const dispMonto = document.getElementById('disp-ahorro-monto');
      const dispPlazo = document.getElementById('disp-ahorro-plazo');
      const calcGanancia = document.getElementById('calc-ahorro-ganancia');
      const calcTotal = document.getElementById('calc-ahorro-total');
      const calcTasa = document.getElementById('calc-ahorro-tasa');

      if (dispMonto) dispMonto.innerText = `Q ${monto.toLocaleString('es-GT')}`;
      if (dispPlazo) dispPlazo.innerText = `${dias} Días (${Math.round(dias/30)} Meses)`;
      if (calcGanancia) calcGanancia.innerText = `Q ${ganancia.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      if (calcTotal) calcTotal.innerText = `Q ${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      if (calcTasa) calcTasa.innerText = `${(tasaAnual * 100).toFixed(2)}% Anual`;
    };

    if (rangeAhorroMonto) rangeAhorroMonto.oninput = updateAhorro;
    if (rangeAhorroPlazo) rangeAhorroPlazo.oninput = updateAhorro;
  }
}

window.homeComponent = new HomeComponent();
