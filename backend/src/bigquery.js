// BigQuery bağlantısı.
// Servis hesabı anahtarının yolu ve dataset adı backend/.env dosyasından okunur:
//   GOOGLE_APPLICATION_CREDENTIALS  → anahtar JSON dosyasının yolu
//   BIGQUERY_DATASET               → dataset adı (ör. ocakbasi_verisi)
//   GCP_PROJECT_ID                 → opsiyonel; verilmezse anahtar dosyasından okunur
//
// Bağlantı ilk kullanımda kurulur; anahtar dosyası henüz eklenmediyse
// sunucu yine de açılır, sadece BigQuery çağrıları anlaşılır bir hata verir.

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { BigQuery } from "@google-cloud/bigquery";

const backendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

// .env'deki göreli yolu backend kök dizinine göre çözer.
function anahtarYolu() {
  const ham = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!ham) return null;
  return path.isAbsolute(ham) ? ham : path.resolve(backendRoot, ham);
}

let dataset = null;

// BigQuery dataset bağlantısını döndürür (ilk çağrıda kurar).
// Yapılandırma eksikse anlaşılır bir hata fırlatır.
export function getDataset() {
  if (dataset) return dataset;

  const keyFilename = anahtarYolu();
  const datasetId = process.env.BIGQUERY_DATASET;

  if (!keyFilename) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS tanımlı değil — backend/.env dosyasına anahtar yolunu ekleyin.",
    );
  }
  if (!fs.existsSync(keyFilename)) {
    throw new Error(`Servis hesabı dosyası bulunamadı: ${keyFilename}`);
  }
  if (!datasetId) {
    throw new Error(
      "BIGQUERY_DATASET tanımlı değil — backend/.env dosyasına dataset adını ekleyin (ör. ocakbasi_verisi).",
    );
  }

  const bigquery = new BigQuery({
    keyFilename,
    projectId: process.env.GCP_PROJECT_ID || undefined,
  });
  dataset = bigquery.dataset(datasetId);
  return dataset;
}

// Bağlantı durumunu güvenli şekilde raporlar — hata fırlatmaz.
export async function bigQueryDurum() {
  try {
    const ds = getDataset();
    const [varMi] = await ds.exists();
    return {
      yapilandirildi: true,
      dataset: process.env.BIGQUERY_DATASET,
      ulasilebilir: varMi,
    };
  } catch (err) {
    return { yapilandirildi: false, hata: err.message };
  }
}
