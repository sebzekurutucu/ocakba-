# OcakBaşı — Backend

Node.js + Express API.

## Kurulum

```bash
cd backend
npm install
cp .env.example .env   # gerekirse değerleri düzenle
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3001` adresinde çalışır.

## BigQuery bağlantısı

1. Google Cloud'dan aldığın servis hesabı JSON dosyasını `backend/` klasörüne
   `service-account.json` adıyla koy. **Bu dosya `.gitignore`'da — asla
   GitHub'a yüklenmez.**
2. `.env` içindeki değerler:
   | Değişken | Açıklama |
   |---|---|
   | `GOOGLE_APPLICATION_CREDENTIALS` | Anahtar JSON dosyasının yolu (`./service-account.json`) |
   | `BIGQUERY_DATASET` | Dataset adı (`ocakbasi_verisi`) |
   | `GCP_PROJECT_ID` | Opsiyonel; verilmezse anahtar dosyasından okunur |
3. Kontrol: sunucuyu başlat, `http://localhost:3001/health/bigquery` adresine bak.
   Anahtar dosyası yoksa `{ yapilandirildi: false, hata: ... }`, bağlantı
   kurulunca `{ yapilandirildi: true, dataset: "ocakbasi_verisi", ulasilebilir: true }`.

Bağlantı `src/bigquery.js` içinde kurulur ve ilk kullanımda başlatılır; anahtar
dosyası eklenmemişse sunucu yine de açılır.

## Endpoint'ler

| Metot | Yol | Açıklama |
|---|---|---|
| GET | `/` | API çalışıyor mu kontrolü |
| GET | `/health` | Sağlık kontrolü (`{ durum: "ok", zaman: ... }`) |
| GET | `/health/bigquery` | BigQuery bağlantı durumu |

## Yapı

```
backend/
  src/
    index.js          → Express uygulaması, giriş noktası
    bigquery.js       → BigQuery bağlantısı (.env'den okur)
    routes/
      health.js       → /health ve /health/bigquery
  .env.example        → ortam değişkeni şablonu (.env buradan kopyalanır)
```
