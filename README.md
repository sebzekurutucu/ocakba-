# OcakBaşı

Az malzemeli, hızlı tarifleri filtrelenebilir şekilde sunan ve porsiyon sayısına
göre malzeme miktarlarını otomatik hesaplayan web uygulaması.

Ürün çerçevesi için [PRODUCT.md](PRODUCT.md), proje kuralları için
[AGENTS.md](AGENTS.md), adım adım kurulum rehberi için [REHBER.md](REHBER.md).

## Teknoloji Yığını

- **Frontend:** React (Vite) — `frontend/`
- **Backend:** Node.js + Express — `backend/`
- **Veritabanı:** Google BigQuery (henüz bağlanmadı)
- **Yayınlama:** Vercel veya Netlify

## Durum

Şu an **iskelet** aşaması: frontend ve backend projeleri kuruldu, birbirine ve
BigQuery'ye henüz bağlanmadı.

## Kurulum

İki ayrı terminal penceresi kullan.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

`http://localhost:3001` — kontrol: `http://localhost:3001/health`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

`http://localhost:5173` (Vite varsayılan portu)

## Yapı

```
ocakbasi/
  frontend/     → React arayüzü (Vite)
  backend/      → Node/Express API (ileride BigQuery bağlantısı)
  PRODUCT.md    → Ürün çerçevesi (problem, kullanıcı, MoSCoW)
  AGENTS.md     → Proje kuralları
  REHBER.md     → Adım adım kurulum rehberi
```
