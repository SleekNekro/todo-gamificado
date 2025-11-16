import { useState } from 'react';
import { type ShopItem, ShopCategory } from '../../types/shop';
import { SHOP_CATALOG, getAvailableItems } from '../../data/shop';
import ShopItemCard from './ShopItemCard';
import '../../styles/ShopCatalog.css';

interface ShopCatalogProps {
  playerCoins: number;
  playerLevel: number;
  purchasedItemIds: string[];
  onPurchase: (item: ShopItem) => void;
}

function ShopCatalog({ playerCoins, playerLevel, purchasedItemIds, onPurchase }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  
  const availableItems = getAvailableItems(playerLevel);
  const allItems = SHOP_CATALOG;
  
  // Filtrar por categoría
  const displayedItems = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  // Categorías con contadores
  const categories = [
    { id: 'all' as const, label: '🛒 Todo', count: allItems.length },
    { id: ShopCategory.DECORATIONS, label: '🪴 Decoraciones', count: allItems.filter(i => i.category === ShopCategory.DECORATIONS).length },
    { id: ShopCategory.TOOLS, label: '🔧 Herramientas', count: allItems.filter(i => i.category === ShopCategory.TOOLS).length },
    { id: ShopCategory.FURNITURE, label: '🪑 Muebles', count: allItems.filter(i => i.category === ShopCategory.FURNITURE).length },
    { id: ShopCategory.OUTFITS, label: '👔 Ropa', count: allItems.filter(i => i.category === ShopCategory.OUTFITS).length }
  ];

  return (
    <div className="shop-catalog">
      <div className="catalog-header">
        <h3>🏪 Catálogo de la Tienda</h3>
        <div className="player-balance">
          <span>Tu saldo:</span>
          <strong>{playerCoins} 💰</strong>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
            <span className="category-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Grid de items */}
      <div className="items-grid">
        {displayedItems.map(item => {
          const canAfford = playerCoins >= item.price;
          const isPurchased = purchasedItemIds.includes(item.id) && item.stock === 1;
          const isLocked = item.unlockLevel ? item.unlockLevel > playerLevel : false;
          
          return (
            <ShopItemCard
              key={item.id}
              item={item}
              canAfford={canAfford}
              isPurchased={isPurchased}
              isLocked={isLocked}
              onPurchase={onPurchase}
            />
          );
        })}
      </div>

      {displayedItems.length === 0 && (
        <div className="no-items">
          <p>No hay items en esta categoría</p>
        </div>
      )}
    </div>
  );
}

export default ShopCatalog;