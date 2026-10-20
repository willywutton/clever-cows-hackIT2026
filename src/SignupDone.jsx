// SignupDone.jsx celebrates a sign-up and lays out what happens next: a ticket for the
// session, what the student earns, their goal progress, a short checklist (calendar,
// bringing a friend, finding the place, writing in the diary afterwards) and a couple
// of other causes they might like.
import { useState } from 'react'
import { describeWho, joinNames, nameOf, suggestNextTurn } from './people'
import { causeLook } from './causeColors'
import { friendsGoingTo, matchedCauses, spotsFor } from './causeRows'
import { REFLECTION_MOOLAH, visitMoolah } from './data/economy'
import { GRASS } from './assets/cowStages'
import { CHARACTERS } from './assets/characters'
import { goalById, goalProgress, progressText } from './goalProgress'
import SessionDetails from './SessionDetails'
import AddToCalendar from './AddToCalendar'
import InviteFriends from './InviteFriends'
import GoalBar from './GoalBar'
import CowFigure from './CowFigure'
import CauseTile from './CauseTile'
import Confetti from './Confetti'
import FollowButton from './FollowButton'
import { organisationOfCause } from './data/organisations'
import './SignupDone.css'

function daysUntil(startsAt) {
    const days = Math.ceil((new Date(startsAt) - new Date()) / 86400000)
    if (days <= 0) {
        return "Today"
    }
    return days === 1 ? "Tomorrow" : `In ${days} days`
}

// { app } is everything from useCleverCows. { cause } and { entry } describe the sign-up.
// { onCalendarAnswered } records that the calendar prompt was answered.
// { onHome } and { onBackToCause } are the two main ways out of this screen.
function SignupDone({ app, cause, entry, onCalendarAnswered, onHome, onBackToCause }) {
    const [inviting, setInviting] = useState(false)
    const [invited, setInvited] = useState(false)
    const signup = cause.actions.find((action) => action.type === "signup")
    const label = entry.weekly ? signup.weeklyLabel : signup.label
    const look = causeLook(cause.id)
    const org = organisationOfCause(cause.id)
    const followingOrg = app.followedOrgIds.includes(org.id)
    const character = CHARACTERS[app.quizResult]
    const spots = spotsFor(cause, entry)
    const visitsSoFar = app.attendance.filter((visit) => visit.causeId === cause.id).length
    const firstSignup = app.history.filter((item) => item.type === "signup" && item.causeId === cause.id).length <= 1
    const goal = goalById(app.profile.goal)
    const friendsToo = entry.mode !== "me" && entry.friendIds.length > 0
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${signup.area}, Singapore`)}`
    const more = matchedCauses(app.quizResult)
        .filter((c) => c.id !== cause.id && !app.signedUp.some((item) => item.causeId === c.id))
        .slice(0, 2)

    return (
        <div className="signup-done">
            <Confetti/>

            <header className="signup-done-hero">
                <CowFigure art={character} label={`${character.name} cow cheering`} className="signup-done-cow"/>
                <div>
                    <p className="eyebrow">Signed up</p>
                    <h1>You're going!</h1>
                    <p className="signup-done-sub">{cause.name}: {label}</p>
                </div>
            </header>

            <section className="signup-done-ticket" style={{ '--cause-color': look.color }}>
                <div className="signup-done-stub">
                    <span aria-hidden="true">{look.emoji}</span>
                    <strong>{daysUntil(signup.startsAt)}</strong>
                </div>
                <div className="signup-done-details">
                    <SessionDetails action={signup} weekly={entry.weekly} userRegion={app.profile.region}/>
                    <p><span aria-hidden="true">👥</span> {describeWho(entry)} · {spots.going} of {spots.total} places taken</p>
                    {entry.weekly && entry.mode === "relay" && (
                        <p>
                            <span aria-hidden="true">🔁</span> Suggested next turn: {joinNames(suggestNextTurn(entry, signup.peopleNeeded).map(nameOf))}.
                        </p>
                    )}
                </div>
            </section>

            <section className="signup-done-rewards">
                <h3>What you get</h3>
                <ul>
                    {firstSignup && <li className="signup-done-earned"><span aria-hidden="true">🌱</span><strong>+{GRASS.signup} grass</strong> Clover got it just now</li>}
                    <li><span aria-hidden="true">🪙</span><strong>+{visitMoolah(visitsSoFar)} Moolah</strong> when the organisation marks you as there</li>
                    <li><span aria-hidden="true">📔</span><strong>+{REFLECTION_MOOLAH} Moolah</strong> for a diary page afterwards</li>
                </ul>
                {goal && (
                    <div className="signup-done-goal">
                        <p><span aria-hidden="true">🎯</span> <strong>{goal.name}</strong></p>
                        <GoalBar progress={goalProgress(goal, app.history)} label={progressText(goal, app.history)}/>
                    </div>
                )}
            </section>

            <section className="signup-done-steps">
                <h3>Next steps</h3>
                <ol>
                    <li className={entry.calendarAnswered ? "signup-done-step-done" : undefined}>
                        <span className="signup-done-check" aria-hidden="true">{entry.calendarAnswered ? "✓" : "1"}</span>
                        <div>
                            <strong>Put it in your calendar</strong>
                            {entry.calendarAnswered
                                ? <p>Done. We won't ask again.</p>
                                : (
                                    <div className="signup-done-row">
                                        <AddToCalendar cause={cause} entry={entry} onAdded={onCalendarAnswered}/>
                                        <button className="signup-done-link" onClick={onCalendarAnswered}>Not now</button>
                                    </div>
                                )}
                        </div>
                    </li>

                    <li className={friendsToo || invited ? "signup-done-step-done" : undefined}>
                        <span className="signup-done-check" aria-hidden="true">{friendsToo || invited ? "✓" : "2"}</span>
                        <div>
                            <strong>{friendsToo ? "Your friends are coming" : "Bring a friend"}</strong>
                            {friendsToo && (
                                <p>Confirmation sent to {joinNames(entry.friendIds.map(nameOf))}.</p>
                            )}
                            {!friendsToo && !inviting && (
                                <div className="signup-done-row">
                                    <p>{invited ? "Invite sent." : "Helping is easier together."}</p>
                                    {!invited && <button className="signup-done-small" onClick={() => setInviting(true)}>Invite friends</button>}
                                </div>
                            )}
                            {inviting && (
                                <InviteFriends
                                    friendIds={app.friendIds}
                                    onSend={(ids) => {
                                        app.inviteFriends(cause.id, ids)
                                        setInvited(true)
                                    }}
                                    onClose={() => setInviting(false)}
                                />
                            )}
                        </div>
                    </li>

                    <li>
                        <span className="signup-done-check" aria-hidden="true">3</span>
                        <div>
                            <strong>Know where you're going</strong>
                            <div className="signup-done-row">
                                <p>{signup.area}. Aim to arrive 10 minutes early.</p>
                                <a className="signup-done-small" href={mapUrl} target="_blank" rel="noopener noreferrer">Open map</a>
                            </div>
                        </div>
                    </li>

                    <li className={followingOrg ? "signup-done-step-done" : undefined}>
                        <span className="signup-done-check" aria-hidden="true">{followingOrg ? "✓" : "4"}</span>
                        <div>
                            <strong>Follow {org.name}</strong>
                            <div className="signup-done-row">
                                <p>{followingOrg ? "You'll hear how they're doing, and how your help made a difference." : "Hear how they're doing after you've been, right in your Social feed."}</p>
                                <FollowButton following={followingOrg} onToggle={() => app.toggleFollow(org.id)} name={org.name} size="small"/>
                            </div>
                        </div>
                    </li>

                    <li>
                        <span className="signup-done-check" aria-hidden="true">5</span>
                        <div>
                            <strong>After the session, tell Clover how it went</strong>
                            <p>Write a diary page with a photo or stickers. Only you see it unless you share it.</p>
                        </div>
                    </li>
                </ol>
            </section>

            {more.length > 0 && (
                <section className="signup-done-more">
                    <h3>You might also like</h3>
                    <div className="signup-done-more-grid">
                        {more.map((c) => (
                            <CauseTile
                                key={c.id}
                                cause={c}
                                friends={friendsGoingTo(c.id, app.friendIds)}
                                userRegion={app.profile.region}
                                onOpen={(id) => app.openCause(id)}
                            />
                        ))}
                    </div>
                </section>
            )}

            <div className="signup-done-buttons">
                <button className="signup-done-secondary" onClick={onBackToCause}>Back to {cause.name}</button>
                <button className="button-primary" onClick={onHome}>Back to Home</button>
            </div>
        </div>
    )
}

export default SignupDone
