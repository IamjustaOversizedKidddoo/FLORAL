# FLORÆ (フローラ)
> *A Language Without Words • 花を作る • Est. 2025*

**FLORÆ** is a luxury digital botanical atelier and emotional gift composer. Visitors can hand-arrange bespoke floral bouquets in authentic handcrafted vessels or artisanal florist wraps, compose handwritten letters on tactile luxury stationery, and send cinematic, unauthenticated gift links to loved ones.

---

## ✨ Features

- **Interactive Botanical Atelier**:
  - Silky-smooth 60–120 FPS direct DOM drag, rotate, and scale.
  - Mathematical organic dome silhouette preventing stray or floating stems.
  - Multi-tiered depth sorting (`bringForward`, `sendBackward`, `duplicate`).
- **Authentic Vessels & Packaging Wraps**:
  - **4 Handcrafted Vessels**: Dark Fluted Charcoal Stoneware, Smoky Fluted Mouth-Blown Glass, Imperial Celadon Porcelain, Minimalist Raw Sand Stoneware.
  - **4 Florist Packaging Cones**: Natural Kraft Paper, Ivory Deckled Washi, Charcoal French Linen, Vintage Botanical Print Paper.
- **Pure Alpha Transparency Botanicals**:
  - Zero black halos or circular vignette masks.
  - Classic European & Japanese varieties (Rose, Tulip, Lily, Orchid, Peony, Hydrangea, Sunflower, Jasmine).
  - **Rare Botanical Sanctuaries**: Epiphytic Ghost Orchid, Turquoise Jade Vine, Middlemist's Red Camellia, and Midnight Kadupul.
- **Physical Luxury Stationery**:
  - 5 tactile paper textures (Aged Parchment, Handmade Deckle, Minimal Warm White, Botanical Press, Midnight Charcoal).
  - Typography curation (Cormorant Garamond, Pinyon Script, Cinzel, Montserrat, Courier Prime).
  - Authentic wax seal monogram.
- **Cinematic Recipient Experience**:
  - **Zero Account Required**: Recipients open gifts with a single tap.
  - **Stage 1**: Elegant private teaser envelope with the gold FLORÆ monogram seal.
  - **Stage 2**: Living bouquet blooming into life with staggered floral physics, accompanied by the personal letter and interactive meaning cards.

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

### Production Build

```bash
# TypeScript compilation & Vite bundle
npm run build

# Preview production build locally
npm run preview

# Or run the production Node.js server
npm run start
```

---

## 🌐 Deploying to Vercel

1. **Push to GitHub**:
   Ensure code is pushed to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select the `FLORAL` repository.
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Click Deploy**:
   Vercel will build the frontend and deploy the serverless `/api/gifts` endpoints automatically using `vercel.json`.

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript 5, Vite 6
- **Styling**: Vanilla CSS with tailored design tokens, glassmorphism, and responsive layouts
- **Icons**: Lucide Icons & Custom SVG Monograms
- **Deployment**: Vercel (SPA rewrites + Serverless API functions)

---

## 📜 License

Private Atelier Edition • All Rights Reserved.
