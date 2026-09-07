import { useEffect, useMemo, useState } from 'react'
import { tarifleriGetir } from './api'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import RecipeGrid from './components/RecipeGrid'
import ServingsCalculator from './components/ServingsCalculator'
import Footer from './components/Footer'
import './App.css'

const FILTRELER = ['Hepsi', '15 dakikada', '30 dakikada']

function App() {
  const [tarifler, setTarifler] = useState([])
  const [durum, setDurum] = useState('yukleniyor') // 'yukleniyor' | 'hazir' | 'hata'

  const [arama, setArama] = useState('')
  const [aktifFiltre, setAktifFiltre] = useState('Hepsi')
  const [seciliId, setSeciliId] = useState(null)

  useEffect(() => {
    let iptal = false

    tarifleriGetir()
      .then((veri) => {
        if (iptal) return
        setTarifler(veri)
        setDurum('hazir')
      })
      .catch((err) => {
        if (iptal) return
        console.error(err)
        setDurum('hata')
      })

    return () => {
      iptal = true
    }
  }, [])

  const filtrelenmisTarifler = useMemo(() => {
    const q = arama.trim().toLocaleLowerCase('tr')
    const dakikaEsi = aktifFiltre.match(/^(\d+) dakikada$/)

    return tarifler.filter((tarif) => {
      const aramayaUyar =
        !q ||
        tarif.ad.toLocaleLowerCase('tr').includes(q) ||
        tarif.malzemeler.some((m) =>
          m.ad.toLocaleLowerCase('tr').includes(q),
        )

      const filtreyeUyar = dakikaEsi
        ? tarif.sure_dk <= Number(dakikaEsi[1])
        : true

      return aramayaUyar && filtreyeUyar
    })
  }, [tarifler, arama, aktifFiltre])

  // Hesaplayıcıda gösterilecek tarif: seçili olan; liste onu elemişse
  // listedeki ilk tarif.
  const seciliTarif =
    filtrelenmisTarifler.find((t) => t.id === seciliId) ??
    filtrelenmisTarifler[0] ??
    null

  return (
    <>
      <Header />
      <Hero />
      <FilterBar
        arama={arama}
        onAramaChange={setArama}
        filtreler={FILTRELER}
        aktifFiltre={aktifFiltre}
        onFiltreChange={setAktifFiltre}
      />
      <main className="wrap">
        {durum === 'yukleniyor' && (
          <p className="durum-mesaj">Yükleniyor…</p>
        )}
        {durum === 'hata' && (
          <p className="durum-mesaj durum-hata">Tarifler yüklenemedi.</p>
        )}
        {durum === 'hazir' && (
          <>
            <RecipeGrid
              tarifler={filtrelenmisTarifler}
              seciliId={seciliTarif?.id ?? null}
              onSec={setSeciliId}
            />
            {seciliTarif && (
              <ServingsCalculator key={seciliTarif.id} tarif={seciliTarif} />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
