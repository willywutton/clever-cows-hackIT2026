// FriendsSection.jsx is the Friends part of the Profile: the student's own friend code,
// their friends, and a way to add or remove friends.
import { useState } from 'react'
import { myFriendCode } from './data/friends'
import { nameOf } from './people'
import AddFriend from './AddFriend'
import './FriendsSection.css'

// { friendIds } is the student's friends. { onAdd } and { onRemove } change the list.
function FriendsSection({ friendIds, onAdd, onRemove }) {
    // Shows "Copied!" for a moment after the code is copied.
    const [copied, setCopied] = useState(false)

    // Copies the code to the clipboard. Some browsers block this, so it fails quietly.
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(myFriendCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    return (
        <section className="card friends">
            <h3>Friends</h3>

            <div className="friends-code">
                <span>Your friend code</span>
                <strong>{myFriendCode}</strong>
                <button className="friends-copy" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
            </div>
            <p className="friends-hint">Swap codes with friends to add each other, then sign up together or as a relay group.</p>

            {friendIds.length === 0 && <p className="friends-hint">No friends added yet.</p>}
            <ul className="friends-list">
                {friendIds.map((id) => (
                    <li key={id}>
                        <span>{nameOf(id)}</span>
                        <button
                            className="friends-remove"
                            aria-label={`Remove ${nameOf(id)}`}
                            onClick={() => onRemove(id)}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            <AddFriend friendIds={friendIds} onAdd={onAdd}/>
        </section>
    )
}

export default FriendsSection
