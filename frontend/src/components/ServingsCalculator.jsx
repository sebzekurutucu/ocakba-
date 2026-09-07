import { useState } from 'react'
import { formatMiktar } from '../utils/format'
import './ServingsCalculator.css'

const MIN_PORSIYON = 1
const MAX_PORSIYON = 12

function ServingsCalculator({ tarif }) {
  const [porsiyon, setPorsiyon] = useState(tarif.baz_porsiyon)

  function degistir(fark) {
    setPorsiyon((mevcut) =>
      Math.max(MIN_PORSIYON, Math.min(MAX_PORSIYON, mevcut + fark)),
    )
  }

  return (
    <section className="calc-section">
      <div>
        <h2>Kişi sayısı değişince ölçüler de değişsin</h2>
        <p>
          Her tarifte porsiyon sayısını ayarla, malzeme miktarları anında
          güncellensin. Alışveriş listesi çıkarmak da bu kadar kolay.
        </p>
      </div>

      <div className="calc-box">
        <div className="calc-recipe-name">{tarif.ad}</div>
        <div className="calc-recipe-sub">Hazırlık {tarif.sure_dk} dk</div>

        <div className="servings-control">
          <button
            type="button"
            className="servings-btn"
            onClick={() => degistir(-1)}
            disabled={porsiyon <= MIN_PORSIYON}
            aria-label="Porsiyonu azalt"
          >
            –
          </button>
          <div className="servings-val">{porsiyon} kişilik</div>
          <button
            type="button"
            className="servings-btn"
            onClick={() => degistir(1)}
            disabled={porsiyon >= MAX_PORSIYON}
            aria-label="Porsiyonu artır"
          >
            +
          </button>
        </div>

        <div>
          {tarif.malzemeler.map((malzeme) => {
            const olcekli =
              (malzeme.miktar / tarif.baz_porsiyon) * porsiyon
            return (
              <div className="ing-row" key={malzeme.ad}>
                <span>{malzeme.ad}</span>
                <span>
                  {formatMiktar(olcekli)} {malzeme.birim}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServingsCalculator
