declare module "monet-css" {
  export interface ColorScheme {
    name: string;
    tone: string;
    value: string;
  }

  export interface TailwindColors {
    [name: string]: {
      [tone: string]: string;
    };
  }

  export default class Theme {
    /**
     * Generates a color palette based on the primary and secondary colors.
     * @param primary - The primary color in any valid CSS color format.
     * @param secondary - The optional secondary color in any valid CSS color format.
     * @returns An array of color scheme objects.
     */
    static set(primary: string, secondary?: string, type?: "css" | "tailwind"): HTMLStyleElement | TailwindColors;

    /**
     * Toggles between light and dark modes.
     */
    static toggle(): void;

    /**
     * Applies the generated color palette as CSS variables.
     * @param palette - The array of color scheme objects.
     * @returns The created style element.
     */
    static #applyCSS(palette: ColorScheme[]): HTMLStyleElement;

    /**
     * Applies the generated color palette to Tailwind colors format.
     * @param palette - The array of color scheme objects.
     * @returns An object containing Tailwind color definitions.
     */
    static #applyTailwind(palette: ColorScheme[]): TailwindColors;

    /**
     * Sets the theme based on the user's preferences.
     */
    static applyDarkMode(): void;

    /**
     * Generates the color palette based on the primary and secondary colors.
     * @param primary - The primary color in any valid CSS color format.
     * @param secondary - The optional secondary color in any valid CSS color format.
     * @returns An array of color scheme objects.
     */
    static #generatePalette(primary: string, secondary?: string): ColorScheme[];

    /**
     * Calculates overlay colors for elevation effects.
     * @param name - The name of the color scheme.
     * @param source - The source color in HSL format.
     * @param backdrop - The backdrop color in HSL format.
     * @param hue - The hue of the main color.
     * @param tone - The tone of the color scheme.
     * @returns An array of overlay color objects.
     */
    static #calculateOverlays(
      name: string,
      source: { h: number; s: number; l: number },
      backdrop: number[],
      hue: number,
      tone: string
    ): ColorScheme[];
  }
}
