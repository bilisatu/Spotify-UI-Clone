# Spotify-Style Music Player

A polished Spotify-inspired music player built by **Safraeel** using **HTML, CSS and vanilla JavaScript**. It includes real audio playback, custom cover art, keyboard shortcuts, and a responsive three-panel layout.

**Live demo:** https://bilisatu.github.io/Spotify-UI-Clone/

## Overview

This project recreates the feel of the Spotify desktop client:

- Sidebar navigation and library section
- Main content area with “Good evening”, “Made for Safraeel” and “Recently played” rows
- Persistent bottom player with transport controls, progress and volume

It is designed as a portfolio piece to demonstrate modern UI layout, component styling and front‑end JavaScript without any framework.

## Features

- **Real audio playback**: 4 local tracks controlled through a hidden HTML5 `<audio>` element
- **Custom cover art**: local images mapped to each track and shown in the player
- **Interactive cards**: “Good evening” tiles are wired to specific tracks
- **Keyboard shortcuts**: `Space` to play/pause, `←` / `→` to go to previous/next track
- **Now playing toast**: small notification with the current track and artist
- **Premium styling**: sticky header, elevated player bar, soft shadows and hover states

## Project Structure

```text
Spotify-UI-Clone/
├─ index.html       # Hero section, Spotify-style layout, bottom player
├─ style.css        # Layout, typography, colors, animations
├─ script.js        # Audio player logic and interactions
├─ media/
│  ├─ track1.mp3   # Local audio files
│  ├─ track2.mp3
│  ├─ track3.mp3
│  └─ track4.mp3
│
└─ media/covers/
   ├─ focus-beats.jpg
   ├─ late-night-code.jpg
   ├─ Morning-Drive.jpg
   └─ sunset-vibes.jpg
```

## Running the Project

You can open `index.html` directly in a browser, but using a small local server is recommended for consistent asset loading.

### Via Python (Windows PowerShell)

```powershell
cd "c:\Users\Safraeel\Documents\WEBSITE_RESTORED\Spotify-UI-Clone"
python -m http.server 5501
```

Then visit `http://localhost:5501` in your browser.

## Implementation Notes

- **HTML**
  - Defines the sidebar, main content sections and the bottom player.
  - Adds a compact hero block at the top to introduce the project and author.
- **CSS**
  - Uses flexbox and grid for layout.
  - Implements a dark theme with Spotify-like green accent.
  - Adds micro‑interactions (hover, focus, shadows) for a premium feel.
- **JavaScript**
  - Maintains a `tracks` array with `title`, `artist`, `src` and `cover` fields.
  - Controls playback, track switching, progress bar and volume.
  - Binds clickable cards, keyboard shortcuts and the “Now playing” toast.


## Author

Created by **Safraeel**.

## License

Licensed under the MIT License. See `LICENSE` for details.
