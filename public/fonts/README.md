# Custom Fonts

This directory contains custom fonts for the website:

- **Milkerby**: Used for display headings and hero text
- **Brandsemut**: Used for brand elements and special text

## Font Files Expected:
- Milkerby-Regular.woff2
- Milkerby-Regular.woff
- Brandsemut-Regular.woff2
- Brandsemut-Regular.woff

## Usage:
The fonts are loaded via CSS and available as:
- `font-family: var(--font-display)` for Milkerby
- `font-family: var(--font-brand)` for Brandsemut

## Fallbacks:
Both fonts fall back to Inter and system fonts if not available.