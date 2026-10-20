import { TREASURED_VISITS } from './data/keepsakes'
import Graphic from './Graphic'
import Modal from './Modal'
import './KeepsakeModal.css'

function shortDate(at) {
    return new Date(at).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
}

function KeepsakeModal({ item, onClose, onWrite, onOpenCause }) {
    const treasured = item.level === "treasured"
    const toGo = TREASURED_VISITS - item.visits

    function go(action) {
        onClose()
        action(item.cause.id)
    }

    return (
        <Modal
            eyebrow={treasured ? "Treasured keepsake" : "Keepsake"}
            title={item.keepsake.name}
            onClose={onClose}
        >
            <span className={treasured ? "keepsake-art keepsake-art-treasured" : "keepsake-art"} aria-hidden="true">
                <Graphic symbol={item.keepsake.symbol}/>
            </span>
            <p className="keepsake-memory">{item.keepsake.memory}</p>

            <dl className="keepsake-facts">
                <div><dt>From</dt><dd>{item.cause.name}</dd></div>
                <div><dt>First visit</dt><dd>{shortDate(item.firstAt)}</dd></div>
                <div><dt>Visits</dt><dd>{item.visits}</dd></div>
                <div><dt>Hours</dt><dd>{item.hours}</dd></div>
            </dl>

            {treasured
                ? <p className="keepsake-progress keepsake-progress-done">You keep coming back. This one's treasured.</p>
                : <p className="keepsake-progress">{toGo} more {toGo === 1 ? "visit" : "visits"} to make it treasured.</p>}

            {item.diaryEntry
                ? <blockquote className="keepsake-diary">"{item.diaryEntry.message}"</blockquote>
                : <p className="keepsake-nodiary">You haven't written about it yet.</p>}

            <div className="modal-buttons">
                {!item.diaryEntry && <button className="modal-secondary" onClick={() => go(onWrite)}>Write about it</button>}
                <button className="button-primary" onClick={() => go(onOpenCause)}>See their next session</button>
            </div>
        </Modal>
    )
}

export default KeepsakeModal
