import './Hero.css'

function Hero() {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <h1>Bugün ne pişirsem, diye sorma.</h1>
          <p>
            Az malzemeyle, kısa sürede, gerçekten işe yarayan tarifler. Her
            tarifte kişi sayısına göre otomatik ölçü ayarı var.
          </p>
          <div className="hero-stats">
            <div>
              <div className="stat-num">340+</div>
              <div className="stat-label">test edilmiş tarif</div>
            </div>
            <div>
              <div className="stat-num">15 dk</div>
              <div className="stat-label">ortalama hazırlık</div>
            </div>
            <div>
              <div className="stat-num">5</div>
              <div className="stat-label">malzeme veya daha az</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <svg viewBox="0 0 320 200" width="100%" role="presentation">
            <ellipse cx="160" cy="150" rx="120" ry="14" fill="#1D2721" opacity="0.4" />
            <circle cx="160" cy="100" r="80" fill="#F2ECDD" />
            <circle cx="160" cy="100" r="80" fill="none" stroke="#C99A2E" strokeWidth="3" />
            <path
              d="M110 90 Q160 60 210 90"
              stroke="#AE4430"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="130" cy="110" r="7" fill="#AE4430" />
            <circle cx="160" cy="120" r="7" fill="#C99A2E" />
            <circle cx="190" cy="110" r="7" fill="#2B3A2F" />
            <circle cx="145" cy="130" r="6" fill="#C99A2E" />
            <circle cx="175" cy="130" r="6" fill="#AE4430" />
          </svg>
        </div>
      </section>
    </div>
  )
}

export default Hero
