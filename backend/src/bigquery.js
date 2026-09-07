// BigQuery bağlantısı. Kimlik bilgisi iki kaynaktan gelebilir:
//
//   1. GOOGLE_SERVICE_ACCOUNT_JSON  → servis hesabı JSON'ının tüm içeriği tek
//      satır olarak (dağıtım ortamı için; dosya sistemi yok).
//   2. GOOGLE_APPLICATION_CREDENTIALS → yerel service-account.json dosyasının
//      yolu (yerel geliştirme).
//
// Diğer değişkenler:
//   BIGQUERY_DATASET  → dataset adı (ör. ocakbasi_verisi)
//   GCP_PROJECT_ID    → opsiyonel; verilmezse kimlik bilgisinden okunur
//
// Bağlantı ilk kullanımda kurulur; kimlik bilgisi yoksa sunucu yine de açılır,
// sadece BigQuery çağrıları anlaşılır bir hata verir.

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

let client = null;
let dataset = null;

// BigQuery istemcisini döndürür (ilk çağrıda kurar).
// Kimlik bilgisi eksik/geçersizse anlaşılır bir hata fırlatır.
export function getBigQuery() {
  if (client) return client;

  const projeKimligiEnv = process.env.GCP_PROJECT_ID || undefined;

  // 1) Ortam değişkeninden JSON içeriği (dağıtım)
  const jsonIcerik = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonIcerik) {
    let credentials;
    try {
      credentials = JSON.parse(jsonIcerik);
    } catch {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT_JSON geçerli bir JSON değil.",
      );
    }
    client = new BigQuery({
      credentials,
      projectId: projeKimligiEnv || credentials.project_id,
    });
    return client;
  }

  // 2) Yerel dosyadan (yerel geliştirme)
  const keyFilename = anahtarYolu();
  if (!keyFilename) {
    throw new Error(
      "Kimlik bilgisi yok — GOOGLE_SERVICE_ACCOUNT_JSON veya GOOGLE_APPLICATION_CREDENTIALS tanımlayın.",
    );
  }
  if (!fs.existsSync(keyFilename)) {
    throw new Error(`Servis hesabı dosyası bulunamadı: ${keyFilename}`);
  }

  // Proje kimliği: .env'de yoksa anahtar dosyasından oku (yoksa kütüphane çözsün).
  let projectId = projeKimligiEnv;
  if (!projectId) {
    try {
      projectId = JSON.parse(fs.readFileSync(keyFilename, "utf8")).project_id;
    } catch {
      // yok say
    }
  }

  client = new BigQuery({ keyFilename, projectId });
  return client;
}

// BigQuery dataset bağlantısını döndürür (ilk çağrıda kurar).
// Yapılandırma eksikse anlaşılır bir hata fırlatır.
export function getDataset() {
  if (dataset) return dataset;

  const datasetId = process.env.BIGQUERY_DATASET;
  if (!datasetId) {
    throw new Error(
      "BIGQUERY_DATASET tanımlı değil — backend/.env dosyasına dataset adını ekleyin (ör. ocakbasi_verisi).",
    );
  }

  dataset = getBigQuery().dataset(datasetId);
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
