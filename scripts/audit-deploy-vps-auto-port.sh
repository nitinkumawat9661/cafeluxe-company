#!/usr/bin/env bash
set -Eeuo pipefail

APP_USER="${APP_USER:-nitin}"
APP_NAME="${APP_NAME:-trustfirstsolutions-site}"
LIVE_PORT="${LIVE_PORT:-3020}"
PREVIEW_PROCESS="${PREVIEW_PROCESS:-trustfirstsolutions-audit-preview}"

fail() {
  echo "ERROR=$1" >&2
  exit 1
}

PID="$(sudo -u "$APP_USER" -H pm2 pid "$APP_NAME" | tail -n 1)"
[[ "$PID" =~ ^[0-9]+$ ]] && [ "$PID" -gt 0 ] || fail "LIVE_PM2_PROCESS_NOT_RUNNING"

ROOT="$(sudo readlink -f "/proc/$PID/cwd")"
[ -n "$ROOT" ] || fail "LIVE_ROOT_NOT_FOUND"

# Remove only our own stale audit-preview PM2 process. Never kill an unknown
# listener just because it occupies a candidate port.
if sudo -u "$APP_USER" -H pm2 describe "$PREVIEW_PROCESS" >/dev/null 2>&1; then
  sudo -u "$APP_USER" -H pm2 delete "$PREVIEW_PROCESS" >/dev/null 2>&1 || true
fi

PREVIEW_PORT=""
for port in $(seq 3040 3099); do
  [ "$port" -eq "$LIVE_PORT" ] && continue
  if ! sudo ss -ltnH "sport = :$port" | grep -q .; then
    PREVIEW_PORT="$port"
    break
  fi
done

[ -n "$PREVIEW_PORT" ] || fail "NO_FREE_PREVIEW_PORT_3040_3099"

echo "AUTO_SELECTED_PREVIEW_PORT=$PREVIEW_PORT"

sudo -u "$APP_USER" -H git -C "$ROOT" fetch origin main --prune

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

sudo -u "$APP_USER" -H git -C "$ROOT" \
  show origin/main:scripts/audit-deploy-vps.sh > "$TMP"

PREVIEW_PORT="$PREVIEW_PORT" \
PREVIEW_PROCESS="$PREVIEW_PROCESS" \
APP_USER="$APP_USER" \
APP_NAME="$APP_NAME" \
LIVE_PORT="$LIVE_PORT" \
  bash "$TMP"
