// SignupDone.jsx confirms a sign-up, shows who is going, and offers
// (once per sign-up) to add the session to the student's calendar.
import { describeWho, joinNames, nameOf, suggestNextTurn } from './people'
import SessionDetails from './SessionDetails'
import AddToCalendar from './AddToCalendar'
import './SignupDone.css'

// { cause } and { entry } describe the sign-up. { userRegion } is for the travel tag.
// { onCalendarAnswered } records that the calendar prompt was answered, so it is never asked twice.
// { onHome } and { onBackToCause } are the two ways out of this screen.
function SignupDone({ cause, entry, userRegion, onCalendarAnswered, onHome, onBackToCause }) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const label = entry.weekly ? signup.weeklyLabel : signup.label

    return (
        <div className="signup-done card">
            <span className="signup-done-emoji" aria-hidden="true">🎉</span>
            <h2>You're signed up: {cause.name}: {label}</h2>
            <SessionDetails action={signup} weekly={entry.weekly} userRegion={userRegion}/>
            <p>{describeWho(entry)}</p>

            {entry.mode !== "me" && entry.friendIds.length > 0 && (
                <p className="signup-done-sent">
                    <span aria-hidden="true">✉</span> Confirmation sent to {joinNames(entry.friendIds.map(nameOf))} (demo, no real email sent).
                </p>
            )}

            {entry.weekly && entry.mode === "relay" && (
                <p className="signup-done-turn">
                    Suggested next turn: {joinNames(suggestNextTurn(entry, signup.peopleNeeded).map(nameOf))}.
                    Your group can swap whenever it suits you.
                </p>
            )}

            {!entry.calendarAnswered && (
                <div className="signup-done-calendar">
                    <p>Add it to your calendar so you don't miss it.</p>
                    <AddToCalendar cause={cause} entry={entry} onAdded={onCalendarAnswered}/>
                    <button className="signup-done-not-now" onClick={onCalendarAnswered}>Not now</button>
                </div>
            )}

            <div className="signup-done-buttons">
                <button className="signup-done-secondary" onClick={onBackToCause}>Back to {cause.name}</button>
                <button className="button-primary" onClick={onHome}>Home</button>
            </div>
        </div>
    )
}

export default SignupDone
