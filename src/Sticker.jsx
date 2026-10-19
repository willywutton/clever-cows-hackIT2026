// Sticker.jsx draws one sticker: the team's artwork if it has been added, otherwise its emoji.
import { stickerById } from './assets/stickers'
import './Sticker.css'

// { id } is a sticker id from src/assets/stickers. { size } is "small" or "large".
function Sticker({ id, size = "small" }) {
    const sticker = stickerById(id)
    if (!sticker) {
        return null
    }
    return sticker.image
        ? <img className={`sticker sticker-${size}`} src={sticker.image} alt={sticker.label}/>
        : <span className={`sticker sticker-${size}`} role="img" aria-label={sticker.label}>{sticker.emoji}</span>
}

export default Sticker
