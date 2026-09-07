import './FilterBar.css'

function FilterBar({
  arama,
  onAramaChange,
  filtreler,
  aktifFiltre,
  onFiltreChange,
}) {
  return (
    <div className="filter-bar">
      <div className="wrap filter-row">
        <input
          className="search-input"
          type="text"
          placeholder="Malzeme ya da tarif adı yaz..."
          value={arama}
          onChange={(e) => onAramaChange(e.target.value)}
        />
        {filtreler.map((filtre) => (
          <button
            key={filtre}
            type="button"
            className={`chip${filtre === aktifFiltre ? ' active' : ''}`}
            onClick={() => onFiltreChange(filtre)}
          >
            {filtre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
