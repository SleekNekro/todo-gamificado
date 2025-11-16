import { ShopCategory, type ShopItem } from "../types/shop";

export const SHOP_CATALOG: ShopItem[] = [
  {
    id: "deco_gnome",
    name: "Gnomo de Jardín",
    description:
      "Un simpático gnomo que cuida tu jardín. Puramente decorativo.",
    price: 50,
    category: ShopCategory.DECORATIONS,
    icon: "🧙",
    unlockLevel: 1,
  },
  {
    id: "deco_fountain",
    name: "Fuente Pequeña",
    description: "Una fuente ornamental que añade elegancia a tu jardín.",
    price: 150,
    category: ShopCategory.DECORATIONS,
    icon: "⛲",
    unlockLevel: 2,
  },
  {
    id: "deco_lamp",
    name: "Lámpara de Jardín",
    description: "Ilumina tu jardín por las noches.",
    price: 80,
    category: ShopCategory.DECORATIONS,
    icon: "💡",
    unlockLevel: 1,
  },
  {
    id: "deco_bench",
    name: "Banco de Madera",
    description: "Un lugar perfecto para descansar después de cosechar.",
    price: 120,
    category: ShopCategory.DECORATIONS,
    icon: "🪑",
    unlockLevel: 2,
  },
  {
    id: "deco_birdhouse",
    name: "Casa de Pájaros",
    description: "Atrae pájaros cantores a tu jardín.",
    price: 60,
    category: ShopCategory.DECORATIONS,
    icon: "🏠",
    unlockLevel: 1,
  },

  //bonus ??? no se si lo acabare metiendo
  {
    id: "tool_watering_can",
    name: "Regadera Dorada",
    description: "Las rutinas dan +20% más monedas al cosechar.",
    price: 500,
    category: ShopCategory.TOOLS,
    icon: "🚿",
    unlockLevel: 3,
    stock: 1, // Solo puedes comprar una
  },
  {
    id: "tool_fertilizer",
    name: "Fertilizante Premium",
    description:
      "Reduce el tiempo de crecimiento de todas las plantas en 1 día.",
    price: 800,
    category: ShopCategory.TOOLS,
    icon: "🧪",
    unlockLevel: 4,
    stock: 1,
  },
  {
    id: "tool_scarecrow",
    name: "Espantapájaros Mágico",
    description: "Las plantas tardan +1 día extra en marchitarse.",
    price: 600,
    category: ShopCategory.TOOLS,
    icon: "🌾",
    unlockLevel: 3,
    stock: 1,
  },

  //     MUEBLES PARA LA CASA
  {
    id: "furniture_sofa",
    name: "Sofá Acogedor",
    description: "Un sofá cómodo para tu sala.",
    price: 200,
    category: ShopCategory.FURNITURE,
    icon: "🛋️",
    unlockLevel: 2,
  },
  {
    id: "furniture_table",
    name: "Mesa de Comedor",
    description: "Una bonita mesa de madera.",
    price: 150,
    category: ShopCategory.FURNITURE,
    icon: "🍽️",
    unlockLevel: 1,
  },
  {
    id: "furniture_bookshelf",
    name: "Estantería",
    description: "Para tus libros de jardinería.",
    price: 180,
    category: ShopCategory.FURNITURE,
    icon: "📚",
    unlockLevel: 2,
  },
  {
    id: "furniture_bed",
    name: "Cama Cómoda",
    description: "Para descansar después de un día productivo.",
    price: 250,
    category: ShopCategory.FURNITURE,
    icon: "🛏️",
    unlockLevel: 2,
  },

  //     OUTFITS (Para cuando implementemos personalización)
  {
    id: "outfit_hat_straw",
    name: "Sombrero de Paja",
    description: "Perfecto para trabajar bajo el sol.",
    price: 100,
    category: ShopCategory.OUTFITS,
    icon: "👒",
    unlockLevel: 2,
  },
  {
    id: "outfit_overalls",
    name: "Overol de Granjero",
    description: "El outfit clásico del jardinero.",
    price: 150,
    category: ShopCategory.OUTFITS,
    icon: "👖",
    unlockLevel: 3,
  },
  {
    id: "outfit_boots",
    name: "Botas de Goma",
    description: "Para caminar por el jardín sin ensuciarte.",
    price: 80,
    category: ShopCategory.OUTFITS,
    icon: "👢",
    unlockLevel: 1,
  },
];

export const getItemsByCategory = (cat: ShopCategory): ShopItem[] => {
  return SHOP_CATALOG.filter((item) => item.category === cat);
};

export const getAvailableItems = (playerLevel: number): ShopItem[] => {
  return SHOP_CATALOG.filter(
    (item) => !item.unlockLevel || item.unlockLevel <= playerLevel
  );
};

export const getItemsById = (id: string): ShopItem | undefined => {
  return SHOP_CATALOG.find((item) => item.id === id);
};
