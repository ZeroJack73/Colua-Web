$shell = New-Object -ComObject WScript.Shell
$folders = @(
    [System.Environment]::GetFolderPath('Desktop'),
    [System.Environment]::GetFolderPath('CommonDesktopDirectory'),
    [System.Environment]::GetFolderPath('Programs'),
    [System.Environment]::GetFolderPath('CommonPrograms')
)

foreach ($f in $folders) {
    if (Test-Path $f) {
        Get-ChildItem -Path $f -Recurse -Filter "*.lnk" -ErrorAction SilentlyContinue | ForEach-Object {
            try {
                $target = $shell.CreateShortcut($_.FullName)
                if ($_.Name -match 'COLUA' -or $target.TargetPath -match 'COLUA' -or $target.Arguments -match 'COLUA' -or $target.Arguments -match '5500') {
                    Write-Host "LNK: $($_.FullName)"
                    Write-Host "   TargetPath:   $($target.TargetPath)"
                    Write-Host "   Arguments:    $($target.Arguments)"
                    Write-Host "   IconLocation: $($target.IconLocation)"
                    Write-Host "----------------------------------"
                }
            } catch {}
        }
    }
}
