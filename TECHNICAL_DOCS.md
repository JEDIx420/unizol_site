# Unizol Technical Documentation

This document provides a comprehensive technical overview of the Unizol website architecture, technology stack, and file structure.

## 🛠 Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend/Middleware**: [Express.js](https://expressjs.com/) (Service proxy & Chatbot logic)
- **AI Integration**: [AI SDK](https://sdk.vercel.ai/) & Google AI (Gemini 2.5 Flash)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

## 📁 Project Structure

```text
UnizolNewSite/
├── index.html              # Main Landing Page
├── services.html           # Services Overview
├── service-gtm.html        # GTM Engineering Detail Page
├── service-media.html       # Media Studio Detail Page
├── service-ops.html         # Bespoke Architecture Detail Page
├── agents.html             # Agents Overview
├── case-studies.html       # Case Studies Page
├── server.js               # Express Server (API Proxy & Hosting logic)
├── vite.config.js          # Vite Configuration
├── package.json            # Dependencies & Scripts
├── public/                 # Static Assets
│   ├── css/
│   │   └── style.css       # Global Design System & Styles
│   └── images/             # Image Branding & Logos
└── src/                    # Application Logic
    ├── main.js             # Entry Point (Rotators, Animations, Init)
    ├── chat.js             # AI Chatbot Logic
    └── chat.css            # Chatbot UI Styles
```

## 🏗 Key Components & Architecture

### 1. Design System (`public/css/style.css`)
- **Variables**: Centered around a premium "ZenRev" aesthetic using Deep Blues (`#1e40af`, `#3b82f6`) and Clean Whites.
- **Mesh Gradients**: Advanced radial-gradient compositions used in `.header-premium` for depth and blur effects.
- **Glassmorphism**: Extensive use of `backdrop-filter: blur()` and semi-transparent backgrounds for cards and the navbar.

### 2. Micro-interactions (`src/main.js`)
- **Word Rotator**: A JavaScript-driven text switcher for the hero section with smooth translateY/opacity transitions.
- **Intersection Observer**: Triggers `.animate-fade-up` animations only when elements enter the viewport to optimize performance.

### 3. AI Chatbot (`src/chat.js`)
- **Architecture**: Injects a custom floating action button (FAB) and chat window into the DOM.
- **Communication**: Proxies requests through the Express server (`server.js`) to interact with the AI provider securely.

### 4. Build & Deployment
- **Input Resolution**: Vite is configured to handle multiple entry points (HTML files) through `rollupOptions`.
- **Static Serving**: Assets in the `public/` folder are served directly, while `src/` files are bundled and transpiled.

## 🚀 Environment Configuration
- `.env` file used to manage API keys and server ports.
- `vite.config.js` includes a proxy setup for forwarding `/api` requests to the local Express server during development.
