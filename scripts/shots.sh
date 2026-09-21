#!/usr/bin/env bash
#
# Refresh the product screenshots from the plugin.
#
# They are generated there by `bun run shots`, which frames each capture under a
# two-line headline set in the board's own typeface. That headline is right for a README
# and wrong here -- this page supplies its own headings, and showing both says the same
# sentence twice -- so the band above the window is cropped off and what is left is the
# product on its own ground.
#
# y=492 is where the window's top border sits. It is the same in every shot because
# `scripts/shots.ts` derives the whole layout from one frame size, so one number does
# for all of them; the crop keeps 32px above it for the shadow.
set -euo pipefail

here="$(cd "$(dirname "$0")/.." && pwd)"
plugin="${1:-$here/../todo-plugin}"

if [ ! -d "$plugin/docs/media" ]; then
  echo "No plugin checkout at $plugin. Pass its path as the first argument." >&2
  exit 1
fi

command -v magick >/dev/null || { echo "ImageMagick (magick) is required." >&2; exit 1; }

for shot in overview steps identity blocked; do
  magick "$plugin/docs/media/$shot.png" \
    -crop 2160x980+0+460 +repage \
    -strip \
    "$here/src/assets/$shot.png"
  echo "  $shot.png"
done

# The status line has no headline band: it is captured by hand, at its own size.
cp "$plugin/docs/media/manual/statusline.png" "$here/src/assets/statusline.png"
echo "  statusline.png"
