# Sasya's Sandbox

An interactive 3D portfolio. Scroll through an intro, walk around a cozy dorm room, and click things to explore: a bed for the about section, a whiteboard for projects and the research paper, and a PC that opens a full Windows-style desktop with a working browser, a game, and more.

**Live demo: https://YOUR-PROJECT.vercel.app**

---

## Features

- **Scroll intro**: title card, a blurred "about" scene with hoverable fun facts, an experience timeline, and an achievements list, with jump chips to skip between sections.
- **3D room** built with Three.js: walk with WASD or the arrow keys, drag to look around, tap the floor to move on touch devices. Furniture has collision, shadows, and a subtle hover lift on clickable objects.
- **Clickable objects**
  - **Bed**: about me
  - **Whiteboard**: project showcase and the published paper
  - **PC**: opens the desktop
- **Desktop UI** (opens from the PC):
  - Draggable, minimizable, maximizable windows and a taskbar with a start menu
  - **Chrome** with tabs for LinkedIn, GitHub (live contribution graph), Instagram (add your own posts), and the paper
  - **Flappy bird**, Projects, About.txt, Terminal, Photos, Recycle Bin, and a few "busy updating" filler apps
  - Clock, calendar, music and weather widgets
  - Press `Esc` to leave, or use the **Back to room** button
- **Halftone cat loader**: a video is turned into a live dot-matrix animation on a canvas while assets load.
- **Guestbook** (bottom-left) and a downloadable CV.
- **Mobile friendly**: touch controls, a responsive intro, and a full-screen desktop on phones.

## Tech stack

- Plain HTML, CSS, and JavaScript (ES modules), with no build step
- [Three.js](https://threejs.org/) r128 and `GLTFLoader`, loaded from a CDN
- `.glb` models for the furniture, `.png`/`.jpg`/`.webp` textures
- Optional [Supabase](https://supabase.com/) REST table for a shared guestbook

## Project structure

```
.
├── index.html
├── style.css          # base styles + terminal popup
├── loading.css        # loader + scroll intro
├── extras.css         # timeline, achievements, guestbook, left dock
├── desktop.css        # PC desktop UI
├── js/
│   ├── main.js        # boot, renderer, input, loop
│   ├── room.js        # builds the room and places furniture
│   ├── models.js      # .glb loading helpers
│   ├── intro.js       # scroll-driven intro
│   ├── loader.js      # halftone cat loader
│   ├── desktop.js     # Windows-style desktop and its apps
│   ├── projects.js    # project cards + paper summary
│   ├── dock.js        # CV + guestbook
│   ├── flappy.js      # the game
│   ├── ui.js          # terminal-style popup
│   ├── content.js     # about, projects, paper, links
│   └── story.js       # experience + achievements
├── models/            # .glb files
└── textures/          # images, icons, video
```

## Run locally

The project uses ES modules, top-level `await`, and video pixel reads, so it **must be served over HTTP**. Opening `index.html` directly (`file://`) will not work.

```bash
git clone https://github.com/almirari/sandbox.git
cd sandbox
npx serve .
```

Then open the URL it prints (usually `http://localhost:3000`). Any static server works, for example the VS Code Live Server extension or `python -m http.server`.

**Requirements:** a modern browser with WebGL and top-level `await` support (current Chrome, Edge, Firefox, and Safari 15+).

## Controls

| Action | Desktop | Touch |
|---|---|---|
| Walk | `W A S D` / arrow keys | Tap the floor |
| Look around | Drag | Drag |
| Interact | Click an object | Tap an object |
| Leave the PC | `Esc` or **Back to room** | **Back to room** |
| Flap (game) | `Space` / click | Tap |

## Customize

Most content lives in a few files:

| What | Where |
|---|---|
| About text, projects, paper, contact links | `js/content.js` |
| Experience timeline and achievements | `js/story.js` |
| Intro "about" text and fun facts | `index.html` (the `.beat.intro` block) |
| LinkedIn / GitHub / Instagram tabs, desktop widgets | top of `js/desktop.js` |
| Contact icons (bottom-right) | `<nav id="dock">` in `index.html` |
| CV file and guestbook database | top of `js/dock.js` |
| Colors | CSS variables at the top of `desktop.css` and `#box` in `style.css` |

**Adding Instagram posts:** put images in `textures/` and add them to `INSTAGRAM.posts` in `js/desktop.js`.

**Adding furniture:** drop a `.glb` into `models/` and call `loadModel(scene, 'models/name.glb', { x, y, z, height, ry })` in `js/room.js`. Make it clickable with `on(mesh, 'Label', actions.something)`.

**Guestbook:** by default notes are stored in each visitor's browser only. To share notes between visitors, fill in `GUESTBOOK.url` and `GUESTBOOK.anonKey` in `js/dock.js` and create a `guestbook` table (`id`, `name`, `message`, `created_at`) with insert and select policies for the anon role.

## Assets

Images are loaded from `textures/` and models from `models/`. Missing icons fall back to emoji, and missing photos fall back to gradients, so the site still works while you add assets. For fast loading, keep textures small (aim for under about 2 MB each, ideally `.webp` or `.jpg`).

## Deploy on Vercel

This is a static site, so no build settings are needed.

1. Push the project to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Deploy.

Every push to the main branch redeploys automatically.

## Credits

- 3D models: add credits and licenses for your `.glb` files here
- Icons, fonts: [Inter](https://rsms.me/inter/), [Fraunces](https://fonts.google.com/specimen/Fraunces), [Caveat](https://fonts.google.com/specimen/Caveat), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Built with [Three.js](https://threejs.org/)

## Author

**Almira Raisa Izzatina**, Informatics Engineering, ITS.
[LinkedIn](https://www.linkedin.com/in/almira-ri) · [GitHub](https://github.com/almirari) · [Email](mailto:almirari004@gmail.com)

## License

Add a license here (for example MIT). Content, photos, and the paper belong to their respective owners.