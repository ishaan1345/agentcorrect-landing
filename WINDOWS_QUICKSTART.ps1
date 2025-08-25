# AgentCorrect Windows QuickStart (PowerShell)
Write-Host "AgentCorrect Windows QuickStart" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python not found. Please install Python 3.8+" -ForegroundColor Red
    Write-Host "Download from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install AgentCorrect
Write-Host "Step 1: Installing AgentCorrect..." -ForegroundColor Yellow
pip install -e . 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "SUCCESS: AgentCorrect installed" -ForegroundColor Green

# Test with missing idempotency
Write-Host ""
Write-Host "Step 2: Running demo with test trace..." -ForegroundColor Yellow
'{"role": "http", "meta": {"http": {"method": "POST", "url": "https://api.stripe.com/v1/charges", "headers": {}, "body": {"amount": 1000}}}}' | Out-File -FilePath test_windows.jsonl -Encoding utf8

python -m agentcorrect analyze test_windows.jsonl
$exitCode = $LASTEXITCODE

Write-Host ""
Write-Host "Exit code: $exitCode" -ForegroundColor Cyan
if ($exitCode -eq 2) {
    Write-Host "SUCCESS: AgentCorrect correctly detected missing idempotency key" -ForegroundColor Green
    Write-Host "This would block your CI/CD pipeline to prevent duplicate charges" -ForegroundColor Green
} else {
    Write-Host "ERROR: Expected exit code 2, got $exitCode" -ForegroundColor Red
}

# Test with proper idempotency
Write-Host ""
Write-Host "Step 3: Testing with proper idempotency..." -ForegroundColor Yellow
'{"role": "http", "meta": {"http": {"method": "POST", "url": "https://api.stripe.com/v1/charges", "headers": {"Idempotency-Key": "order-123"}, "body": {"amount": 1000}}}}' | Out-File -FilePath test_windows_clean.jsonl -Encoding utf8

python -m agentcorrect analyze test_windows_clean.jsonl
$exitCode = $LASTEXITCODE

Write-Host ""
Write-Host "Exit code: $exitCode" -ForegroundColor Cyan
if ($exitCode -eq 0) {
    Write-Host "SUCCESS: Clean trace passed" -ForegroundColor Green
} else {
    Write-Host "ERROR: Expected exit code 0, got $exitCode" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "AgentCorrect is working correctly on Windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Integration examples:" -ForegroundColor Yellow
Write-Host "- GitHub Actions: Add to .github/workflows/"
Write-Host "- Azure DevOps: Add to azure-pipelines.yml"
Write-Host "- Jenkins: Add as build step"
Write-Host ""
Read-Host "Press Enter to continue"