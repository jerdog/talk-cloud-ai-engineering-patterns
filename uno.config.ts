import { createRequire } from "node:module";
import { defineConfig } from "unocss";

// Slidev's own UI (nav bar, dark/light toggle, drawing tools) never renders
// its icons in this project. Root cause, confirmed by testing a plain,
// directly content-scanned `i-carbon:star` div (no safelist involved):
// @unocss/preset-icons' Node-loader chain (@iconify/utils's loadNodeIcon ->
// loadCollectionFromFS -> resolvePathAsync, which uses import-meta-resolve)
// never successfully resolves `@iconify-json/*` under this project's pnpm
// install, even though `require.resolve('@iconify-json/carbon')` from this
// exact file succeeds — Slidev's `collectionsNodeResolvePath` plumbing isn't
// landing correctly. Rather than continuing to chase that resolution
// mismatch, this bypasses the preset's loader entirely: it reads each
// collection's icons.json directly (the same read that already works) and
// emits plain static UnoCSS rules — a CSS mechanism already confirmed
// working here — for exactly the icon classes Slidev's own templates use.
//
// Slidev's packaged safelist (@slidev/client/.generated/unocss-tokens.ts,
// v52.18.0) is also missing every one of these classes, but that's now
// moot: static `rules` entries generate unconditionally and don't need a
// safelist or content-scan match at all.
const require = createRequire(import.meta.url);

interface IconifyIcon {
  body: string;
  width?: number;
  height?: number;
}
interface IconifyJSON {
  width?: number;
  height?: number;
  icons: Record<string, IconifyIcon>;
}

function iconRule(collection: string, data: IconifyJSON, name: string) {
  const icon = data.icons[name];
  if (!icon) throw new Error(`icon not found: ${collection}:${name}`);
  const w = icon.width ?? data.width ?? 16;
  const h = icon.height ?? data.height ?? 16;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${icon.body}</svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  const css = {
    "--un-icon": url,
    "-webkit-mask": "var(--un-icon) no-repeat",
    "mask": "var(--un-icon) no-repeat",
    "-webkit-mask-size": "100% 100%",
    "mask-size": "100% 100%",
    "background-color": "currentColor",
    "color": "inherit",
    "display": "inline-block",
    "width": "1em",
    "height": "1em",
    "vertical-align": "-0.125em",
    "flex-shrink": "0",
  };
  return [
    [`i-${collection}:${name}`, css],
    [`i-${collection}-${name}`, css],
  ] as const;
}

const carbon: IconifyJSON = require("@iconify-json/carbon/icons.json");
const ph: IconifyJSON = require("@iconify-json/ph/icons.json");
const svgSpinners: IconifyJSON = require("@iconify-json/svg-spinners/icons.json");

const carbonIcons = [
  "account",
  "align-box-bottom-right",
  "apps",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-right",
  "camera",
  "catalog",
  "checkbox",
  "checkmark",
  "chevron-up",
  "close",
  "close-outline",
  "cursor-1",
  "document-pdf",
  "download",
  "drop-photo",
  "edit",
  "erase",
  "error",
  "help",
  "information",
  "launch",
  "list-boxes",
  "logo-twitter",
  "magic-wand",
  "magic-wand-filled",
  "maximize",
  "minimize",
  "moon",
  "open-panel-bottom",
  "open-panel-right",
  "pause",
  "pen",
  "pin",
  "pin-filled",
  "play",
  "presentation-file",
  "previous-outline",
  "radio-button",
  "redo",
  "renew",
  "settings-adjust",
  "stop-outline",
  "sun",
  "template",
  "text-annotation-toggle",
  "time",
  "timer",
  "trash-can",
  "undo",
  "user-avatar",
  "user-speaker",
  "video",
  "warning-alt",
  "zoom-in",
  "zoom-out",
];
const phIcons = ["arrow-down-bold", "arrow-up-bold", "cursor-duotone", "cursor-fill"];
const svgSpinnersIcons = ["90-ring-with-bg"];

export default defineConfig({
  rules: [
    ...carbonIcons.flatMap((name) => iconRule("carbon", carbon, name)),
    ...phIcons.flatMap((name) => iconRule("ph", ph, name)),
    ...svgSpinnersIcons.flatMap((name) => iconRule("svg-spinners", svgSpinners, name)),
  ],
  safelist: [
    ...carbonIcons.map((name) => `i-carbon:${name}`),
    ...carbonIcons.map((name) => `i-carbon-${name}`),
    ...phIcons.map((name) => `i-ph:${name}`),
    ...phIcons.map((name) => `i-ph-${name}`),
    ...svgSpinnersIcons.map((name) => `i-svg-spinners-${name}`),
  ],
});
