// CowAvatar.jsx is a cow's profile picture: the cow's face in a circle, wearing its
// accessories (hat or crown on top, glasses on the face, bandana or bell at the neck).
// Used for Clover Cowdini and for sample friends' cows.
import { ART, COW_FACE } from './assets/cowArt'
import './CowAvatar.css'

// Shows an item's artwork if it has one, otherwise its emoji.
function ArtPiece({ id, className }) {
    const art = ART[id]
    return art.image
        ? <img className={className} src={art.image} alt=""/>
        : <span className={className}>{art.emoji}</span>
}

// { accessories } are the ids of what the cow is wearing. { size } is "small", "medium" or "large".
// { label } describes the picture for screen readers.
function CowAvatar({ accessories = [], size = "medium", label = "Cow profile picture" }) {
    // One accessory per slot, so a hat and a crown don't sit on top of each other.
    const bySlot = {}
    accessories.forEach((id) => {
        if (ART[id] && ART[id].slot) {
            bySlot[ART[id].slot] = id
        }
    })

    return (
        <span className={`cow-avatar cow-avatar-${size}`} role="img" aria-label={label}>
            {COW_FACE.image
                ? <img className="cow-avatar-face" src={COW_FACE.image} alt=""/>
                : <span className="cow-avatar-face">{COW_FACE.emoji}</span>}
            {bySlot.head && <ArtPiece id={bySlot.head} className="cow-avatar-head"/>}
            {bySlot.face && <ArtPiece id={bySlot.face} className="cow-avatar-glasses"/>}
            {bySlot.neck && <ArtPiece id={bySlot.neck} className="cow-avatar-neck"/>}
        </span>
    )
}

export default CowAvatar
