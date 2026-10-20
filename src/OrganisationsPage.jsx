import { useState } from 'react'
import { causes } from './data/causes'
import { organisations } from './data/organisations'
import { causeLook } from './causeColors'
import { friendsGoingTo, sessionOf } from './causeRows'
import { CHARACTERS } from './assets/characters'
import PageTitle from './PageTitle'
import FollowButton from './FollowButton'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import './OrganisationsPage.css'

const FILTERS = [
    { id: "all", label: "All" },
    { id: "suits", label: "Suits you" },
    { id: "following", label: "Following" },
]

function shortDate(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', timeZone: 'Asia/Singapore' })
}

function OrganisationsPage({ app }) {
    const [filter, setFilter] = useState("all")
    const following = (org) => app.followedOrgIds.includes(org.id)
    const suits = (org) => org.suits.includes(app.quizResult)
    const shown = organisations.filter((org) =>
        filter === "all" || (filter === "suits" && suits(org)) || (filter === "following" && following(org)))
    const programmeCount = organisations.reduce((sum, org) => sum + org.causeIds.length, 0)

    return (
        <div className="orgs">
            <PageTitle
                title="Organisations"
                subtitle={`${organisations.length} organisations running ${programmeCount} programmes. Open one to see what they do, or jump straight to a programme.`}
            >
                <div className="orgs-filter" role="group" aria-label="Show organisations">
                    {FILTERS.map((f) => (
                        <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
                    ))}
                </div>
            </PageTitle>

            {shown.length === 0 && (
                <p className="orgs-empty">
                    {filter === "following" ? "You're not following any organisations yet. Tap + Follow on any of them." : "Nothing here right now."}
                </p>
            )}

            <div className="orgs-grid">
                {shown.map((org) => {
                    const friends = [...new Map(org.causeIds.flatMap((id) => friendsGoingTo(id, app.friendIds)).map((f) => [f.id, f])).values()]
                    const signedUpHere = org.causeIds.filter((id) => app.signedUp.some((entry) => entry.causeId === id)).length
                    return (
                        <article key={org.id} className="card orgs-card" style={{ '--org-color': org.color }}>
                            <header className="orgs-card-top">
                                <span className="orgs-card-mark" aria-hidden="true">{org.emoji}</span>
                                <div className="orgs-card-title">
                                    <h3>{org.name}</h3>
                                    <p>{org.tagline}</p>
                                </div>
                                <FollowButton following={following(org)} onToggle={() => app.toggleFollow(org.id)} name={org.name} size="small"/>
                            </header>

                            <div className="orgs-card-tags">
                                {suits(org) && (
                                    <span className="orgs-tag orgs-tag-suits">
                                        <CowAvatar face={CHARACTERS[app.quizResult].head} size="tiny" label=""/> Suits you
                                    </span>
                                )}
                                {signedUpHere > 0 && <span className="orgs-tag orgs-tag-going">✓ You're going</span>}
                                {friends.length > 0 && (
                                    <span className="orgs-tag">
                                        {friends.length} {friends.length === 1 ? "friend" : "friends"} going
                                    </span>
                                )}
                                <span className="orgs-tag">{org.followers + (following(org) ? 1 : 0)} followers <SampleTag/></span>
                            </div>

                            <div className="orgs-card-programmes">
                                <p className="eyebrow">Programmes</p>
                                <ul>
                                    {org.causeIds.map((id) => {
                                        const cause = causes.find((c) => c.id === id)
                                        const session = sessionOf(cause)
                                        return (
                                            <li key={id}>
                                                <button onClick={() => app.openCause(id)} style={{ '--cause-color': causeLook(id).color }}>
                                                    <span className="orgs-programme-mark" aria-hidden="true">{causeLook(id).emoji}</span>
                                                    <span className="orgs-programme-text">
                                                        <strong>{cause.name}</strong>
                                                        <small>Next: {shortDate(session.startsAt)} · {session.area}</small>
                                                    </span>
                                                    <span className="orgs-programme-arrow" aria-hidden="true">›</span>
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <button className="orgs-card-open" onClick={() => app.openOrganisation(org.id)}>
                                About {org.name} →
                            </button>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default OrganisationsPage
