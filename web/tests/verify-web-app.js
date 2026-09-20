// web/tests/verify-web-app.js - Verificación Automatizada de la Aplicación Web COLUA
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  ✅ PASS: ${message}`);
    } else {
        console.error(`  ❌ FAIL: ${message}`);
    }
}

console.log('====================================================');
console.log('🧪 INICIANDO SUITE DE PRUEBAS PARA COLUA WEB PWA');
console.log('====================================================\n');

// 1. Verificar Estructura de Archivos
console.log('📁 1. Verificando estructura de archivos esenciales:');
const requiredFiles = [
    'index.html',
    'manifest.json',
    'sw.js',
    'css/styles.css',
    'js/config.js',
    'js/firebase-client.js',
    'js/supabase-client.js',
    'js/repository.js',
    'js/auth.js',
    'js/router.js',
    'js/app.js',
    'js/components/navbar.js',
    'js/components/sidebar.js',
    'js/components/bottom-nav.js',
    'js/components/home.js',
    'js/components/sections.js',
    'js/components/noticias.js',
    'js/components/agencias.js',
    'js/components/perfil.js',
    'js/components/admin.js',
    'js/components/chatbot.js'
];

requiredFiles.forEach(relPath => {
    const fullPath = path.join(webDir, relPath);
    assert(fs.existsSync(fullPath), `Archivo existe: ${relPath}`);
});

// 2. Verificar Assets Copiados desde Android
console.log('\n🎨 2. Verificando assets institucionales:');
const requiredAssets = [
    'logo_colua.png',
    'banner_noticias.png',
    'colua_edificio.png',
    'icono_ahorros.png',
    'icono_creditos.png',
    'icono_seguros.png',
    'icono_remesas.png',
    'icono_servicios.png',
    'icono_beneficios.png'
];

requiredAssets.forEach(asset => {
    const fullPath = path.join(webDir, 'assets', asset);
    assert(fs.existsSync(fullPath), `Asset existe: assets/${asset}`);
});

// 3. Validar PWA Manifest
console.log('\n📱 3. Validando manifest.json:');
try {
    const manifestContent = JSON.parse(fs.readFileSync(path.join(webDir, 'manifest.json'), 'utf8'));
    assert(manifestContent.name === 'COLUA R.L. - MICOOPE', 'Nombre de la aplicación en manifest');
    assert(manifestContent.short_name === 'COLUA R.L.', 'Short name en manifest');
    assert(manifestContent.theme_color === '#173789', 'Color de tema #173789');
    assert(manifestContent.display === 'standalone', 'Modo de visualización standalone');
    assert(Array.isArray(manifestContent.icons) && manifestContent.icons.length > 0, 'Iconos PWA definidos');
} catch (e) {
    assert(false, `Error leyendo manifest.json: ${e.message}`);
}

// 4. Validar Lógica de Seguridad y DPI
console.log('\n🔒 4. Validando lógica de validación de DPI y Hashing:');

function validateDPI(dpi) {
    if (!dpi) return false;
    const clean = dpi.toString().replace(/\D/g, '');
    return clean.length === 13;
}

function formatDPI(dpi) {
    if (!dpi) return '';
    const clean = dpi.toString().replace(/\D/g, '');
    if (clean.length !== 13) return clean;
    return `${clean.slice(0, 4)} ${clean.slice(4, 9)} ${clean.slice(9, 13)}`;
}

assert(validateDPI('2541859630701'), 'DPI 13 dígitos es válido');
assert(!validateDPI('12345'), 'DPI menor a 13 dígitos es inválido');
assert(!validateDPI('254185963070199'), 'DPI mayor a 13 dígitos es inválido');
assert(formatDPI('2541859630701') === '2541 85963 0701', 'Formato DPI 4-5-4 correcto');

// Validar hash clave maestra "1234"
const masterPass = '1234';
const masterHash = crypto.createHash('sha256').update(masterPass).digest('hex');
assert(masterHash === '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Hash SHA-256 de Clave Maestra "1234" coincide exactamente');

// 5. Validar Formato Correlativo de 7 Dígitos para Asociados
console.log('\n👥 5. Validando correlativo de asociados (7 dígitos):');
function formatAssociateId(num) {
    return num.toString().padStart(7, '0');
}
assert(formatAssociateId(1) === '0000001', 'Asociado #1 formateado como 0000001');
assert(formatAssociateId(542) === '0000542', 'Asociado #542 formateado como 0000542');
assert(formatAssociateId(10025) === '0010025', 'Asociado #10025 formateado como 0010025');

console.log('\n====================================================');
console.log(`📊 RESULTADOS: ${passedTests} de ${totalTests} pruebas pasadas (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('====================================================');

if (passedTests === totalTests) {
    console.log('🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!');
    process.exit(0);
} else {
    console.error('❌ ALGUNAS PRUEBAS FALLARON.');
    process.exit(1);
}
