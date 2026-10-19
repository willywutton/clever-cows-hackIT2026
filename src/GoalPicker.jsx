// GoalPicker.jsx lists the goals so the student can choose one, switch, or drop their goal.
import { goals } from './data/goals'
import './GoalPicker.css'

// { activeGoalId } is the current goal id ('' for none).
// { finishedIds } lists goals already finished; they are shown but can't be picked again.
// { onChoose } receives the chosen goal id ('' for no goal). { onCancel } closes without changing.
function GoalPicker({ activeGoalId, finishedIds = [], onChoose, onCancel }) {
    return (
        <div className="goal-picker">
            <ul className="goal-picker-list">
                {goals.map((goal) => {
                    const finished = finishedIds.includes(goal.id)
                    return (
                        <li key={goal.id}>
                            <button
                                className="goal-picker-option"
                                aria-pressed={goal.id === activeGoalId}
                                disabled={finished}
                                onClick={() => onChoose(goal.id)}
                            >
                                <strong>
                                    {goal.name}
                                    {finished && <em className="goal-picker-finished"> ✓ Finished</em>}
                                </strong>
                                <span>{goal.description}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="goal-picker-buttons">
                {activeGoalId !== "" && (
                    <button className="goal-picker-plain" onClick={() => onChoose("")}>No goal for now</button>
                )}
                <button className="goal-picker-plain" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default GoalPicker
