# OcakBaşı

Az malzemeli, hızlı tarifleri filtrelenebilir şekilde sunan ve porsiyon sayısına
göre malzeme miktarlarını otomatik hesaplayan web uygulaması.

Ürün çerçevesi için [PRODUCT.md](PRODUCT.md), proje kuralları için
[AGENTS.md](AGENTS.md), adım adım kurulum rehberi için [REHBER.md](REHBER.md).

## Teknoloji Yığını

- **Frontend:** React (Vite) — `frontend/`
- **Backend:** Node.js + Express — `backend/`
- **Veritabanı:** Google BigQuery (`ocakbasi_verisi.tarifler`)
- **Yayınlama:** Vercel (tek proje: statik frontend + `/api` serverless function)

## Yerel geliştirme

İki ayrı terminal.

### Backend

```bash
cd backend
npm install
cp .env.example .env          # + backend/service-account.json ekle
npm run setup:bigquery        # dataset + tablo + örnek veri (ilk sefer)
npm run dev                   # http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

Frontend yerelde `http://localhost:3001`'e, dağıtımda aynı origin'deki `/api`'ye
istek atar (`frontend/src/api.js`).

## Vercel'e deploy (tek proje)

Kök dizindeki `vercel.json` her şeyi yönetir:

- `/api/*` istekleri → `api/index.js` serverless function (`backend/src/app.js`'i sarar)
- Diğer tüm istekler → `frontend/dist` (Vite build çıktısı), SPA fallback ile

**Vercel proje ayarları:**
| Ayar | Değer |
|---|---|
| Root Directory | *(boş — repo kökü)* |
| Framework Preset | Other |
| Build/Install/Output | `vercel.json`'dan gelir, elle girme |

**Environment Variables:**
| Değişken | Değer |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | `backend/service-account.json` içeriği, tek satır |
| `BIGQUERY_DATASET` | `ocakbasi_verisi` |

`.env` ve `service-account.json` dosyaları `.gitignore` + `.vercelignore`'da —
asla yüklenmez.

Deploy sonrası kontrol: `https://<proje>.vercel.app/` (site) ve
`https://<proje>.vercel.app/api/tarifler` (veri).

## Yapı

```
ocakbasi/
  api/index.js    → Vercel serverless function girişi (backend/src/app.js'i export eder)
  vercel.json     → /api/* → function, gerisi → frontend/dist
  package.json    → function'ın bağımlılıkları (Vercel için)
  frontend/       → React arayüzü (Vite)
  backend/        → Express API + BigQuery + kurulum betiği
  PRODUCT.md      → Ürün çerçevesi
  AGENTS.md       → Proje kuralları
  REHBER.md       → Adım adım kurulum rehberi
```
