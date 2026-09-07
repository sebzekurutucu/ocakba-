import RecipeCard from './RecipeCard'
import './RecipeGrid.css'

function RecipeGrid({ tarifler, seciliId, onSec }) {
  return (
    <section>
      <div className="section-head">
        <h2>Bu hafta öne çıkanlar</h2>
        <span className="count">{tarifler.length} tarif</span>
      </div>

      {tarifler.length === 0 ? (
        <p className="grid-empty">Aramanıza uygun tarif bulunamadı.</p>
      ) : (
        <div className="recipe-grid">
          {tarifler.map((tarif) => (
            <RecipeCard
              key={tarif.id}
              tarif={tarif}
              secili={tarif.id === seciliId}
              onSec={() => onSec(tarif.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecipeGrid
