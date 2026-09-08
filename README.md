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

Kök dizindeki `vercel.json` + `package.json` her şeyi yönetir; **dashboard'da hiçbir
şey ayarlamaya gerek yok**:

- Vercel varsayılan install → kök `package.json` bağımlılıkları (function için)
- `buildCommand: npm run vercel-build` → `frontend/`'i kurar + `vite build` yapar
- `outputDirectory: frontend/dist` → statik site
- `api/index.js` → otomatik serverless function (`backend/src/app.js`'i sarar)
- rewrites: `/api/*` → function, gerisi → `index.html` (SPA fallback)

**Vercel proje ayarları:**
| Ayar | Değer |
|---|---|
| Root Directory | **boş bırak** (repo kökü) — dolu olursa kök `vercel.json` bulunamaz |
| Framework Preset | Other (veya otomatik) |
| Build / Install / Output Command | **elle girme** — `vercel.json`'dan gelir |

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
  vercel.json     → buildCommand + outputDirectory + rewrites
  package.json    → function bağımlılıkları + "vercel-build" script'i
  frontend/       → React arayüzü (Vite)
  backend/        → Express API + BigQuery + kurulum betiği
  PRODUCT.md      → Ürün çerçevesi
  AGENTS.md       → Proje kuralları
  REHBER.md       → Adım adım kurulum rehberi
```
