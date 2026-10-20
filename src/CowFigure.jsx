import { ART } from './assets/cowArt'
import './CowFigure.css'

function CowFigure({ art, label, accessories = [], className = "" }) {
    const bySlot = {}
    accessories.forEach((id) => {
        const slot = ART[id] && ART[id].slot
        if (slot && !(slot === "head" && art.headwear)) {
            bySlot[slot] = id
        }
    })

    const placement = {
        '--aspect': art.aspect,
        '--centre-x': `${art.centreX * 100}%`,
        '--eyes-y': art.eyesY,
        '--chin-y': art.chinY,
    }

    return (
        <span className={`cow-figure ${className}`} style={placement} role="img" aria-label={label}>
            <img className="cow-figure-art" src={art.figure} alt="" draggable="false"/>
            {Object.entries(bySlot).map(([slot, id]) => (
                ART[id].image
                    ? <img key={slot} className={`cow-figure-${slot}`} src={ART[id].image} alt=""/>
                    : <span key={slot} className={`cow-figure-${slot}`} aria-hidden="true">{ART[id].emoji}</span>
            ))}
        </span>
    )
}

export default CowFigure
