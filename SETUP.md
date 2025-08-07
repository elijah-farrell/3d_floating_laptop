# Setup & Development

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
│   └── laptop.glb    # 3D model file
├── src/
│   ├── App.jsx           # Main 3D scene
│   ├── HeroPage.jsx      # Landing page content
│   ├── index.jsx         # React entry point
│   └── styles.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json
```