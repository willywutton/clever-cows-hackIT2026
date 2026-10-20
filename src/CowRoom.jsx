// CowRoom.jsx draws Clover Cowdini's room: a barn wall and straw floor, the furniture
// and fun things she owns, and Clover herself in the middle wearing her accessories.
import { ART } from './assets/cowArt'
import { STORE_ITEMS } from './data/store'
import CowFigure from './CowFigure'

import './CowRoom.css'

// { art } is her picture (dressed as the student's helper type, see characters.js). { owned } are the item ids she owns. { equipped } are the accessories she's wearing.
// { happy } plays a small hop, e.g. right after she's been fed.
function CowRoom({ art, owned, equipped, happy }) {
    const roomItems = STORE_ITEMS.filter((item) =>
        owned.includes(item.id) && (item.category === "furniture" || item.category === "entertainment")
    )

    return (
        <div className="cow-room" aria-label="Clover Cowdini's room">
            <ul className="cow-room-items">
                {roomItems.map((item) => (
                    <li key={item.id} title={item.name}>
                        {ART[item.id].image
                            ? <img src={ART[item.id].image} alt={item.name}/>
                            : <span role="img" aria-label={item.name}>{ART[item.id].emoji}</span>}
                    </li>
                ))}
            </ul>
            <div className={happy ? "cow-room-cow cow-room-happy" : "cow-room-cow"}>
                <CowFigure art={art} accessories={equipped} label="Clover Cowdini, dressed as your helper type, wearing her accessories"/>
            </div>
            {roomItems.length === 0 && (
                <p className="cow-room-empty">Her room is empty for now. Things you buy appear here.</p>
            )}
        </div>
    )
}

export default CowRoom
