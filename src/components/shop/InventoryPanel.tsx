import { getPlantInfo } from '../../data/plants';
import { TaskType } from '../../types/taskTypes';
import '../../styles/InventoryPanel.css';

interface InventoryPanelProps {
  fruits: { [key: string]: number };
  onSellFruit: (fruitName: string, pricePerUnit: number) => void;
  onSellAll: () => void;
}

function InventoryPanel({ fruits, onSellFruit, onSellAll }: InventoryPanelProps) {
  const fruitEntries = Object.entries(fruits);
  
  // Crear un mapa de nombre de fruta -> info de planta
  const plantInfoMap = new Map<string, any>();
  Object.values(TaskType).forEach(type => {
    const plantInfo = getPlantInfo(type);
    plantInfoMap.set(plantInfo.name, plantInfo);
  });
  
  const totalValue = fruitEntries.reduce((sum, [fruitName, quantity]) => {
    const plantInfo = plantInfoMap.get(fruitName);
    const price = plantInfo?.fruitValue || 10; // Default 10 si no se encuentra
    return sum + (quantity * price);
  }, 0);

  if (fruitEntries.length === 0) {
    return (
      <div className="inventory-panel empty">
        <h3>🧺 Tu Inventario</h3>
        <p className="empty-message">No tienes frutas para vender</p>
        <p className="hint">Cosecha plantas maduras en tu jardín para obtener frutas</p>
      </div>
    );
  }

  return (
    <div className="inventory-panel">
      <div className="inventory-header">
        <h3>🧺 Tu Inventario</h3>
        <div className="total-value">
          <span>Valor total:</span>
          <strong>{totalValue} 💰</strong>
        </div>
      </div>

      <div className="fruit-list">
        {fruitEntries.map(([fruitName, quantity]) => {
          const plantInfo = plantInfoMap.get(fruitName);

          // Si no encontramos la planta, usar valores por defecto
          if (!plantInfo) {
            console.warn(`No se encontró info para la fruta: ${fruitName}`);
            return (
              <div key={fruitName} className="fruit-item">
                <span className="fruit-icon">🍎</span>
                <div className="fruit-info">
                  <strong>{fruitName}</strong>
                  <span className="fruit-meta">x{quantity} • 10💰 cada uno</span>
                </div>
                <button
                  className="sell-button"
                  onClick={() => onSellFruit(fruitName, 10)}
                >
                  Vender ({quantity * 10}💰)
                </button>
              </div>
            );
          }

          return (
            <div key={fruitName} className="fruit-item">
              <span className="fruit-icon">{plantInfo.visual.emoji}</span>
              <div className="fruit-info">
                <strong>{fruitName}</strong>
                <span className="fruit-meta">
                  x{quantity} • {plantInfo.fruitValue}💰 cada uno
                </span>
              </div>
              <button
                className="sell-button"
                onClick={() => onSellFruit(fruitName, plantInfo.fruitValue)}
              >
                Vender ({quantity * plantInfo.fruitValue}💰)
              </button>
            </div>
          );
        })}
      </div>

      {fruitEntries.length > 1 && (
        <button className="sell-all-button" onClick={onSellAll}>
          💰 Vender Todo ({totalValue} monedas)
        </button>
      )}
    </div>
  );
}
export default InventoryPanel;