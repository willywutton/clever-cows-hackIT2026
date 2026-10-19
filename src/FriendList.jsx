// FriendList.jsx shows the student's friends in a scrollable list, with buttons
// to view each friend's profile or chat with them.
import { sampleStudentById } from './data/friends'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import './FriendList.css'

// { friendIds } is the student's friends. { onView }, { onChat } and { onRemove } act on one friend.
function FriendList({ friendIds, onView, onChat, onRemove }) {
    return (
        <section className="card friend-list">
            <h3>Your friends ({friendIds.length})</h3>
            {friendIds.length === 0 && <p className="friend-list-empty">No friends yet. Press "Add a friend" to start.</p>}
            <ul>
                {friendIds.map((id) => {
                    const friend = sampleStudentById(id)
                    return (
                        <li key={id}>
                            <CowAvatar accessories={friend.accessories} size="small" label={`${friend.name}'s cow`}/>
                            <div className="friend-list-who">
                                <strong>{friend.name}</strong> <SampleTag/>
                                <span>{friend.about}</span>
                            </div>
                            <div className="friend-list-buttons">
                                <button onClick={() => onView(id)}>Profile</button>
                                <button onClick={() => onChat(id)}>Chat</button>
                                <button className="friend-list-remove" aria-label={`Remove ${friend.name}`} onClick={() => onRemove(id)}>✕</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default FriendList
