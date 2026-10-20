// InviteFriends.jsx lets the student pick friends to invite to a cause.
// Nothing is really sent: the invite is kept in the app and shown in the Social tab.
import { useState } from 'react'
import { joinNames, nameOf } from './people'
import './InviteFriends.css'

// { friendIds } is the student's friends. { onSend } receives the ids picked.
// { onClose } closes the picker.
function InviteFriends({ friendIds, onSend, onClose }) {
    const [picked, setPicked] = useState([])
    const [sentTo, setSentTo] = useState(null)

    function toggle(id) {
        setPicked(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id])
    }

    function handleSend() {
        onSend(picked)
        setSentTo(joinNames(picked.map(nameOf)))
        setPicked([])
    }

    return (
        <div className="invite">
            <p className="invite-title">Invite friends to come with you</p>
            {friendIds.length === 0 && <p className="invite-note">Add friends from the Friends tab first.</p>}
            <div className="invite-list">
                {friendIds.map((id) => (
                    <label key={id} className="invite-friend">
                        <input type="checkbox" checked={picked.includes(id)} onChange={() => toggle(id)}/>
                        {nameOf(id)}
                    </label>
                ))}
            </div>
            {sentTo && (
                <p className="invite-sent" role="status">
                    Invite sent to {sentTo}.
                </p>
            )}
            <div className="invite-buttons">
                <button className="invite-close" onClick={onClose}>Close</button>
                <button className="invite-send" onClick={handleSend} disabled={picked.length === 0}>Send invite</button>
            </div>
        </div>
    )
}

export default InviteFriends
