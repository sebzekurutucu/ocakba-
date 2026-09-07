import { useEffect, useState } from 'react'
import './App.css'

// Backend adresi — ileride .env'den okunacak.
const API_URL = 'http://localhost:3001'

function App() {
  // Backend'e bağlanabiliyor muyuz? İskelet aşamasında sadece bunu kontrol ediyoruz.
  const [apiDurum, setApiDurum] = useState('kontrol ediliyor…')

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((veri) => setApiDurum(`bağlı (${veri.durum})`))
      .catch(() => setApiDurum('bağlanılamadı'))
  }, [])

  return (
    <main className="app">
      <h1>OcakBaşı</h1>
      <p className="alt-baslik">
        Az malzemeli, hızlı tarifler — porsiyona göre otomatik hesap.
      </p>
      <p className="durum">
        Backend durumu: <strong>{apiDurum}</strong>
      </p>
      <p className="not">
        Bu yalnızca iskelet. Tarif listesi, filtreler ve porsiyon hesaplayıcı
        sonraki adımlarda eklenecek.
      </p>
    </main>
  )
}

export default App
