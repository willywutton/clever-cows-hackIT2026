import Graphic from './Graphic'
import { useState } from 'react'
import { sampleStudentById } from './data/friends'
import { organisationById } from './data/organisations'
import Modal from './Modal'
import CowAvatar from './CowAvatar'
import './HerdModal.css'

function HerdModal({ app, startTab, onClose }) {
    const [tab, setTab] = useState(startTab)
    const friends = app.friendIds.map(sampleStudentById)
    const followed = app.followedOrgIds.map(organisationById)

    function go(action) {
        onClose()
        action()
    }

    return (
        <Modal title="Your people" icon="🤝" onClose={onClose}>
            <div className="herd-modal-tabs" role="tablist" aria-label="Friends or organisations">
                <button role="tab" aria-selected={tab === "friends"} onClick={() => setTab("friends")}>
                    Friends ({friends.length})
                </button>
                <button role="tab" aria-selected={tab === "following"} onClick={() => setTab("following")}>
                    Following ({followed.length})
                </button>
            </div>

            {tab === "friends" && (
                <ul className="herd-modal-list">
                    {friends.length === 0 && <li className="herd-modal-empty">No friends yet. Find people in Friends & chat.</li>}
                    {friends.map((friend) => (
                        <li key={friend.id}>
                            <CowAvatar accessories={friend.accessories} size="small" label=""/>
                            <div>
                                <strong>{friend.name}</strong>
                                <small>{friend.hoursWorked} h volunteered</small>
                            </div>
                            <button onClick={() => go(() => app.openChat(friend.id))}>Chat</button>
                            <button onClick={() => go(() => app.openFriend(friend.id))}>Profile</button>
                        </li>
                    ))}
                </ul>
            )}

            {tab === "following" && (
                <ul className="herd-modal-list">
                    {followed.length === 0 && (
                        <li className="herd-modal-empty">You're not following any organisations yet. Follow one to hear how they're doing.</li>
                    )}
                    {followed.map((org) => (
                        <li key={org.id}>
                            <span className="herd-modal-mark" style={{ background: org.color }} aria-hidden="true"><Graphic symbol={org.emoji}/></span>
                            <div>
                                <strong>{org.name}</strong>
                                <small>{org.tagline}</small>
                            </div>
                            <button onClick={() => go(() => app.openOrganisation(org.id))}>View</button>
                            <button onClick={() => app.toggleFollow(org.id)}>Unfollow</button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="modal-buttons">
                <button className="modal-secondary" onClick={onClose}>Close</button>
            </div>
        </Modal>
    )
}

export default HerdModal
