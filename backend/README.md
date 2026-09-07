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
   GitHub'a yüklenmez.** Servis hesabının rolleri: **BigQuery Data Editor** +
   **BigQuery Job User**.
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

## Dataset + tabloyu kur

Servis hesabı JSON'u ve `.env` hazır olduğunda `tarifler` tablosunu oluşturup
örnek verileri eklemek için:

```bash
npm run setup:bigquery
```

Bu betik (`scripts/setup-bigquery.js`):
- `ocakbasi_verisi` dataset'ini oluşturur (yoksa)
- `tarifler` tablosunu şemayla oluşturur: `id INT64, ad STRING, sure_dk INT64,
  baz_porsiyon INT64, malzemeler STRING, aciklama STRING`
- Tablo boşsa `src/data/ornekTarifler.js` içindeki 6 örnek tarifi yükler
- Tekrar çalıştırmak güvenli: var olan dataset/tabloyu yeniden oluşturmaz, dolu
  tabloya veri eklemez
- Yeniden yüklemek için: `npm run setup:bigquery -- --sifirla`

Veri "load job" ile yüklenir; bu, faturalama kapalı BigQuery sandbox'ında da
ücretsiz çalışır (sandbox'ta `INSERT`/DML yasaktır).

## Endpoint'ler

| Metot | Yol | Açıklama |
|---|---|---|
| GET | `/` | API çalışıyor mu kontrolü |
| GET | `/health` | Sağlık kontrolü (`{ durum: "ok", zaman: ... }`) |
| GET | `/health/bigquery` | BigQuery bağlantı durumu |
| GET | `/api/tarifler` | Tüm tarifler (JSON dizi). BigQuery'ye ulaşılamazsa `503 { hata: "tarifler yüklenemedi" }` |

## Yapı

```
backend/
  src/
    index.js          → Express uygulaması, giriş noktası
    bigquery.js       → BigQuery bağlantısı (.env'den okur)
    data/
      ornekTarifler.js → kuruluma eklenecek örnek tarifler
    routes/
      health.js       → /health ve /health/bigquery
      tarifler.js     → /api/tarifler
  scripts/
    setup-bigquery.js → dataset + tarifler tablosu + örnek veri
  .env.example        → ortam değişkeni şablonu (.env buradan kopyalanır)
```
