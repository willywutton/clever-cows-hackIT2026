import Graphic from './Graphic'
import { causes } from './data/causes'
import { organisationById } from './data/organisations'
import { traitLabels } from './data/traits'
import { CHARACTERS } from './assets/characters'
import { friendsGoingTo } from './causeRows'
import { organisationPosts } from './herd'
import { joinNames } from './people'
import CauseTile from './CauseTile'
import EventTile from './EventTile'
import OrgPostCard from './OrgPostCard'
import FollowButton from './FollowButton'
import CowAvatar from './CowAvatar'
import './OrganisationPage.css'

function OrganisationPage({ app, backLabel, onBack }) {
    const org = organisationById(app.openOrgId)
    const following = app.followedOrgIds.includes(org.id)
    const programmes = org.causeIds.map((id) => causes.find((c) => c.id === id))
    const events = app.events
        .filter((event) => org.causeIds.includes(event.causeId) && event.status === "approved")
        .sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1))
    const posts = organisationPosts(app.orgUpdates).filter((post) => post.org.id === org.id)
    const visits = app.attendance.filter((visit) => org.causeIds.includes(visit.causeId))
    const hoursHere = visits.reduce((sum, visit) => sum + visit.hours, 0)
    const friendsHere = [...new Map(org.causeIds.flatMap((id) => friendsGoingTo(id, app.friendIds)).map((f) => [f.id, f])).values()]

    return (
        <div className="org-page">
            <button className="org-page-back" onClick={onBack}>← Back{backLabel ? ` to ${backLabel}` : ""}</button>

            <header className="card org-page-hero" style={{ '--org-color': org.color }}>
                <span className="org-page-mark" aria-hidden="true"><Graphic symbol={org.emoji}/></span>
                <div className="org-page-title">
                    <p className="eyebrow">Organisation</p>
                    <h1>{org.name}</h1>
                    <p>{org.tagline}</p>
                </div>
                <div className="org-page-follow">
                    <FollowButton following={following} onToggle={() => app.toggleFollow(org.id)} name={org.name}/>
                    <span>{org.followers + (following ? 1 : 0)} followers</span>
                </div>
            </header>

            {following && (
                <p className="org-page-following">
                    <span aria-hidden="true"><Graphic symbol="bell"/></span> You'll hear their updates in your Social feed and from Clover on Home.
                </p>
            )}

            <div className="org-page-columns">
                <div className="org-page-main">
                    <section className="card org-page-section">
                        <h3>About</h3>
                        <p>{org.about}</p>
                        <h4>What volunteers do</h4>
                        <ul className="org-page-checks">
                            {org.volunteers.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </section>

                    <section className="org-page-section">
                        <h3>Programmes you can join</h3>
                        <div className="org-page-grid">
                            {programmes.map((cause) => (
                                <CauseTile
                                    key={cause.id}
                                    cause={cause}
                                    entry={app.signedUp.find((entry) => entry.causeId === cause.id)}
                                    friends={friendsGoingTo(cause.id, app.friendIds)}
                                    userRegion={app.profile.region}
                                    onOpen={(id) => app.openCause(id)}
                                />
                            ))}
                        </div>
                    </section>

                    {events.length > 0 && (
                        <section className="org-page-section">
                            <h3>Upcoming events</h3>
                            <div className="org-page-grid">
                                {events.map((event) => (
                                    <EventTile key={event.id} event={event} cause={causes.find((c) => c.id === event.causeId)} onOpen={(id) => app.openCause(id)}/>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="org-page-section">
                        <h3>Latest from {org.name}</h3>
                        {posts.length === 0 && <p className="org-page-note">No posts yet.</p>}
                        {posts.map((post) => (
                            <OrgPostCard
                                key={post.id}
                                post={post}
                                liked={Boolean(app.likes[post.id])}
                                onToggleLike={() => app.toggleLike(post.id)}
                            />
                        ))}
                    </section>
                </div>

                <aside className="org-page-side">
                    <section className="card org-page-section org-page-you">
                        <h3>You and {org.name}</h3>
                        {visits.length > 0
                            ? <p><strong>{hoursHere} {hoursHere === 1 ? "hour" : "hours"}</strong> given over {visits.length} {visits.length === 1 ? "visit" : "visits"}. They couldn't do it without you.</p>
                            : <p>You haven't volunteered here yet. Any programme is a good place to start.</p>}
                        {friendsHere.length > 0 && (
                            <p className="org-page-friends">
                                <span className="org-page-faces">
                                    {friendsHere.map((f) => <CowAvatar key={f.id} accessories={f.accessories} size="tiny" label=""/>)}
                                </span>
                                {joinNames(friendsHere.map((f) => f.name))} {friendsHere.length === 1 ? "is" : "are"} going
                            </p>
                        )}
                    </section>

                    <section className="card org-page-section">
                        <h3>Good to know</h3>
                        <ul className="org-page-facts">
                            {org.goodToKnow.map((fact) => (
                                <li key={fact.label}>
                                    <span aria-hidden="true"><Graphic symbol={fact.icon}/></span>
                                    <div><strong>{fact.label}</strong><p>{fact.text}</p></div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="card org-page-section">
                        <h3>Roles suit</h3>
                        <ul className="org-page-suits">
                            {org.suits.map((trait) => (
                                <li key={trait} className={trait === app.quizResult ? "org-page-suits-you" : undefined}>
                                    <CowAvatar face={CHARACTERS[trait].head} size="small" label=""/>
                                    <span>
                                        <strong>{CHARACTERS[trait].name}</strong>
                                        <small>{traitLabels[trait].label}</small>
                                    </span>
                                    {trait === app.quizResult && <em>You</em>}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="card org-page-section">
                        <h3>Their impact</h3>
                        <div className="org-page-impact">
                            {org.impact.map((item) => (
                                <p key={item.label}><strong>{item.value}</strong>{item.label}</p>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    )
}

export default OrganisationPage
