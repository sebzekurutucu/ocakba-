# Proje Kuralları — OcakBaşı

## Dil ve İletişim
- Kod yorumları ve commit mesajları Türkçe olabilir, değişken/fonksiyon
  isimleri İngilizce (endüstri standardı).
- Bana açıklama yaparken Türkçe kullan.

## Teknoloji Yığını (Stack)
- **Frontend:** React (Vite ile kurulmuş)
- **Backend:** Node.js + Express
- **Veritabanı:** Google BigQuery
- **Yayınlama:** Vercel veya Netlify
- Frontend ve backend'i **tek repo** içinde `frontend/` ve `backend/`
  klasörlerinde tut.

## Güvenlik
- Hiçbir API anahtarını veya BigQuery servis hesabı JSON dosyasını
  frontend koduna KOYMA.
- Tüm gizli anahtarlar backend'deki `.env` dosyasında saklanır.
- `.env` ve servis hesabı JSON dosyası `.gitignore`'da olmalı, asla
  GitHub'a yüklenmemeli.
- BigQuery sorguları sadece backend'den yapılır, frontend doğrudan
  BigQuery'ye bağlanmaz.

## Çalışma Şekli
- Küçük adımlarla ilerle: tek seferde "tüm uygulamayı yap" isteme,
  önce iskeleti kur, sonra özellik özellik ekle.
- Her değişiklikten sonra tarayıcıda test edilecek, hata varsa hata
  mesajı olduğu gibi paylaşılacak.
- Önemli bir yapısal değişiklik öncesi (ör. veritabanı şeması, API
  route yapısı) önce planı özetle, onay bekle, sonra kodla.

## Proje Yapısı
```
ocakbasi/
  frontend/     → React arayüzü (Vite)
  backend/      → Node/Express API, BigQuery bağlantısı
  PRODUCT.md    → Ürün çerçevesi (problem, kullanıcı, MoSCoW)
  AGENTS.md     → Bu dosya
  README.md     → Kurulum talimatları
```

## Veritabanı Şeması (BigQuery)
Dataset: `ocakbasi_verisi`
Tablo: `tarifler`

| Sütun | Tip | Açıklama |
|---|---|---|
| id | INT64 | benzersiz numara |
| ad | STRING | tarif adı |
| sure_dk | INT64 | hazırlık süresi (dakika) |
| baz_porsiyon | INT64 | tarifin yazıldığı porsiyon sayısı |
| malzemeler | STRING | JSON formatında malzeme listesi |
| aciklama | STRING | kısa açıklama |
