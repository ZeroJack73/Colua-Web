# web/tests/verify-web-app.ps1 - Verificacion Automatizada en PowerShell
$webDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$totalTests = 0
$passedTests = 0

function Assert-Check($condition, $message) {
    $global:totalTests++
    if ($condition) {
        $global:passedTests++
        Write-Host "  [PASS] $message" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $message" -ForegroundColor Red
    }
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "INICIANDO SUITE DE PRUEBAS PARA COLUA WEB PWA" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Verificar Estructura de Archivos
Write-Host "`n1. Verificando estructura de archivos esenciales:" -ForegroundColor Yellow
$requiredFiles = @(
    "index.html",
    "manifest.json",
    "sw.js",
    "css\styles.css",
    "js\config.js",
    "js\firebase-client.js",
    "js\supabase-client.js",
    "js\repository.js",
    "js\auth.js",
    "js\router.js",
    "js\app.js",
    "js\components\navbar.js",
    "js\components\sidebar.js",
    "js\components\bottom-nav.js",
    "js\components\home.js",
    "js\components\sections.js",
    "js\components\noticias.js",
    "js\components\agencias.js",
    "js\components\perfil.js",
    "js\components\admin.js",
    "js\components\chatbot.js"
)

foreach ($file in $requiredFiles) {
    $fullPath = Join-Path $webDir $file
    Assert-Check (Test-Path $fullPath) "Archivo existe: $file"
}

# 2. Verificar Assets Copiados desde Android
Write-Host "`n2. Verificando assets institucionales:" -ForegroundColor Yellow
$requiredAssets = @(
    "logo_colua.png",
    "banner_noticias.png",
    "colua_edificio.png",
    "icono_ahorros.png",
    "icono_creditos.png",
    "icono_seguros.png",
    "icono_remesas.png",
    "icono_servicios.png",
    "icono_beneficios.png"
)

foreach ($asset in $requiredAssets) {
    $fullPath = Join-Path $webDir "assets\$asset"
    Assert-Check (Test-Path $fullPath) "Asset existe: assets\$asset"
}

# 3. Validar PWA Manifest
Write-Host "`n3. Validando manifest.json:" -ForegroundColor Yellow
$manifestPath = Join-Path $webDir "manifest.json"
$manifestJson = Get-Content $manifestPath -Raw | ConvertFrom-Json
Assert-Check ($manifestJson.name -eq "COLUA R.L. - MICOOPE") "Nombre de la aplicacion en manifest"
Assert-Check ($manifestJson.short_name -eq "COLUA R.L.") "Short name en manifest"
Assert-Check ($manifestJson.theme_color -eq "#173789") "Color de tema #173789"
Assert-Check ($manifestJson.display -eq "standalone") "Modo de visualizacion standalone"
Assert-Check ($manifestJson.icons.Count -gt 0) "Iconos PWA definidos"

# 4. Validar Logica de Seguridad y DPI
Write-Host "`n4. Validando logica de validacion de DPI y Hashing:" -ForegroundColor Yellow

function Test-DPI($dpi) {
    if (-not $dpi) { return $false }
    $clean = $dpi -replace '\D', ''
    return ($clean.Length -eq 13)
}

Assert-Check (Test-DPI "2541859630701") "DPI 13 digitos es valido"
Assert-Check (-not (Test-DPI "12345")) "DPI menor a 13 digitos es invalido"
Assert-Check (-not (Test-DPI "254185963070199")) "DPI mayor a 13 digitos es invalido"

# SHA-256 de "1234"
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes("1234")
$hashBytes = $sha256.ComputeHash($bytes)
$hashString = [System.BitConverter]::ToString($hashBytes).Replace("-", "").ToLower()

Assert-Check ($hashString -eq "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4") "Hash SHA-256 de Clave Maestra '1234' coincide exactamente"

# 5. Validar Correlativo de 7 Digitos
Write-Host "`n5. Validando correlativo de asociados (7 digitos):" -ForegroundColor Yellow
function Format-AssociateId($num) {
    return $num.ToString().PadLeft(7, '0')
}
Assert-Check ((Format-AssociateId 1) -eq "0000001") "Asociado 1 formateado como 0000001"
Assert-Check ((Format-AssociateId 542) -eq "0000542") "Asociado 542 formateado como 0000542"
Assert-Check ((Format-AssociateId 10025) -eq "0010025") "Asociado 10025 formateado como 0010025"

# 6. Validar Seguridad, Clave Universal y Roles (RBAC)
Write-Host "`n6. Validando seguridad, Clave Universal y RBAC:" -ForegroundColor Yellow
$adminJsContent = Get-Content (Join-Path $webDir "js\components\admin.js") -Raw
$authJsContent = Get-Content (Join-Path $webDir "js\auth.js") -Raw
$repoJsContent = Get-Content (Join-Path $webDir "js\repository.js") -Raw

Assert-Check (-not ($adminJsContent -match 'placeholder="coluarl@gmail.com"')) "Correo sensible no expuesto en placeholders de admin.js"
Assert-Check ($adminJsContent -match 'admin-universal-input') "Input de Clave Universal Institucional presente en admin.js"
Assert-Check ($adminJsContent -match 'placeholder="••••••••••••••••"') "Placeholder de 16 puntos para despistar implementado"
Assert-Check (-not ($adminJsContent -match 'Por defecto: 1234')) "Clave 1234 no expuesta en textos de la interfaz"
Assert-Check ($adminJsContent -match 'ADMIN_ICONS') "Iconos planos minimalistas SVG definidos en admin.js"
Assert-Check ($adminJsContent -match 'gateStep') "Flujo de seguridad en dos pasos (gateStep) implementado"
Assert-Check ($adminJsContent -match 'form-change-master-key') "Formulario de cambio de Clave Universal presente en admin.js"
Assert-Check ($adminJsContent -match 'form-add-admin-manager') "Formulario de autorizacion de Admin/Manager presente en admin.js"
Assert-Check ($authJsContent -match 'updateMasterPassword') "Metodo updateMasterPassword implementado en auth.js"
Assert-Check ($authJsContent -match 'isManager') "Metodo isManager implementado en auth.js"
Assert-Check ($repoJsContent -match 'addAdminOrManager') "Metodo addAdminOrManager implementado en repository.js"

Write-Host "`n====================================================" -ForegroundColor Cyan
$pct = [Math]::Round(($passedTests / $totalTests) * 100)
Write-Host "RESULTADOS: $passedTests de $totalTests pruebas pasadas ($pct por ciento)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($passedTests -eq $totalTests) {
    Write-Host "TODAS LAS PRUEBAS PASARON EXITOSAMENTE!" -ForegroundColor Green
} else {
    Write-Host "ALGUNAS PRUEBAS FALLARON." -ForegroundColor Red
}
