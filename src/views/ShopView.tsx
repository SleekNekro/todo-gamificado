import "../styles/ShopView.css"

function ShopView() {
  return (
    <div className="shop-view">
      <h2>🏪 Tienda del Jardín</h2>
      <div className="shop-placeholder">
        <div className="placeholder-icon">🛒</div>
        <h3>¡Bienvenido a la Tienda!</h3>
        <p>Aquí podrás comprar con tus monedas:</p>
        <div className="shop-categories">
          <div className="category-card">
            <span className="category-icon">🌱</span>
            <h4>Semillas</h4>
            <p>Nuevos tipos de plantas</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🪴</span>
            <h4>Decoraciones</h4>
            <p>Embellece tu jardín</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🪑</span>
            <h4>Muebles</h4>
            <p>Decora tu casa</p>
          </div>
          <div className="category-card">
            <span className="category-icon">👔</span>
            <h4>Outfits</h4>
            <p>Viste a tu personaje</p>
          </div>
        </div>
        <p className="coming-soon">Sistema de tienda próximamente</p>
      </div>
    </div>
  );
}

export default ShopView;