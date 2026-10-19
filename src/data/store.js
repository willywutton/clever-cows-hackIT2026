// store.js lists what can be bought for Clover Cowdini with Moolah, and how much each
// raises her stats. Stats only ever go up: nothing wears off and nothing is lost.
//
// How to read one item:
//   category    furniture, accessory, grass, entertainment or care
//   price       in Moolah
//   stat        which stat it raises: comfort, hunger, cleanliness or happiness
//   boost       how much it raises that stat
//   consumable  true for things used up straight away (grass, washing); otherwise it stays in the room

export const CATEGORIES = [
  { id: "furniture", label: "Furniture", emoji: "🛋️" },
  { id: "accessory", label: "Accessories", emoji: "🎀" },
  { id: "grass", label: "Grass", emoji: "🌾" },
  { id: "entertainment", label: "Fun", emoji: "🎈" },
  { id: "care", label: "Care", emoji: "🧼" },
]

export const STORE_ITEMS = [
  { id: "lamp", category: "furniture", name: "Barn lamp", price: 15, stat: "comfort", boost: 10 },
  { id: "blanket", category: "furniture", name: "Cosy blanket", price: 20, stat: "comfort", boost: 15 },
  { id: "hay-bed", category: "furniture", name: "Hay bed", price: 30, stat: "comfort", boost: 25 },

  { id: "bandana", category: "accessory", name: "Red bandana", price: 10, stat: "happiness", boost: 5 },
  { id: "flower-crown", category: "accessory", name: "Flower crown", price: 15, stat: "happiness", boost: 5 },
  { id: "cowbell", category: "accessory", name: "Cowbell", price: 15, stat: "happiness", boost: 5 },
  { id: "straw-hat", category: "accessory", name: "Straw hat", price: 20, stat: "happiness", boost: 5 },
  { id: "sunglasses", category: "accessory", name: "Sunglasses", price: 20, stat: "happiness", boost: 5 },

  { id: "clover", category: "grass", name: "Clover bunch", price: 5, stat: "hunger", boost: 15, consumable: true },
  { id: "alfalfa", category: "grass", name: "Sweet alfalfa", price: 10, stat: "hunger", boost: 25, consumable: true },
  { id: "wildflower", category: "grass", name: "Wildflower mix", price: 15, stat: "hunger", boost: 35, consumable: true },

  { id: "ball", category: "entertainment", name: "Bouncy ball", price: 10, stat: "happiness", boost: 15 },
  { id: "music-box", category: "entertainment", name: "Music box", price: 25, stat: "happiness", boost: 25 },
  { id: "tyre-swing", category: "entertainment", name: "Tyre swing", price: 30, stat: "happiness", boost: 30 },

  { id: "brush", category: "care", name: "Brush", price: 5, stat: "cleanliness", boost: 15, consumable: true },
  { id: "wash", category: "care", name: "Bubble wash", price: 10, stat: "cleanliness", boost: 30, consumable: true },
]

// Basic grass is free: it comes from helping (see GRASS in cowStages.js).
// Feeding one handful raises Hunger by this much.
export const BASIC_GRASS_BOOST = 8

// The stats, in the order they're shown, and where every new cow starts.
export const STATS = [
  { id: "comfort", label: "Comfort", emoji: "🛋️" },
  { id: "hunger", label: "Hunger", emoji: "🌾", hint: "How full she is" },
  { id: "cleanliness", label: "Cleanliness", emoji: "🫧" },
  { id: "happiness", label: "Happiness", emoji: "💛" },
]

export const STARTING_STATS = { comfort: 20, hunger: 20, cleanliness: 20, happiness: 20 }

export const STAT_MAX = 100
