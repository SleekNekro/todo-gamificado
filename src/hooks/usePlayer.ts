import { useCallback } from "react";
import type { Player } from "../types";
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
    decoration: [],
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

  const addExperience = useCallback((amount:number)=>{
    setPlayer(prev=>{
        const newExp = prev.experience + amount
        const expNeededForNextLevel = prev.level*100

        if (newExp>=expNeededForNextLevel) {
            return{
                ...prev,
                experience:newExp - expNeededForNextLevel,
                level: prev.level+1
            }
        }
        return{
            ...prev,
            experience:newExp
        }
    })
  },[setPlayer])
  
  const buyDecoration = useCallback((decoration: any) => {
    if (spendCoins(decoration.price)) {
      setPlayer(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          decorations: [...prev.inventory.decoration, { ...decoration, purchased: true }]
        }
      }));
      return true;
    }
    return false;
  }, [spendCoins, setPlayer]);

  return {
    player,
    addCoins,
    spendCoins,
    addFruit,
    sellFruit,
    addExperience,
    buyDecoration
  };
}
export default usePlayer;
