# web/tests/serve.ps1 - Servidor HTTP local embebido en PowerShell
param([int]$Port = 8080)

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "Servidor Web COLUA iniciado en: http://localhost:$Port/" -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener." -ForegroundColor Yellow

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relUrl = $request.Url.LocalPath.TrimStart('/')
        if ($relUrl -eq "" -or $relUrl -eq "/") { $relUrl = "index.html" }
        $filePath = Join-Path $root ($relUrl -replace '/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
