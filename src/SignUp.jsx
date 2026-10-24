// SignUp.jsx lets the student sign up for a cause's session in three steps: how often
// (just this once, for a few weeks, or every week), who's coming (just me, with friends,
// or a relay group that takes turns), and the friends involved. A summary beside the
// steps shows the plan, the dates and what the student earns, with the Confirm button.
import Graphic from './Graphic'
import { useState } from 'react'
import { YOU, describeWho, joinNames, nameOf, planLabel, relayWeeks } from './people'
import { sampleStudentById } from './data/friends'
import { causeLook } from './causeColors'
import { openPlaces } from './causeRows'
import SessionDetails from './SessionDetails'
import AddFriend from './AddFriend'
import RepeatBonus from './RepeatBonus'
import WeekStrip from './WeekStrip'
import RelayRota from './RelayRota'
import PersonChip from './PersonChip'
import './SignUp.css'

const WEEKS_SHOWN = 4
const RUN_LENGTHS = [2, 3, 4, 6, 8]
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

function formatDate(date, withWeekday) {
    return date.toLocaleDateString('en-SG', {
        weekday: withWeekday ? 'short' : undefined,
        day: 'numeric',
        month: 'short',
        timeZone: 'Asia/Singapore',
    })
}

// How an earlier sign-up was set: 'once', 'few' (a set number of weeks) or 'every'.
function oftenOf(entry) {
    if (!entry || !entry.weekly) {
        return "once"
    }
    return entry.weeks ? "few" : "every"
}

// { cause } is the cause being signed up for. { existing } is an earlier sign-up
// for this cause, or null. { userRegion } is used for the travel tag.
// { myFriendIds } is the student's friends list, and { onAddFriend } adds someone to it.
// { myFace } is the student's own avatar head. { visitsSoFar } is how many sessions
// they have been to for this cause. { onConfirm } receives the new sign-up entry.
// { onBack } returns to the cause page.
function SignUp({ cause, existing, userRegion, myFriendIds, myFace, visitsSoFar, onAddFriend, onConfirm, onBack }) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const needed = signup.peopleNeeded
    const total = signup.spots
    const free = openPlaces(cause)
    const look = causeLook(cause.id)

    const [often, setOften] = useState(oftenOf(existing))
    const [runWeeks, setRunWeeks] = useState(existing && existing.weeks ? existing.weeks : 4)
    const [mode, setMode] = useState(existing ? existing.mode : "me")
    const [friendIds, setFriendIds] = useState(existing ? existing.friendIds : [])
    const [goingIds, setGoingIds] = useState(existing && existing.goingIds.length ? existing.goingIds : [YOU])
    const [addingFriend, setAddingFriend] = useState(false)

    const weekly = often !== "once"
    const group = [YOU, ...friendIds]
    const relay = mode === "relay"

    // Everyone who can be picked: the student's friends, plus anyone already in this
    // sign-up who has since been removed as a friend.
    const pickable = [...myFriendIds, ...friendIds.filter((id) => !myFriendIds.includes(id))]

    // Session dates far enough ahead for the longest plan.
    const start = new Date(signup.startsAt)
    const sessionDates = Array.from({ length: Math.max(...RUN_LENGTHS) }, (_, i) => new Date(start.getTime() + i * WEEK_MS))
    const dates = sessionDates.map((date) => formatDate(date, true))

    // How many sessions the plan covers (Infinity carries on), and the dates the preview shows.
    const sessions = often === "once" ? 1 : often === "few" ? runWeeks : Infinity
    const previewLength = often === "few" ? Math.max(runWeeks, WEEKS_SHOWN) : WEEKS_SHOWN
    const previewDates = sessionDates.slice(0, previewLength).map((date) => formatDate(date, false))
    const lastDate = often === "few" ? dates[runWeeks - 1] : null

    const faces = { [YOU]: { face: myFace } }
    pickable.forEach((id) => {
        faces[id] = { accessories: sampleStudentById(id).accessories }
    })

    // A relay group shares one weekly spot, so it only makes sense when it repeats.
    function chooseMode(next) {
        setMode(next)
        if (next === "relay" && often === "once") {
            setOften("every")
        }
    }

    function chooseOften(next) {
        setOften(next)
        if (next === "once" && relay) {
            setMode("friends")
        }
    }

    // A friend added here is ticked straight away, since they were added to come along.
    function handleAddFriend(id) {
        onAddFriend(id)
        setFriendIds([...friendIds, id])
    }

    // A friend who leaves the group is also taken off this week's turn.
    function toggleFriend(id) {
        if (friendIds.includes(id)) {
            setFriendIds(friendIds.filter((friendId) => friendId !== id))
            setGoingIds(goingIds.filter((goingId) => goingId !== id))
        }
        else {
            setFriendIds([...friendIds, id])
        }
    }

    function toggleGoing(id) {
        setGoingIds(goingIds.includes(id) ? goingIds.filter((goingId) => goingId !== id) : [...goingIds, id])
    }

    // A relay needs one more person than the places each week, or nobody ever rests.
    const relayShort = relay ? needed + 1 - group.length : 0

    // How many places this plan takes at each session, and whether they fit.
    const placesUsed = mode === "me" ? 1 : relay ? needed : group.length
    const tooMany = placesUsed - free
    let placesNote = ""
    if (free === 0) {
        placesNote = "This session is full, so there's no place left to sign up for."
    }
    else if (relay && tooMany > 0) {
        placesNote = `Each relay turn needs ${needed} places, but only ${free} ${free === 1 ? "is" : "are"} left, so a relay can't fit this session.`
    }
    else if (tooMany > 0) {
        placesNote = `Only ${free} ${free === 1 ? "place is" : "places are"} left, but your group needs ${placesUsed}. Untick ${tooMany} ${tooMany === 1 ? "friend" : "friends"}`
            + (weekly && needed <= free && group.length > needed ? ", or make it a relay so fewer of you go each week." : ".")
    }

    // What is still missing before the student can confirm.
    let problem = ""
    if (placesNote) {
        problem = placesNote
    }
    else if (mode === "friends" && friendIds.length === 0) {
        problem = "Pick at least one friend to come with you."
    }
    else if (relayShort > 0) {
        problem = `Add ${relayShort} more ${relayShort === 1 ? "friend" : "friends"} to start a relay.`
    }
    else if (relay && goingIds.length !== needed) {
        problem = `Pick exactly ${needed} people for the first week (${goingIds.length} picked).`
    }

    const entry = {
        causeId: cause.id,
        weekly,
        weeks: often === "few" ? runWeeks : null,
        mode,
        friendIds: mode === "me" ? [] : friendIds,
        goingIds: relay ? goingIds : [],
        calendarAnswered: existing ? existing.calendarAnswered : false,
    }

    // The relay's turns over the whole plan (or the next few weeks if it carries on);
    // the table shows the first few weeks.
    const relayLength = often === "few" ? runWeeks : WEEKS_SHOWN
    const rota = relay && problem === "" ? relayWeeks(group, goingIds, needed, relayLength) : null
    const rotaShown = rota ? rota.slice(0, WEEKS_SHOWN) : null
    const myWeeks = rota ? rota.filter((going) => going.includes(YOU)).length : 0

    let youGo = `Once, on ${dates[0]}`
    if (often === "few") {
        youGo = rota ? `${myWeeks} of ${runWeeks} weeks` : `${runWeeks} weeks, to ${lastDate}`
    }
    else if (often === "every") {
        youGo = rota ? `${myWeeks} of the next ${WEEKS_SHOWN} weeks` : "Every week"
    }
    if (relay && !rota) {
        youGo = "Set up your relay first"
    }

    let previewText = `One visit, on ${dates[0]}. Come back any time after.`
    if (often === "few") {
        previewText = `${runWeeks} visits, one a week, from ${dates[0]} to ${lastDate}.`
    }
    else if (often === "every") {
        previewText = `Every week from ${dates[0]}, until you change your sign-up.`
    }

    return (
        <div className="signup">
            <button className="signup-back-link" onClick={onBack}>← Back to {cause.name}</button>

            <header className="signup-head">
                <span className="signup-mark" style={{ background: look.color }} aria-hidden="true"><Graphic symbol={look.emoji}/></span>
                <div>
                    <p className="eyebrow">Sign up</p>
                    <h1>{cause.name}</h1>
                </div>
            </header>

            <div className="signup-columns">
                <div className="signup-steps">
                    <section className="card signup-step">
                        <h3><span className="signup-step-number">1</span> How often?</h3>
                        <div className="signup-options signup-options-often" role="radiogroup" aria-label="How often">
                            <button role="radio" aria-checked={often === "once"} className="signup-option" onClick={() => chooseOften("once")}>
                                <WeekStrip dates={previewDates.slice(0, WEEKS_SHOWN)} count={1} compact/>
                                <strong>Just this once</strong>
                                <small>{signup.label}</small>
                            </button>
                            <button role="radio" aria-checked={often === "few"} className="signup-option" onClick={() => chooseOften("few")}>
                                <WeekStrip dates={previewDates.slice(0, WEEKS_SHOWN)} count={3} compact/>
                                <strong>For a few weeks</strong>
                                <small>Try it for a set number of weeks</small>
                            </button>
                            <button role="radio" aria-checked={often === "every"} className="signup-option" onClick={() => chooseOften("every")}>
                                <WeekStrip dates={previewDates.slice(0, WEEKS_SHOWN)} count={Infinity} compact/>
                                <strong>Every week</strong>
                                <small>{signup.weeklyLabel}</small>
                            </button>
                        </div>

                        {often === "few" && (
                            <div className="signup-weeks">
                                <span className="signup-weeks-label">How many weeks?</span>
                                <div className="signup-weeks-pills" role="radiogroup" aria-label="How many weeks">
                                    {RUN_LENGTHS.map((length) => (
                                        <button key={length} role="radio" aria-checked={runWeeks === length} className="signup-weeks-pill" onClick={() => setRunWeeks(length)}>
                                            {length}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="signup-preview">
                            <WeekStrip dates={previewDates} count={sessions}/>
                            <p>{previewText}</p>
                        </div>
                    </section>

                    <section className="card signup-step">
                        <h3><span className="signup-step-number">2</span> Who's coming?</h3>
                        <div className="signup-options signup-options-3" role="radiogroup" aria-label="Who's coming">
                            <button role="radio" aria-checked={mode === "me"} className="signup-option" onClick={() => chooseMode("me")}>
                                <span className="signup-option-icon" aria-hidden="true"><Graphic symbol="user"/></span>
                                <strong>Just me</strong>
                                <small>Go on your own. You'll meet people there.</small>
                            </button>
                            <button role="radio" aria-checked={mode === "friends"} className="signup-option" onClick={() => chooseMode("friends")}>
                                <span className="signup-option-icon" aria-hidden="true"><Graphic symbol="people"/></span>
                                <strong>With friends</strong>
                                <small>Everyone you pick comes along each time.</small>
                            </button>
                            <button role="radio" aria-checked={relay} className="signup-option" onClick={() => chooseMode("relay")}>
                                <span className="signup-option-icon" aria-hidden="true"><Graphic symbol="repeat"/></span>
                                <strong>Relay group</strong>
                                <small>Share one weekly spot. {needed} of you go each week and take turns.</small>
                            </button>
                        </div>
                    </section>

                    {mode !== "me" && (
                        <section className="card signup-step">
                            <h3><span className="signup-step-number">3</span> {relay ? "Your relay group" : "Who's coming with you?"}</h3>
                            <div className="signup-friends">
                                <span className="signup-friend signup-friend-you"><PersonChip id={YOU} face={faces[YOU]}/></span>
                                {pickable.map((id) => (
                                    <label key={id} className="signup-friend">
                                        <input type="checkbox" checked={friendIds.includes(id)} onChange={() => toggleFriend(id)}/>
                                        <PersonChip id={id} face={faces[id]}/>
                                    </label>
                                ))}
                                {!addingFriend && (
                                    <button type="button" className="signup-add-friend" onClick={() => setAddingFriend(true)}>+ Add a friend</button>
                                )}
                            </div>
                            {addingFriend && <AddFriend friendIds={myFriendIds} onAdd={handleAddFriend}/>}

                            {placesNote && <p className="signup-note" role="status">{placesNote}</p>}

                            {!placesNote && relayShort > 0 && (
                                <div className="signup-note">
                                    <p>
                                        Each week {needed} of you go, so a relay needs at least {needed + 1} people: then
                                        someone always gets a week off. You have {group.length}, so add {relayShort} more.
                                    </p>
                                    {group.length === needed && (
                                        <button type="button" className="signup-relay-switch" onClick={() => chooseMode("friends")}>
                                            All {needed} of us will go every week
                                        </button>
                                    )}
                                </div>
                            )}

                            {relay && !placesNote && relayShort <= 0 && (
                                <div className="signup-relay">
                                    <p className="signup-relay-title">Who goes first, on {dates[0]}? <small>Pick {needed}.</small></p>
                                    <div className="signup-friends">
                                        {group.map((id) => (
                                            <label key={id} className="signup-friend">
                                                <input type="checkbox" checked={goingIds.includes(id)} onChange={() => toggleGoing(id)}/>
                                                <PersonChip id={id} face={faces[id]}/>
                                            </label>
                                        ))}
                                    </div>
                                    {rotaShown && (
                                        <>
                                            <p className="signup-relay-title">
                                                How the turns work
                                                <small>
                                                    Whoever sat out goes next.
                                                    {relayLength > WEEKS_SHOWN ? ` First ${WEEKS_SHOWN} of ${relayLength} weeks shown.` : ""}
                                                </small>
                                            </p>
                                            <RelayRota group={group} rota={rotaShown} dates={dates.slice(0, rotaShown.length)} faces={faces}/>
                                        </>
                                    )}
                                </div>
                            )}
                        </section>
                    )}
                </div>

                <aside className="card signup-summary">
                    <p className="eyebrow">Your plan</p>
                    <div className="signup-summary-session">
                        <strong>{planLabel(signup, entry)}</strong>
                        <SessionDetails action={signup} weekly={weekly} weeks={entry.weeks} userRegion={userRegion}/>
                    </div>
                    <ul className="signup-summary-facts">
                        <li><span>Who</span><strong>{mode === "me" ? "Just you" : relay ? `Relay of ${group.length}` : joinNames(group.map(nameOf))}</strong></li>
                        <li><span>You go</span><strong>{youGo}</strong></li>
                        <li>
                            <span>Places</span>
                            <strong className={tooMany > 0 ? "signup-over" : undefined}>
                                {tooMany > 0 ? `${free} left, you need ${placesUsed}` : `${total - free + placesUsed} of ${total} with you`}
                            </strong>
                        </li>
                    </ul>
                    {relay && rota && <p className="signup-summary-note">{describeWho(entry)}</p>}
                    <RepeatBonus visitsSoFar={visitsSoFar}/>
                    {problem && <p className="signup-problem" role="status">{problem}</p>}
                    <button className="button-primary signup-confirm" onClick={() => onConfirm(entry)} disabled={problem !== ""}>
                        {existing ? "Update my sign-up" : "Confirm sign-up"}
                    </button>
                </aside>
            </div>
        </div>
    )
}

export default SignUp
