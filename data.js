// DEMONSTRATION DATA. Coordinates are approximate. Scores/ratings are illustrative, not live or official.
export const CATS = {
  attractions: { label: "Attractions", color: "#22d3ee" },
  restaurants: { label: "Restaurants", color: "#fbbf24" },
  hotels: { label: "Hotels", color: "#a78bfa" },
  parks: { label: "Parks", color: "#4ade80" },
  heritage: { label: "Heritage", color: "#f472b6" },
};
export const SEV = { low: { label: "Low", color: "#4ade80" }, medium: { label: "Medium", color: "#fbbf24" }, high: { label: "High", color: "#f87171" } };
export const REPORT_TYPES = ["Road", "Lighting", "Cleanliness", "Crowding", "Water", "Other"];

// budget: 1 = low cost, 2 = medium, 3 = high. clean/access/rating: illustrative 1-5 scores.
export const PLACES = [
  { id: "shaniwar", key: "shaniwar", name: "Shaniwar Wada", cat: "heritage", historic: true, lat: 18.5195, lng: 73.8553, budget: 1, clean: 3.5, access: 3.5, rating: 4.4, area: "Kasba Peth", desc: "Historic fortification built in 1732 as the seat of the Peshwa rulers. Known for its massive gates and evening light show." },
  { id: "aga", key: "aga khan", name: "Aga Khan Palace", cat: "heritage", historic: true, lat: 18.5524, lng: 73.9012, budget: 1, clean: 4.2, access: 3.8, rating: 4.6, area: "Yerwada", desc: "Italian-arch palace and memorial linked to Mahatma Gandhi, set in quiet landscaped grounds." },
  { id: "sinhagad", key: "sinhagad", name: "Sinhagad Fort", cat: "attractions", historic: true, lat: 18.3663, lng: 73.7559, budget: 1, clean: 3.2, access: 2.2, rating: 4.5, area: "Sinhagad Road (outskirts)", desc: "Hill fort with city views and trekking trails. Weekends are crowded; wear proper footwear." },
  { id: "pataleshwar", key: "pataleshwar", name: "Pataleshwar Cave Temple", cat: "heritage", historic: true, lat: 18.5287, lng: 73.8476, budget: 1, clean: 3.6, access: 3.2, rating: 4.3, area: "Shivajinagar", desc: "8th-century rock-cut cave temple dedicated to Shiva, in the middle of the city." },
  { id: "dagdusheth", key: "dagdusheth", name: "Dagdusheth Halwai Ganpati Temple", cat: "attractions", historic: false, lat: 18.5164, lng: 73.8562, budget: 1, clean: 3.5, access: 3.0, rating: 4.7, area: "Budhwar Peth", desc: "Famous Ganesh temple, especially busy during the Ganeshotsav festival." },
  { id: "deshpande", key: "deshpande", name: "Pu. La. Deshpande Garden", cat: "parks", historic: false, lat: 18.4906, lng: 73.8341, budget: 1, clean: 4.3, access: 4.0, rating: 4.4, area: "Sinhagad Road", desc: "Japanese-style garden with walking paths, ponds and a peaceful atmosphere." },
  { id: "empress", key: "empress", name: "Empress Garden", cat: "parks", historic: false, lat: 18.5017, lng: 73.8832, budget: 1, clean: 3.8, access: 3.9, rating: 4.1, area: "Camp", desc: "Large botanical garden, good for family walks and picnics." },
  { id: "vaishali", key: "vaishali", name: "Vaishali Restaurant", cat: "restaurants", historic: false, lat: 18.5236, lng: 73.841, budget: 2, clean: 4.0, access: 4.0, rating: 4.3, area: "FC Road", desc: "Long-running South Indian eatery popular with students." },
  { id: "kayani", key: "kayani", name: "Kayani Bakery", cat: "restaurants", historic: false, lat: 18.5144, lng: 73.8796, budget: 1, clean: 3.9, access: 3.6, rating: 4.4, area: "Camp", desc: "Classic Pune bakery known for shrewsbury biscuits." },
  { id: "marriott", key: "marriott", name: "JW Marriott Hotel Pune", cat: "hotels", historic: false, lat: 18.5326, lng: 73.8295, budget: 3, clean: 4.8, access: 4.5, rating: 4.6, area: "Senapati Bapat Road", desc: "Premium business and leisure hotel (illustrative entry for the hotels category)." },
];

// SAMPLE reports - not real incidents, unverified.
export const SEED_REPORTS = [
  { id: "s1", type: "Road", severity: "high", status: "Under review", placeId: "sinhagad", location: "Sinhagad Road ghat section", text: "Sample: damaged road edge and loose gravel near the climb.", date: "2026-09-26", lat: 18.386, lng: 73.775, sample: true },
  { id: "s2", type: "Lighting", severity: "medium", status: "Unverified", placeId: "pataleshwar", location: "Near Pataleshwar entrance", text: "Sample: street lights dim in the evening.", date: "2026-09-28", lat: 18.5282, lng: 73.848, sample: true },
  { id: "s3", type: "Cleanliness", severity: "low", status: "Resolved", placeId: "shaniwar", location: "Shaniwar Wada parking", text: "Sample: garbage near parking, later cleaned.", date: "2026-09-20", lat: 18.5188, lng: 73.8546, sample: true },
  { id: "s4", type: "Crowding", severity: "medium", status: "Unverified", placeId: "dagdusheth", location: "Budhwar Peth lane", text: "Sample: very narrow and crowded lane during festival.", date: "2026-09-30", lat: 18.5169, lng: 73.8567, sample: true },
  { id: "s5", type: "Water", severity: "medium", status: "Under review", placeId: "empress", location: "Camp road near garden", text: "Sample: water logging after rain.", date: "2026-09-18", lat: 18.5025, lng: 73.8815, sample: true },
  { id: "s6", type: "Road", severity: "low", status: "Unverified", placeId: "vaishali", location: "FC Road", text: "Sample: uneven footpath tiles.", date: "2026-10-01", lat: 18.5231, lng: 73.8418, sample: true },
  { id: "s7", type: "Lighting", severity: "high", status: "Unverified", placeId: "aga", location: "Yerwada approach road", text: "Sample: long stretch without working lights.", date: "2026-10-02", lat: 18.5495, lng: 73.9, sample: true },
  { id: "s8", type: "Cleanliness", severity: "low", status: "Resolved", placeId: "deshpande", location: "Garden entrance", text: "Sample: litter bins overflowing, now fixed.", date: "2026-09-15", lat: 18.4912, lng: 73.8346, sample: true },
];
export const afford = (p) => +(6.5 - 1.5 * p.budget).toFixed(1); // 5 = most affordable
export const budgetText = (b) => "₹".repeat(b);
export const dirLink = (lat, lng) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
