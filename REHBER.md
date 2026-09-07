# OcakBaşı Projesi — Adım Adım Rehber

Bu rehber, sunumdan önce projeyi kurstaki yığına (React + Node/Express +
BigQuery + Vercel/Netlify + Google Analytics) uygun hale getirmek için
izleyeceğimiz sırayı anlatır. Her adımda "ne kuruyoruz / ne yapıyoruz /
terminale ne yazıyoruz" var.

---

## 0. Ön Kontrol Listesi

Aşağıdakiler bilgisayarında kurulu değilse önce onları kur:

| Araç | Kontrol komutu | Yoksa nereden |
|---|---|---|
| Node.js (v18+) | `node -v` | nodejs.org |
| Git | `git --version` | git-scm.com |
| VS Code (opsiyonel ama önerilir) | — | code.visualstudio.com |
| Claude Code | `claude --version` | `npm install -g @anthropic-ai/claude-code` |

Hesaplar:
- [ ] GitHub hesabı
- [ ] Google Cloud hesabı (BigQuery için)
- [ ] Vercel **veya** Netlify hesabı (GitHub ile giriş yapılabilir)

---

## 1. GitHub Reposunu Aç

1. github.com → **New repository**
2. İsim: `ocakbasi` (veya istediğin isim)
3. **Public** veya **Private**, README **eklemeden** oluştur.
4. Bilgisayarında bir klasör aç ve repoyu bağla:

```bash
mkdir ocakbasi
cd ocakbasi
git init
git remote add origin https://github.com/KULLANICI_ADIN/ocakbasi.git
```

---

## 2. Claude Code'u Başlat, Proje Kurallarını Koy

```bash
claude
```

Bu, Claude Code'u bu klasörde açar. İçeride şunu söyle:

> "Bu projede AGENTS.md ve PRODUCT.md dosyalarım var, onları oku ve
> projeyi buna göre kur: frontend/ klasöründe Vite ile React, backend/
> klasöründe Node + Express. Şimdilik sadece iskeleti kur, BigQuery
> bağlantısına daha geçme."

(AGENTS.md ve PRODUCT.md dosyalarını sana ayrıca verdim — bu klasöre
kopyala.)

Claude Code şunları oluşturacak:
- `frontend/` — Vite + React projesi
- `backend/` — Express sunucusu (şimdilik boş bir `/health` endpoint'i
  yeterli, "çalışıyor mu" testi için)

**Test et:**
```bash
cd frontend && npm install && npm run dev
```
Tarayıcıda `localhost:5173` açılmalı (Vite'ın varsayılan portu).

---

## 3. İlk Commit'i At

```bash
git add .
git commit -m "İskelet: frontend + backend kuruldu"
git branch -M main
git push -u origin main
```

Buradan sonra **her çalışan aşamadan sonra** commit atacağız — bu hem
"kısır döngüden çıkış" hem de sunumda "her versiyonu kaydettik" demek
için önemli.

---

## 4. Mevcut Tasarımı React'e Taşı

Elimizdeki `index.html` tasarımını (hero, filtre çubuğu, tarif kartları,
porsiyon hesaplayıcı) Claude Code'a React bileşenlerine böldürüyoruz:

> "Bu HTML/CSS tasarımını (dosyayı ekliyorum) frontend/src altında React
> bileşenlerine böl: Hero, FilterBar, RecipeGrid, RecipeCard,
> ServingsCalculator. Şimdilik tarif verisi sabit (mock) bir dizi olsun,
> BigQuery bağlantısını sonraki adımda ekleyeceğiz."

**Test et:** `npm run dev`, tarayıcıda tasarımın aynı göründüğünü
kontrol et.

**Commit at:**
```bash
git add . && git commit -m "Tasarım React bileşenlerine taşındı"
git push
```

---

## 5. Google Cloud + BigQuery Kurulumu

1. console.cloud.google.com → mevcut Google hesabınla gir.
2. Üstten **New Project** → proje adı ver (ör. `ocakbasi`).
3. Sol menüden **BigQuery**'i aç.
4. **Create Dataset** → isim: `ocakbasi_verisi`, bölge seç.
5. Dataset'e tıkla → **Create Table** ile `tarifler` tablosunu
   AGENTS.md'deki şemaya göre oluştur (bunu Claude Code'a da
   yaptırabilirsin, adım 7'de).

**Servis hesabı anahtarı al** (backend'in BigQuery'ye bağlanabilmesi için):
1. Google Cloud Console → **IAM & Admin** → **Service Accounts**
2. **Create Service Account** → isim ver → rol: **BigQuery Data Editor**
3. Oluşan hesaba tıkla → **Keys** → **Add Key** → **JSON** → indir.
4. Bu JSON dosyasını **asla GitHub'a yükleme.**

---

## 6. Backend'i BigQuery'ye Bağla

İndirdiğin JSON dosyasını `backend/` klasörüne koy (ör.
`backend/service-account.json`), sonra Claude Code'a:

> "backend/'e @google-cloud/bigquery paketini kur. service-account.json
> dosyasını kullanarak BigQuery'ye bağlanan bir bağlantı kur. Anahtar
> yolunu ve dataset adını .env dosyasından oku. .env ve
> service-account.json dosyalarını .gitignore'a ekle."

**Kontrol et:** `.gitignore` dosyasını aç, şu satırların olduğundan emin ol:
```
.env
service-account.json
```

---

## 7. API Endpoint'lerini Yazdır

> "BigQuery'de ocakbasi_verisi dataset'i içinde tarifler adında bir tablo
> oluştur; sütunlar: id INT64, ad STRING, sure_dk INT64,
> baz_porsiyon INT64, malzemeler STRING, aciklama STRING. Sonra 5 örnek
> tarif ekle (AGENTS.md'deki örnekleri kullanabilirsin)."

Sonra:

> "Tüm tarifleri getiren bir GET /api/tarifler endpoint'i yaz; sonucu
> JSON olarak döndürsün."

**Frontend'i bağla:**

> "frontend'deki mock tarif verisini kaldır, bunun yerine backend'deki
> GET /api/tarifler endpoint'inden veri çeken bir fetch ekle. Veri
> gelene kadar 'yükleniyor', hata olursa 'tarifler yüklenemedi' mesajı
> göster."

**Test et:** Backend'i (`npm run dev` backend klasöründe) ve frontend'i
aynı anda çalıştır, tarayıcıda gerçek BigQuery verisinin geldiğini gör.

**Commit at.**

---

## 8. Google Analytics (GA4) Ekle

1. analytics.google.com → ücretsiz bir GA4 mülkü oluştur.
2. "G-" ile başlayan **Measurement ID**'yi kopyala.
3. Claude Code'a:

> "siteme G-XXXXXXX ölçüm kimliğiyle Google Analytics 4 ekle; her
> sayfada çalışsın."

**Commit at.**

---

## 9. Vercel/Netlify'a Deploy Et

1. vercel.com (veya netlify.com) → GitHub hesabınla giriş yap.
2. **Add New Project** → `ocakbasi` reposunu seç.
3. Frontend ve backend ayrı servisler olduğu için:
   - **Frontend:** kök dizin `frontend/`, build komutu `npm run build`
   - **Backend:** ayrı bir proje olarak `backend/` klasörünü deploy et,
     veya Vercel'de serverless function olarak yapılandır (Claude Code'a
     "bunu Vercel'de nasıl deploy ederim" diye sorabiliriz, o an
     karşılaştığımız hatayı birlikte çözeriz).
4. **Environment Variables** kısmına backend'in `.env` içeriğini
   (BigQuery bağlantı bilgileri) tek tek ekle — JSON dosyasının içeriğini
   burada bir ortam değişkeni olarak da saklayabiliriz.

**Canlı linki al, tarayıcıda test et.**

---

## 10. Hata ile Karşılaşırsan (Hata Ayıklama Kültürü)

- Hata mesajını **olduğu gibi kopyala**, Claude Code'a yapıştır.
- "Şunu bekliyordum, bu oldu" şeklinde tarif et.
- Görsel bir sorunsa (kayan buton, bozuk renk) ekran görüntüsü paylaş.
- Üst üste 2-3 düzeltme turu işe yaramazsa: **yeni bir Claude Code
  oturumu aç**, ya da `git log` ile son çalışan commit'e dön:
  ```bash
  git log --oneline
  git checkout <commit-hash> -- .
  ```

---

## 11. Sunum Öncesi Son Kontrol

- [ ] PRODUCT.md'deki demo akışını (problem → çözüm → değer, 3 dakika) prova et
- [ ] Canlı linkte porsiyon hesaplayıcı gerçek veriyle çalışıyor mu?
- [ ] GA4 Realtime ekranını aç, sunumda "kim geldi" gösterebilmek için
      linke birinin girmesini sağla (ör. telefonundan aç)
- [ ] GitHub reposunda commit geçmişi düzenli mi (her adım ayrı commit)?

---

## Bu Rehberi Nasıl Kullanalım

Yarın oturduğumuzda bu dosyayı sırayla takip edeceğiz — her adımda
sana hangi komutu yazacağını, Claude Code'a ne söyleyeceğini
söyleyeceğim, sen uygulayacaksın, birlikte test edip bir sonraki adıma
geçeceğiz. Takıldığın her yerde adım numarasını söylemen yeterli.
