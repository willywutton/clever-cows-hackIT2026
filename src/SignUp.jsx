// SignUp.jsx lets the student sign up for a cause's session:
// just this once or every week, and alone, with friends or as a relay group.
// A relay group shares the commitment: only as many people as the session
// needs go each time, and the group takes turns.
import { useState } from 'react'
import { friends } from './data/friends'
import { YOU, nameOf } from './people'
import SessionDetails from './SessionDetails'
import './SignUp.css'

const MODES = [
    { id: "me", label: "Just me" },
    { id: "friends", label: "With friends" },
    { id: "relay", label: "Relay group", hint: "Your group takes turns, so not everyone has to go every time." },
]

// { cause } is the cause being signed up for. { existing } is an earlier sign-up
// for this cause, or null. { userRegion } is used for the "Near you" tag.
// { onConfirm } receives the new sign-up entry. { onBack } returns to the cause page.
function SignUp({ cause, existing, userRegion, onConfirm, onBack }) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const needed = signup.peopleNeeded

    const [weekly, setWeekly] = useState(existing ? existing.weekly : false)
    const [mode, setMode] = useState(existing ? existing.mode : "me")
    const [friendIds, setFriendIds] = useState(existing ? existing.friendIds : [])
    const [goingIds, setGoingIds] = useState(existing ? existing.goingIds : [YOU])

    const group = [YOU, ...friendIds]

    // Adds the friend if they are not ticked, removes them if they are.
    // A friend who leaves the relay group is also taken off this session.
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
        if (goingIds.includes(id)) {
            setGoingIds(goingIds.filter((goingId) => goingId !== id))
        }
        else {
            setGoingIds([...goingIds, id])
        }
    }

    // Explain what is still missing before the student can confirm.
    let problem = ""
    if (mode === "friends" && friendIds.length === 0) {
        problem = "Pick at least one friend to come with you."
    }
    else if (mode === "relay" && group.length < needed) {
        problem = `This session needs ${needed} people, so your group needs at least ${needed} (including you).`
    }
    else if (mode === "relay" && goingIds.length < needed) {
        problem = `Tick ${needed - goingIds.length} more ${needed - goingIds.length === 1 ? "person" : "people"} to go this time.`
    }

    function handleConfirm() {
        onConfirm({
            causeId: cause.id,
            weekly,
            mode,
            friendIds: mode === "me" ? [] : friendIds,
            goingIds: mode === "relay" ? goingIds : [],
            calendarAnswered: existing ? existing.calendarAnswered : false,
        })
    }

    return (
        <div className="signup card">
            <h2>Sign up with {cause.name}</h2>
            <div className="signup-session">
                <strong>{weekly ? signup.weeklyLabel : signup.label}</strong>
                <SessionDetails action={signup} weekly={weekly} userRegion={userRegion}/>
                <p className="signup-needed">Each session needs {needed} volunteers.</p>
            </div>

            <fieldset className="signup-choice">
                <legend>How often?</legend>
                <label>
                    <input type="radio" name="repeat" checked={!weekly} onChange={() => setWeekly(false)}/>
                    Just this once
                </label>
                <label>
                    <input type="radio" name="repeat" checked={weekly} onChange={() => setWeekly(true)}/>
                    Every week
                </label>
            </fieldset>

            <fieldset className="signup-choice">
                <legend>Who's coming?</legend>
                {MODES.map((option) => (
                    <label key={option.id}>
                        <input type="radio" name="mode" checked={mode === option.id} onChange={() => setMode(option.id)}/>
                        <span>
                            {option.label}
                            {option.hint && <small>{option.hint}</small>}
                        </span>
                    </label>
                ))}
            </fieldset>

            {mode !== "me" && (
                <fieldset className="signup-choice">
                    <legend>
                        {mode === "relay" ? "Who's in your relay group?" : "Which friends are coming?"}{" "}
                        <span className="signup-sample">Sample friends</span>
                    </legend>
                    {friends.map((friend) => (
                        <label key={friend.id}>
                            <input type="checkbox" checked={friendIds.includes(friend.id)} onChange={() => toggleFriend(friend.id)}/>
                            {friend.name}
                        </label>
                    ))}
                </fieldset>
            )}

            {mode === "relay" && group.length >= needed && (
                <fieldset className="signup-choice">
                    <legend>
                        Your group has {group.length}, so only {needed} need to go. Who's going this time?
                    </legend>
                    {group.map((id) => (
                        <label key={id}>
                            <input type="checkbox" checked={goingIds.includes(id)} onChange={() => toggleGoing(id)}/>
                            {nameOf(id)}
                        </label>
                    ))}
                </fieldset>
            )}

            {problem && <p className="signup-problem">{problem}</p>}

            <div className="signup-buttons">
                <button className="signup-back" onClick={onBack}>Back</button>
                <button className="button-primary" onClick={handleConfirm} disabled={problem !== ""}>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default SignUp
