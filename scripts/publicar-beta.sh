#!/usr/bin/env bash
# Publica esta copia del portafolio en https://beta.andresrami.com (vista previa, sin indexar).
# Compila fuera de OneDrive, porque OneDrive estropea node_modules.
# Uso (desde la raíz del repositorio):  bash scripts/publicar-beta.sh
set -euo pipefail

ORIGEN="$(cd "$(dirname "$0")/.." && pwd)"
COMPILAR="${COMPILAR:-$LOCALAPPDATA/portafolio-beta-build}"
SERVIDOR="${SERVIDOR:-root@167.233.246.233}"
CLAVE="${CLAVE:-$HOME/.ssh/vps_portafolio}"

echo "==> Copiando el código a $COMPILAR"
mkdir -p "$COMPILAR"
rm -rf "$COMPILAR/src" "$COMPILAR/public" "$COMPILAR/dist"
cp -r "$ORIGEN/src" "$ORIGEN/public" "$ORIGEN/index.html" "$ORIGEN/package.json" "$ORIGEN/package-lock.json" "$ORIGEN/vite.config.js" "$COMPILAR/"

cd "$COMPILAR"
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "==> Instalando dependencias"
  npm ci --no-audit --no-fund
fi

echo "==> Compilando"
npm run build

echo "==> Subiendo a beta.andresrami.com"
tar -czf - -C dist . | ssh -i "$CLAVE" -o BatchMode=yes "$SERVIDOR" \
  'rm -rf /opt/portafolio/beta.nuevo && mkdir -p /opt/portafolio/beta.nuevo && tar -xzf - -C /opt/portafolio/beta.nuevo && rm -rf /opt/portafolio/beta/* && cp -r /opt/portafolio/beta.nuevo/. /opt/portafolio/beta/ && rm -rf /opt/portafolio/beta.nuevo'

echo "✔ Publicado en https://beta.andresrami.com"
