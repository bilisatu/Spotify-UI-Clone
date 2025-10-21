# Spotify Clone (HTML/CSS)

A clean, responsive Spotify-inspired interface built with plain HTML and CSS. The project uses inline SVG icons, keyboard-friendly focus styles, and a minimal like-button interaction for a polished, modern feel.

## Features

- Sidebar navigation with SVG icons (Home, Search, Library)
- Playlists section with Create Playlist and Liked Songs
- Main sections: Recent and Made for You
- Player bar with shuffle, transport controls, repeat, progress, and volume
- Inline SVG icons that inherit `currentColor` for easy theming
- Keyboard focus-visible outlines and ARIA state for the like toggle
- Reduced-motion friendly animations

## Project structure

```
SPOTIFY/
├─ index.html
├─ style.css
├─ README.md
└─ LICENSE
```

## Usage

Open `index.html` directly in a browser. No build tools are required.

### Optional: Local development server (Windows PowerShell)

```powershell
# Python 3
python -m http.server 5500

# Node (if "npx" is available)
npx serve . -l 5500
```

Visit http://localhost:5500 in your browser.

## Customization

- Colors: Primary accent is `#1DB954` (set in `style.css`).
- Icons: Inline SVGs live in `index.html` and inherit `currentColor`.
- Layout: Adjust grid areas, gaps, and breakpoints in `style.css`.

## Accessibility

- Like button toggles `aria-pressed` and uses a visible focus outline.
- Icons include `aria-label` where appropriate.
- Animations respect `prefers-reduced-motion`.

## Author

Safrael

## License

Licensed under the MIT License. See `LICENSE` for details.
