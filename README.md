# COLUA Web Digital

Plataforma web oficial y Progressive Web App (PWA) de **COLUA R.L. MICOOPE** — la Cooperativa de Ahorro y Crédito más inclusiva del occidente de Guatemala.

## Identidad

- **Nombre de la plataforma:** COLUA Web Digital
- **Organización:** Cooperativa de Ahorro y Crédito COLUA R.L. (Sistema MICOOPE)
- **Propósito:** Versión web moderna, minimalista y accesible desde cualquier dispositivo (móvil, tablet, desktop) que centraliza los servicios institucionales, información financiera cooperativa, red de agencias, simuladores en vivo y herramientas administrativas en tiempo real mediante un panel CMS integrado.

> **Aviso Institucional:** Esta plataforma tiene carácter **informativo y de orientación cooperativa**. No constituye ni opera como banca móvil transaccional directa; no ejecuta transferencias interbancarias ni consulta de saldos en tiempo real (para gestiones de banca digital se integra enlace directo seguro a *MICOOPE en Línea*).

---

## Estructura del Proyecto

```
/
├── web/                        ← Aplicación Web PWA (raíz de publicación)
│   ├── index.html              ← SPA Shell y Home pre-renderizada
│   ├── manifest.json           ← Configuración PWA instalable y multi-resolución
│   ├── sw.js                   ← Service Worker con estrategia de caché offline
│   ├── favicon.ico             ← Favicon corporativo
│   ├── css/
│   │   └── styles.css          ← Sistema de diseño minimalista COLUA MICOOPE
│   ├── js/
│   │   ├── config.js           ← Configuración de conectores Firebase y Supabase
│   │   ├── firebase-client.js  ← Firebase Auth + Firestore con persistencia offline
│   │   ├── supabase-client.js  ← Supabase Storage y optimización de medios
│   │   ├── repository.js       ← Capa de datos y persistencia (CRUD completo)
│   │   ├── auth.js             ← Gestión de sesiones, validación DPI, roles y SHA-256
│   │   ├── router.js           ← Enrutador SPA hash-based reactivo
│   │   ├── app.js              ← Bootstrap principal de la aplicación y modales
│   │   └── components/
│   │       ├── navbar.js       ← Barra de navegación superior de dos niveles
│   │       ├── sidebar.js      ← Menú lateral deslizable (responsive)
│   │       ├── bottom-nav.js   ← Barra inferior de navegación rápida para móviles
│   │       ├── home.js         ← Vista principal con cuadrícula 3x3 y simuladores
│   │       ├── sections.js     ← Motor de secciones (Ahorros, Créditos, Sostenibilidad, etc.)
│   │       ├── noticias.js     ← Noticias y comunicados institucionales
│   │       ├── agencias.js     ← Red de 25+ agencias con geolocalización y PBX
│   │       ├── perfil.js       ← Perfil y carné digital de asociado COLUA
│   │       ├── admin.js        ← Portal Administrativo CMS con RBAC y doble factor
│   │       └── chatbot.js      ← Asistente virtual FAQ interactivo COLUA
│   ├── assets/                 ← Recursos gráficos institucionales optimizados (84 archivos web)
│   └── tests/
│       ├── verify-web-app.ps1  ← Suite de pruebas automatizadas (53 tests de integridad)
│       └── serve.ps1           ← Servidor HTTP local ligero en PowerShell
├── firestore.rules             ← Reglas de seguridad y control de acceso Firestore
├── .gitignore
└── README.md
```

---

## Funcionalidades y Módulos

| Módulo | Descripción y Alcance |
|---|---|
| **Inicio (Home)** | Cuadrícula minimalista 3x3 de áreas de gestión, banners PBX y acceso a banca digital. |
| **Simulador Financiero** | Calculadora interactiva en vivo para cuotas de crédito y rendimiento de ahorro a plazo fijo. |
| **Cuentas de Ahorro** | Aportaciones (Adulto e Infanto-Juvenil), Ahorro Disponible, Programado y Plazo Fijo con tasas transparentes. |
| **Líneas de Crédito** | Crédito Productivo, Consumo, Vivienda y Vehículo con póliza de deudores incluida. |
| **Seguros Columna** | CV Especial, Vida Saludable, Accidentes Edad de Oro, Seguro de Cáncer, Infanto Juvenil y de Manejo. |
| **Remesas Familiares** | Red de remesadoras aliadas internacionales con depósito directo a cuenta y asistencia médica/funeraria. |
| **Tus 6 Beneficios** | Coberturas solidarias: Hospitalización, Apoyo Quirúrgico, Servicio Funerario, Seguro de Ahorrantes, Deudores y Beneficio de Oro. |
| **Sostenibilidad Cooperativa** | 4 Ejes estratégicos: Educación y Formación, Empleabilidad y Empresarialidad, Desarrollo Comunitario y ADN COLUA, Proyectos y Alianzas. |
| **Nosotros** | Presencia y trato humano, los 4 Valores Cooperativos (Integridad, Cooperación, Responsabilidad y Enfoque al Asociado) y galería de arraigo. |
| **Noticias & Comunidad** | Boletines informativos, asambleas, talleres, buscador y filtros temporales. |
| **Red de Agencias** | Directorio de 25+ agencias en Sololá, Quiché, Totonicapán y Suchitepéquez con llamada directa y mapa. |
| **Perfil y Carné Digital** | Carné oficial de asociado COLUA con correlativo de 7 dígitos y validación de DPI. |
| **Portal Administrativo (CMS)** | Gestión de pantallas dinámicas, control de roles (RBAC), auditoría y publicación de cambios. |
| **Asistente Virtual (Chatbot)** | Respuestas rápidas a consultas comunes sobre requisitos, tasas, horarios y ubicaciones. |
| **PWA & Modo Offline** | Instalable en Android, iOS y Windows/Mac con Service Worker y caché local. |

---

## Seguridad y Acceso de Usuarios

| Rol / Perfil | Identificación | Mecanismo de Seguridad |
|---|---|---|
| **Invitado** | Libre navegación | Identificador temporal seguro `guest_{uuid}` |
| **Asociado** | DPI (13 dígitos) | Contraseña local y carné digital con correlativo (`0000001` - `9999999`) |
| **Administrador / Manager** | Credenciales autorizadas | Flujo de seguridad en dos pasos (`gateStep`), Clave Universal con hashing SHA-256 |
| **SuperAdmin** | `coluarl@gmail.com` | Auditoría de acciones, gestión de roles y clave maestra encriptada |

---

## Stack Tecnológico

- **Frontend Core:** HTML5 semántico, CSS3 Vanilla (variables CSS y sistema de diseño propio), JavaScript moderno (ES6+ modular).
- **Tipografía:** Google Fonts — *Poppins* (400, 500, 600, 700, 800).
- **Almacenamiento y Backend:** Firebase Firestore (`colua-info`), Firebase Authentication, Supabase Storage.
- **PWA:** Service Worker (`sw.js`) con estrategia *Network-First* con respaldo en caché estática y *Web App Manifest*.
- **Alertas y Diálogos:** SweetAlert2 para confirmaciones institucionales.

---

## Ejecución y Pruebas en Entorno Local

### 1. Iniciar servidor local
Para levantar la aplicación web de manera local:

```powershell
powershell -ExecutionPolicy Bypass -File "web\tests\serve.ps1" -Port 8080
```
Luego abre en tu navegador: [http://localhost:8080/](http://localhost:8080/)

### 2. Ejecutar suite de pruebas de integridad
Para validar la arquitectura de archivos, assets institucionales, correlativos de asociados, manifest y seguridad:

```powershell
powershell -ExecutionPolicy Bypass -File "web\tests\verify-web-app.ps1"
```
*(Resultado esperado: 53 de 53 pruebas pasadas - 100%)*

---

## Despliegue en Producción

La carpeta `web/` constituye la raíz estática lista para producción, compatible con cualquier proveedor de alojamiento moderno:
- **Firebase Hosting:** `firebase deploy --only hosting` (con `web` configurado en `firebase.json`)
- **Vercel / Netlify / GitHub Pages:** Seleccionar la carpeta `web` como directorio de publicación.

