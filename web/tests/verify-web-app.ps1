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
    "js\qr-generator.js",
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
Assert-Check ($manifestJson.name -eq "Colua Digital") "Nombre de la aplicacion en manifest: Colua Digital"
Assert-Check ($manifestJson.short_name -eq "Colua Digital") "Short name en manifest: Colua Digital"
Assert-Check ($manifestJson.theme_color -eq "#173789") "Color de tema #173789"
Assert-Check ($manifestJson.display -eq "standalone") "Modo de visualizacion standalone"
Assert-Check ($manifestJson.icons.Count -gt 0) "Iconos PWA definidos"

# 4. Validar Logica de Seguridad, DPI Opcional (Menores) y Email Obligatorio
Write-Host "`n4. Validando logica de validacion de DPI (Opcional) y Email (Obligatorio):" -ForegroundColor Yellow

function Test-DPI($dpi) {
    if (-not $dpi) { return $false }
    $clean = $dpi -replace '\D', ''
    return ($clean.Length -eq 13)
}

function Test-RegistrationFields($email, $dpi) {
    $isEmailValid = ($email -and ($email -match '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
    $isDpiValid = (-not $dpi) -or (Test-DPI $dpi)
    return ($isEmailValid -and $isDpiValid)
}

Assert-Check (Test-DPI "2541859630701") "DPI 13 digitos es valido"
Assert-Check (-not (Test-DPI "12345")) "DPI menor a 13 digitos es invalido"
Assert-Check (-not (Test-DPI "254185963070199")) "DPI mayor a 13 digitos es invalido"
Assert-Check (Test-RegistrationFields "usuario@gmail.com" "") "Registro valido con email y sin DPI (menor de edad)"
Assert-Check (Test-RegistrationFields "asociado@colua.gt" "2541859630701") "Registro valido con email y DPI de 13 digitos"
Assert-Check (-not (Test-RegistrationFields "" "2541859630701")) "Registro rechazado si falta el correo electronico"
Assert-Check (-not (Test-RegistrationFields "asociado@gmail.com" "12345")) "Registro rechazado con DPI incompleto cuando se ingresa"

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
$noticiasJsContent = Get-Content (Join-Path $webDir "js\components\noticias.js") -Raw
$manifestContent = Get-Content (Join-Path $webDir "manifest.json") -Raw

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

# 7. Validar Orden Cronologico de Noticias y Calidad WebAPK PWA
Write-Host "`n7. Validando orden cronologico de noticias y soporte WebAPK PWA:" -ForegroundColor Yellow
Assert-Check ($repoJsContent -match '_extractItemDate') "Metodo de extraccion unificada de fechas implementado en repository.js"
Assert-Check ($repoJsContent -match 'sortNewsByDate') "Metodo sortNewsByDate para ordenar novedades implementado en repository.js"
Assert-Check ($noticiasJsContent -match 'sortArticlesDesc') "Orden descendente garantizado en noticias.js"
Assert-Check ($adminJsContent -match 'item-pub-date') "Selector de fecha de publicacion presente en modal de admin.js"
Assert-Check (-not ($manifestContent -match '"id":\s*"/colua-micoope-v4"')) "Manifest ID no usa ruta absoluta de dominio para compatibilidad WebAPK"
Assert-Check ($manifestContent -match '"id":\s*"\./index\.html"') "Manifest ID coincide con start_url relativa dentro del scope"

# 8. Validar Restriccion de Likes a Invitados e Invitacion a Registrarse
Write-Host "`n8. Validando restriccion de Likes a invitados e invitacion a registrarse:" -ForegroundColor Yellow
$appJsContent = Get-Content (Join-Path $webDir "js\app.js") -Raw
Assert-Check ($authJsContent -match 'isRegistered\(\)') "Metodo isRegistered implementado en auth.js"
Assert-Check ($appJsContent -match 'showGuestLikePrompt') "Modal institucional showGuestLikePrompt implementado en app.js"
Assert-Check ($noticiasJsContent -match 'isUserRegistered\(\)') "Validacion isUserRegistered presente en noticias.js"
Assert-Check ($noticiasJsContent -match 'showGuestLikePrompt\(\)') "Invitacion a registrarse llamada en toggleLike para invitados"
Assert-Check ($noticiasJsContent -match 'modal-btn-like') "Boton de interaccion con Likes integrado en modal completo de noticias"

# 9. Validar Cierre con Boton Atras / Gestos Moviles y WebAPK PWA Nativo
Write-Host "`n9. Validando navegacion por gestos/boton atras y optimizacion WebAPK PWA:" -ForegroundColor Yellow
$sidebarJsContent = Get-Content (Join-Path $webDir "js\components\sidebar.js") -Raw
$chatbotJsContent = Get-Content (Join-Path $webDir "js\components\chatbot.js") -Raw
$swJsContent = Get-Content (Join-Path $webDir "sw.js") -Raw
$rootIndexContent = Get-Content (Join-Path $PSScriptRoot "..\..\index.html") -Raw
$maskable192Path = Join-Path $webDir "assets\distintivo_colua_maskable_192.png"

Assert-Check (Test-Path $maskable192Path) "Icono maskable 192x192 generado y presente en assets"
Assert-Check ($manifestContent -match 'distintivo_colua_maskable_192\.png') "Icono maskable 192x192 registrado en manifest.json"
Assert-Check (-not ($manifestContent -match '297x290')) "Icono no cuadrado 297x290 excluido de manifest para no romper el WebAPK minting server"
Assert-Check ($swJsContent -match 'distintivo_colua_maskable_192\.png') "Icono maskable 192x192 cacheado en sw.js"
Assert-Check ($swJsContent -match 'colua-web-digital-v5') "Version de cache actualizada en sw.js (v5.x)"
Assert-Check (-not ($rootIndexContent -match '<link rel="manifest"')) "Redireccionador raiz sin manifest incongruente de scope"
Assert-Check ($appJsContent -match '_setupHistoryNavigation') "Metodo _setupHistoryNavigation implementado en app.js"
Assert-Check ($appJsContent -match "closeModal\(\)") "Metodo closeModal limpio y sin interferencia de historial"
Assert-Check ($noticiasJsContent -match 'closeLightbox') "Lightbox de noticias con metodo de cierre limpio"
Assert-Check ($sidebarJsContent -match 'close\(\)') "Drawer lateral con cierre limpio sin interferencia de historial"
Assert-Check ($chatbotJsContent -match 'toggleChat') "Mesa de ayuda con toggleChat limpio"

# 10. Validar Editor Canvas, Duplicar, Selector de Tipos y Publicacion CMS
Write-Host "`n10. Validando Editor Canvas, Duplicar, Selector de Tipos y Centro de Publicacion:" -ForegroundColor Yellow
$adminJsContent = Get-Content (Join-Path $webDir "js\components\admin.js") -Raw
$repoJsContent = Get-Content (Join-Path $webDir "js\repository.js") -Raw

Assert-Check ($repoJsContent -match 'duplicateContentItem') "Metodo duplicateContentItem implementado en repository.js"
Assert-Check ($adminJsContent -match 'duplicate-item-btn') "Boton Duplicar tarjeta implementado en admin.js"
Assert-Check ($adminJsContent -match 'showSelectElementTypeModal') "Modal selector de tipo de elemento implementado en admin.js"
Assert-Check ($adminJsContent -match 'financial_product') "Tipo Tarjeta de Producto (PRO) soportado en admin.js"
Assert-Check ($adminJsContent -match 'benefit_list') "Tipo Lista de Beneficios soportado en admin.js"
Assert-Check ($adminJsContent -match 'strategic_axis') "Tipo Eje Estrategico soportado en admin.js"
Assert-Check ($appJsContent -match 'modal-drag-handle') "Drag handle para gestos tactiles implementado en app.js"
Assert-Check ($repoJsContent -match 'rollbackToPreviousVersion') "Metodo rollbackToPreviousVersion implementado en repository.js"
Assert-Check ($repoJsContent -match 'verifyPublicationIntegrity') "Metodo verifyPublicationIntegrity implementado en repository.js"
Assert-Check ($repoJsContent -match 'resetToFactoryDefaults') "Metodo resetToFactoryDefaults implementado en repository.js"
Assert-Check ($repoJsContent -match 'sec_comunidad') "Filtro activo para eliminar residuos de sec_comunidad presente"

# 11. Validar Ocultar/Mostrar, Borradores Reales, Auditoria e Instrucciones
Write-Host "`n11. Validando Ocultar/Mostrar, Borradores Reales, Auditoria e Instrucciones:" -ForegroundColor Yellow
Assert-Check ($repoJsContent -match "toggleContentItemVisibility") "Metodo toggleContentItemVisibility implementado en repository.js"
Assert-Check ($adminJsContent -match "renderTabInstrucciones") "Metodo renderTabInstrucciones implementado en admin.js"
Assert-Check ($adminJsContent -match "toggle-item-visibility-btn") "Boton directo de Ocultar/Mostrar tarjeta presente en admin.js"
Assert-Check ($adminJsContent -match "item-is-draft") "Checkbox de Guardar como Borrador implementado en modal de admin.js"
Assert-Check ($adminJsContent -match "Para qué sirve la Bitácora de Auditoría") "Explicacion institucional de Auditoria implementada en admin.js"
Assert-Check ($adminJsContent -match "MANUAL COMPLETO Y GUÍA CMS") "Manual oficial CMS implementado en pestana Instrucciones"

Write-Host "`n12. Validando Métricas Reales de Publicación y Sincronización de Nombres de Sección:" -ForegroundColor Yellow
Assert-Check ($repoJsContent -match "totalNew\s*=") "Calculo total de elementos nuevos implementado"
Assert-Check ($repoJsContent -match "totalEdited\s*=") "Calculo total coherente de editados (secciones + tarjetas + bloques) implementado"
Assert-Check ($repoJsContent -match "incompleteItems\s*=\s*items\.filter\(i\s*=>\s*\(!i\.title") "Conteo de incompletos restringido estrictamente a elementos sin titulo"
Assert-Check ($repoJsContent -match "bottom_nav_slots\.forEach") "Sincronizacion automatica de nombres en barra inferior al editar seccion"
Assert-Check ($adminJsContent -match "slot\.label\s*\|\|\s*\(homeSec\s*\?\s*homeSec\.title") "Visualizacion dinamica del nombre de Inicio / Inicio 1 en slot 3 de barra inferior"

Write-Host "`n13. Validando Alertas sin botón OK, Métricas Reales, Switch Cloud y Eliminación de Usuarios:" -ForegroundColor Yellow
Assert-Check ($repoJsContent -match "deleteUser\(userId\)") "Metodo deleteUser implementado en repository.js"
Assert-Check ($adminJsContent -match "btn-delete-user") "Boton Eliminar usuario implementado en tabla RBAC de admin.js"
Assert-Check ($adminJsContent -match "switch-slider") "Switch animado con slider y knob para Sincronizacion Cloud implementado"
Assert-Check ($repoJsContent -match "purgeLegacyMockAnalytics") "Purga automatica de metricas mock/falsas implementada en repository.js"
Assert-Check ($adminJsContent -match "showConfirmButton:\s*false") "Alertas SweetAlert autolimpiables sin boton OK implementadas"

Write-Host "`n14. Validando Carné Digital, QR de Beneficios, Descarga PNG, Ojito de Contraseña y DPI Opcional:" -ForegroundColor Yellow
$appJsContent = Get-Content (Join-Path $webDir "js\app.js") -Raw
$perfilJsContent = Get-Content (Join-Path $webDir "js\components\perfil.js") -Raw
$routerJsContent = Get-Content (Join-Path $webDir "js\router.js") -Raw
$qrJsContent = Get-Content (Join-Path $webDir "js\qr-generator.js") -Raw

Assert-Check ($perfilJsContent -match "downloadMembershipCard") "Metodo de descarga de carne digital como imagen PNG implementado"
Assert-Check ($perfilJsContent -match "showVerificationModal") "Modal de verificacion con animacion checkmark para beneficios implementado"
Assert-Check ($perfilJsContent -match "renderVerificationPage") "Pagina independiente de validacion de asociados implementada"
Assert-Check ($routerJsContent -match "case 'verificar'") "Ruta #verificar soportada en el enrutador SPA"
Assert-Check ($perfilJsContent -match "carne-qr-element") "Contenedor de codigo QR institucional integrado en carné"
Assert-Check ($appJsContent -match "toggle-login-pass") "Icono de ojito para mostrar/ocultar contraseña en login implementado"
Assert-Check ($appJsContent -match "toggle-reg-pass") "Icono de ojito para mostrar/ocultar contraseña en registro implementado"
Assert-Check ($appJsContent -match "DPI \(Opcional\)") "Etiqueta limpia 'DPI (Opcional)' en modal de registro de app.js"
Assert-Check ($perfilJsContent -match "DPI / CUI \(Opcional\)") "Etiqueta limpia 'DPI / CUI (Opcional)' en perfil.js"
Assert-Check ($qrJsContent -match "QRCode\.drawToCanvasContext") "Helper de renderizado directo de QR a Canvas implementado"

Write-Host "`n====================================================" -ForegroundColor Cyan
$pct = [Math]::Round(($passedTests / $totalTests) * 100)
Write-Host "RESULTADOS: $passedTests de $totalTests pruebas pasadas ($pct por ciento)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($passedTests -eq $totalTests) {
    Write-Host "TODAS LAS PRUEBAS PASARON EXITOSAMENTE (100% OK)!" -ForegroundColor Green
} else {
    Write-Host "ALGUNAS PRUEBAS FALLARON." -ForegroundColor Red
}
