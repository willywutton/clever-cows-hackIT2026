// store.js lists what can be bought for Clover Cowdini with Moolah, and how much each
// raises her stats. Her stats also drop a little each week (WEEKLY_STAT_DROP below).
//
// How to read one item:
//   category    accessory, grass or care
//   (Her room is filled with keepsakes from the causes the student helps, see keepsakes.js.)
//   price       in Moolah
//   stat        which stat it raises: comfort, hunger, cleanliness or happiness
//   boost       how much it raises that stat
//   consumable  true for things used up straight away (grass, washing); accessories are kept

export const CATEGORIES = [
  { id: "accessory", label: "Accessories", emoji: "🎀" },
  { id: "grass", label: "Grass", emoji: "🌾" },
  { id: "care", label: "Care", emoji: "🧼" },
]

export const STORE_ITEMS = [
  { id: "bandana", category: "accessory", name: "Red bandana", price: 10, stat: "happiness", boost: 5 },
  { id: "flower-crown", category: "accessory", name: "Flower crown", price: 15, stat: "happiness", boost: 5 },
  { id: "cowbell", category: "accessory", name: "Cowbell", price: 15, stat: "happiness", boost: 5 },
  { id: "straw-hat", category: "accessory", name: "Straw hat", price: 20, stat: "happiness", boost: 5 },
  { id: "sunglasses", category: "accessory", name: "Sunglasses", price: 20, stat: "happiness", boost: 5 },

  { id: "clover", category: "grass", name: "Clover bunch", price: 5, stat: "hunger", boost: 15, consumable: true },
  { id: "alfalfa", category: "grass", name: "Sweet alfalfa", price: 10, stat: "hunger", boost: 25, consumable: true },
  { id: "wildflower", category: "grass", name: "Wildflower mix", price: 15, stat: "hunger", boost: 35, consumable: true },

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

export const STARTING_STATS = { comfort: 35, hunger: 35, cleanliness: 35, happiness: 35 }

export const STAT_MAX = 100

// Every stat drops by this much for each full week that passes, but never below 0.
export const WEEKLY_STAT_DROP = 10
