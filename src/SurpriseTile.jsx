import Graphic from './Graphic'
import './SurpriseTile.css'

function SurpriseTile({ onSurprise }) {
    return (
        <button className="surprise-tile lift" onClick={onSurprise}>
            <span className="surprise-tile-dice" aria-hidden="true"><Graphic symbol="dice"/></span>
            <span className="surprise-tile-title">Surprise me</span>
            <span className="surprise-tile-hint">A cause outside your usual match</span>
        </button>
    )
}

export default SurpriseTile
