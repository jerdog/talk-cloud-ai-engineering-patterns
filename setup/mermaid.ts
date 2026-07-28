import { defineMermaidSetup } from "@slidev/types";

// Overrides the theme's setup/mermaid.ts to fix a text-clipping bug: mermaid
// measures label width using an offscreen canvas before "Inter, Roobert" have
// loaded, then bakes that (too-narrow) width into the SVG permanently. Since
// neither font is actually self-hosted by the theme, node text visibly
// overflows its box once the fallback font paints. Using only fonts the
// browser already has synchronously (no @font-face fetch) makes the
// measurement and the paint use the identical font, eliminating the race.
export default defineMermaidSetup(() => ({
  theme: "base",
  themeVariables: {
    primaryColor: "#0086EA",
    primaryTextColor: "#FFFFFF",
    primaryBorderColor: "#1C0087",
    secondaryColor: "#1C0087",
    tertiaryColor: "#99CFF7",
    lineColor: "#0A0B19",
    fontFamily: "Arial, system-ui, sans-serif",
  },
}));
