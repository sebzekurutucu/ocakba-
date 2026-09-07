// OcakBaşı API — giriş noktası
// Şimdilik sadece iskelet: sağlık kontrolü ve temel middleware.
// BigQuery bağlantısı sonraki adımda eklenecek.

import "dotenv/config";
import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route'lar
app.use("/health", healthRouter);

// Kök endpoint — API çalışıyor mu hızlı kontrol
app.get("/", (req, res) => {
  res.json({ mesaj: "OcakBaşı API çalışıyor" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ hata: "Bulunamadı" });
});

// Genel hata yakalayıcı
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ hata: "Sunucu hatası" });
});

app.listen(PORT, () => {
  console.log(`OcakBaşı API http://localhost:${PORT} adresinde dinliyor`);
});
