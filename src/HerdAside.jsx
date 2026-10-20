import { useState } from 'react'
import { causes } from './data/causes'
import { sampleStudentById } from './data/friends'
import { sampleIncomingInvites } from './data/sampleSocial'
import { organisations } from './data/organisations'
import { suggestedFriends } from './herd'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import FollowButton from './FollowButton'
import FriendsLeaderboard from './FriendsLeaderboard'
import HerdModal from './HerdModal'
import { CHARACTERS } from './assets/characters'
import './HerdAside.css'

function HerdAside({ app, onOpenInvites }) {
    const [modalTab, setModalTab] = useState(null)
    const friends = app.friendIds.map(sampleStudentById)
    const friendHours = friends.reduce((sum, friend) => sum + friend.hoursWorked, 0)
    const suggestions = suggestedFriends({ friendIds: app.friendIds, signedUp: app.allSignups, trait: app.quizResult }).slice(0, 3)
    const waiting = sampleIncomingInvites.filter((invite) => !app.joinedInvites.includes(invite.id))
    const orgsToFollow = organisations
        .filter((org) => !app.followedOrgIds.includes(org.id))
        .sort((a, b) => Number(b.suits.includes(app.quizResult)) - Number(a.suits.includes(app.quizResult)))
        .slice(0, 2)

    return (
        <aside className="herd-aside">
            <section className="card herd-stats">
                <h3>Your people</h3>
                <div className="herd-stats-grid">
                    <button className="herd-stat" onClick={() => setModalTab("friends")}>
                        <strong>{friends.length}</strong> friends
                    </button>
                    <button className="herd-stat" onClick={() => setModalTab("following")}>
                        <strong>{app.followedOrgIds.length}</strong> following
                    </button>
                    <p className="herd-stat">
                        <strong>{friendHours}</strong> friends' hours <SampleTag/>
                    </p>
                </div>
                <p className="herd-stats-hint">Tap friends or following to see who they are.</p>
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

            {orgsToFollow.length > 0 && (
                <section className="card herd-suggest">
                    <h3>Organisations to follow</h3>
                    <ul>
                        {orgsToFollow.map((org) => (
                            <li key={org.id}>
                                <span className="herd-org-mark" style={{ background: org.color }} aria-hidden="true">{org.emoji}</span>
                                <div>
                                    <button className="herd-org-name" onClick={() => app.openOrganisation(org.id)}>{org.name}</button>
                                    <small>{org.suits.includes(app.quizResult) ? `Suits ${CHARACTERS[app.quizResult].name.replace("The ", "")}s like you` : org.tagline}</small>
                                </div>
                                <FollowButton following={false} onToggle={() => app.toggleFollow(org.id)} name={org.name} size="small"/>
                            </li>
                        ))}
                    </ul>
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
                                <button className="herd-add" onClick={() => app.addFriend(student.id)}>+ Add</button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <FriendsLeaderboard
                friendIds={app.friendIds}
                me={{ name: app.profile.name, hours: app.hoursWorked, accessories: [], face: CHARACTERS[app.quizResult].head }}
                showMe={app.settings.showOnLeaderboard}
            />

            {modalTab && <HerdModal app={app} startTab={modalTab} onClose={() => setModalTab(null)}/>}
        </aside>
    )
}

export default HerdAside
