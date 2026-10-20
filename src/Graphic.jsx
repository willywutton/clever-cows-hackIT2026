import { graphicSource } from './assets/graphics'
import './Graphic.css'

// Keeps each replacement at the original icon's inherited size.
function Graphic({ symbol, size = '1em' }) {
    return (
        <img
            className="graphic"
            src={graphicSource(symbol)}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ width: size, height: size }}
        />
    )
}

export default Graphic
