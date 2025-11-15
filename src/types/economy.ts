export interface PlayerInventory {
  coins: number;
  fruits: FruitInventory;
  decoration: Decoration[];
}

export interface FruitInventory {
  [plantName: string]: number;
}

export interface Decoration {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: DecorationCategory;
  purchased: boolean;
  placed: boolean;
  position?: Position;
}

export enum DecorationCategory {
  GARDEN = "garden",
  HOUSE = "house",
  TOOLS = "tools",
}

export interface Position {
  x: number;
  y: number;
}
