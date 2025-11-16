export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ShopCategory;
  icon: string;
  unlockLevel?: number;
  stock?: number;
}

export enum ShopCategory {
  SEEDS = "seeds",
  DECORATIONS = "decoriations",
  FURNITURE = "furniture",
  TOOLS = "tools",
  OUTFITS = "outfits",
}
