// Sabit (mock) tarif verisi.
// BigQuery'deki `tarifler` tablosunun şemasını taklit eder:
//   id, ad, sure_dk, baz_porsiyon, malzemeler, aciklama
// Not: BigQuery'de `malzemeler` JSON metni olarak tutulacak; burada
// doğrudan dizi kullanıyoruz. Fetch adımında JSON.parse ile aynı şekle
// getireceğiz. `etiketler` alanı sadece filtre çubuğu için, şemada yok.

export const recipes = [
  {
    id: 1,
    ad: 'Mercimekli bulgur pilavı',
    sure_dk: 20,
    baz_porsiyon: 4,
    aciklama: 'Dolapta ne varsa yeter, 20 dakikada hazır.',
    etiketler: ['Ekonomik', 'Tek tencere'],
    malzemeler: [
      { ad: 'Kırmızı mercimek', miktar: 1, birim: 'su bardağı' },
      { ad: 'Bulgur', miktar: 1, birim: 'su bardağı' },
      { ad: 'Soğan', miktar: 1, birim: 'adet' },
      { ad: 'Zeytinyağı', miktar: 2, birim: 'yemek kaşığı' },
    ],
  },
  {
    id: 2,
    ad: 'Fırında sebzeli tavuk',
    sure_dk: 40,
    baz_porsiyon: 3,
    aciklama: 'Tek tepside, bulaşık derdi yok.',
    etiketler: ['Tek tencere'],
    malzemeler: [
      { ad: 'Tavuk but', miktar: 3, birim: 'adet' },
      { ad: 'Patates', miktar: 2, birim: 'adet' },
      { ad: 'Havuç', miktar: 2, birim: 'adet' },
      { ad: 'Soğan', miktar: 1, birim: 'adet' },
      { ad: 'Zeytinyağı', miktar: 3, birim: 'yemek kaşığı' },
      { ad: 'Kekik', miktar: 1, birim: 'tatlı kaşığı' },
    ],
  },
  {
    id: 3,
    ad: 'Yoğurtlu patlıcan kızartması',
    sure_dk: 25,
    baz_porsiyon: 2,
    aciklama: 'Yaz akşamları için hafif ve doyurucu.',
    etiketler: ['Ekonomik'],
    malzemeler: [
      { ad: 'Patlıcan', miktar: 2, birim: 'adet' },
      { ad: 'Yoğurt', miktar: 1, birim: 'su bardağı' },
      { ad: 'Sarımsak', miktar: 1, birim: 'diş' },
      { ad: 'Zeytinyağı', miktar: 3, birim: 'yemek kaşığı' },
      { ad: 'Tuz', miktar: 1, birim: 'çay kaşığı' },
    ],
  },
  {
    id: 4,
    ad: 'Nohutlu domates çorbası',
    sure_dk: 30,
    baz_porsiyon: 5,
    aciklama: 'Soğuk günler için, artan malzemelerle.',
    etiketler: ['Ekonomik', 'Tek tencere'],
    malzemeler: [
      { ad: 'Haşlanmış nohut', miktar: 1.5, birim: 'su bardağı' },
      { ad: 'Domates', miktar: 3, birim: 'adet' },
      { ad: 'Soğan', miktar: 1, birim: 'adet' },
      { ad: 'Un', miktar: 1, birim: 'yemek kaşığı' },
      { ad: 'Tereyağı', miktar: 2, birim: 'yemek kaşığı' },
      { ad: 'Kırmızı toz biber', miktar: 1, birim: 'çay kaşığı' },
    ],
  },
  {
    id: 5,
    ad: 'Peynirli sebzeli omlet',
    sure_dk: 10,
    baz_porsiyon: 2,
    aciklama: 'Kahvaltıda ya da akşam, 10 dakikada.',
    etiketler: ['Kahvaltı', '15 dakikada', 'Tek tencere'],
    malzemeler: [
      { ad: 'Yumurta', miktar: 4, birim: 'adet' },
      { ad: 'Beyaz peynir', miktar: 100, birim: 'g' },
      { ad: 'Domates', miktar: 1, birim: 'adet' },
      { ad: 'Yeşil biber', miktar: 2, birim: 'adet' },
    ],
  },
  {
    id: 6,
    ad: 'Zeytinyağlı taze fasulye',
    sure_dk: 35,
    baz_porsiyon: 4,
    aciklama: 'Bir gün önceden yapılıp dinlenebilir.',
    etiketler: ['Ekonomik'],
    malzemeler: [
      { ad: 'Taze fasulye', miktar: 500, birim: 'g' },
      { ad: 'Soğan', miktar: 1, birim: 'adet' },
      { ad: 'Domates', miktar: 2, birim: 'adet' },
      { ad: 'Zeytinyağı', miktar: 4, birim: 'yemek kaşığı' },
      { ad: 'Toz şeker', miktar: 1, birim: 'çay kaşığı' },
    ],
  },
]
