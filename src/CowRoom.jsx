// CowRoom.jsx draws Clover Cowdini's barn: a plank wall with a shelf of keepsakes from
// every cause the student has helped, and Clover in the middle wearing her accessories.
// Tapping a keepsake opens the memory behind it.
import { useState } from 'react'
import Graphic from './Graphic'
import CowFigure from './CowFigure'
import KeepsakeModal from './KeepsakeModal'
import './CowRoom.css'

// { art } is her picture (dressed as the student's helper type, see characters.js).
// { keepsakes } come from keepsakesFor() in data/keepsakes.js. { newCauseId } marks the
// one just earned. { equipped } are the accessories she's wearing.
// { happy } plays a small hop, e.g. right after she's been fed.
// { onWrite } and { onOpenCause } are used from a keepsake's memory.
function CowRoom({ art, keepsakes, newCauseId, equipped, happy, onWrite, onOpenCause }) {
    const [openId, setOpenId] = useState(null)
    const open = keepsakes.find((item) => item.cause.id === openId)

    return (
        <div className="cow-room" aria-label="Clover Cowdini's barn">
            {keepsakes.length > 0 ? (
                <ul className="cow-room-shelf" aria-label="Keepsakes">
                    {keepsakes.map((item) => (
                        <li key={item.cause.id}>
                            <button
                                className={[
                                    "cow-room-keepsake",
                                    item.level === "treasured" && "cow-room-keepsake-treasured",
                                    item.cause.id === newCauseId && "cow-room-keepsake-new",
                                ].filter(Boolean).join(" ")}
                                title={item.keepsake.name}
                                aria-label={`${item.keepsake.name}, from ${item.cause.name}`}
                                onClick={() => setOpenId(item.cause.id)}
                            >
                                <Graphic symbol={item.keepsake.symbol}/>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="cow-room-empty">
                    Clover keeps something from every place you help. Your first keepsake appears after your first session.
                </p>
            )}

            <div className={happy ? "cow-room-cow cow-room-happy" : "cow-room-cow"}>
                <CowFigure art={art} accessories={equipped} label="Clover Cowdini, dressed as your helper type, wearing her accessories"/>
            </div>

            {open && (
                <KeepsakeModal item={open} onClose={() => setOpenId(null)} onWrite={onWrite} onOpenCause={onOpenCause}/>
            )}
        </div>
    )
}

export default CowRoom
