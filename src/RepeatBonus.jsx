// RepeatBonus.jsx shows how much Moolah each visit to this cause earns, so the student
// can see that coming back earns more. It's encouragement only: nothing is lost by not returning.
import { SESSION_MOOLAH } from './data/economy'
import './RepeatBonus.css'

const LABELS = ["1st visit", "2nd visit", "3rd visit and after"]

// { visitsSoFar } is how many sessions the student has already been to for this cause.
function RepeatBonus({ visitsSoFar }) {
    const nextIndex = Math.min(visitsSoFar, SESSION_MOOLAH.length - 1)

    return (
        <div className="repeat-bonus">
            <p className="repeat-bonus-title">
                <span aria-hidden="true">🪙</span> Come back again to earn more Moolah
            </p>
            <ol className="repeat-bonus-steps">
                {SESSION_MOOLAH.map((amount, index) => (
                    <li key={LABELS[index]} className={index === nextIndex ? "repeat-bonus-next" : undefined}>
                        <strong>+{amount}</strong>
                        <span>{LABELS[index]}</span>
                        {index === nextIndex && <em>Your next visit</em>}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default RepeatBonus
