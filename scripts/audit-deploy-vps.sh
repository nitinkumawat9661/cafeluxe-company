#!/usr/bin/env bash
set -Eeuo pipefail

APP_USER="${APP_USER:-nitin}"
APP_NAME="${APP_NAME:-trustfirstsolutions-site}"
DOMAIN="${DOMAIN:-trustfirstsolutions.in}"
LIVE_PORT="${LIVE_PORT:-3020}"
PREVIEW_PORT="${PREVIEW_PORT:-3024}"
PREVIEW_PROCESS="${PREVIEW_PROCESS:-trustfirstsolutions-audit-preview}"
BRANDED_COMMIT="d3640082bb8ec3493b6da40bb1ede9fbefa560bc"
RELEASE_BASE="/var/www/trustfirstsolutions-releases"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RELEASE_DIR="$RELEASE_BASE/brand-state-$STAMP"
RELEASE_BRANCH="vps/brand-state-$STAMP"
LIVE_SWITCHED="NO"
LIVE_VERIFIED="NO"
PREVIEW_STARTED="NO"

say() { printf '\n========== %s ==========\n' "$1"; }
fail() { echo "ERROR=$1" >&2; exit 1; }

cleanup_preview() {
  if [ "$PREVIEW_STARTED" = "YES" ]; then
    sudo -u "$APP_USER" -H pm2 delete "$PREVIEW_PROCESS" >/dev/null 2>&1 || true
    PREVIEW_STARTED="NO"
  fi
}

rollback_live() {
  [ -n "${OLD_ROOT:-}" ] || return 1
  [ -x "${OLD_NEXT:-}" ] || return 1

  echo "ROLLBACK_START=YES"
  sudo -u "$APP_USER" -H pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
  for _ in $(seq 1 20); do
    if ! sudo ss -ltnH "sport = :$LIVE_PORT" | grep -q .; then break; fi
    sleep 1
  done

  sudo -u "$APP_USER" -H pm2 start "$OLD_NEXT" \
    --name "$APP_NAME" \
    --cwd "$OLD_ROOT" \
    -- start -H 127.0.0.1 -p "$LIVE_PORT"

  for _ in $(seq 1 30); do
    code="$(curl -sS --max-time 8 -o /dev/null -w '%{http_code}' "http://127.0.0.1:$LIVE_PORT/" 2>/dev/null || true)"
    if [ "$code" = "200" ]; then
      sudo -u "$APP_USER" -H pm2 save >/dev/null
      echo "ROLLBACK_COMPLETE=YES"
      return 0
    fi
    sleep 2
  done

  echo "ROLLBACK_COMPLETE=NO" >&2
  return 1
}

on_error() {
  code=$?
  cleanup_preview
  if [ "$LIVE_SWITCHED" = "YES" ] && [ "$LIVE_VERIFIED" != "YES" ]; then
    rollback_live || true
  fi
  echo "DEPLOYMENT=FAIL"
  exit "$code"
}
trap on_error ERR

say "1. AUDIT CURRENT PRODUCTION"
CURRENT_PID="$(sudo -u "$APP_USER" -H pm2 pid "$APP_NAME" | tail -n 1)"
[[ "$CURRENT_PID" =~ ^[0-9]+$ ]] && [ "$CURRENT_PID" -gt 0 ] || fail "LIVE_PM2_PROCESS_NOT_RUNNING"
OLD_ROOT="$(sudo readlink -f "/proc/$CURRENT_PID/cwd")"
OLD_NEXT="$OLD_ROOT/node_modules/next/dist/bin/next"
[ -d "$OLD_ROOT/.git" ] || git -C "$OLD_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "LIVE_ROOT_NOT_GIT_WORKTREE"
[ -x "$OLD_NEXT" ] || fail "LIVE_NEXT_BINARY_MISSING"
[ -f "$OLD_ROOT/.env.production" ] || fail "LIVE_ENV_MISSING"

LOCAL_CODE="$(curl -sS --max-time 12 -o /dev/null -w '%{http_code}' "http://127.0.0.1:$LIVE_PORT/")"
PUBLIC_CODE="$(curl -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://$DOMAIN/")"
[ "$LOCAL_CODE" = "200" ] || fail "LOCAL_LIVE_HTTP_$LOCAL_CODE"
[ "$PUBLIC_CODE" = "200" ] || fail "PUBLIC_LIVE_HTTP_$PUBLIC_CODE"

if [ -n "$(sudo -u "$APP_USER" -H git -C "$OLD_ROOT" status --porcelain --untracked-files=no)" ]; then
  fail "LIVE_TRACKED_WORKTREE_DIRTY"
fi

echo "LIVE_ROOT=$OLD_ROOT"
echo "LIVE_HEAD=$(sudo -u "$APP_USER" -H git -C "$OLD_ROOT" rev-parse HEAD)"
echo "LIVE_BASELINE=PASS"

say "2. FETCH AND VERIFY GITHUB MAIN"
sudo -u "$APP_USER" -H git -C "$OLD_ROOT" fetch origin main --prune
REMOTE_MAIN="$(sudo -u "$APP_USER" -H git -C "$OLD_ROOT" rev-parse origin/main)"
sudo -u "$APP_USER" -H git -C "$OLD_ROOT" cat-file -e "$BRANDED_COMMIT^{commit}"
sudo -u "$APP_USER" -H git -C "$OLD_ROOT" merge-base --is-ancestor "$BRANDED_COMMIT" "$REMOTE_MAIN" || fail "BRANDED_COMMIT_NOT_IN_MAIN"
echo "GITHUB_MAIN=$REMOTE_MAIN"
echo "BRANDED_COMMIT_PRESENT=YES"

say "3. AUDIT DISK AND PORTS"
AVAILABLE_KB="$(df -Pk / | awk 'NR==2 {print $4}')"
[ "$AVAILABLE_KB" -ge 3145728 ] || fail "LESS_THAN_3GB_FREE"
if sudo -u "$APP_USER" -H pm2 describe "$PREVIEW_PROCESS" >/dev/null 2>&1; then
  sudo -u "$APP_USER" -H pm2 delete "$PREVIEW_PROCESS" >/dev/null
fi
if sudo ss -ltnH "sport = :$PREVIEW_PORT" | grep -q .; then
  fail "PREVIEW_PORT_${PREVIEW_PORT}_IN_USE"
fi
echo "DISK_AND_PORT_AUDIT=PASS"

say "4. CREATE ISOLATED RELEASE FROM CURRENT LIVE"
sudo install -d -m 0755 -o "$APP_USER" -g "$APP_USER" "$RELEASE_BASE"
LIVE_HEAD="$(sudo -u "$APP_USER" -H git -C "$OLD_ROOT" rev-parse HEAD)"
sudo -u "$APP_USER" -H git -C "$OLD_ROOT" worktree add -b "$RELEASE_BRANCH" "$RELEASE_DIR" "$LIVE_HEAD"
sudo install -m 0600 -o "$APP_USER" -g "$APP_USER" "$OLD_ROOT/.env.production" "$RELEASE_DIR/.env.production"
echo "RELEASE_DIR=$RELEASE_DIR"

say "5. MERGE LATEST MAIN INTO LIVE CODEBASE"
set +e
sudo -u "$APP_USER" -H git -C "$RELEASE_DIR" merge --no-ff origin/main -m "Merge latest GitHub main for VPS deployment"
MERGE_CODE=$?
set -e
if [ "$MERGE_CODE" -ne 0 ]; then
  echo "MERGE_CONFLICTS:"
  sudo -u "$APP_USER" -H git -C "$RELEASE_DIR" diff --name-only --diff-filter=U || true
  sudo -u "$APP_USER" -H git -C "$RELEASE_DIR" merge --abort || true
  fail "MERGE_CONFLICT_REVIEW_REQUIRED"
fi

FINAL_HEAD="$(sudo -u "$APP_USER" -H git -C "$RELEASE_DIR" rev-parse HEAD)"
sudo -u "$APP_USER" -H git -C "$RELEASE_DIR" merge-base --is-ancestor "$REMOTE_MAIN" "$FINAL_HEAD" || fail "MAIN_NOT_MERGED"

grep -Fq '"deploymentEnabled": false' "$RELEASE_DIR/vercel.json" || fail "VERCEL_DEPLOY_DISABLE_MISSING"
grep -Fq 'Cormorant_Garamond' "$RELEASE_DIR/src/app/layout.tsx" || fail "CORMORANT_FONT_MISSING"
grep -Fq 'Manrope' "$RELEASE_DIR/src/app/layout.tsx" || fail "MANROPE_FONT_MISSING"
[ -f "$RELEASE_DIR/src/components/brand/BrandStateScreen.tsx" ] || fail "BRAND_STATE_SCREEN_MISSING"
[ -f "$RELEASE_DIR/src/app/loading.tsx" ] || fail "APP_LOADING_MISSING"
[ -f "$RELEASE_DIR/src/app/not-found.tsx" ] || fail "APP_NOT_FOUND_MISSING"
[ -f "$RELEASE_DIR/src/app/error.tsx" ] || fail "APP_ERROR_MISSING"
[ -f "$RELEASE_DIR/src/app/global-error.tsx" ] || fail "GLOBAL_ERROR_MISSING"
[ -f "$RELEASE_DIR/public/sw.js" ] || fail "SERVICE_WORKER_MISSING"
[ -f "$RELEASE_DIR/public/offline.html" ] || fail "OFFLINE_HTML_MISSING"
echo "SOURCE_AUDIT=PASS"

say "6. INSTALL DEPENDENCIES"
sudo -u "$APP_USER" -H bash -lc 'cd "$1" && npm ci --no-audit --no-fund' bash "$RELEASE_DIR"
echo "NPM_CI=PASS"

say "7. LINT"
sudo -u "$APP_USER" -H bash -lc 'cd "$1" && npm run lint' bash "$RELEASE_DIR"
echo "LINT=PASS"

say "8. TYPECHECK"
sudo -u "$APP_USER" -H bash -lc 'cd "$1" && npm run typecheck' bash "$RELEASE_DIR"
echo "TYPECHECK=PASS"

say "9. PRODUCTION BUILD"
sudo -u "$APP_USER" -H bash -lc 'cd "$1" && rm -rf .next && npm run build' bash "$RELEASE_DIR"
[ -d "$RELEASE_DIR/.next" ] || fail "NEXT_BUILD_OUTPUT_MISSING"
[ -s "$RELEASE_DIR/public/brand/trustfirst-brand-intro-v1.webm" ] || fail "WEBM_NOT_GENERATED"
[ -s "$RELEASE_DIR/public/brand/trustfirst-brand-poster-v1.webp" ] || fail "POSTER_NOT_GENERATED"
WEBM_SIZE="$(stat -c%s "$RELEASE_DIR/public/brand/trustfirst-brand-intro-v1.webm")"
POSTER_SIZE="$(stat -c%s "$RELEASE_DIR/public/brand/trustfirst-brand-poster-v1.webp")"
[ "$WEBM_SIZE" -lt 100000 ] || fail "WEBM_TOO_LARGE_$WEBM_SIZE"
[ "$POSTER_SIZE" -lt 50000 ] || fail "POSTER_TOO_LARGE_$POSTER_SIZE"
node --check "$RELEASE_DIR/public/sw.js"
echo "BUILD=PASS"
echo "WEBM_BYTES=$WEBM_SIZE"
echo "POSTER_BYTES=$POSTER_SIZE"

say "10. START PREVIEW"
sudo -u "$APP_USER" -H pm2 start "$RELEASE_DIR/node_modules/next/dist/bin/next" \
  --name "$PREVIEW_PROCESS" \
  --cwd "$RELEASE_DIR" \
  -- start -H 127.0.0.1 -p "$PREVIEW_PORT"
PREVIEW_STARTED="YES"

READY="NO"
for attempt in $(seq 1 30); do
  code="$(curl -sS --max-time 8 -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PREVIEW_PORT/" 2>/dev/null || true)"
  if [ "$code" = "200" ]; then READY="YES"; echo "PREVIEW_READY_ATTEMPT=$attempt"; break; fi
  sleep 2
done
[ "$READY" = "YES" ] || fail "PREVIEW_NOT_READY"

say "11. PRE-DEPLOY ROUTE AND BRAND AUDIT"
ROUTES=(
  "/"
  "/contact"
  "/digital-marketing-agency-sikar"
  "/services/restaurant-billing-software"
  "/robots.txt"
  "/sitemap.xml"
  "/llms.txt"
  "/sw.js"
  "/offline.html"
  "/brand/trustfirst-brand-intro-v1.webm"
  "/brand/trustfirst-brand-poster-v1.webp"
)

if [ -d "$RELEASE_DIR/src/app/custom-software-development-company-sikar" ]; then
  ROUTES+=("/custom-software-development-company-sikar")
fi
if [ -d "$RELEASE_DIR/src/app/services/restaurant-management-billing-software-sikar" ]; then
  ROUTES+=("/services/restaurant-management-billing-software-sikar")
fi

for route in "${ROUTES[@]}"; do
  code="$(curl -sS --max-time 15 -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PREVIEW_PORT$route")"
  echo "PREVIEW $route -> $code"
  [ "$code" = "200" ] || fail "PREVIEW_ROUTE_FAILED_${route}_${code}"
done

MISSING="/brand-audit-not-found-$STAMP"
NOT_FOUND_FILE="$(mktemp)"
NOT_FOUND_CODE="$(curl -sS --max-time 15 -o "$NOT_FOUND_FILE" -w '%{http_code}' "http://127.0.0.1:$PREVIEW_PORT$MISSING")"
[ "$NOT_FOUND_CODE" = "404" ] || fail "NOT_FOUND_STATUS_$NOT_FOUND_CODE"
grep -Fq "Page not found" "$NOT_FOUND_FILE" || fail "BRANDED_404_TEXT_MISSING"
rm -f "$NOT_FOUND_FILE"

curl -fsS "http://127.0.0.1:$PREVIEW_PORT/offline.html" | grep -Fq "You're offline" || fail "OFFLINE_SCREEN_TEXT_MISSING"
curl -fsS "http://127.0.0.1:$PREVIEW_PORT/sw.js" | grep -Fq 'url.pathname.startsWith("/api/")' || fail "SW_API_BYPASS_MISSING"
grep -Rqs "trustfirst.brand.intro.seen.v1" "$RELEASE_DIR/.next/static" || fail "SESSION_INTRO_BUNDLE_MISSING"
grep -Rqs "brand-animation-fallback" "$RELEASE_DIR/.next/static" || fail "ANIMATION_FALLBACK_BUNDLE_MISSING"

echo "BRANDED_404=PASS"
echo "OFFLINE_ASSETS=PASS"
echo "SESSION_INTRO_CODE=PASS"
echo "ANIMATION_FALLBACK_CODE=PASS"
echo "PRE_DEPLOY_AUDIT=PASS"

say "12. STOP PREVIEW"
cleanup_preview
for _ in $(seq 1 15); do
  if ! sudo ss -ltnH "sport = :$PREVIEW_PORT" | grep -q .; then break; fi
  sleep 1
done

say "13. SWITCH LIVE ONLY AFTER ALL AUDITS PASS"
sudo -u "$APP_USER" -H pm2 delete "$APP_NAME"
for _ in $(seq 1 20); do
  if ! sudo ss -ltnH "sport = :$LIVE_PORT" | grep -q .; then break; fi
  sleep 1
done
if sudo ss -ltnH "sport = :$LIVE_PORT" | grep -q .; then
  fail "LIVE_PORT_${LIVE_PORT}_DID_NOT_CLOSE"
fi

sudo -u "$APP_USER" -H pm2 start "$RELEASE_DIR/node_modules/next/dist/bin/next" \
  --name "$APP_NAME" \
  --cwd "$RELEASE_DIR" \
  -- start -H 127.0.0.1 -p "$LIVE_PORT"
LIVE_SWITCHED="YES"

READY="NO"
for attempt in $(seq 1 30); do
  code="$(curl -sS --max-time 8 -o /dev/null -w '%{http_code}' "http://127.0.0.1:$LIVE_PORT/" 2>/dev/null || true)"
  if [ "$code" = "200" ]; then READY="YES"; echo "LIVE_READY_ATTEMPT=$attempt"; break; fi
  sleep 2
done
[ "$READY" = "YES" ] || fail "NEW_LIVE_NOT_READY"

say "14. POST-DEPLOY PUBLIC AUDIT"
PUBLIC_ROUTES=(
  "/"
  "/contact"
  "/digital-marketing-agency-sikar"
  "/services/restaurant-billing-software"
  "/robots.txt"
  "/sitemap.xml"
  "/llms.txt"
  "/sw.js"
  "/offline.html"
  "/brand/trustfirst-brand-intro-v1.webm"
)
if [ -d "$RELEASE_DIR/src/app/custom-software-development-company-sikar" ]; then
  PUBLIC_ROUTES+=("/custom-software-development-company-sikar")
fi
if [ -d "$RELEASE_DIR/src/app/services/restaurant-management-billing-software-sikar" ]; then
  PUBLIC_ROUTES+=("/services/restaurant-management-billing-software-sikar")
fi

for route in "${PUBLIC_ROUTES[@]}"; do
  code="$(curl -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://$DOMAIN$route")"
  echo "PUBLIC $route -> $code"
  [ "$code" = "200" ] || fail "PUBLIC_ROUTE_FAILED_${route}_${code}"
done

PUBLIC_404="$(mktemp)"
PUBLIC_404_CODE="$(curl -sS --max-time 20 -o "$PUBLIC_404" -w '%{http_code}' "https://$DOMAIN/brand-live-not-found-$STAMP")"
[ "$PUBLIC_404_CODE" = "404" ] || fail "PUBLIC_404_STATUS_$PUBLIC_404_CODE"
grep -Fq "Page not found" "$PUBLIC_404" || fail "PUBLIC_BRANDED_404_MISSING"
rm -f "$PUBLIC_404"

curl -fsS --max-time 20 "https://$DOMAIN/offline.html" | grep -Fq "You're offline" || fail "PUBLIC_OFFLINE_SCREEN_MISSING"

LIVE_VERIFIED="YES"
sudo -u "$APP_USER" -H pm2 save

FINAL_PID="$(sudo -u "$APP_USER" -H pm2 pid "$APP_NAME" | tail -n 1)"
FINAL_ROOT="$(sudo readlink -f "/proc/$FINAL_PID/cwd")"
FINAL_COMMIT="$(sudo -u "$APP_USER" -H git -C "$FINAL_ROOT" rev-parse HEAD)"

say "RESULT"
echo "AUDIT=PASS"
echo "DEPLOYMENT=PASS"
echo "DOMAIN=https://$DOMAIN"
echo "LIVE_RELEASE=$FINAL_ROOT"
echo "LIVE_COMMIT=$FINAL_COMMIT"
echo "SOURCE_MAIN=$REMOTE_MAIN"
echo "BRANDED_STATE_SYSTEM=PASS"
echo "CORMORANT_GARAMOND=PASS"
echo "MANROPE=PASS"
echo "WEBM_ANIMATION=PASS"
echo "STATIC_FALLBACK=PASS"
echo "BRANDED_404=PASS"
echo "OFFLINE_SHELL=PASS"
echo "SERVICE_WORKER=PASS"
echo "LINT=PASS"
echo "TYPECHECK=PASS"
echo "BUILD=PASS"
echo "PM2_SAVE=PASS"
echo "BACKUP_CREATED=NO"
echo "VERCEL_DEPLOYMENT_REQUESTED=NO"
echo "CAFE_LUXE_TOUCHED=NO"
echo "TRUSTFIRST_CLIENT_PORTAL_TOUCHED=NO"
echo "MANGALAM_TOUCHED=NO"
echo "TRUSTFIRST_AUDIT_AND_DEPLOY=PASS"
