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
   | `GOOGLE_APPLICATION_CREDENTIALS` | Anahtar JSON dosyasının yolu (`./service-account.json`) — yerel |
   | `GOOGLE_SERVICE_ACCOUNT_JSON` | Anahtar JSON'ının tüm içeriği tek satır — dağıtım. Tanımlıysa dosyanın yerine bu kullanılır |
   | `BIGQUERY_DATASET` | Dataset adı (`ocakbasi_verisi`) |
   | `GCP_PROJECT_ID` | Opsiyonel; verilmezse kimlik bilgisinden okunur |

   Yerelde `GOOGLE_APPLICATION_CREDENTIALS` + dosya; Vercel/Netlify'da dosya
   sistemi olmadığı için `GOOGLE_SERVICE_ACCOUNT_JSON` ortam değişkeni kullanılır.
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

## Vercel'e deploy (serverless function)

Backend, Vercel'de ayrı bir proje olarak deploy edilir; **Root Directory: `backend`**.

- `api/index.js` — serverless function giriş noktası, `src/app.js`'i export eder
- `vercel.json` — tüm istekleri (`/(.*)`) `/api` fonksiyonuna yönlendirir
  (rewrite), böylece `/api/tarifler`, `/health` gibi route'lar orijinal yoluyla
  Express'e ulaşır
- `src/app.js` — Express app (listen YOK); `src/index.js` sadece yerelde
  `app.listen` yapar

**Vercel Environment Variables:**
| Değişken | Değer |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | `service-account.json` içeriğinin tamamı, tek satır |
| `BIGQUERY_DATASET` | `ocakbasi_verisi` |

`.env` ve `service-account.json` `.vercelignore`'da — yüklenmez.

Deploy sonrası kontrol: `https://<proje>.vercel.app/health/bigquery`

Frontend tarafında `VITE_API_URL` ortam değişkenini bu backend URL'sine ayarla.

## Yapı

```
backend/
  api/
    index.js          → Vercel serverless function giriş noktası
  src/
    app.js            → Express uygulaması (listen yok)
    index.js          → yerel geliştirme sunucusu (app.listen)
    bigquery.js       → BigQuery bağlantısı (env'den okur)
    data/
      ornekTarifler.js → kuruluma eklenecek örnek tarifler
    routes/
      health.js       → /health ve /health/bigquery
      tarifler.js     → /api/tarifler
  scripts/
    setup-bigquery.js → dataset + tarifler tablosu + örnek veri
  vercel.json         → rewrite: /(.*) → /api
  .env.example        → ortam değişkeni şablonu (.env buradan kopyalanır)
```
