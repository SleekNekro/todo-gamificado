import { getPlantInfo } from '../data/plants';
import { TaskType } from '../types/taskTypes';
import type { ShopItem } from '../types/shop';
import InventoryPanel from '../components/shop/InventoryPanel';
import ShopCatalog from '../components/shop/ShopCatalog';
import '../styles/ShopView.css';

interface ShopViewProps {
  playerCoins: number;
  playerLevel: number;
  fruits: { [key: string]: number };
  purchasedItemIds: string[];
  onSellFruit: (fruitName: string, pricePerUnit: number) => void;
  onSellAllFruits: () => void;
  onPurchaseItem: (item: ShopItem) => void;
}

function ShopView({ 
  playerCoins, 
  playerLevel,
  fruits, 
  purchasedItemIds,
  onSellFruit,
  onSellAllFruits,
  onPurchaseItem 
}: ShopViewProps) {
  
  // Crear mapa de precios de frutas
  const getFruitPrices = () => {
    const prices: { [key: string]: number } = {};
    Object.values(TaskType).forEach(type => {
      const plantInfo = getPlantInfo(type);
      prices[plantInfo.name] = plantInfo.fruitValue;
    });
    return prices;
  };

  const handleSellAll = () => {
    onSellAllFruits();
  };

  return (
    <div className="shop-view">
      <div className="shop-header">
        <h2>🏪 Tienda del Jardín</h2>
        <p className="shop-subtitle">Vende tus cosechas y compra mejoras para tu jardín</p>
      </div>

      {/* Panel de inventario para vender frutas */}
      <InventoryPanel
        fruits={fruits}
        onSellFruit={onSellFruit}
        onSellAll={handleSellAll}
      />

      {/* Catálogo de items */}
      <ShopCatalog
        playerCoins={playerCoins}
        playerLevel={playerLevel}
        purchasedItemIds={purchasedItemIds}
        onPurchase={onPurchaseItem}
      />
    </div>
  );
}

export default ShopView;