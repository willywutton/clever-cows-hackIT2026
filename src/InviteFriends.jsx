// InviteFriends.jsx is a pop-up for inviting friends to a cause. The invite is kept in
// the app and shows in the Social tab's Invites.
import { useState } from 'react'
import { sampleStudentById } from './data/friends'
import { joinNames, nameOf } from './people'
import Modal from './Modal'
import CowAvatar from './CowAvatar'
import './InviteFriends.css'

// { causeName } is the cause being shared. { friendIds } is the student's friends.
// { onSend } receives the ids picked. { onClose } closes the pop-up.
function InviteFriends({ causeName, friendIds, onSend, onClose }) {
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
        <Modal eyebrow="Invite friends" title={`Who's coming to ${causeName}?`} icon="mail" onClose={onClose}>
            {sentTo ? (
                <p className="invite-sent" role="status">Sent! {sentTo} will see your invite in their Invites.</p>
            ) : (
                <>
                    {friendIds.length === 0 && <p>Add friends in Social → Friends &amp; chat first.</p>}
                    <div className="invite-list">
                        {friendIds.map((id) => {
                            const friend = sampleStudentById(id)
                            return (
                                <label key={id} className="invite-friend">
                                    <input type="checkbox" checked={picked.includes(id)} onChange={() => toggle(id)}/>
                                    <CowAvatar accessories={friend.accessories} size="small" label=""/>
                                    <span>{friend.name}</span>
                                </label>
                            )
                        })}
                    </div>
                </>
            )}
            <div className="modal-buttons">
                <button className="modal-secondary" onClick={onClose}>{sentTo ? "Done" : "Cancel"}</button>
                {!sentTo && (
                    <button className="button-primary" onClick={handleSend} disabled={picked.length === 0}>
                        {picked.length > 0 ? `Invite ${picked.length}` : "Send invite"}
                    </button>
                )}
            </div>
        </Modal>
    )
}

export default InviteFriends
