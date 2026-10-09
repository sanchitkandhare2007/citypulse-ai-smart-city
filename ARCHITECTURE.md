# Architecture
- **Data:** `src/data.js` holds 10 demo places and 8 sample reports. All stats and charts are computed from it.
- **State:** `App.jsx` keeps the current page, the user's reports (saved to `localStorage` key `citypulse_reports_v1`) and the compare selection.
- **Pages:** `Pages.jsx` exports Home (with Command Center), Explore, SafeRoute, Compare, Insights, Reports.
- **Map:** `MapView.jsx` wraps Leaflet; it shows a fallback message if tiles fail.
- **Assistant:** `Assistant.jsx` uses keyword rules over the dataset - no AI service.
- **Hosting:** static site; Vercel builds it with `npm run build`.
