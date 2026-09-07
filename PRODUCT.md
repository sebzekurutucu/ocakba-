# OcakBaşı — Ürün Çerçevesi

## Dört Kritik Soru

**1. Hangi problemi çözüyoruz?**
İnsanlar her gün "bugün ne pişirsem" kararsızlığı yaşıyor ve elindeki malzemeyle
ne yapabileceğini bilmediği için ya dışarıdan yemek sipariş ediyor ya da
gereksiz malzeme alıp israf ediyor.

**2. Bu problem kim için önemli?**
Evde kendine veya az kişiye yemek yapan, mutfakta çok vakit geçirmek
istemeyen biri. (Öğrenci, çalışan yetişkin, yeni ev tutmuş biri gibi somut
bir kullanıcı düşünülüyor — "herkes" değil.)

**3. Kullanıcı bu ihtiyacı bugün nasıl karşılıyor?**
Google'da rastgele arama yapıyor, YouTube'da tarif videosu izliyor, ya da
tarif sitelerinde karşısına çıkan reklam dolu, uzun hikayeli sayfalarda
malzeme ölçülerini kendi kişi sayısına göre elle hesaplıyor.

**4. Bizim çözümümüz neyi kolaylaştırıyor?**
Az malzemeli, hızlı tarifleri filtrelenebilir şekilde sunuyoruz ve porsiyon
sayısı değiştiğinde malzeme miktarlarını otomatik hesaplıyoruz — elle çarpım
yapma derdini ortadan kaldırıyoruz.

---

## Kullanıcı Hikayeleri

- **Yoğun çalışan biri olarak**, akşam eve gelince 20 dakikada yapabileceğim
  bir tarif bulmak istiyorum; çünkü uzun tarifler okuyacak enerjim yok.
- **Az kişilik bir hanede yaşayan biri olarak**, tarifin malzeme miktarlarının
  kendi kişi sayıma göre otomatik ayarlanmasını istiyorum; çünkü elle
  bölme/çarpma yaparken hata yapıyorum.
- **Dolabında sınırlı malzeme olan biri olarak**, malzemeye göre arama
  yapmak istiyorum; çünkü market alışverişine çıkmadan elimdekiyle bir
  şeyler yapmak istiyorum.

---

## MoSCoW Önceliklendirme

| Kategori | Özellik |
|---|---|
| **Must have** | Tarif listesi (BigQuery'den gelen gerçek veri), porsiyon hesaplayıcı (miktarları otomatik günceller) |
| **Should have** | Malzemeye/süreye göre filtreleme |
| **Could have** | Favorilere ekleme (giriş yapmadan, tarayıcı belleğinde) |
| **Won't have (şimdilik)** | Kullanıcı hesabı/girişi, mobil uygulama, yorum/puanlama sistemi |

---

## Kabul Kriterleri (Must-have özellikler için)

- Ana sayfa açıldığında BigQuery'deki `tarifler` tablosundan en az 5 tarif
  listelenmiş olmalı. (Evet/hayır — sayılabilir.)
- Porsiyon sayısı + / − ile değiştirildiğinde tüm malzeme miktarları aynı
  anda güncellenmiş olmalı. (Evet/hayır — gözlemlenebilir.)
- Veri BigQuery'ye ulaşamazsa kullanıcıya "tarifler yüklenemedi" mesajı
  gösterilmeli, sayfa boş kalmamalı. (Evet/hayır — hata durumu tanımlı.)

---

## Demo Akışı (3 dakika)

1. **Problem (~30 sn):** "Her akşam ne pişirsem diye telefonda 15 dakika
   geziniyoruz, sonra da 2 kişilik tarifi 4 kişiye göre elle hesaplıyoruz."
2. **Çözüm — canlı (~90 sn):** Siteyi aç → filtreyle "20 dakikada" seç →
   bir tarife tıkla → porsiyon sayısını 4'e çıkar → malzemelerin anında
   güncellendiğini göster.
3. **Değer (~45 sn):** "15 dakikalık arama + elle hesaplama → 10 saniye.
   Sırada: malzemeye göre arama."
