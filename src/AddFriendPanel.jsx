// AddFriendPanel.jsx lets the student add friends: pick from a list of sample people,
// or type a friend code.
import { myFriendCode, sampleStudents } from './data/friends'
import CowAvatar from './CowAvatar'
import AddFriend from './AddFriend'
import SampleTag from './SampleTag'
import './AddFriendPanel.css'

// { friendIds } is the student's friends. { onAdd } adds one. { onClose } hides the panel.
function AddFriendPanel({ friendIds, onAdd, onClose }) {
    const others = sampleStudents.filter((student) => !friendIds.includes(student.id))

    return (
        <section className="card add-friend-panel">
            <div className="add-friend-panel-top">
                <h3>Add a friend</h3>
                <button className="add-friend-panel-close" onClick={onClose}>Done</button>
            </div>
            {others.length === 0 && <p className="add-friend-panel-empty">You've added everyone in the sample list.</p>}
            <ul className="add-friend-panel-list">
                {others.map((student) => (
                    <li key={student.id}>
                        <CowAvatar accessories={student.accessories} size="small" label={`${student.name}'s cow`}/>
                        <span className="add-friend-panel-name">{student.name} <SampleTag/></span>
                        <button onClick={() => onAdd(student.id)}>+ Add</button>
                    </li>
                ))}
            </ul>
            <p className="add-friend-panel-or">
                Or swap friend codes. Yours is <strong className="add-friend-panel-code">{myFriendCode}</strong>.
            </p>
            <AddFriend friendIds={friendIds} onAdd={onAdd}/>
        </section>
    )
}

export default AddFriendPanel
