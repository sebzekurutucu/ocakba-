import './RecipeCard.css'

// Kart görseli için basit renk üçlüleri (arka plan + iki şekil).
const THUMB_RENKLERI = [
  ['#E8DEC4', '#C99A2E', '#AE4430'],
  ['#DCE3D2', '#2B3A2F', '#6E7B5E'],
  ['#EFE2D0', '#AE4430', '#C99A2E'],
  ['#E3D9C6', '#C99A2E', '#2B3A2F'],
  ['#EAE0CB', '#AE4430', '#7A2E22'],
  ['#DFE0C9', '#2B3A2F', '#C99A2E'],
]

function RecipeCard({ tarif, secili, onSec }) {
  const [bg, renk1, renk2] = THUMB_RENKLERI[(tarif.id - 1) % THUMB_RENKLERI.length]

  return (
    <article
      className={`recipe-card${secili ? ' secili' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={secili}
      onClick={onSec}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSec()
        }
      }}
    >
      <div className="recipe-thumb">
        <svg viewBox="0 0 200 136" width="100%" role="img" aria-label={tarif.ad}>
          <rect width="200" height="136" fill={bg} />
          <circle cx="80" cy="68" r="34" fill={renk1} />
          <circle cx="128" cy="72" r="24" fill={renk2} />
        </svg>
      </div>
      <h3>{tarif.ad}</h3>
      <p>{tarif.aciklama}</p>
      <div className="recipe-meta">
        <span>{tarif.sure_dk} dk</span>
        <span>{tarif.malzemeler.length} malzeme</span>
        <span>{tarif.baz_porsiyon} kişilik</span>
      </div>
    </article>
  )
}

export default RecipeCard
