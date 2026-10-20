import { useState } from 'react'
import { causes } from './data/causes'
import Graphic from './Graphic'
import Modal from './Modal'
import './CowMailbag.css'

function longDate(at) {
    return new Date(at).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
}

// { items } come from mailbagItems() in cowNotes.js. { readIds } are the ones opened.
// { name } is the student's first name, for "Dear ...". { onRead } marks one as opened.
// { onOpenOrg } and { onOpenCause } are the ways out of an opened letter.
function CowMailbag({ items, readIds, name, onRead, onOpenOrg, onOpenCause }) {
    const [openId, setOpenId] = useState(null)
    const open = items.find((item) => item.id === openId)
    const unread = items.filter((item) => !readIds.includes(item.id)).length

    function openLetter(item) {
        onRead(item.id)
        setOpenId(item.id)
    }

    function go(action, id) {
        setOpenId(null)
        action(id)
    }

    return (
        <section className="card cow-mailbag">
            <div className="cow-mailbag-head">
                <span className="cow-mailbag-icon" aria-hidden="true"><Graphic symbol="mailbox"/></span>
                <div>
                    <h3>Clover's mailbag {unread > 0 && <span className="cow-mailbag-count">{unread} new</span>}</h3>
                    <p>News and thank-yous from the organisations you help and follow.</p>
                </div>
            </div>

            {items.length === 0 && (
                <p className="cow-mailbag-empty">
                    Nothing yet. When an organisation you've helped or followed posts news or says thanks, Clover brings it here.
                </p>
            )}

            <ul className="cow-mailbag-list">
                {items.map((item) => {
                    const isUnread = !readIds.includes(item.id)
                    return (
                        <li key={item.id}>
                            <button
                                className={[
                                    "cow-envelope",
                                    item.kind === 'thanks' && "cow-envelope-thanks",
                                    isUnread && "cow-envelope-unread",
                                ].filter(Boolean).join(" ")}
                                style={{ '--org-color': item.org.color }}
                                onClick={() => openLetter(item)}
                                aria-label={`${isUnread ? "Unread " : ""}${item.kind === 'thanks' ? "thank-you" : "news"} from ${item.org.name}`}
                            >
                                <span className="cow-envelope-stamp" aria-hidden="true">
                                    <Graphic symbol={item.kind === 'thanks' ? "heart" : item.org.emoji}/>
                                </span>
                                <span className="cow-envelope-text">
                                    <strong>{item.org.name}</strong>
                                    <small>{item.kind === 'thanks' ? "Thank-you card" : "News"} · {new Date(item.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}</small>
                                    <span className="cow-envelope-preview">{item.text}</span>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ul>

            {open && (
                <Modal
                    eyebrow={open.kind === 'thanks' ? "Thank-you card" : "News"}
                    title={`From ${open.org.name}`}
                    onClose={() => setOpenId(null)}
                >
                    <div className={open.kind === 'thanks' ? "cow-letter cow-letter-thanks" : "cow-letter"}>
                        <p className="cow-letter-date">{longDate(open.at)}</p>
                        <p className="cow-letter-greeting">Dear {name},</p>
                        <p className="cow-letter-body">{open.text}</p>
                        <p className="cow-letter-sign">From everyone at {open.org.name}</p>
                    </div>
                    <div className="modal-buttons">
                        <button className="modal-secondary" onClick={() => go(onOpenOrg, open.org.id)}>About {open.org.name}</button>
                        <button className="button-primary" onClick={() => go(onOpenCause, open.causeId)}>
                            See {causes.find((c) => c.id === open.causeId).name}
                        </button>
                    </div>
                </Modal>
            )}
        </section>
    )
}

export default CowMailbag
