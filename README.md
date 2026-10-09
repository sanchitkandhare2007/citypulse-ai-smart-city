# CityPulse AI

**City Life: Exploring, Experiencing & Navigating the Chaos We Call Home.**
A smart-city web app (demo city: Pune) built with React, Vite, Leaflet/OpenStreetMap, Recharts and Lucide icons. No API keys, no backend.

## Features
Landing page · Smart City Command Center (map, filters, side panel) · City Explorer (search, filters, grid/map, detail modal, directions links) · SafeRoute (reports by severity) · Place comparison (table + chart) · City Insights charts · Citizen Reports (saved in browser localStorage) · rule-based City Assistant.

> **Demo data only.** Places, scores, budget levels and sample reports are illustrative, not live or official. Reports are unverified and are not sent to any authority. The app cannot guarantee a safe route.

## Run locally
Requires Node.js 18+.
```bash
npm install
npm run dev        # open the URL shown (usually http://localhost:5173)
npm run build      # production build into dist/
npm run preview
```

## Upload to your existing GitHub repository
```bash
git init
git add .
git commit -m "Add CityPulse AI"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git pull origin main --allow-unrelated-histories   # only if the repo already has files (e.g. a README)
git push -u origin main
```
Or use GitHub's web page: *Add file → Upload files* (upload the files inside the folder, not the zip).

## Deploy on Vercel
1. Sign in at vercel.com with GitHub → **Add New → Project** → import your repository.
2. Framework: **Vite** (auto-detected). Build command `npm run build`, output `dist`.
3. Click **Deploy**. No environment variables are needed.

## Project structure
`src/data.js` (demo dataset) · `src/App.jsx` (navigation, report storage) · `src/Pages.jsx` (all pages) · `src/MapView.jsx` (Leaflet) · `src/Assistant.jsx` (rules) · `src/styles.css`. See `docs/ARCHITECTURE.md`.

## Known limitations
Map tiles need internet. No photo attachment on reports. Directions open Google Maps in a new tab. Data is a small sample of 10 places.
