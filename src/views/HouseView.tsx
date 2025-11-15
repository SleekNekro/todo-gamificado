import '../styles/HouseView.css';

function HouseView() {
  return (
    <div className="house-view">
      <h2>🏠 Mi Casa</h2>
      <div className="house-placeholder">
        <div className="placeholder-icon">🏡</div>
        <h3>Interior de la Casa</h3>
        <p>Aquí podrás:</p>
        <ul>
          <li>🪑 Colocar muebles y decoraciones</li>
          <li>🖼️ Personalizar las paredes</li>
          <li>👔 Cambiar el outfit de tu personaje</li>
          <li>📦 Gestionar tu inventario</li>
        </ul>
        <p className="coming-soon">Próximamente con pixel art</p>
      </div>
    </div>
  );
}

export default HouseView;