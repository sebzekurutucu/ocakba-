# OcakBaşı — Backend

Node.js + Express API. Şu an sadece iskelet; BigQuery bağlantısı sonraki adımda.

## Kurulum

```bash
cd backend
npm install
cp .env.example .env   # gerekirse değerleri düzenle
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3001` adresinde çalışır.

## Endpoint'ler

| Metot | Yol | Açıklama |
|---|---|---|
| GET | `/` | API çalışıyor mu kontrolü |
| GET | `/health` | Sağlık kontrolü (`{ durum: "ok", zaman: ... }`) |

## Yapı

```
backend/
  src/
    index.js          → Express uygulaması, giriş noktası
    routes/
      health.js       → /health endpoint'i
  .env.example        → ortam değişkeni şablonu (.env buradan kopyalanır)
```
