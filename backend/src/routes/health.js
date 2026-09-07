// Sağlık kontrolü endpoint'i — "sunucu ayakta mı" testi için.
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    durum: "ok",
    zaman: new Date().toISOString(),
  });
});

export default router;
