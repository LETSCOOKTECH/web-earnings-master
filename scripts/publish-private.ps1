param([string]$Repository = 'LETSCOOKTECH/web-earnings-master')
$ErrorActionPreference = 'Stop'
Set-Location (Resolve-Path (Join-Path $PSScriptRoot '..'))
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Install GitHub CLI from https://cli.github.com and run gh auth login.' }
& gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'GitHub CLI not authenticated. Run gh auth login.' }
& gh repo view $Repository 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { throw "Refusing to overwrite existing repository: $Repository" }
if (-not (Test-Path .git)) { & git init -b main; if ($LASTEXITCODE -ne 0) { throw 'git init failed' } }
& git log -1 --format='%H' 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  & git add .
  & git -c 'user.name=LetsCookTech' -c 'user.email=295086907+LETSCOOKTECH@users.noreply.github.com' commit -m 'Create Web Earnings Master Codex skills'
  if ($LASTEXITCODE -ne 0) { throw 'git commit failed' }
}
& gh repo create $Repository --private --source=. --remote=origin --push
if ($LASTEXITCODE -ne 0) { throw 'Private GitHub repository creation or push failed' }
$Visibility = (& gh repo view $Repository --json visibility --jq .visibility).Trim()
if ($Visibility -ne 'PRIVATE') { throw "Unexpected visibility: $Visibility" }
Write-Host "Private repository verified: https://github.com/$Repository"
