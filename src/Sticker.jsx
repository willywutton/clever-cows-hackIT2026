// Sticker.jsx draws the team's artwork when supplied, otherwise a cartoon graphic.
import Graphic from './Graphic'
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
        : <span className={`sticker sticker-${size}`} role="img" aria-label={sticker.label}><Graphic symbol={sticker.id}/></span>
}

export default Sticker
