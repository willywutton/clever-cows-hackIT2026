import { useState } from 'react'
import { myFriendCode, sampleStudentById, sampleStudents } from './data/friends'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import AddFriend from './AddFriend'
import './FriendsColumn.css'

function FriendsColumn({ friendIds, activeId, onPick, onRemove, onAdd }) {
    const [query, setQuery] = useState("")
    const search = query.trim().toLowerCase()
    const matches = (student) => student.name.toLowerCase().includes(search)
    const friends = friendIds.map(sampleStudentById).filter(matches)
    const others = search === "" ? [] : sampleStudents.filter((s) => !friendIds.includes(s.id) && matches(s))

    return (
        <section className="card friends-column">
            <div className="friends-column-head">
                <h3>Friends <span className="friends-column-count">{friendIds.length}</span></h3>
                <input
                    type="search"
                    value={query}
                    placeholder="Search or find people…"
                    aria-label="Search friends or find people to add"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <ul className="friends-column-list">
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <button className="friends-column-person" aria-pressed={friend.id === activeId} onClick={() => onPick(friend.id)}>
                            <CowAvatar accessories={friend.accessories} size="small" label=""/>
                            <span>
                                <strong>{friend.name}</strong>
                                <small>{friend.hoursWorked} h volunteered</small>
                            </span>
                        </button>
                        <button className="friends-column-remove" aria-label={`Remove ${friend.name}`} title="Remove friend" onClick={() => onRemove(friend.id)}>✕</button>
                    </li>
                ))}
                {friends.length === 0 && (
                    <li className="friends-column-empty">{search ? "No friends with that name." : "No friends yet. Search above to add some."}</li>
                )}
            </ul>

            {others.length > 0 && (
                <div className="friends-column-find">
                    <p className="eyebrow">Add a friend</p>
                    <ul className="friends-column-list">
                        {others.map((student) => (
                            <li key={student.id}>
                                <span className="friends-column-person">
                                    <CowAvatar accessories={student.accessories} size="small" label=""/>
                                    <span><strong>{student.name}</strong> <SampleTag/></span>
                                </span>
                                <button className="friends-column-add" onClick={() => onAdd(student.id)}>+ Add</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <details className="friends-column-code">
                <summary>Add by friend code</summary>
                <p>Yours is <strong>{myFriendCode}</strong>. Swap codes with a friend to connect.</p>
                <AddFriend friendIds={friendIds} onAdd={onAdd}/>
            </details>
        </section>
    )
}

export default FriendsColumn
