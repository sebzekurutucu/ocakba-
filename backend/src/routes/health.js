// Sağlık kontrolü endpoint'leri — "sunucu ayakta mı", "BigQuery bağlı mı".
import { Router } from "express";
import { bigQueryDurum } from "../bigquery.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    durum: "ok",
    zaman: new Date().toISOString(),
  });
});

// BigQuery bağlantı kontrolü.
// Anahtar dosyası eklenip dataset erişilebilir olduğunda:
//   { yapilandirildi: true, dataset: "ocakbasi_verisi", ulasilebilir: true }
router.get("/bigquery", async (req, res) => {
  const durum = await bigQueryDurum();
  res.status(durum.yapilandirildi ? 200 : 503).json(durum);
});

export default router;
