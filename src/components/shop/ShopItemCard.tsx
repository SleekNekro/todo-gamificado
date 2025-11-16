import type { ShopItem } from '../../types/shop';
import '../../styles/ShopItemCard.css';

interface ShopItemCardProps {
  item: ShopItem;
  canAfford: boolean;
  isPurchased: boolean;
  isLocked: boolean;
  onPurchase: (item: ShopItem) => void;
}

function ShopItemCard({ item, canAfford, isPurchased, isLocked, onPurchase }: ShopItemCardProps) {
  const handleClick = () => {
    if (!canAfford || isPurchased || isLocked) return;
    onPurchase(item);
  };

  return (
    <div className={`shop-item-card ${!canAfford ? 'cant-afford' : ''} ${isPurchased ? 'purchased' : ''} ${isLocked ? 'locked' : ''}`}>
      <div className="item-icon">{item.icon}</div>
      
      <div className="item-info">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-description">{item.description}</p>
        
        {isLocked && item.unlockLevel && (
          <div className="locked-badge">
            🔒 Nivel {item.unlockLevel} requerido
          </div>
        )}
        
        {item.stock === 1 && isPurchased && (
          <div className="purchased-badge">
            ✅ Ya comprado
          </div>
        )}
      </div>

      <div className="item-footer">
        <div className="item-price">
          <span className="price-label">Precio:</span>
          <span className="price-value">{item.price} 💰</span>
        </div>
        
        <button
          className="purchase-button"
          onClick={handleClick}
          disabled={!canAfford || isPurchased || isLocked}
        >
          {isPurchased ? 'Comprado' : isLocked ? 'Bloqueado' : !canAfford ? 'Sin fondos' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}

export default ShopItemCard;