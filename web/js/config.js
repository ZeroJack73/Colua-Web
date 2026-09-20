// Configuración de Entornos y Conectores de COLUA Web Digital PWA
const COLUA_CONFIG = {
  appName: 'COLUA Web Digital',
  appVersion: '1.0.0',
  cooperativa: 'COLUA R.L. MICOOPE',
  pbxPrincipal: '7795-7795',
  pbxMarcado: 'tel:77957795',
  whatsappOficial: 'https://wa.me/50277957795',
  portalWebOficial: 'https://coluarl.com.gt',
  
  // Configuración de Firebase (Conectado al proyecto colua-info existente)
  firebase: {
    apiKey: "AIzaSyDiTHf3__ssIQWpO2X2IzuTCwarYk2iETk",
    authDomain: "colua-info.firebaseapp.com",
    projectId: "colua-info",
    storageBucket: "colua-info.firebasestorage.app",
    messagingSenderId: "237659968854",
    appId: "1:237659968854:web:colua-noticias-pwa"
  },

  // Configuración de Supabase Storage (Mismos buckets que Android)
  supabase: {
    url: "https://pieghxvexuywmsvqtpp.supabase.co",
    anonKey: "sb_publishable_-WV9o17lUvq9MITCTt0KiQ_mUhWsBZk",
    buckets: ["imagenes", "colua-noticias", "app-images", "images", "noticias"],
    defaultBucket: "imagenes"
  },

  // Paleta de Colores Institucionales
  theme: {
    primaryNavy: '#173789',
    secondaryGreen: '#59B8A4',
    accentOrange: '#EF8819',
    pink: '#E42A67',
    purple: '#634794',
    gold: '#FFCC00',
    navyLight: '#1D44B3',
    bgLight: '#F8F9FA',
    slateDark: '#1E293B',
    textGrey: '#64748B'
  },

  // Roles y Permisos (RBAC)
  roles: {
    GUEST: 'GUEST',
    MEMBER: 'MEMBER',
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN'
  },

  // Lista de PBX Oficiales
  pbxLines: [
    { label: "PBX Central San Juan Argueta", number: "7795-7795" },
    { label: "Agencia Central", number: "7795-7722" },
    { label: "Plaza COLUA Sololá", number: "7762-3180" },
    { label: "Agencia Panajachel", number: "7795-7718" },
    { label: "Agencia Santiago Atitlán", number: "7795-7720" },
    { label: "Agencia Santa Cruz del Quiché", number: "7795-7730" },
    { label: "Agencia La Esperanza Totonicapán", number: "7795-7714" },
    { label: "Agencia Santo Tomás La Unión", number: "7872-8526" }
  ]
};

// Exportar globalmente para consumo modular
if (typeof window !== 'undefined') {
  window.COLUA_CONFIG = COLUA_CONFIG;
}
