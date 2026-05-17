# 🎸 Riff Board

Worship guitar content assignment tracker — a Canvas-style dashboard for managing your content pipeline.

## Features

- **20 pre-loaded assignments** across Tier 1, 2, and 3 difficulty
- **Add new tasks** via the ➕ New Assignment modal
- **Inline editing** — click any field (title, task, notes) to edit in place
- **Mark complete** with one tap — cards fade and go green
- **Filter** by tier, category, and status
- **Search** across all assignment fields
- **Grid & List views**
- Progress bar with per-tier breakdowns

## Stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- No external UI libraries — pure inline styles

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on push.

## Project Structure

```
riffboard/
├── public/
│   └── favicon.svg       # Headstock icon
├── src/
│   ├── main.jsx          # React entry point
│   └── App.jsx           # Full dashboard app
├── index.html
├── vite.config.js
└── package.json
```
