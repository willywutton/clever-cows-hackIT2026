// SurpriseMe.jsx shows one random cause outside the student's usual character match.
import { useState } from 'react'
import { causes } from './data/causes'
import { results } from './data/chapters'
import { describeSlot, findFreeSlot } from './freeTime'
import './SurpriseMe.css'

// { result } is the student's top trait, e.g. "Heart".
// { fitsMyWeek } shows the "Fits your week" line when the switch is on.
// { onOpenCause } opens a cause's page.
function SurpriseMe({ result, fitsMyWeek, onOpenCause }) {
    // The id of the surprise cause on show, or null before the button is clicked.
    const [surpriseId, setSurpriseId] = useState(null)

    const otherCauses = causes.filter((cause) => !cause.identity.includes(result))

    // Pick a random cause, never the same one twice in a row.
    function handleSurprise() {
        const choices = otherCauses.filter((cause) => cause.id !== surpriseId)
        const pick = choices[Math.floor(Math.random() * choices.length)]
        setSurpriseId(pick.id)
    }

    const surprise = causes.find((cause) => cause.id === surpriseId)
    const freeSlot = surprise && findFreeSlot(surprise.actions.find((action) => action.type === "signup"))

    return (
        <div className="surprise">
            <button className="surprise-button" onClick={handleSurprise}>
                <span aria-hidden="true">🎲</span> {surprise ? "Surprise me again" : "Surprise me"}
            </button>

            {surprise && (
                <div className="cause-card card surprise-card" aria-live="polite">
                    <p className="surprise-label">
                        Something different: not a usual match for {results[result].name}, but you might enjoy it.
                    </p>
                    <h3>{surprise.name}</h3>
                    <p className="cause-description">{surprise.description}</p>
                    {fitsMyWeek && freeSlot && (
                        <p className="cause-fits">✓ Fits your week: free {describeSlot(freeSlot)}</p>
                    )}
                    <button className="action-button" onClick={() => onOpenCause(surprise.id)}>
                        See how to help
                    </button>
                </div>
            )}
        </div>
    )
}

export default SurpriseMe
