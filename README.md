# Monet

Monet is a JavaScript library designed for generating dynamic color palettes based on Material Design 3 color schemes. Utilizing the chroma-js library, it creates versatile color variations, including overlays for neutral tones, and supports both CSS and Tailwind CSS output.

## Features

- **Palette Generation**: Generate color palettes using primary and optional secondary colors.
- **Color Schemes**: Complies with Material Design guidelines to provide various color schemes.
- **Light/Dark Mode**: Automatically detects and applies themes based on user preferences.
- **Overlays**: Calculates overlays for neutral and neutral-variant tones.
- **Output Formats**: Outputs color palettes as CSS variables or Tailwind CSS configuration.

## Installation

```bash
npm install dejesusbg/monet
```

## Usage

To generate a color palette and apply styles as CSS variables:

### CSS Output

```javascript
Theme.set("#123456", "#7890ab");
```

This will create a `<style>` element in your document's `<head>` with CSS variables for the generated colors.

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

### Toggle Between Light and Dark Modes

To allow users to seamlessly switch between light and dark themes, you can use the `Theme.toggle()` method.

This function automatically adds or removes a class on the `<body>` element, effectively changing the theme. This approach ensures that your styles are applied consistently, enhancing the user experience while maintaining the integrity of your design.

## Inspiration

This library is inspired by my previous work, [dejesusbg/md3](https://github.com/dejesusbg/md3), where I explored Material Design principles in greater depth. Building on that foundation, the Theme Generator aims to simplify the process of creating customizable and responsive color schemes for modern web applications.
