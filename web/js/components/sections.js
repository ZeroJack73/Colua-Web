// web/js/components/sections.js — Motor de Renderizado de Secciones Minimalistas COLUA MICOOPE

class SectionsComponent {
  async render(sectionId) {
    const cleanId = (sectionId || 'sec_home').toLowerCase();
    
    // Plantillas especializadas
    if (cleanId === 'sec_ahorros' || cleanId === 'ahorros') return this.renderAhorros();
    if (cleanId === 'sec_creditos' || cleanId === 'creditos') return this.renderCreditos();
    if (cleanId === 'sec_seguros' || cleanId === 'seguros') return this.renderSeguros();
    if (cleanId === 'sec_remesas' || cleanId === 'remesas') return this.renderRemesas();
    if (cleanId === 'sec_servicios' || cleanId === 'servicios') return this.renderServicios();
    if (cleanId === 'sec_beneficios' || cleanId === 'beneficios') return this.renderBeneficios();
    if (cleanId === 'sec_sostenibilidad' || cleanId === 'sostenibilidad') return this.renderSostenibilidad();
    if (cleanId === 'sec_nosotros' || cleanId === 'nosotros') return this.renderNosotros();

    // Renderizador de Secciones Genéricas / Creadas dinámicamente en el CMS
    return this.renderDynamicGeneric(cleanId);
  }

  // --- 1. CUENTAS DE AHORRO ---
  async renderAhorros(sectionId) {
    let cuentas = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_ahorros');
      if (dbItems && dbItems.length > 0) {
        cuentas = dbItems.map(i => ({
          titulo: i.title,
          desc: i.description || '',
          detalles: i.subtitle ? i.subtitle.split(',').map(s => s.trim()).filter(Boolean) : [],
          img: i.imageUrl || i.imagePath || 'assets/ahorros.png',
          hasImageTitle: false
        }));
      }
    } catch(e) { console.error(e); }

    if (cuentas.length === 0) {
      cuentas = [
        {
          titulo: "Cuenta Aportación Adulto",
          desc: "Otorga el derecho a la persona natural a asociarse a la cooperativa, convirtiéndolo en dueño con voz y voto en la asamblea general.",
          detalles: ["Monto de apertura: desde Q50.00", "Tasa de interés: 5% anual afecto a ISR", "Intereses: capitalizables anualmente"],
          img: "assets/ahorro1.png",
          hasImageTitle: false
        },
        {
          titulo: "Cuenta Aportación Infanto Juvenil",
          desc: "Otorga el derecho al menor de edad a asociarse a la cooperativa e iniciar el hábito del ahorro con beneficios educativos.",
          detalles: ["Monto de apertura: desde Q50.00", "Tasa de interés: 5% anual afecto a ISR", "Intereses: capitalizables anualmente"],
          img: "assets/ahorro_infanto_juvenil.png",
          hasImageTitle: true
        },
        {
          titulo: "Cuenta Ahorro Infanto Juvenil",
          desc: "Diseñada para motivar y fomentar en los niños y adolescentes la cultura del ahorro y educación financiera.",
          detalles: ["Monto de apertura: desde Q10.00", "Tasa de interés: 3% anual afecto a ISR", "5 Beneficios al mantener mínimo Q500.00"],
          img: "assets/ahorro2.png",
          hasImageTitle: false
        },
        {
          titulo: "Cuenta Ahorro Disponible",
          desc: "Cuenta que el asociado podrá utilizar para darle movimiento diario a sus fondos con total disponibilidad.",
          detalles: ["Apertura: desde Q50.00 o $100.00", "Tasa: 3% anual en Q y 1.50% en $", "Intereses: capitalizables mensualmente", "Acceso a canales digitales sin costo"],
          img: "assets/ahorro_disponible.png",
          hasImageTitle: true
        },
        {
          titulo: "Cuenta Ahorro Programado",
          desc: "Permite a los asociados aportar cuotas fijas mensuales para metas y proyectos futuros con tasas preferenciales.",
          detalles: ["Apertura: desde Q25.00", "Tasa de interés: 7.50% anual afecto a ISR", "Plazos de 3, 5, 10, 15 o 20 años", "Intereses mensuales"],
          img: "assets/ahorro_programado.png",
          hasImageTitle: true
        },
        {
          titulo: "Cuenta Ahorro Plazo Fijo",
          desc: "Obtén el máximo rendimiento y seguridad garantizada sobre tus inversiones a plazo fijo.",
          detalles: ["Apertura: desde Q1,000.00 o $200.00", "Plazos de 90, 180 y 365 días", "Intereses capitalizables trimestralmente"],
          img: "assets/ahorro_plazo_fijo.png",
          hasImageTitle: true
        }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">Cuentas de Ahorro COLUA</h1>
          <p class="clean-subpage-desc">
            Construye un futuro financiero sólido con nuestras opciones de ahorro adaptadas a cada etapa de tu vida. Cero comisiones de manejo y total respaldo del sistema cooperativo MICOOPE.
          </p>
        </header>

        <div class="clean-product-grid">
          ${cuentas.map(c => `
            <div class="clean-product-card">
              <div>
                ${c.hasImageTitle ? `
                  <div class="clean-product-brand-box">
                    <img src="${c.img}" alt="${c.titulo}" title="${c.titulo}" onerror="this.src='assets/ahorros.png'" />
                  </div>
                  <h3 class="sr-only">${c.titulo}</h3>
                ` : `
                  <div class="clean-product-icon-wrap">
                    <img src="${c.img}" alt="${c.titulo}" onerror="this.src='assets/ahorros.png'" />
                  </div>
                  <h3 class="clean-product-name">${c.titulo}</h3>
                `}
                <p class="clean-product-desc">${c.desc}</p>
                ${c.detalles && c.detalles.length > 0 ? `
                <ul class="clean-product-bullets">
                  ${c.detalles.map(d => `
                    <li>
                      <span class="clean-bullet-check">✓</span>
                      <span>${d}</span>
                    </li>
                  `).join('')}
                </ul>
                ` : ''}
              </div>
              <a href="tel:77957795" class="clean-btn-card-action">
                Solicitar Apertura (PBX)
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 2. CRÉDITOS ---
  async renderCreditos(sectionId) {
    let lineas = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_creditos');
      if (dbItems && dbItems.length > 0) {
        lineas = dbItems.map(i => ({
          titulo: i.title,
          sub: i.description || i.shortDescription || '',
          monto: i.subtitle || 'Monto: desde Q1,000.00 en adelante',
          img: i.imageUrl || i.imagePath || 'assets/credito.png',
          hasImageTitle: false,
          buttonText: i.buttonText || 'Cotizar Crédito (PBX)'
        }));
      }
    } catch(e) { console.error(e); }

    if (lineas.length === 0) {
      lineas = [
        { titulo: "Crédito Productivo", sub: "Para capital de trabajo, inventario, mercadería y maquinaria.", img: "assets/credito_productivo.png", hasImageTitle: true },
        { titulo: "Crédito Consumo", sub: "Gastos personales, consolidación de deudas, menaje de casa o estudios.", img: "assets/credi_consumo.png", hasImageTitle: true },
        { titulo: "Crédito Vivienda", sub: "Construcción, compra de terreno, vivienda nueva o remodelación.", img: "assets/credito_vivienda.png", hasImageTitle: true },
        { titulo: "Crédi Vehículo", sub: "Adquisición de vehículos o motocicletas para uso comercial o personal.", img: "assets/credi_vehiculo.png", hasImageTitle: true },
        { titulo: "Crédito MIPYMES", sub: "Financiamiento para pequeñas y medianas empresas en crecimiento.", img: "assets/credito.png", hasImageTitle: false },
        { titulo: "Crédito Agrícola", sub: "Siembra, renovación de cultivos, fertilizantes y tecnificación agrícola.", img: "assets/credito1.png", hasImageTitle: false },
        { titulo: "Crédito Automático", sub: "Crédito inmediato respaldado sobre tus cuentas de ahorro en la cooperativa.", img: "assets/credito2.png", hasImageTitle: false },
        { titulo: "Microcréditos", sub: "Impulso financiero ágil para pequeños emprendedores y comerciantes.", img: "assets/credito.png", hasImageTitle: false }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">Líneas de Crédito COLUA</h1>
          <p class="clean-subpage-desc">
            Soluciones financieras a tu medida con tasas justas, cuotas niveladas y asesoría personalizada para alcanzar tus metas personales y empresariales.
          </p>
        </header>

        <div class="clean-product-grid">
          ${lineas.map(l => `
            <div class="clean-product-card">
              <div>
                ${l.hasImageTitle ? `
                  <div class="clean-product-brand-box">
                    <img src="${l.img}" alt="${l.titulo}" title="${l.titulo}" onerror="this.src='assets/credito.png'" />
                  </div>
                  <h3 class="sr-only">${l.titulo}</h3>
                ` : `
                  <div class="clean-product-icon-wrap">
                    <img src="${l.img}" alt="${l.titulo}" onerror="this.src='assets/credito.png'" />
                  </div>
                  <h3 class="clean-product-name">${l.titulo}</h3>
                `}
                <p class="clean-product-desc">${l.sub}</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.5rem 0.75rem;border-radius:8px;font-size:0.82rem;font-weight:600;color:#0f172a;margin-bottom:1.25rem;">
                  ${l.monto || 'Monto: desde Q1,000.00 en adelante'}
                </div>
              </div>
              <a href="tel:77957795" class="clean-btn-card-action">
                ${l.buttonText || 'Cotizar Crédito (PBX)'}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 3. SEGUROS COLUMNA ---
  async renderSeguros(sectionId) {
    let polizas = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_seguros');
      if (dbItems && dbItems.length > 0) {
        polizas = dbItems.map(i => ({
          titulo: i.title,
          desc: i.description || i.shortDescription || '',
          img: i.imageUrl || i.imagePath || 'assets/seguro.png',
          hasImageTitle: false,
          leyenda: i.subtitle || 'Primas solidarias y accesibles',
          buttonText: i.buttonText || 'Solicitar Póliza (PBX)'
        }));
      }
    } catch(e) { console.error(e); }

    if (polizas.length === 0) {
      polizas = [
        { titulo: "Seguro CV Especial", desc: "Cobertura de vida con indemnización y respaldo solidario inmediato.", img: "assets/seguro_cv_personal.png", hasImageTitle: true },
        { titulo: "Seguro Vida Saludable", desc: "Protección integral para gastos médicos y asistencia preventiva.", img: "assets/seguro_vida_saludable.png", hasImageTitle: true },
        { titulo: "Seguro de Accidentes Edad de Oro", desc: "Diseñado especialmente para asociados de la tercera edad.", img: "assets/seguro_edad_de_oro.png", hasImageTitle: true },
        { titulo: "Seguro de Cáncer", desc: "Indemnización directa al primer diagnóstico de patología oncológica.", img: "assets/seguro_de_cancer.png", hasImageTitle: true },
        { titulo: "Seguro Accidentes Infanto Juvenil", desc: "Protección escolar y de recreación para los hijos de asociados.", img: "assets/seguro_accidentes_infanto_juvenil.png", hasImageTitle: true },
        { titulo: "Seguro de Manejo", desc: "Asistencia vial y respaldo ante incidentes en carretera en todo el país.", img: "assets/seguro_manejo.png", hasImageTitle: true },
        { titulo: "Seguro de Vida Individual o Familiar", desc: "Tranquilidad financiera a largo plazo para el bienestar de tu familia.", img: "assets/seguro_de_vida_individual_o_familar.png", hasImageTitle: true }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">Seguros Columna</h1>
          <p class="clean-subpage-desc">
            Tranquilidad para ti y tu familia con coberturas de vida, salud y accidentes con el respaldo de Aseguradora Columna y el Sistema MICOOPE.
          </p>
        </header>

        <div class="clean-product-grid">
          ${polizas.map(p => `
            <div class="clean-product-card">
              <div>
                <div class="clean-product-brand-box">
                  <img src="${p.img}" alt="${p.titulo}" title="${p.titulo}" onerror="this.src='assets/seguro.png'" />
                </div>
                <h3 class="sr-only">${p.titulo}</h3>
                <p class="clean-product-desc">${p.desc}</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.45rem 0.75rem;border-radius:8px;font-size:0.8rem;color:#64748b;margin-bottom:1.25rem;">
                  ${p.leyenda || 'Primas solidarias y accesibles'}
                </div>
              </div>
              <a href="tel:77957795" class="clean-btn-card-action">
                ${p.buttonText || 'Solicitar Póliza (PBX)'}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 4. REMESAS FAMILIARES Y NUEVA REMESA DIRIGIDA ---
  async renderRemesas(sectionId) {
    let asistencias = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_remesas');
      if (dbItems && dbItems.length > 0) {
        asistencias = dbItems.map(i => ({
          titulo: i.title,
          desc: i.description || i.shortDescription || '',
          cat: i.subtitle || 'ASISTENCIA INTERNACIONAL',
          img: i.imageUrl || i.imagePath || 'assets/rd1.png',
          tag: '100% Cobertura'
        }));
      }
    } catch(e) { console.error(e); }

    if (asistencias.length === 0) {
      asistencias = [
        { cat: "TRÁMITE CONSULAR Y VUELO", img: "assets/rd1.png", titulo: "Asistencia de repatriación para remitente", desc: "Gestión integral y cobertura sin costo. Asesoramiento en trámites legales y coordinación total del retorno aéreo de restos mortales a Guatemala.", tag: "100% Cobertura" },
        { cat: "ACOMPAÑAMIENTO FAMILIAR", img: "assets/rd2.png", titulo: "Asistencia funeraria para remitente", desc: "Apoyo y trámites de coordinación. Preparación, capilla ardiente, servicio religioso y traslado terrestre hacia cualquier municipio del país.", tag: "Red Funeraria Nacional" },
        { cat: "RED DE SALUD", img: "assets/rd3.png", titulo: "Referencias médicas y clínicas", desc: "Directorio e información verificada de médicos especialistas, clínicas, farmacias y laboratorios clínicos con convenios preferenciales para asociados.", tag: "Acceso Inmediato" },
        { cat: "ATENCIÓN TELEFÓNICA 24/7", img: "assets/rd4.png", titulo: "Orientación médica telefónica", desc: "Apoyo profesional en interpretación de pruebas de laboratorio, dosificación segura de medicamentos y primeros auxilios a distancia las 24 horas.", tag: "Sin Límite de Llamadas" }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <!-- 1. Hero Remesas Familiares -->
        <div class="remesa-hero-card">
          <div class="remesa-hero-grid">
            <div class="remesa-hero-content">
              <h1 class="remesa-hero-title">Remesas Familiares</h1>
              <p class="remesa-hero-desc">
                Recibe tu dinero de forma segura, rápida y sin complicaciones a través de nuestra red de remesadoras aliadas. Ponemos a tu alcance disponibilidad inmediata en ventanilla y depósito directo en tu cuenta cooperativa.
              </p>
              <div class="remesa-hero-actions" style="margin-bottom: 0;">
                <button class="remesa-btn-navy" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_agencias') : (window.location.hash='#sec_agencias')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Buscar Agencia
                </button>
                <button class="remesa-btn-outline" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_ahorros') : (window.location.hash='#sec_ahorros')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="14" y1="8" x2="18" y2="12"/><line x1="14" y1="16" x2="18" y2="12"/></svg>
                  Acreditar Directo a Cuenta de Ahorro
                </button>
              </div>
            </div>

            <div class="remesa-hero-media">
              <div class="remesa-hero-media-card">
                <img src="assets/mas_que_una_remesa.png" alt="Más que una remesa, unimos familias COLUA" class="remesa-hero-img" />
                <div class="remesa-hero-badge-footer">
                  <div class="remesa-hero-badge-shield">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:0.86rem;display:block;">Red MICOOPE R.L.</strong>
                    <span style="font-size:0.75rem;color:#64748b;">Garantía institucional y validez • FENACOAC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. GRAN BANNER PROMOCIONAL: NUEVA REMESA DIRIGIDA A TU CUENTA DISPONIBLE -->
        <div class="remesa-dirigida-banner">
          <div class="remesa-dirigida-grid">
            <div class="remesa-dirigida-main">
              <h2 class="remesa-dirigida-title">
                Beneficio al recibir tu remesa dirigida a tu Cuenta Disponible
              </h2>
              <p class="remesa-dirigida-desc">
                En caso de fallecimiento en el extranjero, te ofrecemos el <strong>BENEFICIO DE REPATRIACIÓN</strong>, garantizando que tu último viaje sea de regreso a casa, <strong>sin costo alguno para tu familia</strong>. Tu cuenta activa en COLUA abre las puertas a este respaldo exclusivo y a la acreditación inmediata de tus fondos 24/7 sin hacer filas.
              </p>

              <div class="remesa-dirigida-pills">
                <div class="remesa-pill-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#59B8A4" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Acreditación Inmediata a Libreta o Cuenta Disponible</span>
                </div>
                <div class="remesa-pill-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#59B8A4" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Repatriación 100% Gratuita para el Remitente</span>
                </div>
                <div class="remesa-pill-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#59B8A4" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Retiros en Red de Cajeros 5B y Tarjeta de Débito Visa</span>
                </div>
              </div>

              <div class="remesa-dirigida-actions">
                <button class="remesa-btn-white" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_ahorros') : (window.location.hash='#sec_ahorros')">
                  Abrir Cuenta Disponible
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <a href="tel:77957795" class="remesa-btn-translucent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Solicitar Información (PBX)
                </a>
              </div>
            </div>

            <div class="remesa-dirigida-side">
              <div class="remesa-side-card">
                <div class="remesa-side-shield">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h4 class="remesa-side-title">Cobertura Sin Deducciones</h4>
                <p class="remesa-side-text">
                  Disponible automáticamente para asociados que mantengan el flujo de acreditación directa a su libreta o cuenta de ahorro disponible COLUA.
                </p>
                <div class="remesa-side-link">
                  Consulta términos y condiciones en agencias
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Cobertura y Protección Integral: Más que una remesa, unimos familias -->
        <div class="remesa-families-section">
          <div class="remesa-families-grid">
            <div class="remesa-families-text">
              <h2 class="remesa-section-heading">Más que una remesa, unimos familias</h2>
              <p class="remesa-section-sub">
                En COLUA reconocemos el esfuerzo incansable de nuestros connacionales en el extranjero. Por ello, cada envío gestionado a través de nuestra red incluye asistencias humanitarias directas y sin costo para quien envía.
              </p>

              <div class="remesa-free-box">
                <h4 class="remesa-free-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Tu familiar que envía la remesa recibe gratis:
                </h4>
                <ul class="remesa-free-list">
                  <li>
                    <div class="remesa-free-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <strong>Telellamadas al médico:</strong> Consultas a distancia para el remitente en cualquier momento ante dudas de salud o malestares cotidianos.
                    </div>
                  </li>
                  <li>
                    <div class="remesa-free-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                    </div>
                    <div>
                      <strong>Servicio de repatriación a Guatemala por fallecimiento:</strong> Gestión integral de trámites consulares, legales y traslado aéreo hasta suelo patrio sin costo.
                    </div>
                  </li>
                  <li>
                    <div class="remesa-free-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <strong>Servicio funerario en toda Guatemala:</strong> Apoyo completo de velación, féretro y coordinación local para su descanso en su comunidad de origen.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="remesa-families-photo">
              <div class="remesa-families-img-card">
                <img src="assets/remesadoras_afiliadas.png" alt="Asistencia Internacional COLUA" class="remesa-families-img" />
                <div class="remesa-intl-line-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <div>
                    <strong style="display:block;font-size:0.86rem;color:#0f172a;">Línea de Asistencia Internacional</strong>
                    <span style="font-size:0.75rem;color:#64748b;">Atención coordinada 24 horas para remitentes y beneficiarios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Asistencias Complementarias (Tarjetas dinámicas) -->
        <div class="remesa-section-wrap">
          <div style="text-align:center;margin-bottom:2.25rem;">
            <h2 class="remesa-section-heading">Paquete de Asistencias Integradas al Remitente</h2>
            <p class="remesa-section-sub" style="margin:0 auto;">
              Servicios activos diseñados para proteger la salud, el bienestar y la dignidad de nuestros hermanos cooperativistas en el extranjero y sus beneficiarios en Guatemala.
            </p>
          </div>

          <div class="remesa-cards-grid-4">
            ${asistencias.map(a => `
              <div class="remesa-asistencia-card">
                <span class="remesa-asistencia-cat">${a.cat}</span>
                <div class="remesa-asistencia-icon-wrap">
                  <img src="${a.img}" alt="${a.titulo}" onerror="this.src='assets/rd1.png'" />
                </div>
                <h4 class="remesa-asistencia-title">${a.titulo}</h4>
                <p class="remesa-asistencia-desc">${a.desc}</p>
                <div class="remesa-asistencia-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ${a.tag}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6. Red de Remesadoras Aliadas -->
        <div class="remesa-section-wrap">
          <div style="margin-bottom:2rem;">
            <h2 class="remesa-section-heading" style="margin-bottom:0.35rem;">Red de Remesadoras Aliadas</h2>
            <p class="remesa-section-sub">
              Cobra tus envíos con las principales compañías financieras y de transferencias internacionales del mundo.
            </p>
          </div>

          <div style="border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,0.04);">
            <img src="assets/remesadoras_afiliadas2.png" alt="Cobro mi Remesa en COLUA MICOOPE - Directo a tu cuenta" style="width:100%;height:auto;display:block;" />
          </div>
        </div>
      </div>
    `;
  }

  // --- 5. SERVICIOS DIGITALES Y FINANCIEROS ---
  async renderServicios(sectionId) {
    let servicios = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_servicios');
      if (dbItems && dbItems.length > 0) {
        servicios = dbItems.map(i => ({
          titulo: i.title,
          desc: i.description || i.shortDescription || '',
          img: i.imageUrl || i.imagePath || 'assets/servicios_digitales.png',
          linkText: i.buttonText || (i.targetSectionId?.startsWith('http') ? 'Ingresar a la Plataforma' : 'Solicitar Información (PBX)'),
          linkUrl: i.targetSectionId || i.buttonAction || 'tel:77957795'
        }));
      }
    } catch(e) { console.error(e); }

    if (servicios.length === 0) {
      servicios = [
        { titulo: "Tarjeta de Débito MICOOPE Visa", desc: "Realiza compras en comercios afiliados a VISA en Guatemala y el extranjero, notificaciones por mensajes de texto y cobertura integral contra fraude.", img: "assets/tarjeta_debito.png", linkText: "Solicitar Tarjeta (PBX)", linkUrl: "tel:77957795" },
        { titulo: "Descarga la App MICOOPE en Línea", desc: "Banca web y móvil 24/7. Realiza consultas de saldos, transferencias directas, pago de préstamos y servicios básicos al instante sin hacer filas.", img: "assets/micoope_enlinea.png", linkText: "Ingresar a la Plataforma", linkUrl: "https://micoopeenlinea.com.gt" },
        { titulo: "Tarjeta de Crédito MICOOPE Visa", desc: "Tienes hasta 55 días para pagar, membresía gratis de por vida, tarjeta VISA internacional, cobertura por fraude o extravío y la tasa más baja.", img: "assets/tarjeta_debito.png", linkText: "Solicitar Crédito (PBX)", linkUrl: "tel:77957795" },
        { titulo: "Cajeros Modernos Automáticos", desc: "Consulta de saldos, retiros y depósitos en efectivo; sin cobros por comisión en cajeros propios COLUA. Disponible 24/7.", img: "assets/servicios_digitales.png", linkText: "Ver Agencias con Cajero", linkUrl: "#sec_agencias" },
        { titulo: "Descarga la App Fri", desc: "Envía, recibe y solicita dinero de forma rápida e inmediata entre tu cooperativa y bancos del sistema usando únicamente tu celular.", img: "assets/logo_fri.png", linkText: "Conocer App Fri", linkUrl: "https://fri.gt" },
        { titulo: "Red de Agentes COLUA MICOOPE", desc: "Cobra tus remesas, paga tu préstamo y tarjeta de crédito, realiza depósitos y retiros en puntos autorizados cerca de tu hogar.", img: "assets/servicios_digitales.png", linkText: "Localizar Red de Agentes", linkUrl: "#sec_agencias" }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">Servicios Digitales y Financieros COLUA</h1>
          <p class="clean-subpage-desc">
            Gestiona tus cuentas, consulta saldos y realiza operaciones 24/7 sin salir de casa con nuestras herramientas tecnológicas cooperativas y nuestra amplia red de atención.
          </p>
        </header>

        <!-- SERVICIOS DINÁMICOS -->
        <div class="clean-product-grid">
          ${servicios.map(s => `
            <div class="clean-product-card">
              <div>
                <div class="clean-product-icon-wrap" style="background: #ffffff;">
                  <img src="${s.img}" alt="${s.titulo}" onerror="this.src='assets/servicios_digitales.png'" />
                </div>
                <h3 class="clean-product-name">${s.titulo}</h3>
                <p class="clean-product-desc">${s.desc}</p>
              </div>
              <a href="${s.linkUrl}" ${s.linkUrl.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="clean-btn-card-action">
                ${s.linkText}
              </a>
            </div>
          `).join('')}
        </div>

        <!-- ==============================================
             SECCIÓN: OTROS SERVICIOS (3 SERVICIOS ADICIONALES)
             ============================================== -->
        <section class="clean-other-services-section">
          <div class="clean-other-services-header">
            <h2 class="clean-other-services-title">Otros Servicios</h2>
            <p class="clean-other-services-desc">
              Facilitamos tus pagos diarios de servicios básicos y ampliamos tus opciones de retiro en toda la república.
            </p>
          </div>

          <div class="clean-other-services-grid">
            <!-- 1. Pago de Energía Eléctrica -->
            <div class="clean-other-service-card">
              <div class="clean-other-service-accent-bar" style="background: #FACC15;"></div>
              <div class="clean-other-service-icon-box" style="background: #fefce8; border: 1.5px solid #fef08a;">
                <svg viewBox="0 0 24 24" fill="#ca8a04">
                  <path d="M9,21c0,0.55 0.45,1 1,1h4c0.55,0 1,-0.45 1,-1v-1H9V21zM12,2C8.14,2 5,5.14 5,9c0,2.38 1.19,4.47 3,5.74V17c0,0.55 0.45,1 1,1h6c0.55,0 1,-0.45 1,-1v-2.26c1.81,-1.27 3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7zM14.85,13.1l-0.85,0.6V16h-4v-2.3l-0.85,-0.6C7.8,12.16 7,10.63 7,9c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,1.63 -0.8,3.16 -2.15,4.1z" />
                </svg>
              </div>
              <h4 class="clean-other-service-title">Pago de Energía Eléctrica</h4>
              <p class="clean-other-service-desc">
                DEOCSA y DEORSA. Realiza el pago ágil y al día de tus facturas de energía eléctrica directamente en ventanillas de nuestras agencias.
              </p>
            </div>

            <!-- 2. Pago de Servicio Telefónico -->
            <div class="clean-other-service-card">
              <div class="clean-other-service-accent-bar" style="background: #59B8A4;"></div>
              <div class="clean-other-service-icon-box" style="background: #f0fdfa; border: 1.5px solid #ccfbf1;">
                <svg viewBox="0 0 24 24" fill="#0d9488">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                </svg>
              </div>
              <h4 class="clean-other-service-title">Pago de Servicio Telefónico</h4>
              <p class="clean-other-service-desc">
                Pre y Pospago: CLARO y TIGO. Recargas electrónicas y pago de mensualidades telefónicas sin demoras ni recargos adicionales.
              </p>
            </div>

            <!-- 3. Cajeros 5B, BI y BAC -->
            <div class="clean-other-service-card">
              <div class="clean-other-service-accent-bar" style="background: #DB2777;"></div>
              <div class="clean-other-service-icon-box" style="background: #fdf2f8; border: 1.5px solid #fbcfe8;">
                <svg viewBox="0 0 24 24" fill="#db2777">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
              </div>
              <h4 class="clean-other-service-title">Cajeros Red 5B, BI y BAC</h4>
              <p class="clean-other-service-desc">
                Consulta de saldos y retiros en efectivo en más de 3,500 cajeros interbancarios de la red con recargo de Q5.00 por transacción.
              </p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // --- 6. TUS 6 BENEFICIOS ---
  async renderBeneficios(sectionId) {
    let beneficios = [];
    try {
      const dbItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_beneficios');
      if (dbItems && dbItems.length > 0) {
        beneficios = dbItems.map(i => ({
          titulo: i.title,
          desc: i.description || i.shortDescription || '',
          img: i.imageUrl || i.imagePath || 'assets/beneficios.png',
          tag: i.subtitle || '✓ Incluido al ser Asociado'
        }));
      }
    } catch(e) { console.error(e); }

    if (beneficios.length === 0) {
      beneficios = [
        { titulo: "Renta Diaria por Hospitalización", desc: "Apoyo económico diario en caso de ser internado en hospital público o privado.", img: "assets/renta_diaria.png" },
        { titulo: "Apoyo Quirúrgico", desc: "Apoyo económico para cubrir gastos médicos incurridos por intervenciones quirúrgicas.", img: "assets/apoyo_quirurgico.png" },
        { titulo: "Servicio Funerario", desc: "Sepelio digno y ataúd fúnebre para tranquilidad de la familia del asociado.", img: "assets/servicio_funerario.png" },
        { titulo: "Seguro de Ahorrantes", desc: "Devolución de ahorros más seguro sobre depósitos hasta por Q150,000.00.", img: "assets/beneficio_de_ahorrantes.png" },
        { titulo: "Seguro de Deudores", desc: "Cobertura de saldos insolutos de crédito vigente hasta por Q200,000.00 en siniestro.", img: "assets/beneficio_de_deudores.png" },
        { titulo: "Beneficio de Oro", desc: "Apoyo económico único para asociados mayores de 70 años con lealtad cooperativa.", img: "assets/beneficio_de_oro.png" }
      ];
    }

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">Tus 6 Beneficios de Asociado</h1>
          <p class="clean-subpage-desc">
            Al abrir tu cuenta de Aportación en COLUA R.L., tú y tu familia cuentan con el respaldo automático de nuestro programa integral de solidaridad.
          </p>
        </header>

        <div class="clean-product-grid">
          ${beneficios.map(b => `
            <div class="clean-product-card">
              <div>
                <div class="clean-product-icon-wrap">
                  <img src="${b.img}" alt="${b.titulo}" onerror="this.src='assets/beneficios.png'" />
                </div>
                <h3 class="clean-product-name">${b.titulo}</h3>
                <p class="clean-product-desc">${b.desc}</p>
              </div>
              <div style="font-size:0.78rem;font-weight:600;color:#2563eb;">
                ${b.tag || '✓ Incluido al ser Asociado'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 7. SOSTENIBILIDAD & FORMACIÓN ---
  // --- 7. SOSTENIBILIDAD COOPERATIVA (4 EJES ESTRATÉGICOS) ---
  async renderSostenibilidad(sectionId) {
    let customItems = [];
    try {
      customItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_sostenibilidad');
    } catch(e) { console.error(e); }

    const colors = [
      { color: "#634794", bg: "#f5f3ff", border: "#ddd6fe" },
      { color: "#0284C7", bg: "#f0f9ff", border: "#bae6fd" },
      { color: "#E42A67", bg: "#fdf2f8", border: "#fbcfe8" },
      { color: "#EF8819", bg: "#fff7ed", border: "#fed7aa" }
    ];

    if (customItems && customItems.length > 0) {
      const itemsWithBlocks = await Promise.all(customItems.map(async (item, idx) => {
        const blocks = await window.coluaRepository.getBlocksByItemId(item.id);
        const style = colors[idx % colors.length];
        return { item, blocks, style, idx };
      }));

      return `
        <div class="sostenibilidad-page-wrapper">
          <!-- Encabezado Institucional -->
          <header class="sostenibilidad-hero">
            <h1 class="sostenibilidad-hero-title">Sostenibilidad Cooperativa</h1>
            <p class="sostenibilidad-hero-lead">
              Impulsamos acciones orientadas al desarrollo social, educativo, cultural y productivo con el propósito de fortalecer el bienestar de nuestros asociados y comunidades. A través de espacios de participación, formación y convivencia, promovemos la cooperación, la solidaridad y el compromiso comunitario.
            </p>
            <p class="sostenibilidad-hero-sub">
              Nuestras iniciativas se organizan en ejes estratégicos:
            </p>
          </header>

          <!-- Los Ejes Estratégicos Dinámicos con sus Bloques/Programas -->
          <div class="sostenibilidad-ejes-list">
            ${itemsWithBlocks.map(({ item, blocks, style, idx }) => `
              <article class="sostenibilidad-eje-card" style="--eje-color: ${style.color}; --eje-soft-bg: ${style.bg}; --eje-soft-border: ${style.border};">
                <div class="sostenibilidad-eje-img-box">
                  <img src="${item.imageUrl || 'assets/noticia_taller_finanzas.jpg'}" alt="${item.title}" class="sostenibilidad-eje-img" onerror="this.src='assets/programa_wachalal.png'" />
                </div>
                <div class="sostenibilidad-eje-content">
                  <div class="sostenibilidad-eje-header">
                    <span class="sostenibilidad-eje-kicker">${item.subtitle || `Eje Estratégico 0${idx + 1}`}</span>
                    <h2 class="sostenibilidad-eje-title">${item.title}</h2>
                    <p class="sostenibilidad-eje-desc">${item.description || ''}</p>
                  </div>

                  ${blocks.length > 0 ? `
                    <div class="sostenibilidad-programas-grid">
                      ${blocks.map(b => {
                        const parts = (b.content || '').split(':');
                        const bTitle = parts.length > 1 ? parts[0].trim() : (b.title || 'Iniciativa');
                        const bDesc = parts.length > 1 ? parts.slice(1).join(':').trim() : b.content;
                        return `
                          <div class="sostenibilidad-programa-item">
                            <div class="sostenibilidad-prog-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            </div>
                            <div class="sostenibilidad-prog-info">
                              <h3 class="sostenibilidad-prog-title">${bTitle}</h3>
                              <p class="sostenibilidad-prog-desc">${bDesc}</p>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  ` : ''}
                </div>
              </article>
            `).join('')}
          </div>

          <!-- Banner de Participación y Convocatoria -->
          <section class="nosotros-contact-banner">
            <div class="nosotros-contact-top">
              <div class="nosotros-contact-left">
                <span class="nosotros-sec-eyebrow" style="color:#173789;">PARTICIPACIÓN COMUNITARIA</span>
                <h2 class="nosotros-sec-title" style="margin-bottom:0.4rem;">¿Deseas vincular a tu comunidad o escuela?</h2>
                <p style="font-size:0.9rem;color:#64748b;line-height:1.55;">
                  Comunícate a nuestro PBX central o visita tu agencia COLUA más cercana para conocer fechas y convocatorias de nuestros talleres, cursos y programas de becas.
                </p>
              </div>
              <div class="nosotros-contact-actions">
                <a href="tel:77957795" class="nosotros-btn-pbx">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  PBX: 7795-7795
                </a>
                <button class="nosotros-btn-agencias" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_agencias') : (window.location.hash='#sec_agencias')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Ver Agencias
                </button>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    return `
      <div class="sostenibilidad-page-wrapper">
        <!-- Encabezado Institucional -->
        <header class="sostenibilidad-hero">
          <h1 class="sostenibilidad-hero-title">Sostenibilidad Cooperativa</h1>
          <p class="sostenibilidad-hero-lead">
            Impulsamos acciones orientadas al desarrollo social, educativo, cultural y productivo con el propósito de fortalecer el bienestar de nuestros asociados y comunidades. A través de espacios de participación, formación y convivencia, promovemos la cooperación, la solidaridad y el compromiso comunitario.
          </p>
          <p class="sostenibilidad-hero-sub">
            Nuestras iniciativas se organizan en cuatro ejes estratégicos:
          </p>
        </header>

        <!-- Los 4 Ejes Estratégicos con Imágenes Reales y Programas Oficiales -->
        <div class="sostenibilidad-ejes-list">

          <!-- EJE 1: Educación y Formación Cooperativa -->
          <article class="sostenibilidad-eje-card" style="--eje-color: #634794; --eje-soft-bg: #f5f3ff; --eje-soft-border: #ddd6fe;">
            <div class="sostenibilidad-eje-img-box">
              <img src="assets/noticia_taller_finanzas.jpg" alt="Educación y Formación Cooperativa COLUA" class="sostenibilidad-eje-img" onerror="this.src='assets/programa_wachalal.png'" />
            </div>
            <div class="sostenibilidad-eje-content">
              <div class="sostenibilidad-eje-header">
                <span class="sostenibilidad-eje-kicker">Eje Estratégico 01</span>
                <h2 class="sostenibilidad-eje-title">Educación y Formación Cooperativa</h2>
                <p class="sostenibilidad-eje-desc">
                  Fortalecemos las capacidades individuales y colectivas mediante la educación financiera y el cooperativismo como motores de superación familiar.
                </p>
              </div>

              <div class="sostenibilidad-programas-grid">
                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Educación y Formación Financiera y de Crédito</h3>
                    <p class="sostenibilidad-prog-desc">Capacitación continua en finanzas familiares, administración prudencial y uso responsable del crédito.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Programa de Becas Jóvenes Cooperativistas</h3>
                    <p class="sostenibilidad-prog-desc">Estímulo y financiamiento educativo para estudiantes destacados e hijos de asociados.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Programa de Educación Financiera Huellas</h3>
                    <p class="sostenibilidad-prog-desc">Formación de hábitos de ahorro y disciplina económica para niños y jóvenes de la región.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Programa Wachalal</h3>
                    <p class="sostenibilidad-prog-desc">Iniciativa solidaria de acompañamiento escolar y valores cooperativos en escuelas locales.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item" style="grid-column: 1 / -1;">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 2a5 5 0 0 1 5 5v2"/><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Formación a Niños, Jóvenes y Adultos</h3>
                    <p class="sostenibilidad-prog-desc">Espacios inclusivos e intergeneracionales que garantizan aprendizaje continuo en todas las etapas de la vida comunitaria.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- EJE 2: Empleabilidad y Empresarialidad -->
          <article class="sostenibilidad-eje-card" style="--eje-color: #0284C7; --eje-soft-bg: #f0f9ff; --eje-soft-border: #bae6fd;">
            <div class="sostenibilidad-eje-img-box">
              <img src="assets/nosotros_artesana.jpg" alt="Empleabilidad y Empresarialidad COLUA" class="sostenibilidad-eje-img" onerror="this.src='assets/tallerescomunitarios.png'" />
            </div>
            <div class="sostenibilidad-eje-content">
              <div class="sostenibilidad-eje-header">
                <span class="sostenibilidad-eje-kicker">Eje Estratégico 02</span>
                <h2 class="sostenibilidad-eje-title">Empleabilidad y Empresarialidad</h2>
                <p class="sostenibilidad-eje-desc">
                  Impulsamos la generación de ingresos propios y la innovación productiva para dinamizar la economía solidaria de nuestros pueblos.
                </p>
              </div>

              <div class="sostenibilidad-programas-grid">
                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Centros de Innovación en Sololá y Argueta</h3>
                    <p class="sostenibilidad-prog-desc">Espacios tecnológicos equipados para la inclusión digital, formación técnica y conectividad comunitaria.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Cursos de Formación Técnica Práctica y Digital</h3>
                    <p class="sostenibilidad-prog-desc">Talleres aplicados en oficios técnicos y herramientas digitales demandadas para el autoempleo inmediato.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Emprendimiento Sostenible y Feria de Emprendedores</h3>
                    <p class="sostenibilidad-prog-desc">Asesoría de planes de negocio y vitrinas comerciales para promocionar productos de productores locales.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Club de Lectura, Cursos de Música y Ajedrez</h3>
                    <p class="sostenibilidad-prog-desc">Actividades complementarias de desarrollo intelectual, artístico y razonamiento estratégico para la juventud.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- EJE 3: Desarrollo Comunitario -->
          <article class="sostenibilidad-eje-card" style="--eje-color: #E42A67; --eje-soft-bg: #fdf2f8; --eje-soft-border: #fbcfe8;">
            <div class="sostenibilidad-eje-img-box">
              <img src="assets/noticia_asamblea_general.jpg" alt="Desarrollo Comunitario y ADN COLUA" class="sostenibilidad-eje-img" onerror="this.src='assets/desarrollo_comunitario.png'" />
            </div>
            <div class="sostenibilidad-eje-content">
              <div class="sostenibilidad-eje-header">
                <span class="sostenibilidad-eje-kicker">Eje Estratégico 03</span>
                <h2 class="sostenibilidad-eje-title">Desarrollo Comunitario</h2>
                <p class="sostenibilidad-eje-desc">
                  Fortalecemos la identidad cooperativa, la participación democrática y la formación dirigencial en beneficio del bien común.
                </p>
              </div>

              <div class="sostenibilidad-programas-grid">
                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">ADN COLUA</h3>
                    <p class="sostenibilidad-prog-desc">Cultura y sentido de pertenencia solidaria que consolida los valores del cooperativismo en cada asociado.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Programa de Líderes Cooperativos</h3>
                    <p class="sostenibilidad-prog-desc">Formación de cuadros dirigenciales éticos para liderar comités locales y gobernanza comunal.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item" style="grid-column: 1 / -1;">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Plan de Desarrollo Cooperativo</h3>
                    <p class="sostenibilidad-prog-desc">Instrumento institucional de planificación estratégica territorial para responder a los desafíos prioritarios de la comunidad.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- EJE 4: Proyectos y Alianzas -->
          <article class="sostenibilidad-eje-card" style="--eje-color: #EF8819; --eje-soft-bg: #fff7ed; --eje-soft-border: #fed7aa;">
            <div class="sostenibilidad-eje-img-box">
              <img src="assets/noticia_reforestacion.jpg" alt="Proyectos y Alianzas COLUA" class="sostenibilidad-eje-img" onerror="this.src='assets/programa_huellas.png'" />
            </div>
            <div class="sostenibilidad-eje-content">
              <div class="sostenibilidad-eje-header">
                <span class="sostenibilidad-eje-kicker">Eje Estratégico 04</span>
                <h2 class="sostenibilidad-eje-title">Proyectos y Alianzas</h2>
                <p class="sostenibilidad-eje-desc">
                  Articulamos esfuerzos solidarios para la salud comunitaria, el cuidado de la madre tierra y la conservación de nuestras raíces culturales.
                </p>
              </div>

              <div class="sostenibilidad-programas-grid">
                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Jornadas Médicas y Proyectos de Caridad</h3>
                    <p class="sostenibilidad-prog-desc">Atención de salud preventiva y brigadas solidarias para familias y personas de escasos recursos.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Proyectos de Reforestación</h3>
                    <p class="sostenibilidad-prog-desc">Iniciativas ambientales masivas para proteger cuencas hídricas, bosques comunales y suelos fértiles.</p>
                  </div>
                </div>

                <div class="sostenibilidad-programa-item" style="grid-column: 1 / -1;">
                  <div class="sostenibilidad-prog-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
                  </div>
                  <div class="sostenibilidad-prog-info">
                    <h3 class="sostenibilidad-prog-title">Práctica de Valores y Tradiciones</h3>
                    <p class="sostenibilidad-prog-desc">Fomento activo de la convivencia armónica, el respeto intercultural y las tradiciones vivas de nuestras comunidades.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>

        <!-- Banner de Participación y Convocatoria -->
        <section class="nosotros-contact-banner">
          <div class="nosotros-contact-top">
            <div class="nosotros-contact-left">
              <span class="nosotros-sec-eyebrow" style="color:#173789;">PARTICIPACIÓN COMUNITARIA</span>
              <h2 class="nosotros-sec-title" style="margin-bottom:0.4rem;">¿Deseas vincular a tu comunidad o escuela?</h2>
              <p style="font-size:0.9rem;color:#64748b;line-height:1.55;">
                Comunícate a nuestro PBX central o visita tu agencia COLUA más cercana para conocer fechas y convocatorias de nuestros talleres, cursos y programas de becas.
              </p>
            </div>
            <div class="nosotros-contact-actions">
              <a href="tel:77957795" class="nosotros-btn-pbx">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                PBX: 7795-7795
              </a>
              <button class="nosotros-btn-agencias" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_agencias') : (window.location.hash='#sec_agencias')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Ver Agencias
              </button>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // --- 8. NOSOTROS (IDENTIDAD Y GOBERNANZA COOPERATIVA) ---
  async renderNosotros(sectionId) {
    let customItems = [];
    try {
      customItems = await window.coluaRepository.getItemsBySection(sectionId || 'sec_nosotros');
    } catch(e) { console.error(e); }

    if (customItems && customItems.length > 0) {
      return `
        <div class="nosotros-page-wrapper">
          <header class="nosotros-header-block">
            <span class="nosotros-kicker">IDENTIDAD Y GOBERNANZA COOPERATIVA</span>
            <h1 class="nosotros-main-title">Nosotros: El lado humano de los ahorros y créditos</h1>
            <p class="nosotros-main-sub">
              Más de 50 años construyendo desarrollo socioeconómico, confianza y bienestar integral para las comunidades y familias.
            </p>
          </header>
          <div class="clean-product-grid" style="margin-top: 2rem;">
            ${customItems.map(item => `
              <div class="clean-product-card">
                <div>
                  <div class="clean-product-icon-wrap">
                    <img src="${item.imageUrl || 'assets/colua_edificio.png'}" alt="${item.title}" onerror="this.src='assets/distintivo_colua.png'" />
                  </div>
                  <h3 class="clean-product-name">${item.title}</h3>
                  <p class="clean-product-desc">${item.description || item.subtitle || ''}</p>
                </div>
                ${item.buttonText ? `<a href="${item.targetSectionId || '#'}" class="clean-btn-card-action">${item.buttonText}</a>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="nosotros-page-wrapper">
        <!-- Encabezado Principal de Identidad -->
        <header class="nosotros-header-block">
          <span class="nosotros-kicker">IDENTIDAD Y GOBERNANZA COOPERATIVA / Memoria Institucional & Propósito</span>
          <div class="nosotros-header-row">
            <div class="nosotros-header-left">
              <h1 class="nosotros-main-title">Nosotros: El lado humano de los ahorros y créditos</h1>
              <p class="nosotros-main-sub">
                Más de 50 años construyendo desarrollo socioeconómico, confianza y bienestar integral para las comunidades y familias de Quiché, Sololá y el suroccidente de Guatemala.
              </p>
            </div>
            <div class="nosotros-header-badges">
              <div class="nosotros-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Federada MICOOPE</span>
              </div>
              <div class="nosotros-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173789" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
                <span>Supervisada INGECOP</span>
              </div>
            </div>
          </div>
        </header>

        <!-- 1. FUNDAMENTOS DE OPERACIÓN (3 PILARES ESTRATÉGICOS) -->
        <section class="nosotros-section-block">
          <div class="nosotros-section-heading-bar">
            <div>
              <span class="nosotros-sec-eyebrow">FUNDAMENTOS DE OPERACIÓN</span>
              <h2 class="nosotros-sec-title">Marco Filosófico y Compromiso</h2>
            </div>
            <span class="nosotros-sec-meta">Sistema Federado MICOOPE R.L.</span>
          </div>

          <div class="nosotros-pillars-grid">
            <!-- Pilar 01 -->
            <div class="nosotros-pillar-card" style="--pillar-accent: #59B8A4;">
              <div>
                <div class="nosotros-pillar-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span class="nosotros-pillar-tag">PILAR ESTRATÉGICO 01</span>
                <h3 class="nosotros-pillar-title">Propuesta de Valor</h3>
                <p class="nosotros-pillar-quote">
                  “En COLUA reconocemos tu valor como persona para alcanzar tu bienestar integral y el de tu familia, a través de productos y servicios financieros éticos, ágiles y accesibles, basados en el poder de la cooperación.”
                </p>
              </div>
              <span class="nosotros-pillar-link">
                Enfoque Fiduciario
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>

            <!-- Pilar 02 -->
            <div class="nosotros-pillar-card" style="--pillar-accent: #173789;">
              <div>
                <div class="nosotros-pillar-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <span class="nosotros-pillar-tag">PILAR ESTRATÉGICO 02</span>
                <h3 class="nosotros-pillar-title">Visión Institucional</h3>
                <p class="nosotros-pillar-quote">
                  “Ser un modelo de desarrollo y sostenibilidad integral de las comunidades basado en la cooperación mutua, solvencia técnica y transparencia comunitaria.”
                </p>
              </div>
              <span class="nosotros-pillar-link">
                Proyección 2025-2030
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>

            <!-- Pilar 03 -->
            <div class="nosotros-pillar-card" style="--pillar-accent: #E42A67;">
              <div>
                <div class="nosotros-pillar-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                </div>
                <span class="nosotros-pillar-tag">PILAR ESTRATÉGICO 03</span>
                <h3 class="nosotros-pillar-title">Propósito Visionario</h3>
                <p class="nosotros-pillar-quote">
                  “Ser la cooperativa financiera que mejora sostenidamente la calidad de vida de sus asociados y comunidades de Guatemala, protegiendo su patrimonio intergeneracional.”
                </p>
              </div>
              <span class="nosotros-pillar-link">
                Impacto Territorial
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>
          </div>
        </section>

        <!-- 2. PRESENCIA Y TRATO HUMANO (SPLIT CARD CON FOTO) -->
        <section class="nosotros-presence-card">
          <div class="nosotros-presence-img-wrap">
            <img src="assets/nosotros_edificio_equipo.jpg" alt="Presencia y Trato Humano COLUA MICOOPE" class="nosotros-presence-img" onerror="this.src='assets/colua_edificio.png'" />
          </div>
          <div class="nosotros-presence-content">
            <span class="nosotros-sec-eyebrow" style="color:#173789;">PRESENCIA Y TRATO HUMANO</span>
            <h2 class="nosotros-sec-title" style="margin-bottom:0.75rem;">Una institución financiera con rostro solidario y solidez técnica</h2>
            <p style="font-size:0.92rem;color:#475569;line-height:1.65;margin-bottom:0.75rem;">
              A diferencia del sistema bancario tradicional, en COLUA cada asociado es co-propietario de la entidad. Los excedentes generados se reinvierten directamente en mejores tasas de interés para el ahorro, créditos productivos accesibles y programas de asistencia comunitaria sin intermediarios.
            </p>
            <p style="font-size:0.88rem;color:#64748b;line-height:1.6;">
              Fomentamos un trato cercano, digno y transparente en cada una de nuestras agencias y canales cooperativos, acompañando el esfuerzo de emprendedores, familias y comunidades guatemaltecas.
            </p>
          </div>
        </section>

        <!-- 3. IDENTIDAD COOPERATIVA (VALORES & ARCO SEMICIRCULAR) -->
        <section class="nosotros-section-block">
          <div class="nosotros-section-heading-bar" style="text-align:left;">
            <div>
              <span class="nosotros-sec-eyebrow">IDENTIDAD COOPERATIVA</span>
              <h2 class="nosotros-sec-title">Nuestros Valores Cooperativos</h2>
              <p class="nosotros-sec-desc">
                Principios inmutables que guían las decisiones de crédito, custodia de depósitos y relación directa con cada familia cooperativista.
              </p>
            </div>
          </div>

          <!-- Arco Semicircular de Valores COLUA MICOOPE -->
          <div class="nosotros-arch-graphic-wrap">
            <img src="assets/valores_colua.png" alt="Valores de COLUA MICOOPE" class="nosotros-arch-graphic" onerror="this.src='assets/valores_colua_1.png'" />
          </div>

          <!-- 4 Tarjetas de Valores -->
          <div class="nosotros-valores-grid">
            <!-- Integridad -->
            <div class="nosotros-valor-card" style="--val-color: #634794;">
              <div>
                <div class="nosotros-valor-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 class="nosotros-valor-title">Integridad</h3>
                <p class="nosotros-valor-desc">
                  Actuar con coherencia con nuestros valores, manteniendo transparencia en todo lo que hacemos y fomentando la cooperación en cada acción.
                </p>
              </div>
              <span class="nosotros-valor-tag">PILAR ÉTICO CENTRAL</span>
            </div>

            <!-- Cooperación -->
            <div class="nosotros-valor-card" style="--val-color: #59B8A4;">
              <div>
                <div class="nosotros-valor-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 class="nosotros-valor-title">Cooperación</h3>
                <p class="nosotros-valor-desc">
                  Trabajar juntos para alcanzar un objetivo común, basada en la ayuda mutua, la solidaridad y el esfuerzo compartido por el bien colectivo.
                </p>
              </div>
              <span class="nosotros-valor-tag">PRINCIPIO COMUNITARIO</span>
            </div>

            <!-- Responsabilidad -->
            <div class="nosotros-valor-card" style="--val-color: #E42A67;">
              <div>
                <div class="nosotros-valor-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 class="nosotros-valor-title">Responsabilidad</h3>
                <p class="nosotros-valor-desc">
                  Administramos y cuidamos los ahorros de nuestros asociados que nos han confiado con rigurosa prudencia técnica y máxima solvencia.
                </p>
              </div>
              <span class="nosotros-valor-tag">DISCIPLINA FIDUCIARIA</span>
            </div>

            <!-- Enfoque al Asociado -->
            <div class="nosotros-valor-card" style="--val-color: #173789;">
              <div>
                <div class="nosotros-valor-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <h3 class="nosotros-valor-title">Enfoque al Asociado</h3>
                <p class="nosotros-valor-desc">
                  El centro de atención de nuestros esfuerzos y nuestra lealtad son los asociados, a quienes entregamos siempre soluciones de calidad y trato humano.
                </p>
              </div>
              <span class="nosotros-valor-tag">VOCACIÓN DE SERVICIO</span>
            </div>
          </div>
        </section>

        <!-- 4. GALERÍA FOTOGRÁFICA DE IMPACTO (2 FOTOS) -->
        <section class="nosotros-gallery-grid">
          <!-- Foto 1: Arraigo Territorial -->
          <div class="nosotros-gallery-card">
            <img src="assets/nosotros_artesana.jpg" alt="Arraigo Territorial COLUA" class="nosotros-gallery-img" onerror="this.src='assets/colua_edificio.png'" />
            <div class="nosotros-gallery-overlay">
              <span class="nosotros-gallery-tag">ARRAIGO TERRITORIAL</span>
              <h4 class="nosotros-gallery-title">Identidad Cultural y Comunitaria en el Altiplano</h4>
            </div>
          </div>

          <!-- Foto 2: Gobernanza Democrática -->
          <div class="nosotros-gallery-card">
            <img src="assets/noticia_asamblea_general.jpg" alt="Gobernanza Cooperativa COLUA MICOOPE" class="nosotros-gallery-img" onerror="this.src='assets/colua_edificio.png'" />
            <div class="nosotros-gallery-overlay">
              <span class="nosotros-gallery-tag">GOBERNANZA COOPERATIVA</span>
              <h4 class="nosotros-gallery-title">Participación Democrática y Solidez del Sistema MICOOPE</h4>
            </div>
          </div>
        </section>

        <!-- 6. ATENCIÓN AL ASOCIADO Y PÚBLICO (BANNER PBX) -->
        <section class="nosotros-contact-banner">
          <div class="nosotros-contact-top">
            <div class="nosotros-contact-left">
              <span class="nosotros-sec-eyebrow" style="color:#173789;">ATENCIÓN AL ASOCIADO Y PÚBLICO</span>
              <h3 style="font-size:1.35rem;font-weight:800;color:#0f172a;margin-bottom:0.4rem;">¿Necesitas ayuda adicional o deseas afiliarte?</h3>
              <p style="font-size:0.88rem;color:#475569;line-height:1.55;margin:0;">
                Comunícate a nuestro PBX central o visítanos en cualquiera de nuestras 18 agencias departamentales para abrir tu cuenta de aportaciones y disfrutar de los beneficios cooperativos.
              </p>
            </div>
            <div class="nosotros-contact-actions">
              <a href="tel:77957795" class="nosotros-btn-pbx">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                PBX: 7795-7795
              </a>
              <button class="nosotros-btn-agencias" onclick="window.coluaRouter ? window.coluaRouter.navigate('sec_agencias') : (window.location.hash='#sec_agencias')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Ver Agencias
              </button>
            </div>
          </div>
          <div class="nosotros-legal-row">
            <div class="nosotros-legal-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Entidad supervisada por la Inspección General de Cooperativas (INGECOP)</span>
            </div>
            <div class="nosotros-legal-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Depósitos protegidos por el Fondo de Garantía de Ahorros MICOOPE R.L.</span>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  renderBlocksHtml(blocks) {
    if (!blocks || blocks.length === 0) return '';
    
    return blocks.map(b => {
      // Devolver los bloques como texto simple sin estilos invasivos, tal como solicitó el usuario
      return `
        <div style="margin-bottom: 16px; padding: 0 1rem;">
          ${b.title ? `<h3 style="color: #0f172a; margin: 0 0 8px 0; font-size: 1.15rem;">${b.title}</h3>` : ''}
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">${b.content || ''}</p>
        </div>
      `;
    }).join('');
  }

  // --- 9. RENDERIZADOR GENÉRICO CMS ---
  async renderDynamicGeneric(sectionId) {
    const repo = window.coluaRepository;
    const sections = await repo.getAllSections();
    const sec = sections.find(s => s.id === sectionId || s.slug === sectionId);

    const title = sec ? sec.title : sectionId;
    const desc = sec ? sec.description : '';

    const items = await repo.getItemsBySection(sec ? sec.id : sectionId);

    const itemsHtml = items.map(i => `
      <div class="clean-product-card">
        <div>
          ${i.imageUrl || i.imagePath || i.icon ? `
            <div class="clean-product-icon-wrap" style="margin-bottom: 12px; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f1f5f9;">
              ${i.imageUrl || i.imagePath ? `<img src="${i.imageUrl || i.imagePath}" alt="${i.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'"/>` : `<span style="font-size: 2rem;">${i.icon}</span>`}
            </div>
          ` : ''}
          <h3 class="clean-product-name">${i.title}</h3>
          ${i.subtitle ? `<span style="font-size:0.8rem;font-weight:600;color:#2563eb;">${i.subtitle}</span>` : ''}
          <p class="clean-product-desc" style="margin-top:0.5rem;">${i.description || i.shortDescription || ''}</p>
        </div>
      </div>
    `).join('');

    return `
      <div class="clean-subpage-container">
        <header class="clean-subpage-header">
          <h1 class="clean-subpage-title">${title}</h1>
          ${desc ? `<p class="clean-subpage-desc">${desc}</p>` : ''}
        </header>

        <div class="clean-product-grid">
          ${itemsHtml}
        </div>

        ${items.length === 0 ? `
          <div style="text-align:center;padding:3rem 1rem;color:#64748b;background:#f8fafc;border-radius:12px;border:1px dashed #e2e8f0;">
            <p>No hay contenido publicado en esta sección todavía.</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  attachEvents() {
    // Eventos interactivos de secciones si son requeridos
  }
}

window.sectionsComponent = new SectionsComponent();
