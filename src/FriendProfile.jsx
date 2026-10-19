// FriendProfile.jsx shows a friend's profile: a banner, their cow's picture, their titles
// (only if they choose to show them), their public diary pages and their hours.
// It never shows their store or their cow's stats.
import { sampleStudentById } from './data/friends'
import { samplePublicEntries } from './data/sampleSocial'
import { causes } from './data/causes'
import { TITLES } from './titles'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import Sticker from './Sticker'
import './FriendProfile.css'

// { friendId } is the friend to show. { onBack } returns to Friends. { onChat } opens a chat.
function FriendProfile({ friendId, onBack, onChat }) {
    const friend = sampleStudentById(friendId)
    const entries = samplePublicEntries.filter((entry) => entry.authorId === friendId)

    return (
        <div className="friend-profile">
            <button className="friend-profile-back" onClick={onBack}>← Back to Friends</button>

            <section className="card friend-profile-header" style={{ '--banner': friend.banner }}>
                <div className="friend-profile-banner" aria-hidden="true"/>
                <CowAvatar accessories={friend.accessories} size="large" label={`${friend.name}'s cow`}/>
                <div className="friend-profile-text">
                    <h2>{friend.name} <SampleTag/></h2>
                    <p>{friend.about}</p>
                    <p className="friend-profile-hours"><strong>{friend.hoursWorked}</strong> hours volunteered</p>
                </div>
                <button className="friend-profile-chat" onClick={() => onChat(friendId)}>💬 Chat</button>
            </section>

            <section className="card friend-profile-titles">
                <h3>Titles</h3>
                {friend.showTitles ? (
                    <ul>
                        {friend.titles.map((id) => (
                            <li key={id}>🏅 {TITLES.find((title) => title.id === id).name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="friend-profile-hidden">{friend.name} keeps their titles private.</p>
                )}
            </section>

            <section className="card friend-profile-diary">
                <h3>Public diary pages</h3>
                {entries.length === 0 && <p className="friend-profile-hidden">No public pages yet.</p>}
                {entries.map((entry) => (
                    <article key={entry.id}>
                        <strong>{causes.find((c) => c.id === entry.causeId).name}</strong>
                        <span className="friend-profile-date">
                            {new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}
                        </span>
                        <p>{entry.message}</p>
                        <p>{entry.stickers.map((id) => <Sticker key={id} id={id}/>)}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}

export default FriendProfile
