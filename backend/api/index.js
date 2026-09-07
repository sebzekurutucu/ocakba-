// Vercel serverless function giriş noktası.
// vercel.json'daki rewrite tüm istekleri buraya yönlendirir; istek orijinal
// yoluyla gelir, böylece Express route'ları (/api/tarifler, /health, /) aynen
// çalışır.

import app from "../src/app.js";

export default app;
