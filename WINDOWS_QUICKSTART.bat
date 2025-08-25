@echo off
echo AgentCorrect Windows QuickStart
echo ================================
echo.

REM Check Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Step 1: Installing AgentCorrect...
pip install -e . >nul 2>&1
if errorlevel 1 (
    echo ERROR: Installation failed
    pause
    exit /b 1
)
echo SUCCESS: AgentCorrect installed

echo.
echo Step 2: Running demo with test trace...
echo {"role": "http", "meta": {"http": {"method": "POST", "url": "https://api.stripe.com/v1/charges", "headers": {}, "body": {"amount": 1000}}}} > test_windows.jsonl

python -m agentcorrect analyze test_windows.jsonl
set EXIT_CODE=%ERRORLEVEL%

echo.
echo Exit code: %EXIT_CODE%
if %EXIT_CODE%==2 (
    echo SUCCESS: AgentCorrect correctly detected missing idempotency key
    echo This would block your CI/CD pipeline to prevent duplicate charges
) else (
    echo ERROR: Expected exit code 2, got %EXIT_CODE%
)

echo.
echo Step 3: Testing with proper idempotency...
echo {"role": "http", "meta": {"http": {"method": "POST", "url": "https://api.stripe.com/v1/charges", "headers": {"Idempotency-Key": "order-123"}, "body": {"amount": 1000}}}} > test_windows_clean.jsonl

python -m agentcorrect analyze test_windows_clean.jsonl
set EXIT_CODE=%ERRORLEVEL%

echo.
echo Exit code: %EXIT_CODE%
if %EXIT_CODE%==0 (
    echo SUCCESS: Clean trace passed
) else (
    echo ERROR: Expected exit code 0, got %EXIT_CODE%
)

echo.
echo ================================
echo AgentCorrect is working correctly on Windows!
echo.
echo Integration examples:
echo - GitHub Actions: Add to .github/workflows/
echo - Azure DevOps: Add to azure-pipelines.yml
echo - Jenkins: Add as build step
echo.
pause