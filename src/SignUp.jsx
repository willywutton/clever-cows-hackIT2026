// SignUp.jsx lets the student sign up for a cause's session: alone or with friends,
// just this once or every week. Friends can also take turns as a relay group, which
// shares the commitment: only as many people as the session needs go each time.
import { useState } from 'react'
import { YOU, nameOf } from './people'
import SessionDetails from './SessionDetails'
import AddFriend from './AddFriend'
import RepeatBonus from './RepeatBonus'
import './SignUp.css'

// { cause } is the cause being signed up for. { existing } is an earlier sign-up
// for this cause, or null. { userRegion } is used for the travel tag.
// { myFriendIds } is the student's friends list, and { onAddFriend } adds someone to it.
// { visitsSoFar } is how many sessions the student has been to for this cause.
// { onConfirm } receives the new sign-up entry. { onBack } returns to the cause page.
function SignUp({ cause, existing, userRegion, myFriendIds, visitsSoFar, onAddFriend, onConfirm, onBack }) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const needed = signup.peopleNeeded

    const [weekly, setWeekly] = useState(existing ? existing.weekly : false)
    const [mode, setMode] = useState(existing ? existing.mode : "me")
    const [friendIds, setFriendIds] = useState(existing ? existing.friendIds : [])
    const [goingIds, setGoingIds] = useState(existing ? existing.goingIds : [YOU])

    const [addingFriend, setAddingFriend] = useState(false)
    const withFriends = mode !== "me"

    const group = [YOU, ...friendIds]

    // Everyone who can be picked: the student's friends, plus anyone already in this
    // sign-up who has since been removed as a friend.
    const pickable = [...myFriendIds, ...friendIds.filter((id) => !myFriendIds.includes(id))]

    // A friend added here is ticked straight away, since they were added to come along.
    function handleAddFriend(id) {
        onAddFriend(id)
        setFriendIds([...friendIds, id])
    }

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

            <div className="signup-who" role="group" aria-label="Who's coming?">
                <button type="button" aria-pressed={!withFriends} onClick={() => setMode("me")}>
                    <span aria-hidden="true">🙋</span> Sign up alone
                </button>
                <button type="button" aria-pressed={withFriends} onClick={() => setMode(mode === "relay" ? "relay" : "friends")}>
                    <span aria-hidden="true">👫</span> Sign up with friends
                </button>
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

            {withFriends && (
                <fieldset className="signup-choice">
                    <legend>
                        {mode === "relay" ? "Who's in your relay group?" : "Which friends are coming?"}{" "}
                        <span className="signup-sample">Sample friends</span>
                    </legend>
                    {pickable.map((id) => (
                        <label key={id}>
                            <input type="checkbox" checked={friendIds.includes(id)} onChange={() => toggleFriend(id)}/>
                            {nameOf(id)}
                        </label>
                    ))}
                    {!addingFriend && (
                        <button type="button" className="signup-add-friend" onClick={() => setAddingFriend(true)}>
                            + Add a friend
                        </button>
                    )}
                    {addingFriend && <AddFriend friendIds={myFriendIds} onAdd={handleAddFriend}/>}
                    <label className="signup-relay">
                        <input
                            type="checkbox"
                            checked={mode === "relay"}
                            onChange={(event) => setMode(event.target.checked ? "relay" : "friends")}
                        />
                        <span>
                            Take turns as a relay group
                            <small>Only {needed} of you go each time, so not everyone has to come every week.</small>
                        </span>
                    </label>
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

            <RepeatBonus visitsSoFar={visitsSoFar}/>

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
