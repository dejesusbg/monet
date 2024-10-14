# Theme Color Generator

A JavaScript library for generating color palettes based on Material Design 3 color schemes. It utilizes the `chroma-js` library to create dynamic color variations, including overlays for neutral tones, and supports CSS and Tailwind CSS output.

## Features

- **Palette Generation**: Generate color palettes using primary and optional secondary colors.
- **Color Schemes**: Complies with Material Design guidelines to provide various color schemes.
- **Light/Dark Mode**: Automatically detects and applies themes based on user preferences.
- **Overlays**: Calculates overlays for neutral and neutral-variant tones.
- **Output Formats**: Outputs color palettes as CSS variables or Tailwind CSS configuration.

## Installation

```bash
npm install dejesusbg5/md3-theme
```

## Usage

To generate a color palette and apply styles as CSS variables:

### CSS Output
```javascript
Theme.set("#123456", "#7890ab");
```

This will create a `<style>` element in your document's <head> with CSS variables for the generated colors.

### Tailwind Output
In your `tailwind.config.js`, extend the theme like this:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: Theme.set("#123456", "#7890ab", "tailwind");
    }
  }
}
```

This adds the custom color variables for use in your Tailwind CSS build.

### Toggle Light/Dark Mode

To switch between light and dark modes, use the Theme.toggle() method:

```javascript
Theme.toggle();
```

This function will automatically switch the theme based on user preferences, ensuring a seamless experience.

## Inspiration
This library is inspired by my previous work, [dejesusbg5/md3](https://github.com/dejesusbg5/md3), where I explored Material Design principles in greater depth. Building on that foundation, the Theme Generator aims to simplify the process of creating customizable and responsive color schemes for modern web applications.
