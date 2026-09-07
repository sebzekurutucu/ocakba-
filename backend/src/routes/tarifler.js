// Tarif endpoint'leri.
import { Router } from "express";
import { getBigQuery } from "../bigquery.js";

const router = Router();

const DATASET = process.env.BIGQUERY_DATASET || "ocakbasi_verisi";

// GET /api/tarifler — tüm tarifleri döndürür.
router.get("/", async (req, res) => {
  try {
    const bigquery = getBigQuery();
    const [satirlar] = await bigquery.query(
      `SELECT id, ad, sure_dk, baz_porsiyon, malzemeler, aciklama
       FROM \`${DATASET}.tarifler\`
       ORDER BY id`,
    );

    // malzemeler tabloda JSON metni; diziye çevirip döndürüyoruz.
    // INT64 alanları güvenli sayıya çeviriyoruz.
    const tarifler = satirlar.map((satir) => ({
      id: Number(satir.id),
      ad: satir.ad,
      sure_dk: Number(satir.sure_dk),
      baz_porsiyon: Number(satir.baz_porsiyon),
      malzemeler: malzemeleriCoz(satir.malzemeler),
      aciklama: satir.aciklama,
    }));

    res.json(tarifler);
  } catch (err) {
    console.error("Tarifler getirilemedi:", err);
    res.status(503).json({ hata: "tarifler yüklenemedi" });
  }
});

function malzemeleriCoz(ham) {
  if (Array.isArray(ham)) return ham;
  if (typeof ham !== "string") return [];
  try {
    const cozulmus = JSON.parse(ham);
    return Array.isArray(cozulmus) ? cozulmus : [];
  } catch {
    return [];
  }
}

export default router;
