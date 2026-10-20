import { causes } from './data/causes'
import { sampleStudentById } from './data/friends'
import { sampleIncomingInvites } from './data/sampleSocial'
import { suggestedFriends } from './herd'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import FriendsLeaderboard from './FriendsLeaderboard'
import './HerdAside.css'

function HerdAside({ app, onOpenInvites }) {
    const friends = app.friendIds.map(sampleStudentById)
    const friendHours = friends.reduce((sum, friend) => sum + friend.hoursWorked, 0)
    const goingSoon = friends.filter((friend) => friend.goingTo.length > 0).length
    const suggestions = suggestedFriends({ friendIds: app.friendIds, signedUp: app.signedUp, trait: app.quizResult }).slice(0, 3)
    const waiting = sampleIncomingInvites.filter((invite) => !app.joinedInvites.includes(invite.id))

    return (
        <aside className="herd-aside">
            <section className="card herd-stats">
                <h3>Your herd <SampleTag/></h3>
                <div className="herd-stats-grid">
                    <p><strong>{friends.length}</strong> friends</p>
                    <p><strong>{friendHours}</strong> hours given</p>
                    <p><strong>{goingSoon}</strong> going soon</p>
                </div>
            </section>

            {waiting.length > 0 && (
                <section className="card herd-invite">
                    {waiting.slice(0, 1).map((invite) => {
                        const from = sampleStudentById(invite.fromId)
                        return (
                            <p key={invite.id}>
                                <span aria-hidden="true">💌</span> <strong>{from.name}</strong> invited you to{" "}
                                <strong>{causes.find((c) => c.id === invite.causeId).name}</strong>
                            </p>
                        )
                    })}
                    <button onClick={onOpenInvites}>See invites</button>
                </section>
            )}

            {suggestions.length > 0 && (
                <section className="card herd-suggest">
                    <h3>People you may know</h3>
                    <ul>
                        {suggestions.map(({ student, reason, mutual }) => (
                            <li key={student.id}>
                                <CowAvatar accessories={student.accessories} size="small" label=""/>
                                <div>
                                    <strong>{student.name}</strong> <SampleTag/>
                                    <small>{reason}</small>
                                    {mutual.length > 0 && <small>{mutual[0].name} goes there too</small>}
                                </div>
                                <button onClick={() => app.addFriend(student.id)}>+ Add</button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <FriendsLeaderboard
                friendIds={app.friendIds}
                me={{ name: app.profile.name, hours: app.hoursWorked, accessories: app.cow.equipped }}
                showMe={app.settings.showOnLeaderboard}
            />
        </aside>
    )
}

export default HerdAside
