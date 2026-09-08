// Vercel serverless function — tek proje kurulumu.
//
// vercel.json'daki rewrite yalnızca /api/* isteklerini buraya yönlendirir;
// diğer tüm istekler frontend'in build çıktısına (frontend/dist) gider.
// İstek orijinal yoluyla geldiği için Express route'ları (/api/tarifler)
// aynen çalışır.

import app from "../backend/src/app.js";

export default app;
