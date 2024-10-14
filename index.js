const chroma = require("chroma-js");

const { COLOR_SCHEMES, COLOR_TONES } = require("./constants");

class Theme {
  static #generatePalette(primary, secondary = null) {
    const mainColor = chroma(primary).hsl();

    const hues = {
      primary: mainColor[0],
      secondary: secondary ? chroma(secondary).get("hsl.h") : (mainColor[0] + 88) % 360,
      tertiary: (mainColor[0] - 12) % 360,
      neutral: (mainColor[0] - 16) % 360,
      "neutral-variant": (mainColor[0] + 8) % 360,
    };

    let palette = [];
    for (const [schemeName, colorScheme] of Object.entries(COLOR_SCHEMES)) {
      const hue = hues[schemeName];

      colorScheme.forEach((scheme, index) => {
        const [hueOffset, saturation, lightness] = scheme;

        const colorDetails = {
          h: (hue + hueOffset) % 360,
          s: saturation / 100,
          l: lightness / 100,
        };

        palette.push({
          name: schemeName,
          tone: COLOR_TONES[index],
          value: chroma(colorDetails).hex(),
        });

        const overlays = this.#calculateOverlays(schemeName, colorDetails, mainColor, hue, COLOR_TONES[index]);
        palette.push(...overlays);
      });
    }

    return palette;
  }

  static #calculateOverlays(name, source, backdrop, hue, tone) {
    const getOverlay = (alpha, elevation) => {
      let overlay = {
        h: hue,
        s: source.s * 0.9 + (backdrop[1] - source.s) * (1 - alpha) * alpha * 0.20833333,
        l: source.l * 0.957142857 + (backdrop[2] - source.l) * (1 - alpha) * alpha * 0.77,
      };

      overlay.l += source.l > 0.5 ? (elevation + 5.5) / 200 : (elevation + 1.5) / 150;
      return overlay;
    };

    let overlays = [];

    if (["neutral", "neutral-variant"].includes(name) && [10, 20, 30, 90, 99].includes(tone)) {
      for (let elevation = 1; elevation < 5; elevation++) {
        const alpha = (elevation - 1) * 0.05;
        const overlay = getOverlay(alpha, elevation);

        overlays.push({
          name,
          tone: `${tone}-e${elevation}`,
          value: chroma(overlay).hex(),
        });
      }
    }

    return overlays;
  }

  static #applyCSS(palette) {
    const cssText = palette.map(({ name, tone, value }) => `${name}-${tone}: ${value};`).join(" ");

    let style = document.getElementById("material-theme") || document.createElement("style");
    style.setAttribute("id", "material-theme");
    style.textContent = `body { ${cssText} }`;

    document.head.appendChild(style);
    return style;
  }

  static #applyTailwind(palette) {
    palette.forEach(({ name, tone, value }) => {
      if (!tailwindColors[name]) {
        tailwindColors[name] = {};
      }
      tailwindColors[name][tone] = value;
    });

    return palette;
  }

  static #setDarkMode() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = localStorage.getItem("theme") || mediaQuery;
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }

  static set(primary, secondary, type = "css") {
    const palette = this.#generatePalette(primary, secondary);
    this.#setDarkMode();
    return type === "css" ? this.#applyCSS(palette) : this.#applyTailwind(palette);
  }

  static toggle() {
    const currentTheme = document.body.classList.contains("light") ? "dark" : "light";
    document.body.className = currentTheme;
    localStorage.setItem("theme", currentTheme);
  }
}

export default Theme;
