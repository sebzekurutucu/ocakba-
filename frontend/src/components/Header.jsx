import './Header.css'

function Header() {
  return (
    <header>
      <div className="wrap header-inner">
        <div className="logo">
          Ocak<span>Başı</span>
        </div>
        <nav>
          <a href="#">Tarifler</a>
          <a href="#">Kategoriler</a>
          <a href="#">Malzemeye Göre Ara</a>
          <a href="#">Favorilerim</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
