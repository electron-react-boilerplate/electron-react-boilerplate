# ============================================================
#  setup-windows.ps1
#  One-click Windows build script for the Wiring Diagram app.
#
#  Usage (from project root in PowerShell):
#    .\scripts\setup-windows.ps1
#
#  What it does:
#    1. Adds project folder to Windows Defender exclusions
#    2. Cleans old Linux JRE if present
#    3. Runs npm install  (downloads Windows JRE via postinstall)
#    4. Builds the Windows NSIS installer
#    5. Tells you where the .exe is
# ============================================================

$ErrorActionPreference = "Stop"

# ─── Resolve project root (parent of this script's folder) ───────────────────
$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Wiring Diagram - Windows Build Setup" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project folder: $projectDir" -ForegroundColor Gray
Write-Host ""

# ─── Step 1: Windows Defender exclusion ──────────────────────────────────────
Write-Host "[1/4] Adding Windows Defender exclusion..." -ForegroundColor Yellow
try {
    Add-MpPreference -ExclusionPath $projectDir -ErrorAction Stop
    Write-Host "      OK - Defender will no longer lock files in this folder." -ForegroundColor Green
} catch {
    Write-Host "      WARNING: Could not add Defender exclusion." -ForegroundColor Yellow
    Write-Host "      If you see EPERM errors later, run this script as Administrator." -ForegroundColor Yellow
}

# ─── Step 2: Check Node.js ────────────────────────────────────────────────────
Write-Host ""
Write-Host "[2/4] Checking prerequisites..." -ForegroundColor Yellow

$nodeVer = & node --version 2>$null
if (-not $nodeVer) {
    Write-Host "      ERROR: Node.js is not installed." -ForegroundColor Red
    Write-Host "      Download from https://nodejs.org  (choose LTS)" -ForegroundColor Red
    exit 1
}
Write-Host "      Node.js  : $nodeVer" -ForegroundColor Green

$npmVer = & npm --version 2>$null
Write-Host "      npm      : v$npmVer" -ForegroundColor Green

# ─── Remove old Linux JRE if present ─────────────────────────────────────────
$jreDir  = Join-Path $projectDir "java-helper\jre"
$javaBin = Join-Path $jreDir "bin\java.exe"
if ((Test-Path $jreDir) -and (-not (Test-Path $javaBin))) {
    Write-Host "      Removing Linux JRE (wrong platform)..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $jreDir
    Write-Host "      Linux JRE removed." -ForegroundColor Green
}

# ─── Step 3: npm install ──────────────────────────────────────────────────────
Write-Host ""
Write-Host "[3/4] Running npm install (this downloads the Windows JRE ~52 MB)..." -ForegroundColor Yellow
Set-Location $projectDir

& npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: npm install failed (exit code $LASTEXITCODE)." -ForegroundColor Red
    Write-Host "Try running this script as Administrator." -ForegroundColor Red
    exit 1
}
Write-Host "      npm install completed." -ForegroundColor Green

# ─── Verify Windows JRE was downloaded ───────────────────────────────────────
if (-not (Test-Path $javaBin)) {
    Write-Host ""
    Write-Host "WARNING: Windows JRE was not downloaded to java-helper\jre\." -ForegroundColor Yellow
    Write-Host "         Run manually: node scripts\download-jre.js" -ForegroundColor Yellow
} else {
    Write-Host "      Windows JRE OK: $javaBin" -ForegroundColor Green
}

# ─── Step 4: Build ───────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[4/4] Building Windows installer (npm run package)..." -ForegroundColor Yellow
Write-Host "      This may take 3-10 minutes." -ForegroundColor Gray
Write-Host ""

$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"
& npm run package

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Build failed (exit code $LASTEXITCODE)." -ForegroundColor Red
    Write-Host "Check the output above for details." -ForegroundColor Red
    exit 1
}

# ─── Done ─────────────────────────────────────────────────────────────────────
$outDir = Join-Path $projectDir "release\build"
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  BUILD COMPLETE" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Your installer is in:" -ForegroundColor White
Write-Host "  $outDir" -ForegroundColor Cyan
Write-Host ""

# List the exe files
$exeFiles = Get-ChildItem -Path $outDir -Filter "*.exe" -ErrorAction SilentlyContinue
if ($exeFiles) {
    foreach ($f in $exeFiles) {
        $sizeMB = [math]::Round($f.Length / 1MB, 1)
        Write-Host "  $($f.Name)  ($sizeMB MB)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "  Run the .exe installer on any Windows PC." -ForegroundColor White
Write-Host "  No separate Java install is required." -ForegroundColor White
Write-Host ""
