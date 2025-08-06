# 3D Floating Laptop

An interactive 3D laptop landing page built with React, Three.js, and Vite. Features a stunning 3D MacBook model with HTML content displayed on the screen using WebGL occlusion.

## Features

- 🖥️ Interactive 3D MacBook model
- 🌐 HTML content rendered inside the 3D scene
- 🎨 Modern landing page with Tailwind CSS
- ⚡ Fast development with Vite
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 18, Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
├── public/
│   └── mac-draco.glb    # 3D model file
├── src/
│   ├── App.js           # Main 3D scene
│   ├── HeroPage.js      # Landing page content
│   ├── index.js         # React entry point
│   └── styles.css       # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json
```

## Deployment

This project is compatible with Vite-based deployments like Vercel, Netlify, or any static hosting service.

## License

MIT
