import { TREASURED_VISITS } from './data/keepsakes'
import Graphic from './Graphic'
import Modal from './Modal'
import Confetti from './Confetti'
import './KeepsakeModal.css'

function KeepsakeCelebration({ item, onClose, onWrite }) {
    const treasured = item.level === "treasured"

    return (
        <Modal
            eyebrow={treasured ? "Keepsake treasured" : "New keepsake"}
            title={treasured ? `${item.keepsake.name} is treasured now!` : `Clover kept ${item.keepsake.name.replace(/^A /, "a ")}!`}
            wide
            onClose={onClose}
        >
            <Confetti/>
            <span className={treasured ? "keepsake-art keepsake-art-treasured keepsake-art-pop" : "keepsake-art keepsake-art-pop"} aria-hidden="true">
                <Graphic symbol={item.keepsake.symbol}/>
            </span>
            <p className="keepsake-memory">{item.keepsake.memory}</p>
            <p>
                {treasured
                    ? `You've been to ${item.cause.name} ${item.visits} times. That kind of showing up is what keeps a place going.`
                    : `From your first visit to ${item.cause.name}. Come back ${TREASURED_VISITS - item.visits} more ${TREASURED_VISITS - item.visits === 1 ? "time" : "times"} and it becomes treasured.`}
            </p>
            <div className="modal-buttons">
                {!item.diaryEntry && (
                    <button className="modal-secondary" onClick={() => { onClose(); onWrite(item.cause.id) }}>Write about it</button>
                )}
                <button className="button-primary" onClick={onClose}>Put it on the shelf</button>
            </div>
        </Modal>
    )
}

export default KeepsakeCelebration
