// Repositorio Principal de COLUA Digital (Equivalente completo a ColuaRepository.kt)
class ColuaRepository {
  constructor() {
    this.fb = window.firebaseClient;
    this.storage = window.supabaseStorageManager;
    this.localStorageKey = 'COLUA_LOCAL_DB_V1';
    this.initLocalStorage();
  }

  // Inicialización de persistencia local (Copia espejo en localStorage para modo offline y borradores)
  initLocalStorage() {
    const raw = localStorage.getItem(this.localStorageKey);
    if (!raw) {
      this.seedInitialData();
    }
  }

  getLocalDb() {
    try {
      const raw = localStorage.getItem(this.localStorageKey);
      let db = raw ? JSON.parse(raw) : null;
      if (!db || !db.agencias || db.agencias.length < 25 || !db.content_items || db.content_items.length < 8) {
        db = this.seedInitialData(true);
      }
      return db;
    } catch (e) {
      return this.seedInitialData(true);
    }
  }

  saveLocalDb(db) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(db));
    } catch (e) {
      console.error('Error guardando en localStorage:', e);
    }
  }

  // Siembra inicial idéntica a DataSeeder.java
  seedInitialData(force = false) {
    const defaultSections = [
      { id: "sec_home", title: "Inicio", slug: "home", description: "Pantalla principal", iconName: "inicio", accentColor: "#173789", displayOrder: 1, isVisible: true, isPublished: true, templateType: "GRID" },
      { id: "sec_ahorros", title: "Ahorros", slug: "ahorros", description: "Cuentas de ahorro", iconName: "ahorros", accentColor: "#EF8819", displayOrder: 2, isVisible: true, isPublished: true, templateType: "AHORROS" },
      { id: "sec_creditos", title: "Créditos", slug: "creditos", description: "Líneas de crédito", iconName: "credito", accentColor: "#E42A67", displayOrder: 3, isVisible: true, isPublished: true, templateType: "CREDITOS" },
      { id: "sec_seguros", title: "Seguros", slug: "seguros", description: "Protección y vida", iconName: "seguro", accentColor: "#59B8A4", displayOrder: 4, isVisible: true, isPublished: true, templateType: "SEGUROS" },
      { id: "sec_remesas", title: "Remesas", slug: "remesas", description: "Recibe tu dinero", iconName: "remesa", accentColor: "#634794", displayOrder: 5, isVisible: true, isPublished: true, templateType: "REMESAS" },
      { id: "sec_agencias", title: "Agencias", slug: "agencias", description: "Nuestras ubicaciones", iconName: "ubicacion", accentColor: "#173789", displayOrder: 6, isVisible: true, isPublished: true, templateType: "AGENCIAS" },
      { id: "sec_servicios", title: "Servicios Digitales", slug: "servicios", description: "Banca en línea", iconName: "servicios_digitales", accentColor: "#59B8A4", displayOrder: 7, isVisible: true, isPublished: true, templateType: "SERVICIOS" },
      { id: "sec_beneficios", title: "Beneficios", slug: "beneficios", description: "Valor de ser asociado", iconName: "beneficios", accentColor: "#EF8819", displayOrder: 8, isVisible: true, isPublished: true, templateType: "BENEFICIOS" },
      { id: "sec_noticias", title: "Noticias", slug: "noticias", description: "Actualidad COLUA", iconName: "noticias_colua", accentColor: "#E42A67", displayOrder: 9, isVisible: true, isPublished: true, templateType: "NOTICIAS" },
      { id: "sec_nosotros", title: "Nosotros", slug: "nosotros", description: "Valores, objetivos, historia e información institucional", iconName: "public_service", accentColor: "#173789", displayOrder: 10, isVisible: true, isPublished: true, templateType: "NOSOTROS" },
      { id: "sec_sostenibilidad", title: "Sostenibilidad Cooperativa", slug: "sostenibilidad", description: "Cursos y centros de innovación", iconName: "sostenibilidad_cooperativa", accentColor: "#59B8A4", displayOrder: 11, isVisible: true, isPublished: true, templateType: "SOSTENIBILIDAD" }
    ];

    const defaultNavigation = [
      { id: "nav_servicios", label: "Servicios", iconName: "servicios_digitales", targetSectionId: "sec_servicios", type: "BOTTOM_NAV", displayOrder: 1, isVisible: true },
      { id: "nav_agencias", label: "Agencias", iconName: "ubicacion", targetSectionId: "sec_agencias", type: "BOTTOM_NAV", displayOrder: 2, isVisible: true },
      { id: "nav_home", label: "Inicio", iconName: "inicio", targetSectionId: "sec_home", type: "BOTTOM_NAV", displayOrder: 3, isVisible: true },
      { id: "nav_beneficios", label: "Beneficios", iconName: "beneficios", targetSectionId: "sec_beneficios", type: "BOTTOM_NAV", displayOrder: 4, isVisible: true },
      { id: "nav_noticias", label: "Noticias", iconName: "noticias_colua", targetSectionId: "sec_noticias", type: "BOTTOM_NAV", displayOrder: 5, isVisible: true },
      
      { id: "nav_nosotros", label: "Nosotros", iconName: "public_service", targetSectionId: "sec_nosotros", type: "NAVBAR", displayOrder: 1, isVisible: true },

      { id: "side_profile", label: "Mi Perfil", iconName: "perfil", targetSectionId: "perfil", type: "SIDEBAR", displayOrder: 1, isVisible: true },
      { id: "side_creditos", label: "Créditos", iconName: "credito", targetSectionId: "sec_creditos", type: "SIDEBAR", displayOrder: 2, isVisible: true },
      { id: "side_seguros", label: "Seguros", iconName: "seguro", targetSectionId: "sec_seguros", type: "SIDEBAR", displayOrder: 3, isVisible: true },
      { id: "side_remesas", label: "Remesas", iconName: "remesa", targetSectionId: "sec_remesas", type: "SIDEBAR", displayOrder: 4, isVisible: true },
      { id: "side_ahorros", label: "Ahorros", iconName: "ahorros", targetSectionId: "sec_ahorros", type: "SIDEBAR", displayOrder: 5, isVisible: true },
      { id: "side_sostenibilidad", label: "Sostenibilidad Cooperativa", iconName: "sostenibilidad_cooperativa", targetSectionId: "sec_sostenibilidad", type: "SIDEBAR", displayOrder: 6, isVisible: true },
      { id: "side_admin", label: "Portal administrativo", iconName: "portal_administrativo", targetSectionId: "admin", type: "SIDEBAR", displayOrder: 7, isVisible: true },
      { id: "side_logout", label: "Cerrar Sesión", iconName: "cerrar", targetSectionId: "action_logout", type: "SIDEBAR", displayOrder: 8, isVisible: true }
    ];

    const defaultAgencias = [
      // SOLOLÁ (18 agencias)
      { id: "ag_agencia_corporativa", nombre: "Agencia Corporativa", departamento: "Sololá", direccion: "Carretera Interamericana, Km. 138.5 Aldea San Juan Argueta, Sololá.", telefono: "7795-7795", colorHex: "#E42A67", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_agencia_central", nombre: "Agencia Central", departamento: "Sololá", direccion: "Camino Principal Aldea San Juan Argueta, Sololá.", telefono: "7795-7722", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_plaza_colua_micoope", nombre: "Plaza COLUA MICOOPE", departamento: "Sololá", direccion: "Plaza COLUA 2do. Nivel, 6ta. Avenida 7-47, Zona 2 Sololá.", telefono: "7762-3180 / 7762-3608 / 7762-3257", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_el_calvario", nombre: "El Calvario", departamento: "Sololá", direccion: "7ma. Avenida, 6ta. Calle esquina, Zona 2 Barrio El Calvario, Sololá.", telefono: "4931-5495 / 7762-5453", colorHex: "#634794", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_san_bartolo", nombre: "San Bartolo", departamento: "Sololá", direccion: "11 Calle 8-04, Zona 2, Barrio San Bartolo, Sololá.", telefono: "7795-7723 / 7762-3984", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_concepcion", nombre: "Concepción", departamento: "Sololá", direccion: "Sector Chuicumes I, Zona 0, Calle Principal Concepción, Sololá.", telefono: "7795-7735", colorHex: "#E42A67", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_los_encuentros", nombre: "Los Encuentros", departamento: "Sololá", direccion: "Carretera Interamericana, Caserío Central Aldea Los Encuentros, Sololá.", telefono: "5829-2086", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_panajachel", nombre: "Panajachel", departamento: "Sololá", direccion: "0 Avenida, Calle del Estadio, 0-74, Zona 1 Panajachel.", telefono: "7795-7718", colorHex: "#F59E0B", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_san_andres_semetabaj", nombre: "San Andrés Semetabaj", departamento: "Sololá", direccion: "Barrio Tzanjuyu, San Andrés Semetabaj.", telefono: "7795-7733", colorHex: "#634794", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_santiago_atitlan", nombre: "Santiago Atitlán", departamento: "Sololá", direccion: "3ra. Calle 0-58, Cantón Tzanjuyu, Zona 1 Santiago Atitlán.", telefono: "7795-7720 / 5923-5086", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_san_pedro_la_laguna", nombre: "San Pedro La Laguna", departamento: "Sololá", direccion: "Calle al Embarcadero Chuasanahí, 5-60, Zona 2 San Pedro La Laguna.", telefono: "7721-8061 / 4921-3887", colorHex: "#E42A67", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_san_juan_la_laguna", nombre: "San Juan La Laguna", departamento: "Sololá", direccion: "4ta. Avenida Cantón Chuitinamit, Zona 2 San Juan La Laguna.", telefono: "7795-7728", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_santa_clara_la_laguna", nombre: "Santa Clara La Laguna", departamento: "Sololá", direccion: "1ra. Avenida, Zona 2 Santa Clara La Laguna.", telefono: "4928-2887 / 7927-1939", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_santa_lucia_utatlan", nombre: "Santa Lucía Utatlán", departamento: "Sololá", direccion: "Avenida Tecún Umán, entre 2da. y 3ra. Calle, Zona 1 Santa Lucía Utatlán.", telefono: "7722-1519", colorHex: "#634794", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_el_novillero", nombre: "El Novillero", departamento: "Sololá", direccion: "Calle Principal, Aldea El Novillero, Santa Lucía Utatlán.", telefono: "4928-1377 / 4921-8753", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_nahuala", nombre: "Nahualá", departamento: "Sololá", direccion: "Calle Principal, 1ra. Avenida 2-05, Zona 1 Nahualá.", telefono: "7795-7713", colorHex: "#E42A67", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_santa_catarina_ixtahuacan", nombre: "Santa Catarina Ixtahuacán", departamento: "Sololá", direccion: "Barrio Chuijuyup, frente al Mercado Municipal, Santa Catarina Ixtahuacán.", telefono: "7795-7732 / 4921-6226", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_guineales", nombre: "Guineales", departamento: "Sololá", direccion: "Sector Campo, a un costado del Estadio Aldea Guineales, Santa Catarina Ixtahuacán.", telefono: "7795-7731", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      
      // QUICHÉ (4 agencias)
      { id: "ag_agencia_quiche", nombre: "Quiché", departamento: "Quiché", direccion: "3ra. Avenida 04-35, Zona 1, Santa Cruz del Quiché.", telefono: "7795-7730", colorHex: "#634794", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_agencia_chichicastenango", nombre: "Chichicastenango", departamento: "Quiché", direccion: "5ta. Calle, entre 5ta y 6ta. Avenida, Chichicastenango.", telefono: "7795-7719", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_agencia_joyabaj", nombre: "Joyabaj", departamento: "Quiché", direccion: "Calle Principal, Barrio La Libertad, Joyabaj.", telefono: "7795-7715 / 7755-9398", colorHex: "#E42A67", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_agencia_zacualpa", nombre: "Zacualpa", departamento: "Quiché", direccion: "1ra. Calle, 2da. Avenida, Zona 1, Zacualpa.", telefono: "5829-3158", colorHex: "#EF8819", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      
      // TOTONICAPÁN (2 agencias)
      { id: "ag_agencia_la_esperanza", nombre: "La Esperanza", departamento: "Totonicapán", direccion: "Camino Principal, Aldea La Esperanza, Totonicapán.", telefono: "7795-7714", colorHex: "#F59E0B", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      { id: "ag_agencia_la_concordia", nombre: "La Concordia", departamento: "Totonicapán", direccion: "Calle Principal, Aldea La Concordia, Totonicapán.", telefono: "7795-7724 / 4214-3136", colorHex: "#634794", tipo: "AGENCIA", mapUrl: "", isVisible: true },
      
      // SUCHITEPÉQUEZ (1 agencia)
      { id: "ag_agencia_santo_tomas_la_union", nombre: "Santo Tomás La Unión", departamento: "Suchitepéquez", direccion: "3ra. Calle, entre 4ta y 5ta. Avenida, Zona 1, Santo Tomás La Unión, Suchitepéquez.", telefono: "7872-8526", colorHex: "#59B8A4", tipo: "AGENCIA", mapUrl: "", isVisible: true },

      // AGENTES Y CAJEROS
      { id: "ag_agente_super_la_bendicion", nombre: "Agente MICOOPE - Súper La Bendición", departamento: "Sololá", direccion: "Punto Comercial La Bendición, Sololá.", telefono: "7795-7795", colorHex: "#59B8A4", tipo: "AGENTE", mapUrl: "", isVisible: true },
      { id: "ag_agente_farmacia_el_ahorro", nombre: "Agente MICOOPE - Farmacia El Ahorro", departamento: "Quiché", direccion: "Calle Principal, Santa Cruz del Quiché.", telefono: "7795-7795", colorHex: "#59B8A4", tipo: "AGENTE", mapUrl: "", isVisible: true },
      { id: "ag_cajero_5b_central", nombre: "Cajero 5B - Sede Central", departamento: "Sololá", direccion: "Sede Central COLUA, San Juan Argueta.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO", mapUrl: "", isVisible: true },
      { id: "ag_cajero_5b_quiche", nombre: "Cajero 5B - Terminal Quiché", departamento: "Quiché", direccion: "Terminal de Buses, Santa Cruz del Quiché.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO", mapUrl: "", isVisible: true },
      { id: "ag_cajero_5b_totonicapan", nombre: "Cajero 5B - Totonicapán", departamento: "Totonicapán", direccion: "Parque Central, Totonicapán.", telefono: "7795-7795", colorHex: "#173789", tipo: "CAJERO", mapUrl: "", isVisible: true }
    ];

    const defaultItems = [
      // Home items
      { id: "home_ahorro", sectionId: "sec_home", title: "Cuentas de Ahorro\nAhorro Infantil y Juvenil", subtitle: "¡Ahorro!", shortDescription: "Seguridad para tu futuro", accentColor: "#59B8A4", displayOrder: 1, iconName: "ahorros", targetSectionId: "sec_ahorros", isVisible: true, isDraft: false },
      { id: "home_credito", sectionId: "sec_home", title: "Productivo, Consumo, Vivienda, Vehículo", subtitle: "¡Crédito!", shortDescription: "Tasas competitivas", accentColor: "#173789", displayOrder: 2, iconName: "credito", targetSectionId: "sec_creditos", isVisible: true, isDraft: false },
      { id: "home_seguros", sectionId: "sec_home", title: "Seguros de Vida\nSeguros Médicos", subtitle: "¡Seguros!", shortDescription: "Protección para tu familia", accentColor: "#EF8819", displayOrder: 3, iconName: "seguro", targetSectionId: "sec_seguros", isVisible: true, isDraft: false },
      { id: "home_remesas", sectionId: "sec_home", title: "Remesas Dirigidas", subtitle: "¡Remesas!", shortDescription: "Recibe fácil tu dinero", accentColor: "#634794", displayOrder: 4, iconName: "remesa", targetSectionId: "sec_remesas", isVisible: true, isDraft: false },

      // Noticias & Comunicados Oficiales
      {
        id: "news_reforestacion_2026",
        sectionId: "sec_noticias",
        title: "Jornada de Reforestación 2026: Sostenibilidad en nuestras cuencas",
        subtitle: "Ver detalles completos",
        shortDescription: "Junto a decenas de familias asociadas y voluntarios de nuestra cooperativa, llevamos a cabo con éxito la siembra de más de 500 árboles nativos para la protección de cuencas en Quiché y Sololá.",
        description: "Junto a decenas de familias asociadas y voluntarios de nuestra cooperativa, llevamos a cabo con éxito la siembra de más de 500 árboles nativos para la protección de cuencas en Quiché y Sololá, reafirmando el compromiso cooperativo con el medio ambiente y las futuras generaciones del país.",
        imagePath: "assets/noticia_reforestacion.jpg",
        imageUrl: "assets/noticia_reforestacion.jpg",
        tags: "#COLUAVerde #ComunidadCOLUA #MICOOPE #GuatemalaSostenible",
        isFeatured: true,
        isDraft: false,
        likesCount: 28,
        sharesCount: 12,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        targetSectionId: "https://colua.com.gt/noticias/reforestacion-2026",
        publicationDate: 1789762795493,
        updatedAt: 1789769069835
      },
      {
        id: "news_taller_finanzas",
        sectionId: "sec_noticias",
        title: "Taller Finanzas para Emprendedores",
        subtitle: "Ver detalles completos",
        shortDescription: "Aprende a estructurar tus costos y maximizar tus excedentes en nuestra sede central con capacitadores expertos de MICOOPE.",
        description: "Aprende a estructurar tus costos y maximizar tus excedentes en nuestra sede central con capacitadores expertos de MICOOPE. Conoce herramientas prácticas de flujo de caja y contabilidad básica.",
        imagePath: "assets/noticia_taller_finanzas.jpg",
        imageUrl: "assets/noticia_taller_finanzas.jpg",
        tags: "#Emprendedores #MICOOPE #EducacionFinanciera",
        isFeatured: false,
        isDraft: false,
        likesCount: 15,
        sharesCount: 4,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        targetSectionId: "https://colua.com.gt/noticias/taller-finanzas",
        publicationDate: 1789762795502,
        updatedAt: 1789769069835
      },
      {
        id: "news_asamblea_general",
        sectionId: "sec_noticias",
        title: "Asamblea General de Asociados COLUA",
        subtitle: "Ver detalles completos",
        shortDescription: "Te invitamos a participar activamente en las decisiones y crecimiento de nuestra cooperativa en la Asamblea General Anual.",
        description: "Te invitamos a participar activamente en las decisiones y crecimiento de nuestra cooperativa. Revisa la agenda y los puntos a tratar en el portal o agencias.",
        imagePath: "assets/noticia_asamblea_general.jpg",
        imageUrl: "assets/noticia_asamblea_general.jpg",
        tags: "#Asamblea2026 #AsociadosCOLUA #MICOOPE",
        isFeatured: false,
        isDraft: false,
        likesCount: 32,
        sharesCount: 14,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        targetSectionId: "https://coluarl.com.gt",
        publicationDate: 1789762795510,
        updatedAt: 1789769069835
      },
      {
        id: "1d528fa6-dc98-40f5-b95e-0c164d761ce4",
        sectionId: "sec_noticias",
        title: "Taller Finanzas para Emprendedores (Copia)",
        subtitle: "Ver detalles completos",
        shortDescription: "Aprende a estructurar tus costos y maximizar tus excedentes en nuestra sede central.",
        description: "Aprende a estructurar tus costos y maximizar tus excedentes en nuestra sede central con capacitadores expertos de MICOOPE.",
        imagePath: "assets/noticia_taller_finanzas.jpg",
        imageUrl: "assets/noticia_taller_finanzas.jpg",
        tags: "#COLUAVerde #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 5,
        sharesCount: 1,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789767894112,
        updatedAt: 1789769069835
      },
      {
        id: "3f6265b2-1ef1-43b5-810b-80af518fa332",
        sectionId: "sec_noticias",
        title: "Prueba 1000",
        subtitle: "Ver detalles completos",
        shortDescription: "Prueba de publicación desde un dispositivo virtual en la red cooperativa.",
        description: "Prueba de publicación desde un dispositivo virtual en la red cooperativa.",
        imagePath: "assets/valores_colua.png",
        imageUrl: "assets/valores_colua.png",
        tags: "#COLUAInformativa #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 3,
        sharesCount: 1,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789681251863,
        updatedAt: 1789769069835
      },
      {
        id: "63bb5698-20df-48b2-bc5e-c1665fd07c18",
        sectionId: "sec_noticias",
        title: "Prueba de Publicación",
        subtitle: "Ver detalles completos",
        shortDescription: "Prueba de publicaciones cargada con imagen fotográfica desde el portal.",
        description: "Prueba de publicaciones cargada con imagen fotográfica desde el portal.",
        imagePath: "assets/noticia_reforestacion.jpg",
        imageUrl: "assets/noticia_reforestacion.jpg",
        tags: "#COLUAInformativa #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 4,
        sharesCount: 0,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789769059172,
        updatedAt: 1789769117192
      },
      {
        id: "8e268e32-6ef9-455e-88a5-41aefbce1e80",
        sectionId: "sec_noticias",
        title: "Prueba de Noticias",
        subtitle: "Ver detalles completos",
        shortDescription: "Esto es una prueba de publicaciones, para el apartado de colua noticias.",
        description: "Esto es una prueba de publicaciones, para el apartado de colua noticias.",
        imagePath: "assets/noticia_taller_finanzas.jpg",
        imageUrl: "assets/noticia_taller_finanzas.jpg",
        tags: "#COLUAInformativa #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 2,
        sharesCount: 0,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789665357044,
        updatedAt: 1789769069835
      },
      {
        id: "9091479f-01b9-4fe8-beb9-f4890ef4fe5e",
        sectionId: "sec_noticias",
        title: "Firma del Ingeniero",
        subtitle: "Ver más",
        shortDescription: "Firma del ingeniero para la carta de recibido de prácticas profesionales.",
        description: "Firma del ingeniero para la carta de recibido de prácticas profesionales en las instalaciones de COLUA R.L.",
        imagePath: "assets/noticia_asamblea_general.jpg",
        imageUrl: "assets/noticia_asamblea_general.jpg",
        tags: "#COLUAInformativa #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 6,
        sharesCount: 2,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789680934647,
        updatedAt: 1789769069835
      },
      {
        id: "c3668573-a8e2-43dc-a11f-aae5e7d080fd",
        sectionId: "sec_noticias",
        title: "Pruebas de Ahorros",
        subtitle: "Ver detalles completos",
        shortDescription: "Pruebas de publicaciones informativas para planes y promociones de ahorro.",
        description: "Pruebas de publicaciones informativas para planes y promociones de ahorro en nuestras agencias.",
        imagePath: "assets/noticia_reforestacion.jpg",
        imageUrl: "assets/noticia_reforestacion.jpg",
        tags: "#COLUAInformativa #MICOOPE #Asociados",
        isFeatured: false,
        isDraft: false,
        likesCount: 4,
        sharesCount: 1,
        issuerName: "Cooperativa COLUA",
        issuerRole: "Oficial",
        publicationDate: 1789666915273,
        updatedAt: 1789769069835
      }
    ];

    const defaultBlocks = [
      { id: "block_home_slogan", sectionId: "sec_home", type: "TEXT", content: "SOMOS EL LADO HUMANO\nde los Ahorros y Créditos", title: "SOMOS EL LADO HUMANO", displayOrder: 1, isVisible: true, isDraft: false },
      { id: "block_home_institutional_contact", sectionId: "sec_home", type: "CONTAINER", content: "Comunícate a nuestro PBX central o búscanos en nuestras redes sociales oficiales.", title: "SOMOS EL LADO HUMANO", buttonText: "PBX: 7795-7795", buttonAction: "tel:77957795", mediaPath: "distintivo_colua", backgroundColor: "#173789", displayOrder: 2, isVisible: true, isDraft: false }
    ];

    const defaultGlobalConfig = {
      slogan_text: "SOMOS EL LADO HUMANO\nde los Ahorros y Créditos",
      help_title: "¿Necesitas ayuda adicional?",
      help_desc: "Comunícate a nuestro PBX central o búscanos en nuestras redes sociales oficiales.",
      logo_path: "logo_composite",
      distintivo_path: "distintivo_colua",
      master_admin_password_hash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
      published_version: 1,
      last_sync_timestamp: Date.now()
    };

    const initialDb = {
      sections: defaultSections,
      navigation_items: defaultNavigation,
      agencias: defaultAgencias,
      content_items: defaultItems,
      content_blocks: defaultBlocks,
      global_config: defaultGlobalConfig,
      usuarios: []
    };

    this.saveLocalDb(initialDb);
    return initialDb;
  }

  // Helper con timeout estricto para no colgar la UI si Firestore tarda o no responde
  async _withTimeout(promise, ms = 1200) {
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('Firestore timeout')), ms);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      clearTimeout(timer);
    }
  }

  // --- SECCIONES ---
  async getAllSections() {
    try {
      if (this.fb && this.fb.db) {
        const snap = await this._withTimeout(this.fb.collection('sections').get());
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        }
      }
    } catch (e) {
      console.warn('Firestore offline o timeout, cargando secciones locales:', e);
    }
    const db = this.getLocalDb();
    return (db.sections || []).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getPublishedSections() {
    const list = await this.getAllSections();
    return list.filter(s => s.isPublished !== false && s.isVisible !== false && !s.deletedAt);
  }

  async getArchivedSections() {
    const list = await this.getAllSections();
    return list.filter(s => s.deletedAt || s.isVisible === false);
  }

  async insertSection(section) {
    if (!section.id) section.id = 'sec_' + Math.random().toString(36).substring(2, 9);
    section.updatedAt = Date.now();
    
    // Guardar local
    const db = this.getLocalDb();
    const idx = db.sections.findIndex(s => s.id === section.id);
    if (idx >= 0) db.sections[idx] = section;
    else db.sections.push(section);
    this.saveLocalDb(db);

    // Guardar en Firestore si hay conexión
    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('sections').doc(section.id).set(section, { merge: true });
      } catch (e) {
        console.warn('Error syncing section to Firestore:', e);
      }
    }
    return section;
  }

  async archiveSection(id) {
    if (id === 'sec_home') return false;
    const db = this.getLocalDb();
    const s = db.sections.find(sec => sec.id === id);
    if (s) {
      s.deletedAt = Date.now();
      s.isVisible = false;
      s.isPublished = false;
      this.saveLocalDb(db);
    }
    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('sections').doc(id).update({
          deletedAt: Date.now(),
          isVisible: false,
          isPublished: false
        });
      } catch (e) {}
    }
    return true;
  }

  async restoreArchivedSection(id) {
    const db = this.getLocalDb();
    const s = db.sections.find(sec => sec.id === id);
    if (s) {
      s.deletedAt = null;
      s.isVisible = true;
      s.isPublished = true;
      this.saveLocalDb(db);
    }
    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('sections').doc(id).update({
          deletedAt: null,
          isVisible: true,
          isPublished: true
        });
      } catch (e) {}
    }
    return true;
  }

  async purgeSectionPermanently(id) {
    if (id === 'sec_home') return false;
    const db = this.getLocalDb();
    db.sections = db.sections.filter(s => s.id !== id);
    db.navigation_items = db.navigation_items.filter(n => n.targetSectionId !== id);
    db.content_items = db.content_items.filter(i => i.sectionId !== id);
    db.content_blocks = db.content_blocks.filter(b => b.sectionId !== id);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('sections').doc(id).delete();
        await this.fb.collection('navigation_items').doc('nav_' + id).delete();
      } catch (e) {}
    }
    return true;
  }

  // Extrae y normaliza el timestamp de publicación de un contenido
  _extractItemDate(item) {
    if (!item) return 0;
    // Prioridad absoluta: fecha de publicación explícita para que la más reciente sea la novedad
    const val = item.publicationDate ?? item.publishedAt ?? item.date ?? item.fecha ?? item.createdAt ?? item.lastModified ?? item.updatedAt;
    if (!val) return 0;
    if (typeof val === 'number') {
      return val < 1e11 ? val * 1000 : val;
    }
    if (typeof val === 'object') {
      if (typeof val.toMillis === 'function') return val.toMillis();
      if (typeof val.seconds === 'number') return val.seconds * 1000 + Math.floor((val.nanoseconds || 0) / 1e6);
      if (typeof val._seconds === 'number') return val._seconds * 1000;
      if (val instanceof Date) return val.getTime();
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (/^\d+$/.test(trimmed)) {
        const num = parseInt(trimmed, 10);
        return num < 1e11 ? num * 1000 : num;
      }
      const parsed = Date.parse(trimmed);
      if (!isNaN(parsed)) return parsed;
      // Soporte para fechas en español tipo "18 sept, 2026"
      const match = trimmed.match(/(\d{1,2})\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)[,\s]+(\d{4})/);
      if (match) {
        const day = parseInt(match[1], 10);
        const monStr = match[2].toLowerCase().substring(0, 3);
        const year = parseInt(match[3], 10);
        const meses = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };
        if (monStr in meses) {
          return new Date(year, meses[monStr], day).getTime();
        }
      }
    }
    return 0;
  }

  // Ordena noticias cronológicamente: la más reciente primero (la novedad)
  sortNewsByDate(articles) {
    if (!Array.isArray(articles)) return [];
    return articles.sort((a, b) => {
      const timeA = this._extractItemDate(a);
      const timeB = this._extractItemDate(b);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      const createdA = a.createdAt || a.lastModified || a.updatedAt || 0;
      const createdB = b.createdAt || b.lastModified || b.updatedAt || 0;
      if (createdB !== createdA) return createdB - createdA;
      return (b.id || '').localeCompare(a.id || '');
    });
  }

  // --- CONTENIDO (ITEMS Y BLOQUES) ---
  async getItemsBySection(sectionId) {
    const cleanId = (sectionId || '').toLowerCase();
    const isNews = cleanId === 'sec_noticias' || cleanId === 'noticias';
    try {
      if (this.fb && this.fb.db) {
        const snap = await this._withTimeout(this.fb.collection('content_items').where('sectionId', '==', cleanId).get());
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (isNews) {
            return this.sortNewsByDate(list);
          }
          return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        }
      }
    } catch (e) {
      console.warn('Firestore offline o timeout, cargando items locales:', e);
    }
    const db = this.getLocalDb();
    const list = (db.content_items || []).filter(i => (i.sectionId || '').toLowerCase() === cleanId);
    if (isNews) {
      return this.sortNewsByDate(list);
    }
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  // Helper para decodificar documentos de la API REST de Firestore
  _parseFirestoreRestDoc(doc) {
    if (!doc || !doc.name) return null;
    const data = { id: doc.name.split('/').pop() };
    if (doc.fields) {
      for (const [key, valObj] of Object.entries(doc.fields)) {
        if ('stringValue' in valObj) data[key] = valObj.stringValue;
        else if ('integerValue' in valObj) data[key] = parseInt(valObj.integerValue, 10);
        else if ('doubleValue' in valObj) data[key] = parseFloat(valObj.doubleValue);
        else if ('booleanValue' in valObj) data[key] = valObj.booleanValue;
        else if ('timestampValue' in valObj) data[key] = valObj.timestampValue;
        else if ('nullValue' in valObj) data[key] = null;
        else if ('arrayValue' in valObj) {
          data[key] = (valObj.arrayValue.values || []).map(v => Object.values(v)[0]);
        }
      }
    }
    return data;
  }

  // Alias y sincronizador robusto para componente de noticias
  async getNewsArticles() {
    let cloudArticles = [];

    // 1. Intentar mediante el SDK de Firestore (timeout 3500ms)
    try {
      if (this.fb && this.fb.db) {
        const snap = await this._withTimeout(this.fb.collection('content_items').where('sectionId', '==', 'sec_noticias').get(), 3500);
        if (!snap.empty) {
          cloudArticles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      }
    } catch (e) {
      console.warn('Firestore SDK lento o no disponible, intentando REST API...', e);
    }

    // 2. Si el SDK no devolvió artículos, consultar la API REST pública de Firestore
    if (!cloudArticles || cloudArticles.length === 0) {
      try {
        const restUrl = 'https://firestore.googleapis.com/v1/projects/colua-info/databases/(default)/documents/content_items?pageSize=100';
        const resp = await fetch(restUrl, { cache: 'no-cache' });
        if (resp.ok) {
          const json = await resp.json();
          if (json.documents && Array.isArray(json.documents)) {
            cloudArticles = json.documents
              .map(d => this._parseFirestoreRestDoc(d))
              .filter(item => {
                if (!item) return false;
                const sec = (item.sectionId || '').toLowerCase();
                const id = (item.id || '').toLowerCase();
                return sec === 'sec_noticias' || sec === 'noticias' || id.startsWith('news_');
              });
          }
        }
      } catch (err) {
        console.warn('REST API Firestore fallback error:', err);
      }
    }

    // 3. Si se obtuvieron artículos de la nube, sincronizar con localStorage
    if (cloudArticles && cloudArticles.length > 0) {
      try {
        const db = this.getLocalDb();
        const existingMap = new Map((db.content_items || []).map(i => [i.id, i]));
        cloudArticles.forEach(item => {
          if (item.imagePath && !item.imageUrl) {
            item.imageUrl = item.imagePath;
          }
          existingMap.set(item.id, { ...existingMap.get(item.id), ...item });
        });
        db.content_items = Array.from(existingMap.values());
        this.saveLocalDb(db);
      } catch (saveErr) {
        console.warn('No se pudo persistir artículos nube en localStorage:', saveErr);
      }

      return this.sortNewsByDate(cloudArticles);
    }

    // 4. Fallback a base de datos local
    const db = this.getLocalDb();
    const list = (db.content_items || []).filter(i => {
      const sec = (i.sectionId || '').toLowerCase();
      const id = (i.id || '').toLowerCase();
      return sec === 'sec_noticias' || sec === 'noticias' || id.startsWith('news_');
    });

    return this.sortNewsByDate(list);
  }

  async getBlocksBySection(sectionId) {
    const cleanId = sectionId.toLowerCase();
    try {
      if (this.fb && this.fb.db) {
        const snap = await this._withTimeout(this.fb.collection('content_blocks').where('sectionId', '==', cleanId).get());
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        }
      }
    } catch (e) {
      console.warn('Firestore offline o timeout, cargando bloques locales:', e);
    }
    const db = this.getLocalDb();
    return (db.content_blocks || [])
      .filter(b => (b.sectionId || '').toLowerCase() === cleanId)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async insertItem(item) {
    if (!item.id) item.id = 'item_' + Math.random().toString(36).substring(2, 9);
    item.updatedAt = Date.now();
    const sec = (item.sectionId || '').toLowerCase();
    const id = (item.id || '').toLowerCase();
    const isNews = sec === 'sec_noticias' || sec === 'noticias' || id.startsWith('news_');
    if (isNews && !item.publicationDate && !item.date && !item.fecha) {
      item.publicationDate = Date.now();
    }
    const db = this.getLocalDb();
    const idx = db.content_items.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      db.content_items[idx] = item;
    } else {
      if (isNews) db.content_items.unshift(item);
      else db.content_items.push(item);
    }
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('content_items').doc(item.id).set(item, { merge: true });
      } catch (e) {}
    }
    return item;
  }

  async insertBlock(block) {
    if (!block.id) block.id = 'block_' + Math.random().toString(36).substring(2, 9);
    block.updatedAt = Date.now();
    const db = this.getLocalDb();
    const idx = db.content_blocks.findIndex(b => b.id === block.id);
    if (idx >= 0) db.content_blocks[idx] = block;
    else db.content_blocks.push(block);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('content_blocks').doc(block.id).set(block, { merge: true });
      } catch (e) {}
    }
    return block;
  }

  async deleteItemById(id) {
    const db = this.getLocalDb();
    db.content_items = db.content_items.filter(i => i.id !== id);
    this.saveLocalDb(db);
    if (this.fb && this.fb.db) {
      try { await this.fb.collection('content_items').doc(id).delete(); } catch (e) {}
    }
  }

  async deleteBlockById(id) {
    const db = this.getLocalDb();
    db.content_blocks = db.content_blocks.filter(b => b.id !== id);
    this.saveLocalDb(db);
    if (this.fb && this.fb.db) {
      try { await this.fb.collection('content_blocks').doc(id).delete(); } catch (e) {}
    }
  }

  // --- AGENCIAS ---
  async getAllAgencias() {
    try {
      if (this.fb && this.fb.db) {
        const snap = await this._withTimeout(this.fb.collection('agencias').get());
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      }
    } catch (e) {
      console.warn('Firestore offline o timeout, cargando agencias locales:', e);
    }
    const db = this.getLocalDb();
    return db.agencias || [];
  }

  // Alias para agencias.js
  async getAgencies() {
    return await this.getAllAgencias();
  }

  async insertAgencia(agencia) {
    if (!agencia.id) agencia.id = 'ag_' + Math.random().toString(36).substring(2, 9);
    agencia.updatedAt = Date.now();
    const db = this.getLocalDb();
    const idx = db.agencias.findIndex(a => a.id === agencia.id);
    if (idx >= 0) db.agencias[idx] = agencia;
    else db.agencias.push(agencia);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try { await this.fb.collection('agencias').doc(agencia.id).set(agencia, { merge: true }); } catch (e) {}
    }
    return agencia;
  }

  async deleteAgencia(id) {
    const db = this.getLocalDb();
    db.agencias = db.agencias.filter(a => a.id !== id);
    this.saveLocalDb(db);
    if (this.fb && this.fb.db) {
      try { await this.fb.collection('agencias').doc(id).delete(); } catch (e) {}
    }
  }

  // --- NAVEGACIÓN ---
  async getVisibleNavigation(type) {
    const db = this.getLocalDb();
    return (db.navigation_items || [])
      .filter(n => n.type === type && n.isVisible !== false)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getRobustSidebarItems() {
    return this.getVisibleNavigation('SIDEBAR');
  }

  async insertNavigationItem(navItem) {
    if (!navItem.id) navItem.id = 'nav_' + Math.random().toString(36).substring(2, 9);
    const db = this.getLocalDb();
    const idx = db.navigation_items.findIndex(n => n.id === navItem.id);
    if (idx >= 0) db.navigation_items[idx] = navItem;
    else db.navigation_items.push(navItem);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try { await this.fb.collection('navigation_items').doc(navItem.id).set(navItem, { merge: true }); } catch (e) {}
    }
    return navItem;
  }

  // --- GESTIÓN DE USUARIOS Y PERFILES (Firestore) ---
  async crearPerfilUsuario(uid, nombre, telefono, rawDpi, email, esInvitado) {
    const installId = 'web_' + (localStorage.getItem('colua_install_id') || Math.random().toString(36).substring(2, 10));
    localStorage.setItem('colua_install_id', installId);

    if (esInvitado) {
      const guestId = uid;
      const profileData = {
        firebaseUid: uid,
        userId: guestId,
        tipoUsuario: "INVITADO",
        role: "GUEST",
        nombre: "Invitado",
        installationId: installId,
        fechaRegistro: new Date(),
        ultimaActividad: new Date(),
        schemaVersion: 3
      };

      if (this.fb && this.fb.db) {
        try {
          await this.fb.collection('usuarios').doc(guestId).set(profileData, { merge: true });
        } catch (e) {
          console.warn('Error guardando perfil invitado en Firestore:', e);
        }
      }
      return { success: true, userId: guestId, user: profileData };
    }

    // Flujo de Asociado con ID consecutivo de 7 dígitos mediante transacción atómica
    let assignedNumber = 1;
    let formattedId = "0000001";

    if (this.fb && this.fb.db) {
      try {
        const counterRef = this.fb.collection('systemCounters').doc('users');
        const res = await this.fb.runTransaction(async (transaction) => {
          const doc = await transaction.get(counterRef);
          let lastNum = doc.exists ? (doc.data().lastAssignedNumber || 0) : 0;
          let newNum = lastNum + 1;
          transaction.set(counterRef, { lastAssignedNumber: newNum }, { merge: true });
          return newNum;
        });
        assignedNumber = res;
        formattedId = String(assignedNumber).padStart(7, '0');
      } catch (e) {
        console.warn('Transacción de contador falló, generando ID incremental local:', e);
        assignedNumber = Math.floor(1000 + Math.random() * 9000);
        formattedId = String(assignedNumber).padStart(7, '0');
      }
    }

    const cleanDpiDigits = rawDpi.replace(/\D/g, '');
    const formattedDpi = cleanDpiDigits.length === 13
      ? `${cleanDpiDigits.substring(0, 4)} ${cleanDpiDigits.substring(4, 9)} ${cleanDpiDigits.substring(9, 13)}`
      : rawDpi;
    const cleanPhone = telefono.replace(/\D/g, '');
    const isAdminEmail = this._isAdminAuthorized(email);

    const profileData = {
      firebaseUid: uid,
      userId: formattedId,
      idNumerico: assignedNumber,
      tipoUsuario: isAdminEmail ? "ADMIN" : "ASOCIADO",
      role: isAdminEmail ? "ADMIN" : "MEMBER",
      nombre: nombre.trim(),
      dpi: formattedDpi,
      dpiNormalizado: cleanDpiDigits,
      telefono: cleanPhone,
      telefonoCompleto: `+502${cleanPhone}`,
      email: email.trim(),
      estadoCuenta: "ACTIVA",
      installationId: installId,
      fechaRegistro: new Date(),
      ultimaActividad: new Date(),
      schemaVersion: 3
    };

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('usuarios').doc(formattedId).set(profileData);
        // Registrar subcolección dispositivos
        await this.fb.collection('usuarios').doc(formattedId).collection('dispositivos').doc(installId).set({
          installationId: installId,
          userId: formattedId,
          tipoUsuario: profileData.tipoUsuario,
          modeloTelefono: navigator.userAgent.substring(0, 60),
          plataforma: "WEB_PWA",
          versionApp: window.COLUA_CONFIG.appVersion,
          fechaRegistro: new Date(),
          ultimaActividad: new Date(),
          estado: "ACTIVO"
        });
      } catch (e) {
        console.error('Error guardando perfil de asociado en Firestore:', e);
      }
    }

    return { success: true, userId: formattedId, user: profileData };
  }

  async obtenerPerfilUsuario(uid, email) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const isAdminEmail = this._isAdminAuthorized(cleanEmail);

    if (this.fb && this.fb.db) {
      try {
        // Buscar por firebaseUid
        let query = await this.fb.collection('usuarios').where('firebaseUid', '==', uid).get();
        if (query.empty && cleanEmail) {
          query = await this.fb.collection('usuarios').where('email', '==', cleanEmail).get();
        }

        if (!query.empty) {
          const doc = query.docs[0];
          const data = doc.data();
          return {
            success: true,
            user: {
              userId: doc.id,
              nombre: data.nombre || (isAdminEmail ? "Administrador COLUA" : "Asociado COLUA"),
              telefono: data.telefono || "",
              dpi: data.dpi || "",
              email: cleanEmail,
              role: isAdminEmail ? "SUPER_ADMIN" : (data.role || data.tipoUsuario || "MEMBER"),
              tipoUsuario: data.tipoUsuario || (isAdminEmail ? "ADMIN" : "ASOCIADO")
            }
          };
        }
      } catch (e) {
        console.warn('Error consultando perfil en Firestore:', e);
      }
    }

    // Si es admin oficial y no tiene doc, retornar objeto super admin
    if (isAdminEmail) {
      return {
        success: true,
        user: {
          userId: "admin_01",
          nombre: "Administrador General COLUA",
          telefono: "7795-7795",
          dpi: "0000 00000 0000",
          email: cleanEmail,
          role: "SUPER_ADMIN",
          tipoUsuario: "ADMIN"
        }
      };
    }

    return { success: false, error: 'Perfil no encontrado.' };
  }

  async getUsuariosActivosReal() {
    return this.getAllUsers();
  }

  _isAdminAuthorized(email) {
    if (!email) return false;
    const clean = email.toLowerCase().trim();
    const authorized = ['admin@colua.com.gt', 'admin@coluarl.com.gt', (typeof atob !== 'undefined' ? atob('Y29sdWFybEBnbWFpbC5jb20=') : '')];
    return authorized.includes(clean);
  }

  // --- GESTIÓN DE USUARIOS Y ROLES (RBAC) ---
  async getAllUsers() {
    const db = this.getLocalDb();
    if (!db.usuarios || db.usuarios.length === 0) {
      db.usuarios = [
        {
          uid: 'superadmin_master',
          id: 'superadmin_master',
          nombre: 'Super Administrador COLUA',
          email: 'admin@colua.com.gt',
          role: 'superadmin',
          tipoUsuario: 'ADMIN',
          dpi: '0000 00000 0000',
          associateId: '0000001'
        },
        {
          uid: 'mgr_content_01',
          id: 'mgr_content_01',
          nombre: 'Manager de Contenidos y Medios',
          email: 'manager@colua.com.gt',
          role: 'manager',
          tipoUsuario: 'ADMIN',
          dpi: '1111 22222 3333',
          associateId: '0000002'
        },
        {
          uid: 'asoc_demo_01',
          id: 'asoc_demo_01',
          nombre: 'Asociado Demostrativo',
          email: 'asociado@colua.com.gt',
          role: 'asociado',
          tipoUsuario: 'ASOCIADO',
          dpi: '2541 85963 0701',
          associateId: '0010025'
        }
      ];
      this.saveLocalDb(db);
    }

    if (this.fb && this.fb.db) {
      try {
        const snap = await this._withTimeout(this.fb.collection('usuarios').get(), 1000);
        if (!snap.empty) {
          const remoteDocs = snap.docs.map(d => ({ uid: d.id, id: d.id, ...d.data() }));
          if (remoteDocs.length > 0) return remoteDocs;
        }
      } catch (e) {}
    }
    return db.usuarios;
  }

  async updateUserRole(userId, newRole) {
    const db = this.getLocalDb();
    if (!db.usuarios) db.usuarios = [];
    const idx = db.usuarios.findIndex(u => (u.uid === userId || u.id === userId || u.userId === userId));
    const isElevated = (newRole === 'superadmin' || newRole === 'admin' || newRole === 'manager');
    const nuevoTipo = isElevated ? 'ADMIN' : 'ASOCIADO';

    if (idx >= 0) {
      db.usuarios[idx].role = newRole;
      db.usuarios[idx].tipoUsuario = nuevoTipo;
      this.saveLocalDb(db);
    }
    await this.cambiarRolUsuario(userId, newRole, nuevoTipo);
    await this.logAudit({
      action: 'CAMBIO_ROL_RBAC',
      performedBy: window.authService?.getCurrentUser()?.nombre || 'Super Administrador',
      details: `Usuario ${userId} asignado al rol: ${newRole}`
    });
    return { success: true };
  }

  async cambiarRolUsuario(userId, nuevoRol, nuevoTipo) {
    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('usuarios').doc(userId).update({
          role: nuevoRol,
          tipoUsuario: nuevoTipo,
          ultimaActividad: new Date()
        });
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }
    return { success: true };
  }

  async addAdminOrManager(data) {
    const db = this.getLocalDb();
    if (!db.usuarios) db.usuarios = [];
    const newUid = 'usr_' + Date.now();
    const newUser = {
      uid: newUid,
      id: newUid,
      userId: newUid,
      nombre: data.nombre ? data.nombre.trim() : 'Usuario Administrativo',
      email: (data.email || '').toLowerCase().trim(),
      role: data.role || 'manager',
      tipoUsuario: 'ADMIN',
      dpi: data.dpi ? data.dpi.trim() : '0000 00000 0000',
      password: data.password || '123456',
      associateId: `00000${Math.floor(10 + Math.random() * 89)}`,
      createdAt: new Date().toISOString()
    };
    db.usuarios.push(newUser);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('usuarios').doc(newUid).set(newUser);
      } catch (e) {}
    }

    await this.logAudit({
      action: 'ALTA_ADMIN_MANAGER',
      performedBy: window.authService?.getCurrentUser()?.nombre || 'Super Administrador',
      details: `Alta de ${data.role}: ${newUser.nombre} (${newUser.email})`
    });

    return { success: true, user: newUser };
  }

  // --- REGISTRO DE AUDITORÍA ---
  async getAuditLogs(limit = 30) {
    const db = this.getLocalDb();
    if (!db.audit_logs) {
      db.audit_logs = [
        {
          id: 'log_seed_1',
          timestamp: Date.now() - 1000 * 60 * 30,
          action: 'INICIALIZACION_SISTEMA',
          performedBy: 'Super Administrador',
          details: 'Sistema de control de accesos institucionales activado'
        }
      ];
      this.saveLocalDb(db);
    }
    return db.audit_logs.slice(0, limit);
  }

  async logAudit(entry) {
    const db = this.getLocalDb();
    if (!db.audit_logs) db.audit_logs = [];
    const logItem = {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      timestamp: Date.now(),
      action: entry.action || 'OPERACION',
      performedBy: entry.performedBy || 'Sistema',
      details: entry.details || ''
    };
    db.audit_logs.unshift(logItem);
    if (db.audit_logs.length > 100) db.audit_logs = db.audit_logs.slice(0, 100);
    this.saveLocalDb(db);

    if (this.fb && this.fb.db) {
      try {
        await this.fb.collection('audit_logs').add(logItem);
      } catch (e) {}
    }
    return logItem;
  }

  async updateGlobalConfig(partialConfig) {
    const db = this.getLocalDb();
    if (!db.global_config) db.global_config = {};
    db.global_config = { ...db.global_config, ...partialConfig };
    this.saveLocalDb(db);
    return db.global_config;
  }

  // --- VERSIONADO Y PUBLICACIÓN CMS ---
  getSyncStatusInfo() {
    const db = this.getLocalDb();
    const config = db.global_config || {};
    const localVersion = config.published_version || 1;
    const lastSyncTimestamp = config.last_sync_timestamp || Date.now();

    const sections = db.sections || [];
    const items = db.content_items || [];
    const blocks = db.content_blocks || [];

    const pendingSections = sections.filter(s => !s.isPublished).length;
    const pendingItems = items.filter(i => i.isDraft).length;
    const pendingBlocks = blocks.filter(b => b.isDraft).length;
    const totalPending = pendingSections + pendingItems + pendingBlocks;

    return {
      localVersion,
      remoteVersion: localVersion,
      lastSyncTimestamp,
      hasUnpublishedChanges: totalPending > 0,
      sectionsCount: sections.length,
      itemsCount: items.length,
      blocksCount: blocks.length,
      totalPending
    };
  }

  async publishCurrentConfiguration() {
    const db = this.getLocalDb();
    const currentVersion = (db.global_config.published_version || 1) + 1;
    const timestamp = Date.now();

    // Marcar todo como publicado localmente
    db.sections.forEach(s => { s.isPublished = true; s.version = currentVersion; s.updatedAt = timestamp; });
    db.content_items.forEach(i => { i.isDraft = false; i.updatedAt = timestamp; });
    db.content_blocks.forEach(b => { b.isDraft = false; b.updatedAt = timestamp; });

    db.global_config.published_version = currentVersion;
    db.global_config.last_sync_timestamp = timestamp;

    this.saveLocalDb(db);

    // Publicar a Firestore
    if (this.fb && this.fb.db) {
      try {
        const payload = {
          version: currentVersion,
          updatedAt: new Date(),
          updatedBy: 'Web_PWA_Admin',
          sectionsCount: db.sections.length,
          itemsCount: db.content_items.length,
          blocksCount: db.content_blocks.length,
          isPublished: true
        };

        await this.fb.collection('config').doc('published_config').set(payload);

        // Guardar cada sección, item y bloque
        for (const s of db.sections) await this.fb.collection('sections').doc(s.id).set(s);
        for (const item of db.content_items) await this.fb.collection('content_items').doc(item.id).set(item);
        for (const block of db.content_blocks) await this.fb.collection('content_blocks').doc(block.id).set(block);
        for (const nav of db.navigation_items) await this.fb.collection('navigation_items').doc(nav.id).set(nav);
      } catch (e) {
        console.error('Error publicando a Firestore:', e);
      }
    }

    return {
      success: true,
      version: currentVersion,
      timestamp,
      sectionsCount: db.sections.length,
      itemsCount: db.content_items.length
    };
  }

  // Escuchador en tiempo real de versiones publicadas para la app cliente
  subscribeToPublishedConfig(onUpdated) {
    if (this.fb && this.fb.db) {
      try {
        return this.fb.collection('config').doc('published_config').onSnapshot((snap) => {
          if (snap.exists) {
            const remoteVersion = snap.data().version || 1;
            const currentLocal = this.getLocalDb().global_config.published_version || 1;
            if (remoteVersion > currentLocal) {
              console.log(`Nueva versión remota detectada (v${remoteVersion}). Actualizando...`);
              if (onUpdated) onUpdated(remoteVersion);
            }
          }
        });
      } catch (e) {}
    }
  }
  // Aliases para compatibilidad con admin.js y otros componentes
  async getContentItemsBySection(secId) { return this.getItemsBySection(secId); }
  async saveContentItem(item) { return this.insertItem(item); }
  async deleteContentItem(id) { return this.deleteItemById(id); }
  async getSections() { return this.getAllSections(); }
  async saveSection(sec) { return this.insertSection(sec); }
  async getBlocksByItem(itemId) { return this.getBlocksByItemId(itemId); }
  async getContentBlocksByItem(itemId) { return this.getBlocksByItemId(itemId); }
  async saveBlock(block) { return this.insertBlock(block); }
  async deleteBlock(id) { return this.deleteBlockById(id); }
}

window.coluaRepository = new ColuaRepository();
window.coluaRepo = window.coluaRepository;
