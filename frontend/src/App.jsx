import { useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import RecipeGrid from './components/RecipeGrid'
import ServingsCalculator from './components/ServingsCalculator'
import Footer from './components/Footer'
import './App.css'

const FILTRELER = ['Hepsi', '15 dakikada', 'Ekonomik', 'Kahvaltı', 'Tek tencere']

function App() {
  const [arama, setArama] = useState('')
  const [aktifFiltre, setAktifFiltre] = useState('Hepsi')
  const [seciliId, setSeciliId] = useState(recipes[0].id)

  const filtrelenmisTarifler = useMemo(() => {
    const q = arama.trim().toLocaleLowerCase('tr')

    return recipes.filter((tarif) => {
      const aramayaUyar =
        !q ||
        tarif.ad.toLocaleLowerCase('tr').includes(q) ||
        tarif.malzemeler.some((m) =>
          m.ad.toLocaleLowerCase('tr').includes(q),
        )

      const filtreyeUyar =
        aktifFiltre === 'Hepsi' ||
        (aktifFiltre === '15 dakikada'
          ? tarif.sure_dk <= 15
          : tarif.etiketler.includes(aktifFiltre))

      return aramayaUyar && filtreyeUyar
    })
  }, [arama, aktifFiltre])

  // Hesaplayıcıda gösterilecek tarif: seçili olan; liste onu elemişse
  // listedeki ilki; hiç sonuç yoksa ilk mock tarif.
  const seciliTarif =
    filtrelenmisTarifler.find((t) => t.id === seciliId) ??
    filtrelenmisTarifler[0] ??
    recipes[0]

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
        <RecipeGrid
          tarifler={filtrelenmisTarifler}
          seciliId={seciliTarif.id}
          onSec={setSeciliId}
        />
        <ServingsCalculator key={seciliTarif.id} tarif={seciliTarif} />
      </main>
      <Footer />
    </>
  )
}

export default App
