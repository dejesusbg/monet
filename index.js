import chroma from "chroma-js";

import { COLOR_SCHEMES, COLOR_TONES } from "./constants";

class Theme {
  static #generateColorScheme(primary, secondary = null) {
    const mainColor = chroma(primary).hsl();

    const hues = {
      primary: mainColor[0],
      secondary: secondary ? chroma(secondary).get("hsl.h") : (mainColor[0] + 88) % 360,
      tertiary: (mainColor[0] - 12) % 360,
      neutral: (mainColor[0] - 16) % 360,
      "neutral-variant": (mainColor[0] + 8) % 360,
    };

    let cssText = "";

    for (const [schemeName, colorScheme] of Object.entries(COLOR_SCHEMES)) {
      const hue = hues[schemeName];

      colorScheme.forEach((scheme, index) => {
        const [hueOffset, saturation, lightness] = scheme;
        const colorDetails = {
          h: (hue + hueOffset) % 360,
          s: saturation / 100,
          l: lightness / 100,
        };

        const cssName = `--${schemeName}-${COLOR_TONES[index]}`;
        cssText += `${cssName}: ${chroma(colorDetails)};`;

        if (["neutral", "neutral-variant"].includes(schemeName) && [10, 20, 30, 90, 99].includes(COLOR_TONES[index])) {
          for (let elevation = 1; elevation < 5; elevation++) {
            const alpha = (elevation - 1) * 0.05;
            const overlay = this.#calculateOverlay(colorDetails, mainColor, alpha, hue, elevation);
            cssText += `${cssName}-e${elevation}: ${chroma(overlay)};`;
          }
        }
      });
    }

    this.#applyStyle(cssText);
  }

  static #calculateOverlay(source, backdrop, alpha, hue, elevation) {
    let overlay = {
      h: hue,
      s: source.s * 0.9 + (backdrop[1] - source.s) * (1 - alpha) * alpha * 0.20833333,
      l: source.l * 0.957142857 + (backdrop[2] - source.l) * (1 - alpha) * alpha * 0.77,
    };

    overlay.l += source.l > 0.5 ? (elevation + 5.5) / 200 : (elevation + 1.5) / 150;
    return overlay;
  }

  static #applyStyle(cssText) {
    let style = document.getElementById("material-theme") || document.createElement("style");
    style.setAttribute("id", "material-theme");
    style.textContent = `body { ${cssText} }`;

    document.head.appendChild(style);
  }

  static #getPreferredColorScheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  static set(primary, secondary) {
    this.#generateColorScheme(primary, secondary);

    const theme = localStorage.getItem("theme") || this.#getPreferredColorScheme();
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }

  static toggle() {
    const currentTheme = document.body.classList.contains("light") ? "dark" : "light";
    document.body.className = currentTheme;
    localStorage.setItem("theme", currentTheme);
  }
}

export default Theme;
