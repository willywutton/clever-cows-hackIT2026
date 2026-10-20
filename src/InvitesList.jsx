// InvitesList.jsx shows invites to volunteer together: ones friends sent the student
// (with a Join button that signs them up) and ones the student sent.
import { causes } from './data/causes'
import { sampleIncomingInvites } from './data/sampleSocial'
import { sampleStudentById } from './data/friends'
import { joinNames, nameOf } from './people'
import CowAvatar from './CowAvatar'
import './InvitesList.css'

// { joined } is the ids of invites already joined. { onJoin } joins one.
// { sent } is the invites the student sent from cause pages.
function InvitesList({ joined, onJoin, sent }) {
    return (
        <div className="invites">
            <section className="card invites-section">
                <h3>Invites for you</h3>
                {sampleIncomingInvites.map((invite) => {
                    const from = sampleStudentById(invite.fromId)
                    const cause = causes.find((c) => c.id === invite.causeId)
                    const isJoined = joined.includes(invite.id)
                    return (
                        <article key={invite.id} className="invite-card">
                            <CowAvatar accessories={from.accessories} size="small" label={`${from.name}'s cow`}/>
                            <div className="invite-card-text">
                                <p><strong>{from.name}</strong> invited you to <strong>{cause.name}</strong></p>
                                <p className="invite-card-note">"{invite.note}"</p>
                            </div>
                            {isJoined
                                ? <span className="invite-card-joined">Joined ✓</span>
                                : <button className="invite-card-join" onClick={() => onJoin(invite)}>Join</button>}
                        </article>
                    )
                })}
            </section>

            <section className="card invites-section">
                <h3>Invites you sent</h3>
                {sent.length === 0 && <p className="invites-empty">Use "Invite friends" on any cause page.</p>}
                {[...sent].reverse().map((invite) => (
                    <p key={invite.id} className="invite-sent-item">
                        You invited {joinNames(invite.friendIds.map(nameOf))} to{" "}
                        <strong>{causes.find((c) => c.id === invite.causeId).name}</strong>.
                    </p>
                ))}
            </section>
        </div>
    )
}

export default InvitesList
