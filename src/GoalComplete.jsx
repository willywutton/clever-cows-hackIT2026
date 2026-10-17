// GoalComplete.jsx celebrates a finished goal: a thank-you, the title earned,
// and a choice of what to do next. Choosing a next goal is always up to the student.
import { useState } from 'react'
import { TITLES } from './titles'
import { goalById, progressText } from './goalProgress'
import GoalPicker from './GoalPicker'
import './GoalComplete.css'

// { goalId } is the goal just finished. { history } is App's list of actions, for progress lines.
// { finishedIds } lists every finished goal, so they are not offered again.
// { onChoose } receives the next goal id. { onTakeBreak } continues with no goal.
function GoalComplete({ goalId, history, finishedIds, onChoose, onTakeBreak }) {
    const [choosingOwn, setChoosingOwn] = useState(false)
    const goal = goalById(goalId)
    const title = TITLES.find((t) => t.id === goal.titleId)
    const suggestions = goal.suggestedNext
        .filter((id) => !finishedIds.includes(id))
        .map(goalById)

    return (
        <div className="goal-complete card">
            <span className="goal-complete-emoji" aria-hidden="true">🎉</span>
            <h2>You finished "{goal.name}"!</h2>
            <p className="goal-complete-thanks">
                Thank you for showing up for your community. Every step counted.
            </p>

            <div className="goal-complete-rewards">
                <p className="goal-complete-title">
                    <span aria-hidden="true">🏅</span> New title: <strong>{title.name}</strong>
                </p>
                <p className="goal-complete-grass">
                    <span aria-hidden="true">🌱</span> +2 grass for Clover Cowdini
                </p>
            </div>

            {!choosingOwn && (
                <>
                    {suggestions.length > 0 && (
                        <>
                            <h3>Want to try another goal?</h3>
                            <ul className="goal-complete-options">
                                {suggestions.map((next) => (
                                    <li key={next.id}>
                                        <button className="goal-complete-option" onClick={() => onChoose(next.id)}>
                                            <strong>{next.name}</strong>
                                            <span>{next.description}</span>
                                            <span className="goal-complete-progress">
                                                So far: {progressText(next, history)}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <div className="goal-complete-buttons">
                        <button className="goal-complete-plain" onClick={onTakeBreak}>Take a break</button>
                        <button className="goal-complete-own" onClick={() => setChoosingOwn(true)}>Choose my own</button>
                    </div>
                </>
            )}

            {choosingOwn && (
                <>
                    <h3>Choose any goal</h3>
                    <GoalPicker
                        activeGoalId=""
                        finishedIds={finishedIds}
                        onChoose={onChoose}
                        onCancel={() => setChoosingOwn(false)}
                    />
                </>
            )}
        </div>
    )
}

export default GoalComplete
