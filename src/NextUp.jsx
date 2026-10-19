// NextUp.jsx lists the student's upcoming sessions on their Profile,
// each with its calendar buttons.
import { upcomingSessions } from './upcoming'
import { describeWho, joinNames, nameOf, suggestNextTurn } from './people'
import SessionDetails from './SessionDetails'
import AddToCalendar from './AddToCalendar'
import './NextUp.css'

// { signedUp } is App's list of sign-ups. { userRegion } is for the travel tag.
// { onReflect } opens the reflection screen for a cause.
function NextUp({ signedUp, userRegion, onReflect }) {
    const sessions = upcomingSessions(signedUp)

    return (
        <section className="card next-up">
            <h3>Next up</h3>

            {sessions.length === 0 && (
                <p className="next-up-empty">No sessions yet. You can sign up from any cause page.</p>
            )}

            {sessions.map(({ entry, cause, signup }) => (
                <div className="next-up-item" key={cause.id}>
                    <strong>{cause.name}: {entry.weekly ? signup.weeklyLabel : signup.label}</strong>
                    <SessionDetails action={signup} weekly={entry.weekly} userRegion={userRegion}/>
                    <p className="next-up-who">{describeWho(entry)}</p>
                    {entry.weekly && entry.mode === "relay" && (
                        <p className="next-up-who">
                            Suggested next turn: {joinNames(suggestNextTurn(entry, signup.peopleNeeded).map(nameOf))}
                        </p>
                    )}
                    <AddToCalendar cause={cause} entry={entry}/>
                    <button className="next-up-went" onClick={() => onReflect(cause.id)}>
                        I went to this session <span>(demo)</span>
                    </button>
                </div>
            ))}
        </section>
    )
}

export default NextUp
