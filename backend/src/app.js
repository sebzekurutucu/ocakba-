// Express uygulaması.
// Hem yerel sunucu (src/index.js) hem Vercel serverless function (api/index.js)
// bu app'i kullanır. Burada app.listen ÇAĞRILMAZ.

import "dotenv/config";
import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js";
import tariflerRouter from "./routes/tarifler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route'lar
app.use("/health", healthRouter);
app.use("/api/tarifler", tariflerRouter);

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

export default app;
