// cowArt.js holds the pictures for Clover Cowdini's room, store items and accessories.
// They are emoji placeholders. To use real artwork instead:
//   1. put the image file in this folder (src/assets)
//   2. import it at the top, e.g.  import hatImage from './straw-hat.png'
//   3. add it to the item below, e.g.  "straw-hat": { emoji: "👒", image: hatImage, slot: "head" }
// The app shows the image when there is one, and the emoji when there isn't.
//
// For accessories, "slot" says where it sits on the cow: "head", "face" or "neck".

import { CLOVER } from './characters'

export const COW_FACE = { emoji: "🐮", image: CLOVER.head }

export const ART = {
  // Accessories
  "straw-hat": { emoji: "👒", slot: "head" },
  "flower-crown": { emoji: "🌼", slot: "head" },
  "sunglasses": { emoji: "🕶️", slot: "face" },
  "bandana": { emoji: "🧣", slot: "neck" },
  "cowbell": { emoji: "🔔", slot: "neck" },
  // Grass
  "basic-grass": { emoji: "🌱" },
  "clover": { emoji: "🍀" },
  "alfalfa": { emoji: "🌿" },
  "wildflower": { emoji: "🌸" },
  // Care
  "brush": { emoji: "🪮" },
  "wash": { emoji: "🫧" },
}
