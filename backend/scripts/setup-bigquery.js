// BigQuery kurulum betiği.
// - `ocakbasi_verisi` dataset'ini oluşturur (yoksa)
// - `tarifler` tablosunu AGENTS.md'deki şemayla oluşturur (yoksa)
// - Tablo boşsa örnek tarifleri yükler
//
// Çalıştırma:  cd backend && npm run setup:bigquery
//   --sifirla  → tabloyu boşaltıp örnekleri yeniden yükler
//
// Not: BigQuery sandbox'ta (faturalama kapalı) DML/INSERT yasak, bu yüzden
// veri "load job" ile yükleniyor — bu sandbox'ta ücretsiz çalışır.

import "dotenv/config";
import os from "node:os";
import path from "node:path";
import { writeFile, unlink } from "node:fs/promises";
import { getBigQuery } from "../src/bigquery.js";
import { ornekTarifler } from "../src/data/ornekTarifler.js";

const DATASET = process.env.BIGQUERY_DATASET || "ocakbasi_verisi";
const TABLO = "tarifler";
const SIFIRLA = process.argv.includes("--sifirla");

const SEMA = [
  { name: "id", type: "INT64" },
  { name: "ad", type: "STRING" },
  { name: "sure_dk", type: "INT64" },
  { name: "baz_porsiyon", type: "INT64" },
  { name: "malzemeler", type: "STRING" },
  { name: "aciklama", type: "STRING" },
];

async function main() {
  const bigquery = getBigQuery();

  // 1) Dataset
  const [dataset] = await bigquery.dataset(DATASET).get({ autoCreate: true });
  console.log(`✓ Dataset hazır: ${DATASET}`);

  // 2) Tablo
  const table = dataset.table(TABLO);
  const [tabloVar] = await table.exists();
  if (tabloVar) {
    console.log(`✓ Tablo zaten var: ${TABLO}`);
  } else {
    await dataset.createTable(TABLO, { schema: SEMA });
    console.log(`✓ Tablo oluşturuldu: ${TABLO}`);
  }

  // 3) Örnek veri
  const [saymaSonuc] = await bigquery.query(
    `SELECT COUNT(*) AS adet FROM \`${DATASET}.${TABLO}\``,
  );
  const mevcut = Number(saymaSonuc[0].adet);

  if (mevcut > 0 && !SIFIRLA) {
    console.log(`• Tabloda zaten ${mevcut} kayıt var, veri yüklenmedi.`);
    console.log(`  Yeniden yüklemek için: npm run setup:bigquery -- --sifirla`);
    return;
  }

  // BigQuery sandbox DML'e izin vermez → newline-delimited JSON load job.
  const ndjson = ornekTarifler
    .map((t) =>
      JSON.stringify({
        id: t.id,
        ad: t.ad,
        sure_dk: t.sure_dk,
        baz_porsiyon: t.baz_porsiyon,
        malzemeler: JSON.stringify(t.malzemeler),
        aciklama: t.aciklama,
      }),
    )
    .join("\n");

  const geciciDosya = path.join(
    os.tmpdir(),
    `ocakbasi-tarifler-${Date.now()}.ndjson`,
  );
  await writeFile(geciciDosya, ndjson);

  try {
    await table.load(geciciDosya, {
      sourceFormat: "NEWLINE_DELIMITED_JSON",
      schema: { fields: SEMA },
      writeDisposition: SIFIRLA ? "WRITE_TRUNCATE" : "WRITE_APPEND",
    });
  } finally {
    await unlink(geciciDosya).catch(() => {});
  }

  console.log(
    `✓ ${ornekTarifler.length} örnek tarif ${SIFIRLA ? "yeniden yüklendi" : "yüklendi"}.`,
  );
}

main().catch((err) => {
  console.error("Kurulum başarısız:", err.message);
  process.exit(1);
});
