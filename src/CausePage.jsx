// CausePage.jsx shows one cause in full: a picture, the description, its sessions
// and events, news from the organisation, and what the student can do:
// Sign up, Save, Share and Invite friends. Donating is an optional demo link.
import { useState } from 'react'
import { causeLook } from './causeColors'
import SessionDetails from './SessionDetails'
import EventCard from './EventCard'
import InviteFriends from './InviteFriends'
import DemoPledge from './DemoPledge'
import { spotsFor } from './causeRows'
import { organisationOfCause } from './data/organisations'
import FollowButton from './FollowButton'
import './CausePage.css'

// { cause } is the cause to show. { surprise } is true when opened from Surprise me.
// { events } are this cause's events. { updates } are the organisation's posts for it.
// { signupEntry } is the student's sign-up for this cause, or undefined. { userRegion } is for the travel tag.
// { isFavourite } and { onToggleFavourite } handle saving. { friendIds } and { onInvite } are for invites.
// { onSignUp } opens the sign-up screen. { onAction } records Share and the demo pledge.
// { onBack } returns to Home.
function CausePage({
    cause, surprise, events, updates, signupEntry, userRegion, following, onToggleFollow, onOpenOrg,
    isFavourite, onToggleFavourite, backLabel, friendIds, onInvite, onSignUp, onAction, onBack,
}) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const donate = cause.actions.find((action) => action.type === "donate")
    const look = causeLook(cause.id)
    const org = organisationOfCause(cause.id)
    const isSignedUp = Boolean(signupEntry)
    const spots = spotsFor(cause, signupEntry)

    // What is open under the buttons: nothing, the invite picker or the demo pledge.
    const [panel, setPanel] = useState(null)
    const [message, setMessage] = useState("")

    function handleShare() {
        onAction(cause.id, "share")
        setPanel(null)
        setMessage(`Thanks for sharing ${cause.name}. (Demo: nothing is posted anywhere.)`)
    }

    function handlePledge() {
        onAction(cause.id, "donate")
        setPanel(null)
        setMessage(`Thanks for your demo pledge to ${cause.name}. No money was taken.`)
    }

    const saved = isFavourite("cause", cause.id)
    const visibleEvents = events.filter((event) => event.status === "approved" || event.source === "student")

    return (
        <div className="cause-page">
            <button className="cause-back" onClick={onBack}>← Back to {backLabel}</button>

            <div className="card cause-page-card">
                {surprise && (
                    <p className="cause-surprise">
                        <span aria-hidden="true">🎲</span> Surprise pick: not one of your usual matches, but you might enjoy it.
                    </p>
                )}

                {/* The cause's picture: an image if the cause has one, otherwise its colour and emoji. */}
                <div className="cause-picture" style={{ '--cause-color': look.color }}>
                    {cause.image
                        ? <img src={cause.image} alt={cause.name}/>
                        : <span aria-hidden="true">{look.emoji}</span>}
                </div>

                <h2>{cause.name}</h2>
                <p className="cause-page-description">{cause.description}</p>

                <div className="cause-org" style={{ '--org-color': org.color }}>
                    <span className="cause-org-mark" aria-hidden="true">{org.emoji}</span>
                    <div>
                        <small>Run by</small>
                        <button className="cause-org-name" onClick={() => onOpenOrg(org.id)}>{org.name} →</button>
                    </div>
                    <FollowButton following={following(org.id)} onToggle={() => onToggleFollow(org.id)} name={org.name} size="small"/>
                </div>

                <div className="cause-buttons">
                    <button className="button-primary" onClick={onSignUp}>
                        {isSignedUp ? "Change my sign-up" : "Sign up"}
                    </button>
                    <button
                        className="cause-button"
                        aria-pressed={saved}
                        onClick={() => onToggleFavourite("cause", cause.id)}
                    >
                        {saved ? "★ Saved" : "☆ Save"}
                    </button>
                    <button className="cause-button" onClick={handleShare}>↗ Share</button>
                    <button className="cause-button" onClick={() => setPanel(panel === "invite" ? null : "invite")}>
                        ✉ Invite friends
                    </button>
                </div>

                {message && <p className="cause-message" role="status">{message}</p>}

                {panel === "invite" && (
                    <InviteFriends
                        friendIds={friendIds}
                        onSend={(ids) => onInvite(cause.id, ids)}
                        onClose={() => setPanel(null)}
                    />
                )}

                {panel === "pledge" && (
                    <DemoPledge cause={cause} action={donate} onPledge={handlePledge} onBack={() => setPanel(null)}/>
                )}

                {panel !== "pledge" && (
                    <button className="cause-donate-link" onClick={() => setPanel("pledge")}>
                        Want to donate instead? It's optional (demo pledge).
                    </button>
                )}
            </div>

            {updates.length > 0 && (
                <section className="card cause-updates">
                    <h3>News from {cause.name}</h3>
                    {[...updates].reverse().map((update) => (
                        <p key={update.id} className="cause-update">
                            <span className="cause-update-date">
                                {new Date(update.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}
                            </span>
                            {update.text}
                        </p>
                    ))}
                </section>
            )}

            <section className="card cause-sessions">
                <h3>Sessions</h3>
                <div className="cause-session">
                    <strong>{signup.label}</strong>
                    <p className="cause-session-weekly">Or every week: {signup.weeklyLabel}</p>
                    <SessionDetails action={signup} weekly={false} userRegion={userRegion}/>
                    <p className="cause-session-needs">{spots.going} of {spots.total} places taken for the next session.</p>
                </div>

                {visibleEvents.length > 0 && <h4 className="cause-events-title">Coming up</h4>}
                {visibleEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        saved={isFavourite("event", event.id)}
                        onToggleSave={() => onToggleFavourite("event", event.id)}
                    />
                ))}
            </section>
        </div>
    )
}

export default CausePage
