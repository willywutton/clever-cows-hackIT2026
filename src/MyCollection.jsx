// MyCollection.jsx shows the student's diary as a journal, newest entry first,
// with photos shown as instant-camera prints. It also opens the page for writing a new entry.
import { useState } from 'react'
import { causes } from './data/causes'
import JournalPage from './JournalPage'
import InstantPhoto from './InstantPhoto'
import './MyCollection.css'

// { diary } is App's list of entries: { id, causeId, message, photoUrl, at }.
// { shared } is true when the student has chosen to share their diary with friends.
// { signedUp } is App's list of sign-ups; entries can be written about those causes.
// { onWrite } opens the writing page for a cause.
function MyCollection({ diary, shared, signedUp, onWrite }) {
    const [choosing, setChoosing] = useState(false)
    const entries = [...diary].reverse()
    const signedUpCauses = signedUp.map((entry) => causes.find((c) => c.id === entry.causeId))

    // With one sign-up there is nothing to choose, so go straight to writing.
    function handleWrite() {
        if (signedUpCauses.length === 1) {
            onWrite(signedUpCauses[0].id)
        }
        else {
            setChoosing(true)
        }
    }

    return (
        <JournalPage as="section" className="diary">
            <h3 className="diary-title">My diary</h3>

            {signedUpCauses.length === 0 && (
                <p className="diary-hint">Sign up for a session first, then come back to write about how it went.</p>
            )}

            {signedUpCauses.length > 0 && !choosing && (
                <button className="diary-write" onClick={handleWrite}>
                    <span aria-hidden="true">✏️</span> Write a diary entry
                </button>
            )}

            {choosing && (
                <div className="diary-choose">
                    <p className="diary-hint">Which session is it about?</p>
                    {signedUpCauses.map((cause) => (
                        <button className="diary-write" key={cause.id} onClick={() => onWrite(cause.id)}>
                            {cause.name}
                        </button>
                    ))}
                    <button className="diary-cancel" onClick={() => setChoosing(false)}>Cancel</button>
                </div>
            )}

            {entries.map((entry, index) => {
                const cause = causes.find((c) => c.id === entry.causeId)
                const date = new Date(entry.at).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })
                return (
                    <article className="diary-entry" key={entry.id}>
                        <p className="diary-date">{date}</p>
                        <h4 className="diary-cause">{cause.name}</h4>
                        {entry.photoUrl && (
                            <InstantPhoto
                                src={entry.photoUrl}
                                alt={`Photo from ${cause.name}`}
                                caption={cause.name}
                                tilt={index % 2 === 0 ? "left" : "right"}
                            />
                        )}
                        {entry.message && <p className="diary-text">{entry.message}</p>}
                        <p className="diary-privacy">{shared ? "Shared with friends" : "🔒 Private"}</p>
                    </article>
                )
            })}
        </JournalPage>
    )
}

export default MyCollection
