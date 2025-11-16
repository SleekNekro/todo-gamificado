import { useCallback } from "react";
import type { Player, PurchasedItem } from "../types";
import { generateId } from "../utils/idGenerator";
import useLocalStorage from "./useLocalStorage";

const DEFAULT_PLAYER: Player = {
  id: generateId(),
  name: "Jardinerito",
  level: 1,
  experience: 0,
  inventory: {
    coins: 0,
    fruits: {},
    purchasedItems: [],
  },
  gardenSize: 9,
  createdAt: new Date(),
};

function usePlayer() {
  const [player, setPlayer] = useLocalStorage<Player>(
    "garden-player",
    DEFAULT_PLAYER
  );

  const addCoins = useCallback(
    (amount: number) => {
      setPlayer((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          coins: prev.inventory.coins + amount,
        },
      }));
    },
    [setPlayer]
  );

  const spendCoins = useCallback(
    (amount: number): boolean => {
      if (player.inventory.coins >= amount) {
        setPlayer((prev) => ({
          ...prev,
          inventory: {
            ...prev.inventory,
            coins: prev.inventory.coins - amount,
          },
        }));
        return true;
      }
      return false;
    },
    [player.inventory.coins, setPlayer]
  );

  const addFruit = useCallback(
    (fruitName: string, quantity: number = 1) => {
      setPlayer((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          fruits: {
            ...prev.inventory.fruits,
            [fruitName]: (prev.inventory.fruits[fruitName] || 0) + quantity,
          },
        },
      }));
    },
    [setPlayer]
  );

  const sellFruit = useCallback(
    (fruitName: string, pricePerUnit: number) => {
      const quantity = player.inventory.fruits[fruitName] || 0;
      if (quantity > 0) {
        const totalValue = quantity + pricePerUnit;
        setPlayer((prev) => {
          const newFruits = { ...prev.inventory.fruits };
          delete newFruits[fruitName];

          return {
            ...prev,
            inventory: {
              ...prev.inventory,
              coins: prev.inventory.coins + totalValue,
              fruits: newFruits,
            },
          };
        });
        return totalValue;
      }
      return 0;
    },
    [player.inventory.fruits, setPlayer]
  );

  const sellAllFruits = useCallback(
    (fruitPrices: { [key: string]: number }) => {
      let totalEarned = 0;

      Object.entries(player.inventory.fruits).forEach(
        ([fruitName, quantity]) => {
          const pricePerUnit = fruitPrices[fruitName] || 10;
          totalEarned += quantity * pricePerUnit;
        }
      );
      if (totalEarned > 0) {
        setPlayer((prev) => ({
          ...prev,
          inventory: {
            ...prev.inventory,
            coins: prev.inventory.coins + totalEarned,
            fruits: {},
          },
        }));
      }
      return totalEarned;
    },
    [player.inventory.fruits, setPlayer]
  );

  const addExperience = useCallback(
    (amount: number) => {
      setPlayer((prev) => {
        const newExp = prev.experience + amount;
        const expNeededForNextLevel = prev.level * 100;

        if (newExp >= expNeededForNextLevel) {
          return {
            ...prev,
            experience: newExp - expNeededForNextLevel,
            level: prev.level + 1,
          };
        }
        return {
          ...prev,
          experience: newExp,
        };
      });
    },
    [setPlayer]
  );

  const purchaseItem = useCallback(
    (shopItemId: string, price: number): boolean => {
      if (player.inventory.coins >= price) {
        const newItem: PurchasedItem = {
          shopItemId,
          purchasedAt: new Date(),
          placed: false,
        };

        setPlayer((prev) => ({
          ...prev,
          inventory: {
            ...prev.inventory,
            coins: prev.inventory.coins - price,
            purchasedItems: [...prev.inventory.purchasedItems, newItem],
          },
        }));
        return true;
      }
      return false
    },
    [player.inventory.coins, setPlayer]
  );

  const hasItem = useCallback(
    (shopItemId: string): boolean => {
      return player.inventory.purchasedItems.some(
        (item) => item.shopItemId === shopItemId
      );
    },
    [player.inventory.purchasedItems]
  );

  return {
    player,
    addCoins,
    spendCoins,
    addFruit,
    sellFruit,
    sellAllFruits,
    addExperience,
    purchaseItem,
    hasItem,
  };
}
export default usePlayer;
