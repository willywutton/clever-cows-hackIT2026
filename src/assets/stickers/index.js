// Stickers for diary pages and Social reactions. These are emoji placeholders.
// To use the team's sticker designs instead:
//   1. put the image files in this folder (src/assets/stickers)
//   2. import each one at the top, e.g.  import heartSticker from './heart.png'
//   3. add it to the sticker, e.g.       image: heartSticker
// The app shows the image when there is one, and the emoji when there isn't.

export const stickers = [
  { id: "heart", emoji: "💛", label: "Heart" },
  { id: "star", emoji: "⭐", label: "Star" },
  { id: "sun", emoji: "🌞", label: "Sunshine" },
  { id: "clover", emoji: "🍀", label: "Clover" },
  { id: "cow", emoji: "🐮", label: "Cow" },
  { id: "flower", emoji: "🌼", label: "Flower" },
  { id: "hands", emoji: "🙌", label: "High five" },
  { id: "rainbow", emoji: "🌈", label: "Rainbow" },
]

export function stickerById(id) {
  return stickers.find((sticker) => sticker.id === id)
}
